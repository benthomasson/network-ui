from django.core.management.base import BaseCommand

import json
from pprint import pprint

from network_ui_dev.models import Replay
from django.core.exceptions import ObjectDoesNotExist


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)
        parser.add_argument('data_file', type=str)

    def handle(self, *args, **options):
        name = options['name']
        data_file = options['data_file']

        with open(data_file) as f:
            data = json.loads(f.read())

        try:
            test_case = Replay.objects.get(name=name)
            test_case.replay_data = json.dumps(data)
            test_case.save()
        except ObjectDoesNotExist:
            test_case = Replay(name=name, replay_data=json.dumps(data))
            test_case.save()

        print (test_case.pk)


