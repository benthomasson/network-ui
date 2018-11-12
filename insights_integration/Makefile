

.PHONY: all models admin serializers views urls

all: models admin serializers views urls

models:
	jinja2 templates/models.pyt designs/models.yml > models.py
	autopep8 -i models.py --ignore-local-config --max-line-length 160

admin:
	jinja2 templates/admin.pyt designs/models.yml > admin.py
	autopep8 -i admin.py --ignore-local-config --max-line-length 160

serializers:
	jinja2 templates/serializers.pyt designs/models.yml > serializers.py
	autopep8 -i admin.py --ignore-local-config --max-line-length 160

views:
	jinja2 templates/views.pyt designs/models.yml > views.py
	autopep8 -i admin.py --ignore-local-config --max-line-length 160

urls:
	jinja2 templates/urls.pyt designs/models.yml > urls.py
	autopep8 -i admin.py --ignore-local-config --max-line-length 160
