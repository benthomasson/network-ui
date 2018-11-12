from django.conf.urls import url, include
from rest_framework import routers
from insights_integration import views

router = routers.DefaultRouter()
{%for model in models%}
router.register(r'{{model.name.lower()}}', views.{{model.name}}ViewSet)
{%-endfor%}


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
