.PHONY: all main lint lessc install simple-server deploy

all: install lessc lint main

clean:
	rm -rf src-instrumented
	rm -f js/bundle.js
	rm -f js/vendor.bundle.js
	rm -f css/style.css

install:
	npm i

main: build install

build:
	webpack

lint:
	jshint --verbose src/*js

lessc:
	lessc src/style.less css/style.css

istanbul:
	istanbul instrument --output src-instrumented src
	webpack src-instrumented/main.js  js/bundle-instrumented.js
	cp index.html index-instrumented.html
	sed -i "s/bundle.js/bundle-instrumented.js/g" index-instrumented.html
	cp vendor/*.js js/


simple-server: lint build lessc
	python -m SimpleHTTPServer 8080


deploy: main
	rsync -av src/ ../../../../awx/ui/client/src/network_ui/
