from rest_framework import viewsets

from insights_integration.models import Host
from insights_integration.models import Inventory
from insights_integration.models import Key
from insights_integration.models import Plan
from insights_integration.models import Playbook
from insights_integration.models import PlaybookRun
from insights_integration.models import TaskResult
from insights_integration.models import TaskResultPlaybookRun
from insights_integration.models import Worker
from insights_integration.models import WorkerQueue

from insights_integration.serializers import HostSerializer
from insights_integration.serializers import InventorySerializer
from insights_integration.serializers import KeySerializer
from insights_integration.serializers import PlanSerializer
from insights_integration.serializers import PlaybookSerializer
from insights_integration.serializers import PlaybookRunSerializer
from insights_integration.serializers import TaskResultSerializer
from insights_integration.serializers import TaskResultPlaybookRunSerializer
from insights_integration.serializers import WorkerSerializer
from insights_integration.serializers import WorkerQueueSerializer


class HostViewSet(viewsets.ModelViewSet):
    queryset = Host.objects.all()
    serializer_class = HostSerializer


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer


class KeyViewSet(viewsets.ModelViewSet):
    queryset = Key.objects.all()
    serializer_class = KeySerializer


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlaybookViewSet(viewsets.ModelViewSet):
    queryset = Playbook.objects.all()
    serializer_class = PlaybookSerializer


class PlaybookRunViewSet(viewsets.ModelViewSet):
    queryset = PlaybookRun.objects.all()
    serializer_class = PlaybookRunSerializer


class TaskResultViewSet(viewsets.ModelViewSet):
    queryset = TaskResult.objects.all()
    serializer_class = TaskResultSerializer


class TaskResultPlaybookRunViewSet(viewsets.ModelViewSet):
    queryset = TaskResultPlaybookRun.objects.all()
    serializer_class = TaskResultPlaybookRunSerializer


class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class WorkerQueueViewSet(viewsets.ModelViewSet):
    queryset = WorkerQueue.objects.all()
    serializer_class = WorkerQueueSerializer



