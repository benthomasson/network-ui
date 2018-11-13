from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

{%for model in models%}
from {{app}}.models import {{model.name}}
{%-endfor%}
{%for model in models%}
from {{app}}.serializers import {{model.name}}Serializer
{%-endfor%}

{%for model in models%}
class {{model.name}}ViewSet(viewsets.ModelViewSet):
    queryset = {{model.name}}.objects.all()
    serializer_class = {{model.name}}Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ({%for field in model.fields%}'{{field.name}}',{%endfor%})

{%endfor%}

