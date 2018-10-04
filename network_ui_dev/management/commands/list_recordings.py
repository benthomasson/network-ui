from django.core.management.base import BaseCommand

from network_ui_dev.models import TopologySnapshot, Client, EventTrace, FSMTrace

from pprint import pprint

class Command(BaseCommand):

    def handle(self, *args, **options):

        for data in (Client.objects
                           .exclude(topologysnapshot__trace_session_id__isnull=True)
                           .exclude(topologysnapshot__topology_id__isnull=True)
                           .all()
                           .order_by('client_id')
                           .values_list('client_id', 'topologysnapshot__trace_session_id', 'topologysnapshot__topology_id')
                           .distinct()):
            pprint(data)
