from django.core.management.base import BaseCommand

import json
from pprint import pprint

from network_ui_dev.models import EventTrace, FSMTrace, TopologySnapshot


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('topology_id', type=int)
        parser.add_argument('trace_id', type=int)
        parser.add_argument('client_id', type=int)

    def handle(self, *args, **options):
        topology_id = options['topology_id']
        trace_id = options['trace_id']
        client_id = options['client_id']

        data = dict()
        data['event_trace'] = [json.loads(x) for x in EventTrace
                               .objects.filter(trace_session_id=trace_id, client_id=client_id)
                               .order_by('message_id')
                               .values_list('event_data', flat=True)]
        data['fsm_trace'] = list(FSMTrace
                                 .objects
                                 .filter(trace_session_id=trace_id, client_id=client_id)
                                 .order_by('order')
                                 .values())
        data['snapshots'] = [json.loads(x) for x in TopologySnapshot
                             .objects.filter(trace_session_id=trace_id, client_id=client_id)
                             .order_by('order')
                             .values_list('snapshot_data', flat=True)]

        print(json.dumps(data, sort_keys=True, indent=4))