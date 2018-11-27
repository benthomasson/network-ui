from django.db import models


class Host(models.Model):

    host_id = models.AutoField(primary_key=True,)
    inventory = models.ForeignKey('Inventory', on_delete=models.CASCADE,)
    name = models.CharField(max_length=2000, blank=True)
    host_vars = models.TextField()


class Inventory(models.Model):

    inventory_id = models.AutoField(primary_key=True,)
    name = models.CharField(max_length=2000, blank=True)


class Key(models.Model):

    key_id = models.AutoField(primary_key=True,)
    name = models.CharField(max_length=2000, blank=True)
    value = models.TextField()


class Plan(models.Model):

    plan_id = models.AutoField(primary_key=True,)
    name = models.CharField(max_length=2000, blank=True)
    maintenance_id = models.IntegerField()


class Playbook(models.Model):

    playbook_id = models.AutoField(primary_key=True,)
    plan = models.ForeignKey('Plan', on_delete=models.CASCADE,)
    name = models.CharField(max_length=2000, blank=True)
    contents = models.TextField()


class PlaybookRun(models.Model):

    playbook_run_id = models.AutoField(primary_key=True,)
    inventory = models.ForeignKey('Inventory', on_delete=models.CASCADE,)
    key = models.ForeignKey('Key', on_delete=models.CASCADE,)
    playbook = models.ForeignKey('Playbook', on_delete=models.CASCADE,)
    host_pattern = models.CharField(max_length=2000, blank=True)
    status = models.CharField(max_length=200, blank=True)


class TaskResult(models.Model):

    task_result_id = models.AutoField(primary_key=True,)
    name = models.CharField(max_length=2000, blank=True)
    host = models.ForeignKey('Host', on_delete=models.CASCADE,)
    status = models.CharField(max_length=200, blank=True)


class TaskResultPlaybookRun(models.Model):

    task_result_playbook_run_id = models.AutoField(primary_key=True,)
    task_result = models.ForeignKey('TaskResult', on_delete=models.CASCADE,)
    playbook_run = models.ForeignKey('PlaybookRun', on_delete=models.CASCADE,)


class Worker(models.Model):

    worker_id = models.AutoField(primary_key=True,)


class WorkerQueue(models.Model):

    worker_queue_id = models.AutoField(primary_key=True,)
    worker = models.ForeignKey('Worker', on_delete=models.CASCADE,)
    playbook_run = models.ForeignKey('PlaybookRun', on_delete=models.CASCADE,)


class PlaybookRunLog(models.Model):

    playbook_run_log_id = models.AutoField(primary_key=True,)
    playbook_run = models.ForeignKey('PlaybookRun', on_delete=models.CASCADE,)
    order = models.IntegerField(default=0,)
    value = models.TextField()
