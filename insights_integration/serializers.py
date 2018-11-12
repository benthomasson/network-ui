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


class HostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Host
        fields = ('inventory','name',)


class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inventory
        fields = ('name',)


class KeySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Key
        fields = ('name','value',)


class PlanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Plan
        fields = ('name',)


class PlaybookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Playbook
        fields = ('plan','name','contents',)


class PlaybookRunSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PlaybookRun
        fields = ('start_time','end_time','create_time','inventory','key','playbook','host_pattern','status',)


class TaskResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskResult
        fields = ('name','host','status',)


class TaskResultPlaybookRunSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskResultPlaybookRun
        fields = ('task_result','playbook_run',)


class WorkerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Worker
        fields = ()


class WorkerQueueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkerQueue
        fields = ('worker','playbook_run',)



