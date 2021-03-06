from rest_framework import routers
from network_ui_dev import v1_api_views


router = routers.DefaultRouter()

{%for model in models%}{%if model.api%}
router.register(r'{{model.name.lower()}}', v1_api_views.{{model.name}}ViewSet){%endif%}{%endfor%}
