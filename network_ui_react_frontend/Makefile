
.PHONY: all main


all: main deploy


main:
	npm run build

deploy:
	rsync -av build/static/ ../network_ui/static/
	rsync -v build/* ../network_ui/static/
	rsync -v build/index.html ../network_ui/templates/network_ui/
