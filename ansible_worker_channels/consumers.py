from channels.consumer import SyncConsumer
from asgiref.sync import async_to_sync


import ansible_runner
import tempfile
import os
import json
import yaml
import logging
import traceback
import itertools
from pprint import pprint

WORKSPACE = "/tmp/workspace"

logger = logging.getLogger("ansible_worker_channels.consumers")


def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)


class AnsibleConsumer(SyncConsumer):

    def build_project_directory(self):
        ensure_directory(WORKSPACE)
        self.temp_dir = tempfile.mkdtemp(prefix="ansible_worker", dir=WORKSPACE)
        logger.info("temp_dir %s", self.temp_dir)
        ensure_directory(os.path.join(self.temp_dir, 'env'))
        ensure_directory(os.path.join(self.temp_dir, 'project'))
        ensure_directory(os.path.join(self.temp_dir, 'project', 'roles'))
        with open(os.path.join(self.temp_dir, 'env', 'settings'), 'w') as f:
            f.write(json.dumps(dict(idle_timeout=0,
                                    job_timeout=0)))

    def add_inventory(self, inventory):
        print("add_inventory")
        with open(os.path.join(self.temp_dir, 'inventory'), 'w') as f:
            f.write("\n".join(inventory.splitlines()[1:]))

    def add_keys(self, key):
        print("add_keys")
        with open(os.path.join(self.temp_dir, 'env', 'ssh_key'), 'w') as f:
            f.write(key)

    def add_playbook(self, playbook):
        print("add_playbook")
        self.playbook_file = (os.path.join(self.temp_dir, 'project', 'playbook.yml'))
        with open(self.playbook_file, 'w') as f:
            f.write(yaml.safe_dump(playbook, default_flow_style=False))

    def run_playbook(self):
        print("run_playbook")
        self.runner_thread, self.runner = ansible_runner.run_async(private_data_dir=self.temp_dir,
                                                                   playbook="playbook.yml",
                                                                   quiet=True,
                                                                   debug=True,
                                                                   ignore_logging=True,
                                                                   cancel_callback=self.cancel_callback,
                                                                   finished_callback=self.finished_callback,
                                                                   event_handler=self.runner_process_message)

    def runner_process_message(self, data):
        pprint(data)
        async_to_sync(self.channel_layer.group_send)('all',
                                                     dict(type="reply.message",
                                                          text=data.get('stdout', '')))
        async_to_sync(self.channel_layer.group_send)('all',
                                                     dict(type="runner.message",
                                                          data=data))

    def cancel_callback(self):
        return False

    def finished_callback(self, runner):
        logger.info('called')
        pprint(runner)

    def top_level_tasks(self, playbook):
        tasks = playbook[0].get('tasks', [])
        task_keys = [t.keys() for t in tasks]
        return list(itertools.chain(*task_keys))

    def deploy(self, message):
        try:
            print("deploy: " + message['text'])
            inventory = message['inventory']
            playbook = message['playbook']
            key = message['key']
            playbook_name = playbook[0].get('name')
            top_level_tasks = self.top_level_tasks(playbook)
            async_to_sync(self.channel_layer.group_send)('all',
                                                         dict(type="playbook.message",
                                                              data=(dict(name=playbook_name, tasks=top_level_tasks))))
            self.build_project_directory()
            self.add_keys(key)
            self.add_inventory(inventory)
            self.add_playbook(playbook)
            self.run_playbook()
        except BaseException as e:
            print(str(e))
            print(traceback.format_exc())
            logger.error(str(e))
