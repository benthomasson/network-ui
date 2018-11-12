
.PHONY: all main


all: main deploy


main:
	npm run build

deploy:
	rsync -av build/static/ ../insights_integration/static/
	rsync -v build/* ../insights_integration/static/
	rsync -v build/index.html ../insights_integration/templates/insights_integration/
