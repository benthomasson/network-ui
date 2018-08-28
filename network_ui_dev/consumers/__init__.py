from .hello import HelloConsumer
from .websocket import NetworkUIConsumer
from .ansible import AnsibleConsumer

__all__ = [x.__name__ for x in [HelloConsumer, NetworkUIConsumer, AnsibleConsumer]]
