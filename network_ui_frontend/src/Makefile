

.PHONY: check extract

FSMS = animation time test mode buttons button toolbox site rack group stream link details.panel move device.detail view keybindings hotkeys null


extract:
	mkdir -p extracted
	for fsm in $(FSMS); do \
		./extract.js ./$${fsm}.fsm.js > extracted/$${fsm}.yml; \
	done


check: extract
	for fsm in $(FSMS); do \
		./tools/fsm-diff ../designs/$$fsm.yml extracted/$$fsm.yml; \
		./tools/copy-layout.py ../designs/$$fsm.yml extracted/$$fsm.yml; \
	done
