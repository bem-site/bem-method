all:: html

html: $(patsubst %.wiki,%.html,$(patsubst src%,bin%,$(wildcard src/*.wiki))) bin/all.html

.PRECIOUS: %.html
%.html: %.wiki
	node lib/wiki2html.js $(patsubst %.html,%.wiki,$@) $@

bin/all.wiki:
	touch $@
	find src -name '*.wiki' | sort | xargs -L1 tail --bytes=+4 > $@

%.wiki: bin/all.wiki
	cp $(patsubst bin%,src%,$@) $@

.PHONY: all
