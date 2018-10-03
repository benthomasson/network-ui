# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid

def add_uuids(apps, schema_editor):

    Topology = apps.get_model('network_ui_dev', 'Topology')
    for topology in Topology.objects.filter(uuid=''):
        topology.uuid = uuid.uuid4()
        topology.save()


class Migration(migrations.Migration):

    dependencies = [
        ('network_ui_dev', '0003_topology_uuid'),
    ]

    operations = [
            migrations.RunPython(add_uuids),
    ]
