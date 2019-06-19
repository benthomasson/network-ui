

.PHONY: all ui local

all: ui local


ui:
	cd network_ui_react_frontend && make install all

local:
	docker-compose -f local.yml up --build

