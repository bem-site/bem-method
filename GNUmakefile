all:: bem-bl
#all:: html
all:: pages

pages: $(patsubst %.wiki,%.html, $(wildcard pages/*/*.wiki))

pages/%.html: pages/%.bemjson.js pages/%.bemhtml.js pages/%.css pages/%.ie.css pages/%.js
	BEMTECH_locales_techs="`pwd`/bem-bl/blocks-common/i-bem/bem/techs/html.js" \
	BEMTECH_locales_locales="`echo pages/$(@F) | perl -pi -e 's#^.*(ru|en).*$#\1#g'`" \
	bem create block -T lib/bem/techs/locales.js \
	-l pages \
	$(*D)

%.bemhtml.js: %.deps.js
	mkdir -p $(*D)
	touch $@
	bem build -l bem-bl/blocks-common \
		-l bem-bl/blocks-desktop \
		-l blocks \
		-d $*.deps.js \
		-t bem-bl/blocks-common/i-bem/bem/techs/bemhtml.js \
		-n $(*F) \
		-o $(@D)

%.deps.js: %.bemdecl.js
	touch $@
	bem build \
		-l bem-bl/blocks-common \
		-l bem-bl/blocks-desktop \
		-l blocks \
		-d $*.bemdecl.js \
		-t deps.js \
		-n $(*F) \
		-o $(@D)

%.bemdecl.js: %.bemjson.js
	node lib/bemjson2bemdecl.js $*.bemjson.js

%.bemjson.js:
	echo $(@D)
	node lib/wiki2bemjson.js $*.wiki $*.bemjson.js

.PRECIOUS: %.css
%.css: %.deps.js
	touch $@
	bem build \
		-l bem-bl/blocks-common \
		-l bem-bl/blocks-desktop \
		-l blocks \
		-d $*.deps.js \
		-t css \
		-n $(*F) \
		-o $(@D)
	borschik -t css -i $@ -o $(@D)/_$(@F)

.PRECIOUS: %.ie.css
%.ie.css: %.css %.deps.js
	touch $@
	bem build \
		-l bem-bl/blocks-common \
		-l bem-bl/blocks-desktop \
		-l blocks \
		-d $*.deps.js \
		-t ie.css \
		-n $(*F) \
		-o $(@D)
	borschik -t css -i $@ -o $(@D)/_$(@F)

.PRECIOUS: %.js
%.js: %.deps.js
	touch $@
	bem build \
		-l bem-bl/blocks-common \
		-l bem-bl/blocks-desktop \
		-l blocks \
		-d $*.deps.js \
		-t css \
		-n $(*F) \
		-o $(@D)

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
