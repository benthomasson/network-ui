from django.contrib import admin

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


class HostAdmin(admin.ModelAdmin):
    fields = ('inventory', 'name', 'host_vars',)
    raw_id_fields = ('inventory',)


admin.site.register(Host, HostAdmin)


class InventoryAdmin(admin.ModelAdmin):
    fields = ('name',)
    raw_id_fields = ()


admin.site.register(Inventory, InventoryAdmin)


class KeyAdmin(admin.ModelAdmin):
    fields = ('name', 'value',)
    raw_id_fields = ()


admin.site.register(Key, KeyAdmin)


class PlanAdmin(admin.ModelAdmin):
    fields = ('name', 'maintenance_id',)
    raw_id_fields = ()


admin.site.register(Plan, PlanAdmin)


class PlaybookAdmin(admin.ModelAdmin):
    fields = ('plan', 'name', 'contents',)
    raw_id_fields = ('plan',)


admin.site.register(Playbook, PlaybookAdmin)


class PlaybookRunAdmin(admin.ModelAdmin):
    fields = ('inventory', 'key', 'playbook', 'host_pattern', 'status',)
    raw_id_fields = ('inventory', 'key', 'playbook',)


admin.site.register(PlaybookRun, PlaybookRunAdmin)


class TaskResultAdmin(admin.ModelAdmin):
    fields = ('name', 'host', 'status',)
    raw_id_fields = ('host',)


admin.site.register(TaskResult, TaskResultAdmin)


class TaskResultPlaybookRunAdmin(admin.ModelAdmin):
    fields = ('task_result', 'playbook_run',)
    raw_id_fields = ('task_result', 'playbook_run',)


admin.site.register(TaskResultPlaybookRun, TaskResultPlaybookRunAdmin)


class WorkerAdmin(admin.ModelAdmin):
    fields = ()
    raw_id_fields = ()


admin.site.register(Worker, WorkerAdmin)


class WorkerQueueAdmin(admin.ModelAdmin):
    fields = ('worker', 'playbook_run',)
    raw_id_fields = ('worker', 'playbook_run',)


admin.site.register(WorkerQueue, WorkerQueueAdmin)


class PlaybookRunLogAdmin(admin.ModelAdmin):
    fields = ('playbook_run', 'order', 'value',)
    raw_id_fields = ('playbook_run',)


admin.site.register(PlaybookRunLog, PlaybookRunLogAdmin)
