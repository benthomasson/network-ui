from django.conf.urls import url, include
from rest_framework import routers
from insights_integration import views

router = routers.DefaultRouter()

router.register(r'host', views.HostViewSet)
router.register(r'inventory', views.InventoryViewSet)
router.register(r'key', views.KeyViewSet)
router.register(r'plan', views.PlanViewSet)
router.register(r'playbook', views.PlaybookViewSet)
router.register(r'playbookrun', views.PlaybookRunViewSet)
router.register(r'taskresult', views.TaskResultViewSet)
router.register(r'taskresultplaybookrun', views.TaskResultPlaybookRunViewSet)
router.register(r'worker', views.WorkerViewSet)
router.register(r'workerqueue', views.WorkerQueueViewSet)
router.register(r'playbookrunlog', views.PlaybookRunLogViewSet)


app_name = "insights_integration"
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
