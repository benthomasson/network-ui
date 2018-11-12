from .hello import HelloConsumer
from .websocket import NetworkUIConsumer
from .worker import AnsibleWorkerConsumer

__all__ = [x.__name__ for x in [HelloConsumer, NetworkUIConsumer, AnsibleWorkerConsumer]]
