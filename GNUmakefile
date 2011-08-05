all:: html

html: $(patsubst %.wiki,%.html,$(patsubst src%,bin%,$(wildcard src/*.wiki))) bin/all.html

.PRECIOUS: %.html
%.html: %.wiki
	shmakowiki2html -i $(patsubst %.html,%.wiki,$@) -o $@

bin/all.wiki:
	touch $@
	find src -name '*.wiki' | sort | xargs -L1 cat > $@

%.wiki: bin/all.wiki
	cp $(patsubst bin%,src%,$@) $@

.PHONY: all
