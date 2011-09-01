all:: html

html: $(patsubst %.wiki,%.html,$(patsubst src%,bin%,$(wildcard src/*.wiki))) html/all.ru.html html/all.en.html

.PRECIOUS: %.html
%.html: %.wiki
	node lib/wiki2html.js $(patsubst %.html,%.wiki,$@) $@

html/all.%.wiki:
	touch $@
	find src -name '*.$(*F).wiki' | sort | xargs -L1 awk '{if(NR==1)sub(/^\xef\xbb\xbf/,"");print}' > $@

%.wiki: html/all.en.wiki html/all.ru.wiki
	cp $(patsubst bin%,src%,$@) $@

.PHONY: all
