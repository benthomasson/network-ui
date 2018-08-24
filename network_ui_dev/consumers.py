from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from pprint import pprint
import json
import urllib.parse
from .models import Client, Topology

from .utils import transform_dict


class Persistence(object):

    pass


class NetworkUIConsumer(AsyncWebsocketConsumer):

    async def connect(self, event=None):
        await self.accept()
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
        pass
