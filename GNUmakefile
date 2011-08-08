all:: html

html: $(patsubst %.wiki,%.html,$(patsubst src%,bin%,$(wildcard src/*.wiki))) bin/all.ru.html bin/all.en.html

.PRECIOUS: %.html
%.html: %.wiki
	node lib/wiki2html.js $(patsubst %.html,%.wiki,$@) $@

bin/all.%.wiki:
	touch $@
	find src -name '*.$(*F).wiki' | sort | xargs -L1 awk '{if(NR==1)sub(/^\xef\xbb\xbf/,"");print}' > $@

%.wiki: bin/all.en.wiki bin/all.ru.wiki
	cp $(patsubst bin%,src%,$@) $@

.PHONY: all
