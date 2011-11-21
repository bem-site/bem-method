all:: bem-bl
all:: html

html:: $(patsubst %.wiki,%.html,$(patsubst src%,html%,$(wildcard src/*.wiki)))
html:: $(patsubst %.wiki,%.html,$(wildcard pages/*/*.wiki))
html:: html/all.ru.html html/all.en.html

.PRECIOUS: %.html
%.html: %.wiki
	node lib/wiki2html.js $(patsubst %.html,%.wiki,$@) $@

html/all.%.wiki:
	touch $@
	find src -name '*.$(*F).wiki' | sort | xargs -L1 awk '{if(NR==1)sub(/^\xef\xbb\xbf/,"");print}' > $@

%.wiki: html/all.en.wiki html/all.ru.wiki
	cp $(patsubst html%,src%,$@) $@

DO_GIT=@echo -- git $1 $2; \
	if [ -d $2 ]; \
		then \
			cd $2 && git pull origin master; \
		else \
			git clone $1 $2; \
	fi

bem-bl:
	$(call DO_GIT,git://github.com/bem/bem-bl.git,$@)

.PHONY: all
