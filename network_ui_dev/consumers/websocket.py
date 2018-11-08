from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from pprint import pformat, pprint
import uuid
import logging
import json
import urllib.parse
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from collections import defaultdict
from django.utils.dateparse import parse_datetime
from ..models import Client, Topology, MessageType, TopologyHistory, Device
from ..models import Interface, Link
from ..models import Group as DeviceGroup
from ..models import GroupDevice as GroupDeviceMap
from ..models import FSMTrace, TopologySnapshot
from ..models import EventTrace, Coverage, TestResult
from ..models import Result, TestCase, CodeUnderTest
from ..models import Process, Stream, Toolbox, ToolboxItem
from ..models import Replay

from . import key

from ..utils import transform_dict

from django.conf import settings

logger = logging.getLogger("network_ui_dev.consumers")

HISTORY_MESSAGE_IGNORE_TYPES = ['DeviceSelected',
                                'DeviceUnSelected',
                                'LinkSelected',
                                'LinkUnSelected',
                                'Undo',
                                'Redo',
                                'MouseEvent',
                                'MouseWheelEvent',
                                'KeyEvent']


class NetworkUIException(Exception):

    pass


class NetworkUIConsumer(AsyncWebsocketConsumer):

    async def send_json(self, message_data):
        await self.send(text_data=json.dumps(message_data))

    async def connect(self, event=None):
        self.rooms = []

        await self.accept()
        self.message_types = await self.get_message_types()
        self.ignore_message_types = ['DeviceSelected',
                                     'DeviceUnSelected',
                                     'LinkSelected',
                                     'LinkUnSelected',
                                     'StartRecording',
                                     'StopRecording',
                                     'CoverageRequest']
        self.client_id = 0
        self.topology_id = 0
        await self.create_client()
        await self.send(text_data=json.dumps(['id', self.client.pk]))
        if settings.REPLAY_ENABLED:
            logger.info('REPLAY_ENABLED')
            replay = await self.send_replay()
            if replay:
                await self.send_json(["Replay", replay])
                logger.info('replay sent, connect done')
                return
        await self.get_or_create_topology()
        topology_data = await self.get_or_create_topology()
        await self.send(text_data=json.dumps(['Topology', topology_data]))
        snapshot = await self.send_snapshot()
        await self.send_json(["Snapshot", snapshot])
        history = await self.send_history()
        await self.send_json(["History", history])
        await self.send_toolboxes()
        await self.send_tests()
        for room in ['all']:
            self.rooms.append(room)
            await self.channel_layer.group_add(room, self.channel_name)
        logger.info('connect done')

    @database_sync_to_async
    def get_toolboxes(self):
        return (ToolboxItem.objects
                           .filter(toolbox__name__in=['Process',
                                                      'Device',
                                                      'Rack',
                                                      'Site'])
                           .values('toolbox__name', 'data'))

    async def send_toolboxes(self):
        for toolbox_item in await self.get_toolboxes():
            item = dict(toolbox_name=toolbox_item['toolbox__name'],
                        data=toolbox_item['data'])
            await self.send_json(["ToolboxItem", item])

    @database_sync_to_async
    def get_tests(self):
        return TestCase.objects.all().values_list('name', 'test_case_data')

    async def send_tests(self):
        for name, test_case_data in await self.get_tests():
            self.send_json(["TestCase", [name, json.loads(test_case_data)]])

    @database_sync_to_async
    def get_message_types(self):
        return dict(MessageType.objects.all().values_list('name', 'pk'))

    @database_sync_to_async
    def create_client(self):
        self.client = Client()
        self.client.save()
        self.client_id = self.client.pk

    @database_sync_to_async
    def send_replay(self):
        qs_data = urllib.parse.parse_qs(self.scope['query_string'])
        try:
            replay_id = int(qs_data.get(b'replay_id', [b'0'])[0].decode())
            logger.info('replay_id %s', replay_id)
        except ValueError:
            return False
        if replay_id == 0:
            return False
        try:
            replay = Replay.objects.filter(pk=replay_id).values()[0]
            logger.info('Found replay %s', replay['replay_id'])
            return  transform_dict(dict(replay_id='replay_id',
                                        replay_data='replay_data'), replay)
        except ObjectDoesNotExist as e:
            return False

    @database_sync_to_async
    def get_or_create_topology(self):
        qs_data = urllib.parse.parse_qs(self.scope['query_string'])
        print("qs_data: " + str(urllib.parse.parse_qs(self.scope['query_string'])))
        topology_uuid = qs_data.get(b'topology_id', [b'xxxx'])[0].decode()
        print('self.topology_id: ' + repr(self.topology_id))
        self.topology, created = Topology.objects.get_or_create(
                uuid=topology_uuid,
                defaults=dict(name="topology", scale=1.0, panX=0, panY=0, uuid=str(uuid.uuid4())))



        self.topology_id = self.topology.topology_id
        return transform_dict(dict(uuid='topology_id',
                                   name='name',
                                   panX='panX',
                                   panY='panY',
                                   scale='scale',
                                   link_id_seq='link_id_seq',
                                   device_id_seq='device_id_seq',
                                   group_id_seq='group_id_seq'), self.topology.__dict__)

    async def disconnect(self, close_code):
        print('disconnect client {0} topology_id {1}'.format(self.client_id, self.topology_id))
        for room in self.rooms:
            await self.channel_layer.group_discard(room, self.channel_name)

    async def receive(self, text_data):
        # print("recieved: " + str(text_data))
        # pprint(json.loads(text_data))
        data = json.loads(text_data)
        if isinstance(data[1], list):
            logger.error("no sender")
            return
        if isinstance(data[1], dict) and self.client_id != data[1].get('sender'):
            logger.error("client_id mismatch expected: %s actual %s", self.client_id, data[1].get('sender'))
            logger.error(pformat(data))
            return
        message_type = data[0]
        message_value = data[1]

        # print(message_type)
        # print(message_value)

        if message_type not in self.message_types:
            logger.warning("Unsupported message %s: no message type", message_type)
            return

        if message_type in self.ignore_message_types:
            return

        TopologyHistory(topology_id=self.topology_id,
                        client_id=self.client_id,
                        message_type_id=self.message_types[message_type],
                        message_id=data[1].get('message_id', 0),
                        message_data=text_data).save()

        handler = self.get_handler(message_type)

        if handler is not None:
            try:
                logger.info(message_type)
                await handler(message_value, self.topology_id, self.client_id)
            except NetworkUIException as e:
                # Group("client-%s" % client_id).send({"text": json.dumps(["Error", str(e)])})
                raise
            except Exception as e:
                # Group("client-%s" % client_id).send({"text": json.dumps(["Error", "Server Error"])})
                raise
            except BaseException as e:
                # Group("client-%s" % client_id).send({"text": json.dumps(["Error", "Server Error"])})
                raise
        else:
            logger.warning("Unsupported message %s: no handler", message_type)

    @database_sync_to_async
    def send_snapshot(self):
        interfaces = defaultdict(list)
        processes = defaultdict(list)

        for i in (Interface.objects
                  .filter(device__topology_id=self.topology_id)
                  .values()):
            interfaces[i['device_id']].append(i)
        for i in (Process.objects
                  .filter(device__topology_id=self.topology_id)
                  .values()):
            processes[i['device_id']].append(i)
        devices = list(Device.objects
                             .filter(topology_id=self.topology_id).values())
        for device in devices:
            device['interfaces'] = interfaces[device['device_id']]
            device['processes'] = processes[device['device_id']]

        links = [dict(id=x['id'],
                      name=x['name'],
                      from_device_id=x['from_device__id'],
                      to_device_id=x['to_device__id'],
                      from_interface_id=x['from_interface__id'],
                      to_interface_id=x['to_interface__id'])
                 for x in list(Link.objects
                                   .filter(Q(from_device__topology_id=self.topology_id) |
                                           Q(to_device__topology_id=self.topology_id))
                                   .values('id',
                                           'name',
                                           'from_device__id',
                                           'to_device__id',
                                           'from_interface__id',
                                           'to_interface__id'))]
        groups = list(DeviceGroup.objects
                                 .filter(topology_id=self.topology_id).values())
        group_map = {g['id']: g for g in groups}
        for group_id, device_id in (GroupDeviceMap.objects
                                                  .filter(group__topology_id=self.topology_id)
                                                  .values_list('group__id',
                                                               'device__id')):
            if 'members' not in group_map[group_id]:
                group_map[group_id]['members'] = [device_id]
            else:
                group_map[group_id]['members'].append(device_id)

        streams = [dict(id=x['id'],
                        label=x['label'],
                        from_id=x['from_device__id'],
                        to_id=x['to_device__id'])
                   for x in list(Stream.objects
                                       .filter(Q(from_device__topology_id=self.topology_id) |
                                               Q(to_device__topology_id=self.topology_id)).values('id',
                                                                                                  'label',
                                                                                                  'from_device__id',
                                                                                                  'to_device__id'))]

        snapshot = dict(sender=0,
                        devices=devices,
                        links=links,
                        groups=groups,
                        streams=streams)
        # pprint(snapshot)
        return snapshot

    @database_sync_to_async
    def send_history(self):
        return list(TopologyHistory.objects
                                   .filter(topology_id=self.topology_id)
                                   .exclude(message_type__name__in=HISTORY_MESSAGE_IGNORE_TYPES)
                                   .exclude(undone=True)
                                   .order_by('pk')
                                   .values_list('message_data', flat=True)[:1000])

    def get_handler(self, message_type):
        return getattr(self, "on{0}".format(message_type), None)

    async def onMultipleMessage(self, message_value, topology_id, client_id):
        logger.info("MultipleMessage %s", len(message_value['messages']))
        for message in message_value['messages']:
            message_type = message['msg_type']
            logger.info(message_type)
            if message_type not in self.message_types:
                logger.warning("Unsupported message %s: no message type", message_type)
                continue

            if message_type in self.ignore_message_types:
                continue
            handler = self.get_handler(message_type)
            if handler is not None:
                await handler(message, topology_id, client_id)
            else:
                logger.warning("Unsupported message %s", message)

    @database_sync_to_async
    def onDeviceCreate(self, device, topology_id, client_id):
        device = transform_dict(dict(x='x',
                                     y='y',
                                     name='name',
                                     type='device_type',
                                     id='id',
                                     host_id='host_id'), device)
        logger.info("Device %s", device)
        # print("Device %s" % device)
        d, _ = Device.objects.get_or_create(topology_id=topology_id, id=device['id'], defaults=device)
        d.x = device['x']
        d.y = device['y']
        d.device_type = device['device_type']
        d.host_id = device['host_id']
        d.save()
        (Topology.objects
                 .filter(topology_id=topology_id, device_id_seq__lt=device['id'])
                 .update(device_id_seq=device['id']))

    @database_sync_to_async
    def onDeviceInventoryUpdate(self, device, topology_id, client_id):
        Device.objects.filter(topology_id=topology_id, id=device['id']).update(host_id=device['host_id'])

    @database_sync_to_async
    def onDeviceDestroy(self, device, topology_id, client_id):
        Device.objects.filter(topology_id=topology_id, id=device['id']).delete()

    @database_sync_to_async
    def onDeviceMove(self, device, topology_id, client_id):
        Device.objects.filter(topology_id=topology_id, id=device['id']).update(x=device['x'], y=device['y'])

    @database_sync_to_async
    def onDeviceLabelEdit(self, device, topology_id, client_id):
        Device.objects.filter(topology_id=topology_id, id=device['id']).update(name=device['name'])

    @database_sync_to_async
    def onInterfaceCreate(self, interface, topology_id, client_id):
        Interface.objects.get_or_create(device_id=Device.objects.get(id=interface['device_id'],
                                                                     topology_id=topology_id).pk,
                                        id=interface['id'],
                                        defaults=dict(name=interface['name']))
        (Device.objects
               .filter(id=interface['device_id'],
                       topology_id=topology_id,
                       interface_id_seq__lt=interface['id'])
               .update(interface_id_seq=interface['id']))

    @database_sync_to_async
    def onInterfaceLabelEdit(self, interface, topology_id, client_id):
        (Interface.objects
                  .filter(device__topology_id=topology_id,
                          id=interface['id'],
                          device__id=interface['device_id'])
                  .update(name=interface['name']))

    @database_sync_to_async
    def onLinkCreate(self, link, topology_id, client_id):
        device_map = dict(Device.objects
                                .filter(topology_id=topology_id, id__in=[link['from_device_id'], link['to_device_id']])
                                .values_list('id', 'pk'))
        Link.objects.get_or_create(id=link['id'],
                                   name=link['name'],
                                   from_device_id=device_map[link['from_device_id']],
                                   to_device_id=device_map[link['to_device_id']],
                                   from_interface_id=Interface.objects.get(device_id=device_map[link['from_device_id']],
                                                                           id=link['from_interface_id']).pk,
                                   to_interface_id=Interface.objects.get(device_id=device_map[link['to_device_id']],
                                                                         id=link['to_interface_id']).pk)
        (Topology.objects
                 .filter(topology_id=topology_id, link_id_seq__lt=link['id'])
                 .update(link_id_seq=link['id']))

    @database_sync_to_async
    def onLinkLabelEdit(self, link, topology_id, client_id):
        Link.objects.filter(from_device__topology_id=topology_id, id=link['id']).update(name=link['name'])

    @database_sync_to_async
    def onLinkDestroy(self, link, topology_id, client_id):
        device_map = dict(Device.objects
                                .filter(topology_id=topology_id, id__in=[link['from_device_id'], link['to_device_id']])
                                .values_list('id', 'pk'))
        Link.objects.filter(id=link['id'],
                            from_device_id=device_map[link['from_device_id']],
                            to_device_id=device_map[link['to_device_id']],
                            from_interface_id=Interface.objects.get(device_id=device_map[link['from_device_id']],
                                                                    id=link['from_interface_id']).pk,
                            to_interface_id=Interface.objects.get(device_id=device_map[link['to_device_id']],
                                                                  id=link['to_interface_id']).pk).delete()

    @database_sync_to_async
    def onGroupCreate(self, group, topology_id, client_id):
        logger.info("GroupCreate %s %s %s", group['id'], group['name'], group['type'])
        group = transform_dict(dict(x1='x1',
                                    y1='y1',
                                    x2='x2',
                                    y2='y2',
                                    name='name',
                                    id='id',
                                    type='group_type',
                                    group_id='inventory_group_id'), group)
        d, _ = DeviceGroup.objects.get_or_create(topology_id=topology_id, id=group['id'], defaults=group)
        d.x1 = group['x1']
        d.y1 = group['y1']
        d.x2 = group['x2']
        d.y2 = group['y2']
        d.group_type = group['group_type']
        d.save()
        (Topology.objects
                 .filter(topology_id=topology_id, group_id_seq__lt=group['id'])
                 .update(group_id_seq=group['id']))

    @database_sync_to_async
    def onGroupInventoryUpdate(self, group, topology_id, client_id):
        DeviceGroup.objects.filter(topology_id=topology_id, id=group['id']).update(inventory_group_id=group['group_id'])

    @database_sync_to_async
    def onGroupDestroy(self, group, topology_id, client_id):
        DeviceGroup.objects.filter(topology_id=topology_id, id=group['id']).delete()

    @database_sync_to_async
    def onGroupLabelEdit(self, group, topology_id, client_id):
        DeviceGroup.objects.filter(topology_id=topology_id, id=group['id']).update(name=group['name'])

    @database_sync_to_async
    def onGroupMove(self, group, topology_id, client_id):
        DeviceGroup.objects.filter(topology_id=topology_id, id=group['id']).update(x1=group['x1'],
                                                                                   y1=group['y1'],
                                                                                   x2=group['x2'],
                                                                                   y2=group['y2'])

    @database_sync_to_async
    def onGroupMembership(self, group_membership, topology_id, client_id):
        members = set(group_membership['members'])
        group = DeviceGroup.objects.get(topology_id=topology_id, id=group_membership['id'])
        existing = set(GroupDeviceMap.objects.filter(group=group).values_list('device__id', flat=True))
        new = members - existing
        removed = existing - members

        GroupDeviceMap.objects.filter(group__group_id=group.group_id,
                                      device__id__in=list(removed)).delete()

        device_map = dict(Device.objects
                                .filter(topology_id=topology_id,
                                        id__in=list(new))
                                .values_list('id', 'device_id'))
        new_entries = []
        for i in new:
            new_entries.append(GroupDeviceMap(group=group,
                                              device_id=device_map[i]))
        if new_entries:
            GroupDeviceMap.objects.bulk_create(new_entries)

    @database_sync_to_async
    def onProcessCreate(self, process, topology_id, client_id):
        Process.objects.get_or_create(device_id=Device.objects.get(id=process['device_id'],
                                                                   topology_id=topology_id).pk,
                                      id=process['id'],
                                      defaults=dict(name=process['name'], process_type=process['type']))
        (Device.objects
               .filter(id=process['device_id'],
                       topology_id=topology_id,
                       interface_id_seq__lt=process['id'])
               .update(interface_id_seq=process['id']))

    @database_sync_to_async
    def onStreamCreate(self, stream, topology_id, client_id):
        device_map = dict(Device.objects
                                .filter(topology_id=topology_id, id__in=[stream['from_id'], stream['to_id']])
                                .values_list('id', 'pk'))
        logger.info("onStreamCreate %s", stream)
        Stream.objects.get_or_create(id=stream['id'],
                                     label='',
                                     from_device_id=device_map[stream['from_id']],
                                     to_device_id=device_map[stream['to_id']])
        (Topology.objects
                 .filter(topology_id=topology_id, stream_id_seq__lt=stream['id'])
                 .update(stream_id_seq=stream['id']))

    @database_sync_to_async
    def onCopySite(self, site, topology_id, client_id):
        site_toolbox, _ = Toolbox.objects.get_or_create(name="Site")
        ToolboxItem(toolbox=site_toolbox, data=json.dumps(site['site'])).save()

    @database_sync_to_async
    def onFSMTrace(self, message_value, diagram_id, client_id):
        FSMTrace(trace_session_id=message_value['trace_id'],
                 fsm_name=message_value['fsm_name'],
                 from_state=message_value['from_state'],
                 to_state=message_value['to_state'],
                 order=message_value['order'],
                 client_id=client_id,
                 message_type=message_value['recv_message_type'] or "none").save()

    @database_sync_to_async
    def onSnapshot(self, snapshot, topology_id, client_id):
        TopologySnapshot(trace_session_id=snapshot['trace_id'],
                         snapshot_data=json.dumps(snapshot),
                         order=snapshot['order'],
                         client_id=client_id,
                         topology_id=topology_id).save()

    @database_sync_to_async
    def write_event(self, event, topology_id, client_id):
        if event.get('save', True):
            EventTrace(trace_session_id=event['trace_id'],
                       event_data=json.dumps(event),
                       message_id=event['message_id'],
                       client_id=client_id).save()

    onViewPort = write_event
    onMouseEvent = write_event
    onTouchEvent = write_event
    onMouseWheelEvent = write_event
    onKeyEvent = write_event

    @database_sync_to_async
    def onCoverage(self, coverage, topology_id, client_id):
        Coverage(test_result_id=TestResult.objects.get(id=coverage['result_id'], client_id=client_id).pk,
                 coverage_data=json.dumps(coverage['coverage'])).save()

    @database_sync_to_async
    def onTestResult(self, test_result, topology_id, client_id):
        xyz, _, rest = test_result['code_under_test'].partition('-')
        commits_since, _, commit_hash = rest.partition('-')
        commit_hash = commit_hash.strip('g')

        # print(xyz)
        # print(commits_since)
        # print(commit_hash)

        x, y, z = [int(i) for i in xyz.split('.')]

        # print(x, y, z)

        code_under_test, _ = CodeUnderTest.objects.get_or_create(version_x=x,
                                                                 version_y=y,
                                                                 version_z=z,
                                                                 commits_since=int(commits_since),
                                                                 commit_hash=commit_hash)

        # print (code_under_test)

        tr = TestResult(id=test_result['id'],
                        result_id=Result.objects.get(name=test_result['result']).pk,
                        test_case_id=TestCase.objects.get(name=test_result['name']).pk,
                        code_under_test_id=code_under_test.pk,
                        client_id=client_id,
                        time=parse_datetime(test_result['date']))
        tr.save()
        # print (tr.pk)

    async def onDeploy(self, message, topology_id, client_id):
        await self.channel_layer.send('ansible', dict(type="deploy",
                                                      text='doit',
                                                      inventory="""
[Group1]
Host3 ansible_host=192.168.1.68 ansible_port=2201 ansible_user=vagrant
Host4 ansible_host=192.168.1.68 ansible_port=2202 ansible_user=vagrant
Host1 ansible_host=192.168.1.68 ansible_port=2222 ansible_user=vagrant
Host2 ansible_host=192.168.1.68 ansible_port=2200 ansible_user=vagrant""",
                                                      playbook=[dict(hosts='all',
                                                                      name='default',
                                                                      gather_facts=False,
                                                                      tasks=[dict(debug=None), dict(pause=dict(seconds=10)), dict(setup=None)])],
                                                      key=key.key,
                                                      ))

    async def reply_message(self, event):
        pprint(event)
        await self.send_json(['Hello', event['text']])

    async def runner_message(self, message):
        pprint(message)
        await self.send_json(['Runner', message['data']])

    async def playbook_message(self, message):
        pprint(message)
        await self.send_json(['Playbook', message['data']])
