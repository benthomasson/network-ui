from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


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
from insights_integration.models import PlaybookRunLog

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
from insights_integration.serializers import PlaybookRunLogSerializer


class HostViewSet(viewsets.ModelViewSet):
    queryset = Host.objects.all()
    serializer_class = HostSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('host_id','inventory','name','host_vars',)


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('inventory_id','name',)


class KeyViewSet(viewsets.ModelViewSet):
    queryset = Key.objects.all()
    serializer_class = KeySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('key_id','name','value',)


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('plan_id','name','maintenance_id',)


class PlaybookViewSet(viewsets.ModelViewSet):
    queryset = Playbook.objects.all()
    serializer_class = PlaybookSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('playbook_id','plan','name','contents',)


class PlaybookRunViewSet(viewsets.ModelViewSet):
    queryset = PlaybookRun.objects.all()
    serializer_class = PlaybookRunSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('playbook_run_id','inventory','key','playbook','host_pattern','status',)


class TaskResultViewSet(viewsets.ModelViewSet):
    queryset = TaskResult.objects.all()
    serializer_class = TaskResultSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('task_result_id','name','host','status',)


class TaskResultPlaybookRunViewSet(viewsets.ModelViewSet):
    queryset = TaskResultPlaybookRun.objects.all()
    serializer_class = TaskResultPlaybookRunSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('task_result_playbook_run_id','task_result','playbook_run',)


class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('worker_id',)


class WorkerQueueViewSet(viewsets.ModelViewSet):
    queryset = WorkerQueue.objects.all()
    serializer_class = WorkerQueueSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('worker_queue_id','worker','playbook_run',)


class PlaybookRunLogViewSet(viewsets.ModelViewSet):
    queryset = PlaybookRunLog.objects.all()
    serializer_class = PlaybookRunLogSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('playbook_run_log_id','playbook_run','order','value',)



