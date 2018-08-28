from channels.consumer import AsyncConsumer


class HelloConsumer(AsyncConsumer):

    async def say_hello(self, message):
        print("hello: " + message['text'])
        await self.channel_layer.group_send('all', dict(type="reply.message", text="ahoy"))
