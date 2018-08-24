from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from pprint import pprint, pformat
import logging
import json
import urllib.parse
from .models import Client, Topology, MessageType, TopologyHistory, Device

from .utils import transform_dict

logger = logging.getLogger("network_ui_dev.consumers")


class NetworkUIException(Exception):

    pass


class NetworkUIConsumer(AsyncWebsocketConsumer):

    async def send_json(self, message_data):
        await self.send(text_data=json.dumps(message_data))

    async def connect(self, event=None):
        await self.accept()
        self.message_types = await self.get_message_types()
        self.client_id = 0
        self.topology_id = 0
        await self.create_client()
        await self.send(text_data=json.dumps(['id', self.client.pk]))
        await self.get_or_create_topology()
        topology_data = await self.get_or_create_topology()
        await self.send(text_data=json.dumps(['Topology', topology_data]))
        print('connect client_id {0} topology_id {1}'.format(self.client_id, self.topology_id))
        # print("connect: " + str(event))
        # pprint(self.scope)
        # print(urllib.parse.parse_qs(self.scope['query_string']))

    @database_sync_to_async
    def get_message_types(self):
        return dict(MessageType.objects.all().values_list('name', 'pk'))

    @database_sync_to_async
    def create_client(self):
        self.client = Client()
        self.client.save()
        self.client_id = self.client.pk

    @database_sync_to_async
    def get_or_create_topology(self):
        qs = urllib.parse.parse_qs(self.scope['query_string'])
        self.topology_id = qs.get('topology_id', 0)
        if self.topology_id:
            self.topology = Topology.objects.get(topology_id=self.topology_id)
        else:
            self.topology = Topology(name="topology", scale=1.0, panX=0, panY=0)
            self.topology.save()
            self.topology_id = self.topology.pk
        return transform_dict(dict(topology_id='topology_id',
                                   name='name',
                                   panX='panX',
                                   panY='panY',
                                   scale='scale',
                                   link_id_seq='link_id_seq',
                                   device_id_seq='device_id_seq',
                                   group_id_seq='group_id_seq'), self.topology.__dict__)

    async def disconnect(self, close_code):
        print('disconnect client {0} topology_id {1}'.format(self.client_id, self.topology_id))

    async def receive(self, text_data):
        # print("recieved: " + str(text_data))
        pprint(json.loads(text_data))
        data = json.loads(text_data)
        if isinstance(data[1], list):
            print("no sender")
            return
        if isinstance(data[1], dict) and self.client_id != data[1].get('sender'):
            logger.error("client_id mismatch expected: %s actual %s", self.client_id, data[1].get('sender'))
            logger.error(pformat(data))
            return
        message_type = data[0]
        message_value = data[1]

        print(message_type)
        print(message_value)

        if message_type not in self.message_types:
            logger.warning("Unsupported message %s: no message type", message_type)
            return

        TopologyHistory(topology_id=self.topology_id,
                        client_id=self.client_id,
                        message_type_id=self.message_types[message_type],
                        message_id=data[1].get('message_id', 0),
                        message_data=text_data).save()

        handler = self.get_handler(message_type)

        print(str(handler))
        logger.debug(str(handler))

        if handler is not None:
            try:
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

    def get_handler(self, message_type):
        return getattr(self, "on{0}".format(message_type), None)

    @database_sync_to_async
    def onDeviceCreate(self, device, topology_id, client_id):
        device = transform_dict(dict(x='x',
                                     y='y',
                                     name='name',
                                     type='device_type',
                                     id='id',
                                     host_id='host_id'), device)
        logger.info("Device %s", device)
        print("Device %s" % device)
        d, _ = Device.objects.get_or_create(topology_id=topology_id, id=device['id'], defaults=device)
        d.x = device['x']
        d.y = device['y']
        d.device_type = device['device_type']
        d.host_id = device['host_id']
        d.save()
        (Topology.objects
                 .filter(topology_id=topology_id, device_id_seq__lt=device['id'])
                 .update(device_id_seq=device['id']))
