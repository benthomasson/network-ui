from channels.consumer import SyncConsumer
from asgiref.sync import async_to_sync


import ansible_runner
import tempfile
import os
import json
import yaml
import logging
from pprint import pprint

WORKSPACE = "/tmp/workspace"

logger = logging.getLogger("network_ui_dev.consumers.ansible")


def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)


class AnsibleConsumer(SyncConsumer):

    def build_project_directory(self):
        ensure_directory(WORKSPACE)
        self.temp_dir = tempfile.mkdtemp(prefix="network_ui_ansible", dir=WORKSPACE)
        logger.info("temp_dir %s", self.temp_dir)
        os.mkdir(os.path.join(self.temp_dir, 'env'))
        os.mkdir(os.path.join(self.temp_dir, 'project'))
        os.mkdir(os.path.join(self.temp_dir, 'project', 'roles'))
        with open(os.path.join(self.temp_dir, 'env', 'settings'), 'w') as f:
            f.write(json.dumps(dict(idle_timeout=0,
                                    job_timeout=0)))

    def build_inventory(self, inventory):
        with open(os.path.join(self.temp_dir, 'inventory'), 'w') as f:
            f.write("\n".join(inventory.splitlines()[1:]))

    def build_playbook(self, playbook):
        self.playbook_file = (os.path.join(self.temp_dir, 'project', 'playbook.yml'))
        with open(self.playbook_file, 'w') as f:
            f.write(yaml.safe_dump(playbook, default_flow_style=False))

    def run_playbook(self):
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

    def deploy(self, message):
        try:
            print("deploy: " + message['text'])
            async_to_sync(self.channel_layer.group_send)('all',
                                                         dict(type="playbook.message",
                                                              data=(dict(name="playbook.yml", tasks=['debug', 'pause']))))
            self.build_project_directory()
            self.default_inventory = "[all]\nlocalhost ansible_connection=local\n"
            self.build_inventory(self.default_inventory)
            self.build_playbook([dict(hosts='localhost',
                                      name='default',
                                      gather_facts=False,
                                      tasks=[dict(debug=None), dict(pause=dict(seconds=10))])])
            self.run_playbook()
        except BaseException as e:
            logger.error(str(e))
