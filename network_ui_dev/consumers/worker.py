from channels.generic.websocket import AsyncWebsocketConsumer

import json
from pprint import pprint


class AnsibleWorkerConsumer(AsyncWebsocketConsumer):

    async def send_json(self, message_data):
        await self.send(text_data=json.dumps(message_data))

    async def connect(self, event=None):
        self.rooms = ['worker']

        await self.channel_layer.group_add('worker', self.channel_name)
        await self.accept()

    async def deploy(self, message):
        await self.send_json(['deploy', message])

    async def receive(self, text_data):
        data = json.loads(text_data)
        pprint(data)
        if len(data) == 2:
            if data[0] == "RunnerStdout":
                await self.channel_layer.group_send('all',
                                                    dict(type="reply.message", text=data[1]['data']))
                print ('sent stdout')
            elif data[0] == "RunnerMessage":
                await self.channel_layer.group_send('all',
                                                    dict(type="runner.message",
                                                         data=data[1]['data']))
                print ('sent')
            else:
                print(data[0])
        else:
            print(str(len(data)))
