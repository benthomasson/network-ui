from channels.consumer import SyncConsumer


# import ansible_runner
import tempfile
import os
import json
import yaml
import logging


logger = logging.getLogger("network_ui_dev.consumers.ansible")


class AnsibleConsumer(SyncConsumer):

    def build_project_directory(self):
        self.temp_dir = tempfile.mkdtemp(prefix="network_ui_ansible", dir="/tmp/workspace")
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

    def deploy(self, message):
        print("deploy: " + message['text'])
        self.build_project_directory()
        self.default_inventory = "[all]\nlocalhost ansible_connection=local\n"
        self.build_inventory(self.default_inventory)
        self.build_playbook([dict(hosts='localhost',
                                 name='default',
                                 gather_facts=False,
                                 tasks=[dict(debug=None)])])
