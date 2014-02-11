<!--
{
    "title": "Full stack quick start",
    "createDate": "12-02-2013",
    "editDate": "30-04-2013",
    "summary": "This article shows you how to develop an online shop web page using BEM principles in CSS, JavaScript and BEMHTML templates.",
    "thumbnail": "",
    "authors": ["stepanova-varvara"],
    "tags": ["BEM", "bem-tools","tools","i-bem"],
    "translators": [],
    "type": "articles"
}
#META_LABEL-->

# Start developing BEM with project-stub

This article shows you how to develop an [online shop
web page](http://varya.me/online-shop-dummy/desktop.bundles/index/index.html)
using BEM principles in CSS, JavaScript and BEMHTML templates. While developing,
we will use the command-line application: `bem tools` and its subcommand: `bem server`.

![Online shop web page](http://img-fotki.yandex.ru/get/6505/14441195.26/0_6f0b2_557ef428_L.jpg "Online shop web page")

## Tools
You need a command-line toolkit [bem tools](https://github.com/bem/bem-tools) to
begin with the project.
Follow the installation steps in the corresponding repository.<br/>
This tutorial is best to follow with `0.5.33` version of `bem tools`.

## Start with a project repository
The easiest way to start is to copy a similar project repository with suitable
structure.<br/>
We intend to use the full power of BEM technologies, so this
[project-stub](https://github.com/bem/project-stub) will suit you just
fine. The article is actual for the `start-project-stub` branch.

```js
    $ git clone git://github.com/bem/project-stub.git -b start-project-stub my-pretty-project
    $ cd my-pretty-project/
    $ rm -rf .git
    $ git init
```

Build the project by running a `make` command:

```js
    $ make
```

The first launch may take some time as required npm packadges are being
installed in background.

For development you can run

```js
    $ make server
```

Upon completion, you'll see the following message:

   info: Server is listening on port 8080. Point your browser to http://localhost:8080/

This means `bem server` is up and running; from this point on, your project is
automatically rebuilt each time you change something.

## Changing pages
You have just one page in your project to begin with:
[index.html](http://localhost:8080/desktop.bundles/index/index.html). Try and
open it in your browser.<br/>
When opening the page for the first time, be prepared to wait a few seconds
while `bem server` is loading all the libraries used for building the page.

This project's structure presumes that blocks are stored under the
`desktop.blocks` folder and pages under `desktop.bundles` folder.<br/>
In fact, `desktop.bundles` may contain bundles consisting of blocks most
commonly used on most of the pages, i.e. `common` block bundle, or all the blocks
from all the pages, i.e. `all` block bundle. Finally, the simplest case:
you can have a set of blocks for each page; it's how we will proceed.

You can modify the page by changing the `desktop.bundles/index/index.bemjson.js`
file.

### Defining a block in BEMJSON
First, let's add a `head` block to the page.

```js
    { block: 'head' }
```

From this point on, find code snapshots on Gist: https://gist.github.com/4175550

Refresh the page to see the corresponding `<div>`.

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="head"></div>
        </body>
    </html>
```

On the next step, we add a search form, a logo, and describe layout inside the
header.

Put a `layout` block along with its 2 elements (`left` and `right`) inside `head`.

```js
    content: [
        {
            block: 'head',
            content: {
                block: 'layout',
                content: [
                    {
                        elem: 'left',
                        content: 'left here'
                    },
                    {
                        elem: 'right',
                        content: 'right here'
                    }
                ]
            }
        }
    ]
```

https://gist.github.com/4175573

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="head">
                <div class="layout">
                    <div class="layout__left">left here</div>
                    <div class="layout__right">right here</div>
                </div>
            </div>
        </body>
    </html>
```

This markup requires CSS rules to be added.
Or, rewording the same with BEM terms, you have to implement a `layout` block in CSS.

## Creating a new block
Use `bem create` to get a new block file for the technology
you are going to work with.

```js
    $ bem create -l desktop.blocks/ -T css -b layout
```

Running this command creates `desktop.blocks/layout/layout.css`, and inside
you will find a CSS selector that matches the `layout` block. It's where you step in and
fill up the selector with CSS properties.<br/>
Or just copy and paste from Gist: https://gist.github.com/4175598

## Using a block library
You don't need to implement web search form and logo blocks yourself; they are
provided by the [bem-bl block library](https://gist.github.com/4175598). So, you can
just declare them when defining your page. This means pasting a BEMJSON block
definition into the `desktop.bundles/index/index.bemjson.js` page file.

We will use
[b-searh](http://bem.github.com/bem-bl/sets/common-desktop/b-search/b-search.en.html)
and
[b-logo](http://bem.github.com/bem-bl/sets/common-desktop/b-logo/b-logo.en.html)
blocks.<br/>
https://gist.github.com/4175640

You can use our [cute BEM
image](http://varya.me/online-shop-dummy/desktop.blocks/b-logo/b-logo.png)
for the logo, or pick any other image you like :-)

![Using the block library](http://img-fotki.yandex.ru/get/4119/14441195.26/0_6f0b9_2d1d77a3_XL.jpg "Using the block library")

### Redefining library blocks
#### Redefining in CSS
The `b-logo` block provides just a piece of markup. It is the developer's responsibility
to create the necessary CSS for the block because every new design usually
needs unique styles.

We will keep CSS rules for `b-logo` in its CSS file, which we need to create on
the project block level:

```js
    $ bem create -l desktop.blocks/ -T css -b b-logo
```

Then, save some time and copy CSS from here: https://gist.github.com/4175675

The same can be done for a `b-search` block:

```js
    $ bem create -l desktop.blocks/ -T css -b b-search
```

https://gist.github.com/4195433

![Styled header](http://img-fotki.yandex.ru/get/5708/14441195.26/0_6f0ba_bb628e4c_XL.jpg "Styled header")

#### Redefining BEMHTML
You need an additional container DOM node to center the page. So, we
define a template implementation for the `b-page` block by creating the same block on
the project level. We are going to use `BEMHTML` as a templating language.

```js
    $ bem create -l desktop.blocks/ -b b-page -T bemhtml
```

Add some code to wrap the page contents with an additional container node; put it into the
newly created `desktop.blocks/b-page/b-page.bemhtml` file.

```js
    block b-page, content: {
        elem: 'body-i',
        content: this.ctx.content
    }
```

https://gist.github.com/4175742

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head">
                    <div class="layout">...</div>
                </div>
            </div>
        </body>
    </html>
```

Then, implement the `b-page` block in CSS technology to style the resulting markup.

```js
    $ bem create -l desktop.blocks/ -T css -b b-page
```

Copy CSS code for the newborn
`desktop.blocks/b-page/b-page.css` file from here: https://gist.github.com/4175763

Define a `border` property for the `head` block so that its placement would be visible.

```js
    $ bem create -l desktop.blocks/ -T css -b head
```

Again, you can borrow contents for `desktop.blocks/head/head.css` file from
here: https://gist.github.com/4175776.

![Bordered header](http://img-fotki.yandex.ru/get/6505/14441195.26/0_6f0bc_d000a7a2_L.jpg "Bordered header")

## BEMHTML templates
You can use BEMHTML templates not only to declare the HTML tags to output but also
to generate additional markup depending on view.

Just to get the idea, let's place a list of goods into the page. It is a
separate `goods` block declared in a BEMJSON page description and containing all
the neccessary data.

```js
    {
        block: 'goods',
        goods: [
            {
                title: 'Apple iPhone 4S 32Gb',
                image: 'http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg',
                price: '259',
                url: '/'
            },
            {
                title: 'Samsung Galaxy Ace S5830',
                image: 'http://mdata.yandex.net/i?path=b0206005907_img_id5777488190397681906.jpg',
                price: '73',
                url: '/'
            },
            ...
    }
```

https://gist.github.com/4176078

This block has to be implemented with BEMHTML technology in order to be turned
into an appropriate piece of HTML. Also, it needs to be styled with CSS. So, you
can create this block with all the default technologies by just removing `-T`
flag.

```js
    $ bem create -l desktop.blocks -b goods
```

Then, write BEMHTML code turning the input data JSON into block elements and place it
into the `desktop.blocks/goods/goods.bemhtml` template file. Also, define DOM nodes
of the block and its elements by using a `tag` mode.

```js
    block goods {

        tag: 'ul'

        ...

        elem item, tag: 'li'

        elem title, tag: 'h3'

    }
```

https://gist.github.com/4176118

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head">...</div>
                <ul class="goods">
                    <li class="goods__item">
                        <h3 class="goods__title">Apple iPhone 4S 32Gb</h3>
                        <img class="goods__image" src="http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg"/>
                        <span class="goods__price">259</span>
                    </li>
                    <li class="goods__item">...</li>
                    <li class="goods__item">...</li>
                </ul>
            </div>
        </body>
    </html>
```

Templates can produce not only nested elements but nested blocks as well. In this
example, you can wrap price values with a `b-link` block from the `bem-bl` library.

```js
    {
        elem: 'price',
        content: {
            block: 'b-link',
            url: item.url,
            content: item.price
        }
    }
```

https://gist.github.com/4176996

An extra trick: if you would like to avoid cascade when styling the block,
mark this link as an element of `goods` block.

```js
    {
        block: 'b-link',
        mix: [{ block: 'goods', elem: 'link' }],
        url: item.url,
        content: item.price
    }
```

https://gist.github.com/4177113

```js
    // ...
    <ul class="goods">
        <li class="goods__item">
            <h3 class="goods__title">Apple iPhone 4S 32Gb</h3>
            <img class="goods__image" src="http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg"/>
            <span class="goods__price">
                <a class="b-link goods__link" href="/">259</a>
            </span>
        </li>
        <li class="goods__item">...</li>
        <li class="goods__item">...</li>
    </ul>
```

Then, use a a modifier to mark new items corresponding to new goods, and with a bit of
skill on your part you can add some layout nodes.<br/>
https://gist.github.com/4177157

Use this code snapshot for block CSS: https://gist.github.com/4177163<br/>
Notice that you don't need to create a CSS file for the block here because it had already
been generated when creating the block; CSS is one of the block's default technologies.

![List of goods](http://img-fotki.yandex.ru/get/6508/14441195.26/0_6f0c7_e5284b82_L.jpg "List of goods")

You also need some extra CSS for our dearest friend, the IE browser, since it is not among the
list of default block technologies.

```js
    $ bem create -l desktop.blocks/ -T ie.css -b goods
```

Again, contents for the resulting `desktop.blocks/goods/goods.ie.css` file is
already waiting for your on Gist: https://gist.github.com/4177174

## Block dependencies
Besides declaring blocks in input JSON data you need to make sure the
corresponding templates, CSS and JavaScript are linked to the page. You can do this by
using a special `deps.js` block technology which, as you probably guess, is used to describe
block dependencies.

```js
    $ bem create -l desktop.blocks/ -T deps.js -b goods
```

You can use moderate dependency type codenamed `shouldDeps` and declare that you
need `b-link` block.

```js
    ({
        shouldDeps: [
            { block: 'b-link' }
        ]
    })
```

https://gist.github.com/4177031

## Using libraries
It would be nice to have each entry in the list rendered as a rectangle with
a shadow. We can borrow a block from [a friend's of mine block
library](https://github.com/john-johnson/j).<br/>
It provides just one block named `box` that does all we need.

You should declare library repository URL in `.bem/make.js` file to get its
code into your project.

```js
    getLibraries: function() {

        return {
            'bem-bl': {
                type: 'git',
                url: 'git://github.com/bem/bem-bl.git',
                treeish: '0.3'
            },
            'bemhtml' : {
                type: 'git',
                url: 'git://github.com/bem/bemhtml.git'
            },
            'john-lib' : {
                type: 'git',
                url: 'git://github.com/john-johnson/j.git'
            }
        };

    }
```

https://gist.github.com/4177229

Then, make your pages take blocks from the block level provided by the library.
Do this by tuning a bundle configuration in `desktop.bundles/.bem/level.js`.

```js
    exports.getConfig = function() {

        return BEM.util.extend(this.__base() || {}, {
            bundleBuildLevels: this.resolvePaths([
                '../../bem-bl/blocks-common',
                '../../bem-bl/blocks-desktop',
                '../../bemhtml/common.blocks',
                '../../john-lib/blocks/',
                '../../desktop.blocks'
            ])
        });

    };
```

https://gist.github.com/4177250

Unfortunately, you need to restart `bem server` after changing the configuration.
Kill the current process and run `make server` again.<br/>
Maintainers of bem-tools promise to take away this need to restart in future versions.

## Mix for blocks and elements
Having linked the library you can use the `box` block. It could be just a wrapper,
but you can also `mix` blocks to avoid nested markup.

One of the possible ways to mix blocks is to declare this mix in BEMJSON input
data.<br/>
Here you can mix `head` and `box` blocks by changing the page.

```js
    {
        block: 'head',
        mix: [ { block: 'box' } ],
        content: ...
    }
```

https://gist.github.com/4177292

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head box">
                    <div class="layout">...</div>
                </div>
                <ul class="goods">...</ul>
            </div>
        </body>
    </html>
```

Don't forget to declare that a `head` block requires a `box` block.

```js
    $ bem create -l desktop.blocks/ -T deps.js -b head
```

```js
    ({
        shouldDeps: [
            { block: 'box' }
        ]
    })
```

https://gist.github.com/4235143

![Head + Box = &hearts;](http://img-fotki.yandex.ru/get/5803/14441195.26/0_6f0c4_4e3f9249_XL.jpg "Head + Box = &hearts;")

You can also mix an element with a block.<br/>
Let's specify that each `item` element in a `goods` block is at the same time a `box`
block.

```js
    content.push({
        elem: 'item',
        mods: mods,
        mix: [{ block: 'box' }],
        content: ...
```

https://gist.github.com/4177350

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head box">
                    <div class="layout">...</div>
                </div>
                <ul class="goods">
                    <li class="goods__item box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__item goods__item_new_yes box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__sizer">...</li>
                    ...
                </ul>
            </div>
        </body>
    </html>
```

![Inboxed items](http://img-fotki.yandex.ru/get/6511/14441195.26/0_6f0c5_bcef9ce9_L.jpg "Inboxed Items")

## Declarative JavaScript
###JavaScript for a block
The `box` block borrowed from my friend's library supports roll up animation. This is its
dynamic functionality coded in JavaScript.

If you'd like to use this in `head`, change the block BEMJSON declaration, and
set that mixed `box` block uses its JavaScript implementation.

```js
    mix: [{ block: 'box', js: true }]
```

https://gist.github.com/4202622

It is required to have a `switcher` element in the block.

```js
    content: [
        {
            block: 'layout',
            ...
        },
        {
            block: 'box',
            elem: 'switcher'
        }
    ]
```

https://gist.github.com/4202651

With that you have a block with a clickable arrow-shaped element which rolls the
block up.

![Arrow](http://img-fotki.yandex.ru/get/4603/14441195.26/0_6f0c8_b65eea6_L.jpg "Arrow")

### Redefining JavaScript
What if you are not satisfied with the dynamic functionality provided with the `box`
block? Maybe you would like it to roll up and left. Usually, you cannot alter the
code of the library you borrowed your block from as it's not yours.<br/>
But thanks to using the [i-bem
block-framework](https://github.com/bem/bem-bl/tree/master/blocks-common/i-bem)
you can change (redefine or extend) block JavaScript on your own level.

```js
    bem create -l desktop.blocks -T js -b box
```

Remove everything but `setMod` section from the resulting `desktop.blocks/box/box.js`
file.

```js
    onSetMod : {

    }
```

https://gist.github.com/4195865

In this example the block is told to respond to setting and removing a `closed` modifier.

```js
    onSetMod : {

        'closed': {
            'yes': function() {
                // some functionality here
            },
            '': function() {
                // some functionality here
            }
        }

    }
```

https://gist.github.com/4195879

## Creating pages
In the BEM world, a page is also a block on a special level. So, you can use
`bem create` for pages as well.

```js
    $ bem create -l desktop.bundles -b contact
```

As you can see, there is no `-T` flag here. That's because the `desktop.bundles`
block level implementation defaults to `BEMJSON` technology.<br/>
That results in a `desktop.bundles/contact/contact.bemjson.js` file being filled with
dummy page contents.

Load a new page in a browser:
http://localhost:8080/desktop.bundles/contact/contact.html <br/>
`bem server` builds it for us upon first access.

## Production deployment
When developing, every time you request a page in a browser, `bem server`
rebuilds what has to be rebuilt following your changes.

For production deployment, all pages have to be built, no matter if they were changed or not.
You can use `bem make` for that.<br/>
It's recommended to run a local project version:

```js
    $ ./node_modules/bem/bin/bem make
```

**Credits**<br/>
Author thanks [tyv](https://github.com/tyv) and [gela-d](https://github.com/gela-d) for cute HTML/CSS markup, and [ingdir](https://github.com/ingdir) for his help with the English version.
