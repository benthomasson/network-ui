from rest_framework import serializers

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


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ('host_id','inventory','name','host_vars',)


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('inventory_id','name',)


class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fields = ('key_id','name','value',)


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ('plan_id','name','maintenance_id',)


class PlaybookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playbook
        fields = ('playbook_id','plan','name','contents',)


class PlaybookRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaybookRun
        fields = ('playbook_run_id','inventory','key','playbook','host_pattern','status',)


class TaskResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskResult
        fields = ('task_result_id','name','host','status',)


class TaskResultPlaybookRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskResultPlaybookRun
        fields = ('task_result_playbook_run_id','task_result','playbook_run',)


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('worker_id',)


class WorkerQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerQueue
        fields = ('worker_queue_id','worker','playbook_run',)


class PlaybookRunLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaybookRunLog
        fields = ('playbook_run_log_id','playbook_run','order','value',)



