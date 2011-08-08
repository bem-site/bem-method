all:: html

html: $(patsubst %.wiki,%.html,$(patsubst src%,bin%,$(wildcard src/*.wiki))) bin/all.ru.html bin/all.en.html

.PRECIOUS: %.html
%.html: %.wiki
	node lib/wiki2html.js $(patsubst %.html,%.wiki,$@) $@

bin/all.%.wiki:
	touch $@
	find src -name '*.$(*F).wiki' | sort | xargs -L1 tail --bytes=+4 > $@

%.wiki: bin/all.en.wiki bin/all.ru.wiki
	cp $(patsubst bin%,src%,$@) $@

.PHONY: all
