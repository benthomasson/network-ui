from django.conf.urls import url

from . import consumers
from ansible_worker_channels import consumers as worker_consumers

websocket_urlpatterns = [
    url(r'^ws/network_ui$', consumers.NetworkUIConsumer),
]

channel_patterns = {
    "hello": consumers.HelloConsumer,
    "ansible": worker_consumers.AnsibleConsumer,
}
