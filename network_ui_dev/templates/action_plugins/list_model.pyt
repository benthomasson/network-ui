{%for model in models-%}
{%-if model.api-%}
#---- list_{{model.name.lower()}}

from ansible.plugins.action import ActionBase

import requests


class ActionModule(ActionBase):

    BYPASS_HOST_LOOP = True

    def run(self, tmp=None, task_vars=None):
        if task_vars is None:
            task_vars = dict()
        result = super(ActionModule, self).run(tmp, task_vars)

        server = self._task.args.get('server',
                                     "{0}:{1}".format(self._play_context.remote_addr,
                                                              self._play_context.port))
        user = self._task.args.get('user', self._play_context.remote_user)
        password = self._task.args.get('password', self._play_context.password)

        var = self._task.args.get('var', None)

{%for field in model.fields%}
        {{field.name}} = self._task.args.get('{{field.name}}', None){%endfor%}

        filter_data=dict({%for field in model.fields%}{{field.name}}={{field.name}},
                         {%endfor%})
        filter_data={x:y for x,y in filter_data.items() if y is not None}

        url = '{{model.v2_end_point}}'
        results = []
        while url is not None:
            url = server + url
            data = requests.get(url, verify=False, auth=(user, password), params=filter_data).json()
            results.extend(data.get('results', []))
            url = data.get('next', None)
        result['ansible_facts'] = {var: results}
        return result

{%endif%}
{%endfor%}
