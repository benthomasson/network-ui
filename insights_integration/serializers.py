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


class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ('inventory','name',)


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('name',)


class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fields = ('name','value',)


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ('name',)


class PlaybookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playbook
        fields = ('plan','name','contents',)


class PlaybookRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaybookRun
        fields = ('start_time','end_time','create_time','inventory','key','playbook','host_pattern','status',)


class TaskResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskResult
        fields = ('name','host','status',)


class TaskResultPlaybookRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskResultPlaybookRun
        fields = ('task_result','playbook_run',)


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ()


class WorkerQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerQueue
        fields = ('worker','playbook_run',)



