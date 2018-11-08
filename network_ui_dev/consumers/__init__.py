from .hello import HelloConsumer
from .websocket import NetworkUIConsumer

__all__ = [x.__name__ for x in [HelloConsumer, NetworkUIConsumer]]
