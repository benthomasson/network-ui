from django.core.management.base import BaseCommand
from django.db.models import Count

from network_ui_dev.models import TopologySnapshot, Client, EventTrace, FSMTrace

from pprint import pprint

class Command(BaseCommand):

    def handle(self, *args, **options):

        for data in (Client.objects
                           .annotate(num_events=Count('eventtrace'))
                           .exclude(topologysnapshot__trace_session_id__isnull=True)
                           .exclude(topologysnapshot__topology_id__isnull=True)
                           .all()
                           .order_by('client_id')
                           .values_list('topologysnapshot__topology_id', 'topologysnapshot__trace_session_id', 'client_id', 'num_events')
                           .distinct()):
            pprint(data)
