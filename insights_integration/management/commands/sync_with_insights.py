from django.core.management.base import BaseCommand
import requests
from requests.auth import HTTPBasicAuth
import getpass
import sys
import json
import os
from pprint import pprint

from django.conf import settings

from  insights_integration.models import Plan, Playbook


def _get_insights(url, username, password):
    session = requests.Session()
    session.auth = requests.auth.HTTPBasicAuth(username, password)
    headers = { 
        'Content-Type': 'application/json',
        'User-Agent': '{} {} ({})'.format(
            'AWX',
            '0.1',
            'open'
        )   
    }   
    return session.get(url, headers=headers, timeout=120)


class Command(BaseCommand):
    help = 'Syncs data from insights'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)
        parser.add_argument('plan_id', type=int)


    def handle(self, *args, **options):
        username = options['username']
        password = getpass.getpass(stream=sys.stderr)
        plan_id = options['plan_id']
        insights_url = 'https://access.redhat.com'

        res = _get_insights('{}/r/insights/v3/maintenance/{}/'.format(insights_url, plan_id),
                            username,
                            password)

        data = json.loads(res.content.decode())
        pprint (data)
        print (data['name'])
        print (data['maintenance_id'])
        plan, _ = Plan.objects.get_or_create(name=data['name'],
                                             maintenance_id=data['maintenance_id'])
        print (plan)


        res = _get_insights('{}/r/insights/v3/maintenance/{}/playbook'.format(insights_url, plan_id),
                            username,
                            password)
        cd = (res.headers['Content-disposition'])
        name = (os.path.splitext(cd.split('=')[1].strip('"'))[0])

        playbook, _ = Playbook.objects.get_or_create(plan=plan, defaults=dict(name=name, contents=""))
        playbook.name = name
        playbook.contents = res.content.decode()
        playbook.save()
        print (playbook)


