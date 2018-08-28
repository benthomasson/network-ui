# Copyright (c) 2017 Red Hat, Inc
from django.urls import path

from . import views

app_name = 'network_ui_dev'
urlpatterns = [
    path(r'tests', views.tests),
    path(r'upload_test', views.upload_test),
    path(r'download_coverage/<int:pk>', views.download_coverage),
    path(r'download_trace', views.download_trace),
    path(r'download_recording', views.download_recording),
    path(r'topology.json', views.json_topology_data),
    path(r'topology.yaml', views.yaml_topology_data),
    path(r'version', views.version),
]
