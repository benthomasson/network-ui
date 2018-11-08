from django.conf.urls import url

from . import consumers

channel_patterns = {
    "hello": consumers.HelloConsumer,
    "ansible": consumers.AnsibleConsumer,
}
