import json
from channels.generic.websocket import AsyncWebsocketConsumer
#from .views import publish_mqtt_message
# from .models import Book


class SimpleMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            "simple_message_group",
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "simple_message_group",
            self.channel_name
        )

    # This method name should match the type you specified in the message ('send_simple_message')
    async def send_simple_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

# class BookConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()

#     async def disconnect(self, close_code):
#         pass

#     async def send_book_data(self):
#         # Fetch your book data
#         books = Book.objects.all()
#         data = [{"status": book.status} for book in books]

#         # Send data to WebSocket
#         await self.send(text_data=json.dumps({
#             'type': 'books.data',
#             'data': data,
#         }))
        