# Building BEM-powered website using technology's full stack

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/0-intro.jpg)

Earlier this year [the BBC wrote](http://www.bbc.co.uk/blogs/internet/entries/47a96d23-ae04-444e-808f-678e6809765d) about using the Yandex-developed BEM methodology for the new version of their home page. And BBC was not the only company or individual writing about BEM as a methodology for frontend development and rules for scalable architecture build. 

Smashing Magazine itself had a several pieces on BEM, including [A New Front-End Methodology: BEM](http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/) by [Varvara Stepanova](http://www.smashingmagazine.com/author/varvara-stepanova/) and [The Evolution Of The BEM Methodology](http://www.smashingmagazine.com/2013/02/21/the-history-of-the-bem-methodology/) and [Scaling Down The BEM Methodology For Small Projects](http://www.smashingmagazine.com/2014/07/17/bem-methodology-for-small-projects/) both by [Maxim Shirshin](http://www.smashingmagazine.com/author/maksim-shirshin/).

And now we think it is time to go more practical and tell you how to introduce the full BEM technology stack into your projects.

BEM facilitates the development of websites that have to be built quickly and maintained over a long time. Nearly all of [Yandex](https://company.yandex.com/)'s services have the front end built on this technology. These days it comes complete with numerous libraries and tools, which we want to share with you. With BEM's extensive toolkit, with all its modularity and power, all you need to do is ”just“ come up with an idea and implement it.

In this article we will discuss the benefits of front-end development based on independent blocks, find out about redefinition levels, look at ready-made block libraries and build automation tools. We will see how tools like [autoprefixer](https://github.com/postcss/autoprefixer), the CSS preproccesor [Stylus](http://learnboost.github.io/stylus/) or the modular system [YModules](https://en.bem.info/tools/bem/modules/) can make the developer's life easier and provide a truly useful platform when incorporated in the BEM development process.

We will use a real-life example to explain the advantages of a declarative approach, whereby the same ideas can be used both for CSS and for JavaScript. We will specifically focus on [BEMHTML](https://en.bem.info/technology/bemhtml/) and [BEMTREE](https://en.bem.info/technology/bemtree/) declarative templates, which convert data to a BEM tree described in [BEMJSON](https://en.bem.info/technology/bemjson/) format, and then to HTML. We will also have a detailed look at the use of BEM in server-side development.

We will be using the Twitter API for our project. In the end we will have a functional website built on the full BEM technology stack and a step-by-step guide to the implementation process.

Specifically for the article we created a mini-service that searches various social networking sites and presents search results in an orderdly manner. We have put it on GitHub in the [github.com/bem/sssr](https://github.com/bem/sssr/) repository — you are welcome to [have a look](https://sssr.bem.yandex.net/).

And now let's start from the beginning.

### Theory

So what exactly is **BEM**?

BEM (the acronym for **B**lock, **E**lement, **M**odifier) is a methodology for the development of programs and interfaces, a way of describing entities without regard to specific implementation technologies.

* A *block* is an individual application component. Each block is independent of other blocks and can contain other blocks and elements.
* An *element* is a part of a block that performs a certain function. Elements only make sense in the context of the block they belong to.
* A *modifier* is a property of a block or an element that determines its appearance or its behaviour.

BEM offers an abstraction over a DOM tree. Blocks are independent of each other and encapsulate all the functionality and elements. It doesn't matter what HTML tags are used to implement a block — whether it's `div` or `form`, you can always change that or add more wrappers. Any such changes shouldn't affect other blocks. With BEM, we describe an application in terms of interface components, not in terms of HTML tags.

Each block has its own folder in the file system. The folder contains all the technologies that describe the block, its elements and modifiers.

```
desktop.blocks/
    input/
        __box/         # element
        __clear/       # element
        __control/     # element
        _focused/      # modifier
        _type/         # modifier
        input.css      # block's css implementation
        input.js       # block's js implementation
        input.ru.md    # markdown documentation
…
```

If you are interested in the details of how and why BEM came into being, please read [The History of BEM](https://en.bem.info/method/history/).

You can find the detailed description of the BEM methodology on [bem.info](https://en.bem.info/method/) as well.

### Creating a project stub

We start by installing the necessary software.

First of all we are going to need a terminal and the version control system `git`, which can be downloaded from [git-scm.com](http://git-scm.com/download/).

Almost all of our tools are written in JavaScript, so you will need either [node.js](https://nodejs.org/download/) or [io.js](https://iojs.org/ru/).

To create a template for our project, we'll be using the [generator-bem-stub](https://en.bem.info/tools/bem/bem-stub/) project generator.

```
> npm install -g generator-bem-stub
```

Now let's run the generator:

```
> yo bem-stub
```

By giving answers to questions regarding technologies to be used, we end up with an assembled project stub which is configured for building.

Let's look at the questions.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/1-sssr-yo-bem-stub.png)

The screenshot above shows the questions along with answers provided for them. The first three questions are standard, then it gets more interesting:

* `Choose a toolkit to build the project`:  we're going to use the ENB tool. It's a utility that will build our project — merge styles, scripts, templates, compile and optimize in accordance with the page declaration, block dependencies, and configuration files.
* `Specify additional libraries if needed`: we'll be using the block library [bem-components](https://en.bem.info/libs/bem-components/) in our project. It has optional style themes.

Now it's time to learn about `redefinition levels`.

#### Redefinition level

A set of block implementations is called a redefinition level. A project may have multiple levels, at each one of which a block implementation is added or changed. The resultant block implementation is assembled from all levels in a predetermined consecutive order. 

We can define and redefine styles, templates, the JavaScript implementation of blocks at our project's redefinition level. And we do so without modifying the library's source files, which means that our changes will be preserved if the library gets updated.

Let's see how it may look on a file system:

```
…
libs/
    bem-components/
        desktop.blocks/
            input/
                input.css
desktop.blocks/
    input/
        input.css
…
```

Creating a block at the `desktop.blocks` level of our project allows us to define or redefine the necessary technologies.

In the example above, we can edit the styles of the `input` block by adding a `CSS` implementation of that block.

The project stub is now ready. Let's go to the project directory:

```
> cd sssr-tutorial
```

### Front end

First we are going to create a static prototype of our page. To describe the page structure, we will use the [BEMJSON](https://en.bem.info/technology/bemjson/) technology.

BEMJSON is the format used to describe a BEM tree: the order and nesting of the blocks, the names and states of BEM entities, additional custom fields.

Let's build the generated project and see what we've got. For comfortable work with the locally installed `ENB` package, execute the following command:

```
> export PATH=./node_modules/.bin:$PATH
```

Or manually execute the command `enb` from the `./node_modules/.bin/` subdirectory.

Building is done by the command `enb server`:

```
> enb server
```

The page can now be opened at [http://localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html). Our build tool will build all the required dependencies and then use them to build files for all the relevant blocks and technologies.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/2-sssr-hello-world.png)

In your browser, open the Inspector and look at the DOM tree. We have not written a single line of code yet, but the page already has some generated HTML code. That is because we are using templates from our libraries. For example, the `page` block template from the `bem-core` library generates a page skeleton (`doctype`, `html`, `head`, `body`, etc).

Our project includes a file named `index.bemjson.js` in the `./desktop.bundles/index/` folder:

```js
({
    block: 'page',
    title: 'Hello, World!',
    styles: [
        { elem: 'css', url: 'index.min.css' }
    ],
    scripts: [
        { elem: 'js', url: 'index.min.js' }
    ],
    content: [
        'Hello, World!'
    ]
}
```

This file is a description of the page in BEM terms. The root block of our BEM tree is `page`. It has an API — additional keywords such as `title`, `favicon`, etc. The templates for this block are contained in the `bem-core` library.

Our application consists of two main parts — a header and content. Let's add a block called `sssr` to the page content, with two elements to describe the interface components. To do so, let's edit `./desktop.bundles/index/index.bemjson.js`:

```js
({
    block: 'page',
    //…
    content: [
        {
            block: 'sssr',
            content: [
                {
                    elem: 'header'
                },
                {
                    elem: 'content'
                }
            ]
        }
    ]
});
```

The header, in turn, will contain a seach form and the website name with the logo:

```js
{
    block: 'sssr',
    content: [
        {
            elem: 'header',
            content: [
                {
                    elem: 'logo',
                    content: 'Social Services Search Robot:'
                },
                {
                    block: 'form',
                    content: [
                        {
                            elem: 'search'
                        },
                        {
                            elem: 'filter',
                            content: '[x] twitter'
                        }
                    ]
                }
            ]
        },
        {
            elem: 'content'
        }
    ]
}
```

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/3-sssr-header.png)

Let's use the blocks `input`, `button`, `spin` and `checkbox` from the `bem-components` library. In our project this library is located in the `./libs/bem-components` folder. Each of these blocks has its own API described in the [documentation](https://en.bem.info/libs/bem-components/current/desktop/input/).

Let's add the necessary blocks to the BEMJSON:

```js
{
    block: 'sssr',
    content: [
        {
            elem: 'header',
            content: [
                {
                    elem: 'logo',
                    content: [
                        {
                            block: 'icon',
                            mods: { type: 'sssr' }
                        },
                        'Social Services Search Robot:'
                    ]
                },
                {
                    block: 'form',
                    content: [
                        {
                            elem: 'search',
                            content: [
                                {
                                    block: 'input',
                                    mods: { theme: 'islands', size: 'm', 'has-clear' : true },
                                    name: 'query',
                                    val: '#b_',
                                    placeholder: 'try me, baby!'
                                },
                                {
                                    block: 'button',
                                    mods: { theme: 'islands', size: 'm', type: 'submit' },
                                    text: 'Find'
                                },
                                {
                                    block: 'spin',
                                    mods: { theme: 'islands', size : 's' }
                                }
                            ]
                        },
                        {
                            elem: 'filter',
                            content: '[] twitter [] instagram'
                        }
                    ]
                }
            ]
        }
    ]
}
```

The `mods` field occurs repeatedly in this BEMJSON fragment. This field lists modifiers that are used, along with their values. A `mods` field contains a `key: value` pair, e.g. `mods: { type: 'sssr' }`.

Custom JavaScript expressions are also valid in BEMJSON. Let's add a `map` construction for the recurrent `checkbox` blocks to the `content` field of the `filter` element:

```js
//…
{
    elem: 'filter',
    content: ['twitter', 'instagram'].map(function(service) {
        return {
            block: 'checkbox',
            mods: {
                theme: 'islands',
                size: 'l',
                checked: service === 'twitter'
            },
            name: service,
            text: service
        };
    })
}
//…
```


Here's the complete `index.bemjson.js` file:

```js
({
    block: 'page',
    title: 'Social Services Search Robot',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    content: {
        block: 'sssr',
        content: [
            {
                elem: 'header',
                content: [
                    {
                        elem: 'logo',
                        content: [
                            {
                                block: 'icon',
                                mods: { type: 'sssr' }
                            },
                            'Social Services Search Robot:'
                        ]
                    },
                    {
                        block: 'form',
                        content: [
                            {
                                elem: 'search',
                                content: [
                                    {
                                        block: 'input',
                                        mods: { theme: 'islands', size: 'm', 'has-clear' : true },
                                        name: 'query',
                                        val: '#b_',
                                        placeholder: 'try me, baby!'
                                    },
                                    {
                                        block: 'button',
                                        mods: { theme: 'islands', size: 'm', type: 'submit' },
                                        text: 'Найти'
                                    },
                                    {
                                        block: 'spin',
                                        mods: { theme: 'islands', size : 's' }
                                    }
                                ]
                            },
                            {
                                elem: 'filter',
                                content: ['twitter', 'instagram'].map(function(service) {
                                    return {
                                        block: 'checkbox',
                                        mods: {
                                            theme: 'islands',
                                            size: 'l',
                                            checked: service === 'twitter'
                                        },
                                        name: service,
                                        text: service
                                    };
                                })
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'content'
            }
        ]
    }
})
```

Having described the interface structure, we now need to define and add styles for our blocks. Most of the styles come with the `bem-components` library, so we need to add just a few.

To write styles, we use the CSS preprocessor [Stylus](https://github.com/LearnBoost/stylus/). Stylus will process all the files with the `*.styl` extension and merge them into a final CSS file. You can also use the `*.css` extension for styles that need not be processed by the preprocessor.

Let's define styles for the `form` block in the file `./desktop.blocks/form/form.styl`:

```css
.form
{
    display: flex;

    &__search
    {
        margin-right: auto;
    }

    .input
    {
        width: 400px;
    }

    .checkbox
    {
        display: inline-block;

        margin-left: 15px;

        user-select: none;
        vertical-align: top;
    }
}
```

For the `page` block — in the file `./desktop.blocks/page/page.css`:

```css
.page
{
    font-family: Tahoma, sans-serif;

    min-height: 100%;
    margin: 0;
    padding-top: 100px;

    background: #000;
}
```

For the `sssr` block — in the file `./desktop.blocks/sssr/sssr.styl`:

```css
.sssr
{
    &__header
    {
        position: fixed;
        z-index: 1;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 10%;
        background: #f6f6f6;
        box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 10px 20px -5px rgba(0,0,0,.4);

        .button
        {
            margin-left: 10px;
        }
    }

    &__logo
    {
        font-size: 18px;
        margin: 0 0 10px;
    }

    &__content
    {
        padding: 10px 10%;
        column-count: 4;
        column-gap: 15px;
        transition: opacity .20s linear;
    }

    a[rel='nofollow'],
    a[xhref],
    [name][server]
    {
        text-decoration: none;
        color: #038543;
    }
}
```

And for the `user` block — `desktop.blocks/user/user.styl`:

```css
.user
{
    &__name
    {
        display: inline-block;

        margin-right: 10px;

        text-decoration: none;

        color: #000;

        &:hover
        {
            text-decoration: underline;

            color: #038543;
        }
    }

    &__post-time
    {
        font-size: 14px;

        display: inline-block;

        color: #8899a6;
    }

    &__icon
    {
        position: absolute;
        right: 5px;
        bottom: 5px;

        width: 30px;
        height: 30px;

        border-radius: 3px;
    }
}
```

Let's not dwell too much on the subject of CSS coding and move right on.

We just need to add blocks with found messages. Let's describe them in `index.bemjson.js` and leverage JavaScript capabilities for the prototyping.

```js
{
    elem: 'content',
    content: (function() {

        return 'BEM is extermly cool'.split('').map(function() {
            var service = ['twitter', 'instagram'][Math.floor(Math.random()*2)];

            return {
                service: service,
                user: [{
                    login: 'tadatuta',
                    name: 'Vladimir',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_batman.png'
                }, {
                    login: 'dmtry',
                    name: 'Dmitry',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_captain-america.png'
                },  {
                    login: 'sipayrt',
                    name: 'Jack Konstantinov',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_ironman.png'
                }, {
                    login: 'einstein',
                    name: 'Slava',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_robin.png'
                }][Math.floor(Math.random()*4)],
                time: Math.floor((Math.random()*12)+1) + 'h',
                img: service === 'instagram' ? 'http://bla.jpg' : undefined,
                text: [
                    'A block is an independent interface component. A block can be either simple or compound (containing other blocks).',
                    'An element is a component part of a block.',
                    'A block or an element can have several modifiers at once.'][Math.floor(Math.random()*3)]
            };
        }).map(function(dataItem) {
            return {
                block: 'island',
                content: [
                    {
                        elem: 'header',
                        content: {
                            block: 'user',
                            content: [
                                {
                                    block: 'link',
                                    mix: { block: 'user', elem: 'name' },
                                    url: 'https://www.yandex.ru',
                                    target: '_blank',
                                    content: dataItem.user.name
                                },
                                {
                                    elem: 'post-time',
                                    content: dataItem.time
                                },
                                {
                                    block: 'image',
                                    mix: { block: 'user', elem: 'icon' },
                                    url: dataItem.user.avatar,
                                    alt: dataItem.user.name
                                }
                            ]
                        }
                    },
                    {
                        elem: 'text',
                        content: dataItem.text
                    },
                    {
                        elem: 'footer',
                        content: [
                            {
                                block: 'service',
                                mods: { type: dataItem.service }
                            }
                        ]
                    }
                ]
            };
        });
    })()
}
```

and add styles for the `island` block to the file `./desktop.blocks/island/island.styl`:

```css
.island
{
    font-size: 18px;
    line-height: 140%;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    padding: 15px 5px 5px 15px;
    border-radius: 3px;
    background: #fff;
    box-shadow: inset 0 0 1px rgba(0, 0, 0, .4);

    &__footer
    {
      margin-top: 10px;
    }
    &__image
    {
        display: block;
        width: 100%;
        border-radius: 3px;
    }
}
```
Let's now see the result:

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/4-sssr-mock.png)

### BEMHTML template engine

#### Declarative templating

The declarative approach is very much favoured at Yandex — in relation to not only CSS, but also templates and JavaScript.

Here's how it looks in CSS:

```css
.menu__item { display: inline-block; }
```

The style `display: inline-block;` will be applied to all `item` elements of the block `menu`; i.e., we declare processing rules for our DOM nodes selected by criteria:

```
criteria { rules }
```

We select all the nodes of the DOM tree that match certain criteria and apply the template body to them.

Yandex adopted declarative templating by creating its own template engine called BEMHTML. Its architecture is described in detail in the [Data templating in bem-core](https://en.bem.info/technology/bemhtml/current/templating/) document.

This is an example of a BEMHTML declarative template:

```js
block('menu').elem('item').tag()('span');
```

The template engine selects all the nodes of the BEM tree that match our criteria and applies the template body to them:

```
(criteria)(template body)
```

BEMHTML is written in JavaScript and copies JavaScript syntax. You can use JavaScript functions in a template's body and sub-predicates. For production mode the templates will be compiled into optimized JavaScript code.

BEMHTML is responsible for converting a BEM tree to HTML. It accepts input data in the form of a BEM tree or a fragment of a BEM tree described in the BEMJSON technology. It applies a BEMHTML template to the BEMJSON. This produces output in the form of an HTML string.

A BEMHTML template has the following format:

```
match(sub-predicate1, sub-predicate2, sub-predicate3)(body);
```

Sub-predicates are conditions that trigger the application of the template. E.g.:

```js
match(this.block === 'link', this._mode === 'tag', this.ctx.url)('a');
```

This particular template checks if the current block is a `link` block, if the `this.ctx` context contains the `url` variable, and if the current mode is a `tag` mode. If all these conditions are true, an `a` tag will be used on the block.

#### Mode

A mode is a step in the output HTML generation process. Each mode is responsible for its own bit of output HTML code.

The `default` mode defines the set and order of all other modes. The following chart shows what each mode is responsible for:

![Mod scheme on HTML generation](https://raw.githubusercontent.com/bem/bem-core/v2/common.docs/reference/reference_mode_default.png)

We recommend you take time to peruse the BEMHTML documentation presented in the [Guide to the BEMHTML template engine](https://en.bem.info/technology/bemhtml/current/reference/).

Back to our project though.

We need a `form` block. It should be displayed as a `<form>` tag and have a `JavaScript` implementation.

If we add another block like that to the page, we will have to edit these parameters directly in the BEMJSON file.
This is similar to using inline styles in HTML. Let's do the right thing and put the block's parameters in a template:

`./desktop.blocks/form/form.bemhtml`:
```js
block('form')(
    tag()('form'),
    js()(true)
);
```

Now we can edit the block template in a single location, move the block around and reuse it freely.

Let's look at the DOM tree in the Inspector — our `form` block is displayed as a `form` tag with an `i-bem` class. This class indicates that the block has a JavaScript implementation.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/5-sssr-form-js.png)

We have shown how our BEM blocks should be converted to HTML. Now let's see how Twitter data will be received and processed.

### Architecture of the application

#### Two-step templating process

Our application will work as follows:

* The first step will be to collect data from the services and build a BEM tree based on that data;
* The second step will be to convert the BEM tree (view-oriented data) to a DOM tree and pass HTML code to the client side.

### BEMTREE

We have told you how to convert a BEM tree to HTML. That is the job of the front-end server. The preceding task of building a BEM tree and filling it with data involves the use of the BEMTREE template engine. Its syntax is similar to that of BEMHTML, the main difference being the number of available standard modes — in the case of BEMTREE, those are limited to `default` and `content`.

BEMTREE accepts raw data as input. That data is used to enrich block templates, resulting in output in the form of a BEM tree fragment, which is passed onwards for subsequent BEMHTML templating.

Let's dive straight in. We will write a BEMTREE template for modifier `{ type: 'twitter' }`, block `island`:

`desktop.blocks/island/_type/island_type_twitter.bemtree`

```js
block('island').mod('type', 'twitter').content()(function() {
    var data = {
        postLink: '#',
        userName: 'user@name',
        userNick: 'user@nick',
        createdAt: '19 of July',
        avatar: '#avatar',
        text: 'message going here',
        type: 'twitter'
    };
    return [
        {
            elem: 'header',
            content: {
                block: 'user',
                content: [
                    {
                        block: 'link',
                        mods: { theme: 'islands' },
                        mix: { block: 'user', elem: 'name' },
                        url: data.postLink,
                        content: [data.userName, ' @', data.userNick]
                    },
                    {
                        elem: 'post-time',
                        content: data.createdAt.toString()
                    },
                    {
                        block: 'image',
                        mix: { block: 'user', elem: 'icon' },
                        url: data.avatar,
                        alt: data.userName
                    }
                ]
            }
        },
        {
            elem: 'text',
            content: data.text
        },
        {
            elem: 'footer',
            content: [
                {
                    block: 'service',
                    mods: { type: data.type }
                }
            ]
        }
    ];
});
```

To the content of this block, we pass an `image` block with the required parameters and mix in the `image` element of the `island` block.

Further on, we will replace the static object with data passed for templating.

But first let's see how the server-side code will be organized and how the data will be passed.

### Server side

Our application will use the [express](http://expressjs.com) framework — return HTML in response to a search query.

We will now write blocks for gathering data from the services. We will store our server-side code in `*.node.js` files, which will be merged into one single file during the build process. We will then use `node.js` to run that file.

#### `service_type_twitter` block

To simplify working with Twitter, we will use the module [twit](https://github.com/ttezel/twit). Let's install it using `npm`:

```
> npm i twit --save
```

We use a [separate file](https://github.com/bem/sssr/blob/master/desktop.blocks/service/_type/service_type_twitter.config.js) for authorization data required for working with Twitter. Let's copy the file contents to a file of the same name.

Let's edit `./desktop.blocks/service/_type/service_type_twitter.node.js`:

```js
var twitter = require('twit'),
    config = require('./service_type_twitter.config'),
    twit = new twitter(config);

var query = '#b_',
    results = [];

twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

    if (err) {
        console.error(err);
        return [];
    }

    results = res.statuses.map(function(status) {
        var user = status.user;
        return {
            avatar: user.profile_image_url,
            userName: user.name,
            userNick: user.screen_name,
            postLink: 'https://twitter.com/' + user.screen_name,
            createdAt:  status.created_at,
            text: status.text,
            type: 'twitter'
        };
    });
    console.log(results);
});
```

This application runs a search by the keyword `#b_` and outputs the result to the console.

Let's rebuild our project and run it using `node.js`:

```
> enb make
> node ./desktop.bundles/index/index.node.js
```

The result of the execution is a list of tweets in the console.

We now need a way to pass the output for subsequent processing, i.e. templating and passing the result to the client side.

For promise-based asynchronous work we are going to use the [vow](https://github.com/dfilatov/vow) library.
To organize server-side and client-side JS code — the modular system [YModules](https://en.bem.info/tools/bem/modules/).

### Modular system

The `bem-core` library utilizes the modular system [YModules](https://en.bem.info/tools/bem/modules/).

It can be used to wrap our block's code within a wrapper module and call it from other modules when necessary.

Let's edit the file `service_type_twitter.node.js` to incorporate these changes.

```js
modules.define('twitter', function(provide) {

var vow = require('vow'),
    moment = require('moment'),
    twitter = require('twit'),
    twitterText = require('twitter-text'),
    config = require('./service_type_twitter.config'),
    twit = new twitter(config);

    provide({
        get: function(query) {
            var dfd = vow.defer();

            twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

                if(err || !res.statuses) {
                    console.error(err);
                    dfd.resolve([]);
                }

                dfd.resolve(res.statuses.map(function(status) {
                    return {
                        avatar: status.user.profile_image_url,
                        userName: status.user.name,
                        userNick: status.user.screen_name,
                        postLink: 'https://twitter.com/' + status.user.screen_name,
                        createdAt:  moment(status.created_at),
                        text: twitterText.autoLink(twitterText.htmlEscape(status.text)),
                        type: 'twitter'
                    };
                }));
            });

            return dfd.promise();

        }
    });


});
```

As you can see, we have wrapped the code entirely within a `module.define` construction. It is the declaration of the module `twitter`, which will hereafter
be accessible in our application through the `modules` namespace.

To send an asynchronous result, we return a promise, to which, depending on the query results, we pass either an empty array — in the case of an error — or an array with search results.

Let's also add a module called `moment.js` for working with dates.

Twitter returns plain text in messages, so we'll be using the `twitter-text` library to identify hashtags and links.

Also, as mentioned above, we'll be needing `express`.

Let's install all these modules:

```
> npm i vow moment twitter-text express --save
```

#### `server` block

The `server` block will cover the server side of our application. Let's add a folder called `./desktop.blocks/server/` and create a file in it with the name `server.node.js`.

This will be an `express` application that listens to the URL `/search` and provides data according to a query.

```js
modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    Vow = require('vow');

app.get('/search', function(req, res) {

    var dataEntries = [],
        searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {
            res.end(JSON.stringify(results, null, 4));
        })
        .fail(function() {
            console.error(arguments);
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});
```

Let's create a new file — `./desktop.blocks/sssr/sssr.deps.js`, with the following contents:

```js
({
    shouldDeps: [
        { block: 'server' },
        { block: 'island', mods: { type: ['twitter'] }}
    ]
})
```

The above specifies that the `sssr` block needs the blocks `server` and `island` with the `type: 'twitter'` modifier.

Let's add one more modifier — `service_type_twitter`, dependent on the `server` block. To do that, let's create a new file — `./desktop.blocks/server/server.deps.js`:

```js
({
    shouldDeps: [
        {
            block: 'service',
            mods: { type: ['twitter'] }
        },
        {
            block: 'sssr',
        }
    ]
})
```

Now all the relevant blocks will be included in the build. Let's rebuild the project and run the server:

```
> enb make && node ./desktop.bundles/index/index.node.js
```

The link [http://localhost:3000/search?query=%23b_&twitter=on](http://localhost:3000/search?query=%23b_&twitter=on) opens a page with a JSON object for data supplied by the `service_type_twitter` block.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/6-sssr-server-json.png)

Now let's have this data converted to BEMJSON using BEMTREE. Editing `server.node.js`:

```js
modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    moment = require('moment'),
    Vow = require('vow'),
    pathToBundle = PATH.join('.', 'desktop.bundles', 'index');

app.use(express.static(pathToBundle));

var bemtreeTemplate = fs.readFileSync(PATH.join(pathToBundle, 'index.bemtree.js'), 'utf-8');

var context = VM.createContext({
    console: console,
    Vow: Vow
});

VM.runInContext(bemtreeTemplate, context);
var BEMTREE = context.BEMTREE;

app.get('/search', function(req, res) {

    var dataEntries = [],
        searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {

            // Merge search results into one array,
            // will be needed when adding services
            Object.keys(results).map(function(idx) {
                dataEntries = dataEntries.concat(results[idx]);
            });

            // Sort results by date
            dataEntries.sort(function(a, b) {
                return b.createdAt.valueOf() - a.createdAt.valueOf();
            });

            // Build BEMJSON from results using BEMTREE templates
            BEMTREE.apply(dataEntries.map(function(dataEntry) {
                dataEntry.createdAt = moment(dataEntry.createdAt).fromNow();
                return {
                    block: 'island',
                    data: dataEntry,
                    mods: { type: dataEntry.type }
                };
            }))
            .then(function(bemjson) {
                // Return formatted JSON
                res.end(JSON.stringify(bemjson, null, 4));
            });

        })
        .fail(function() {
            console.error(arguments);
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});

```
The compiled BEMTREE template is run in a separate namespace, where the `vow` module is thrown, which is required for the template to work.

Afer all the promises have been executed, the result array is merged into a flat list and sorted by date.

Then the array is passed to `BEMTREE.apply()`, and each element of the array is converted to an object with fields describing a BEM entity and data that we can now use in our BEMTREE templates.

Let's edit the file `./desktop.blocks/island/_type/island_type_twitter.bemtree`:

```js
block('island').mod('type', 'twitter').content()(function() {
    var data = this.ctx.data;
    return [
        // with no further changes
    ];
});
```

`this.ctx.data` contains the data we passed to `BEMTREE.apply()`.

Let's rebuild the project and open the page [http://localhost:3000/search?query=%23b_&twitter=on](http://localhost:3000/search?query=%23b_&twitter=on) again. The browser should now show the BEMJSON built using BEMTREE.

Lastly, we need to convert BEMJSON to HTML using `BEMHTML.apply()`. This will require including the following code into `server.node.js`:

```js
var BEMHTML = require(PATH.join('../../' + pathToBundle, 'index.bemhtml.js')).BEMHTML;
//…
BEMTREE.apply(dataEntries.map(function(dataEntry) {
    dataEntry.createdAt = moment(dataEntry.createdAt).fromNow();
    return {
        block: 'island',
        data: dataEntry,
        mods: { type: dataEntry.type }
    };
}))
.then(function(bemjson) {
    if (searchObj.json) {
        return res.end(JSON.stringify(bemjson, null, 4));
    }
    res.end(BEMHTML.apply(bemjson));
});
//…
```

Refreshing the page in the browser will bring up the HTML, which from now on we're going to use on the client — load it via AJAX.

Adding the `json=on` key to the URL displays the BEMJSON file contents — [http://localhost:3000/search?query=%23b_&twitter=on&json=on](http://localhost:3000/search?query=%23b_&twitter=on&json=on).

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/7-sssr-server-html.png)

### Client JavaScript with `i-bem.js`

At Yandex, a declarative approach to JavaScript was put into practice through the creation of `i-bem.js` – a custom JavaScript framework for web development in BEM terms. It is part of the `bem-core` library.
`i-bem.js` is a JavaScript implementation of the `i-bem` block. It allows creating other blocks and uses `jQuery` for browser API normalization.

This framework offers the following benefits:

* helpers for working with BEM domain;
* the ability to use a declarative approach;
* the ability to extend blocks' functionality.

#### Blocks with JS representation

Blocks can be with or without JS representation. The fact that a block has JS representation is indicated by the `js` mode in BEMHTML, and by the `js` field in BEMJSON.

```js
// bemhtml
block('form').js()(true);
```

```js
// bemjson
{
    block: 'form',
    js: true
}
```

```js
// bemjson with js params
{
    block: 'form',
    js: {
        p1: 'v1',
        p2: 'v2'
    }
}
```

The `js` field supports both boolean values and an object with parameters that can be used to write a js implementation of the block. The above example would be rendered into HTML code like this:

```html
<div class="form i-bem" data-bem="{form: {p1: 'v1', p2 : 'v2'}}"></div>
```

The `i-bem` class indicates that the current DOM tree node has a block with JS representation, while the data attribute `data-bem` contains an object that was passed to it, with keys that are the names of the blocks with JS representation and key values that are the parameters passed to those blocks.

### Writing client `js`

#### `form` block

Let's create a file called `./desktop.blocks/form/form.js` and describe some minimal functionality:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.bindTo('submit', this._onSubmit);
            }
        }
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.emit('submit');
    },

    getVal: function() {
        return this.domElem.serialize();
    }
}));

});
```

In `bem-core`, all blocks are declared as  modules. `i-bem` is the core of the framework. `i-bem_dom` is an extension of the core that is responsible for working with the browser DOM.

We have declared a `form` module with a dependent `i-bem_dom` module added, since the block is going to have DOM representation. This module will be passed to callback as the object `BEMDOM`. We will use it to declare the `form` block. The function called when the value of the `js` modifier is set to `inited` (which will happen automatically thanks to `i-bem.js`) will be a sort of constructor for our block. Besides, our block has the private handler `_onSubmit`, which reacts to form submitting, and the public method `getVal`, which returns the form serialization result.

In the method `_onSubmit()`, we call `e.preventDefault()`, to avoid reloading of the page, and then we generate the BEM event `submit`, which will be subsequently used in other blocks' code. Thus we have just created a public API for the `form` block. It consists of a public method and a BEM event.

#### `sssr` block

We will now create a block that loads requested data and displays it on the page.

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.findBlockInside('form').on('submit', this._sendRequest, this);
            }
        }
    },
    _sendRequest: function() {
        $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },
    _onSuccess: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }
}));

});
```

Let's analyze the block code. We started by declaring the module `sssr` with dependencies on `i-bem__dom` — as the block has DOM representation — and `jquery` for working with AJAX.

During the block initialization we subscribe to the `submit` event of the `form` block. When that event occurs, the private method `_sendRequest` is executed, which sends an AJAX request. Once a response from the server is received, the handler `_onSuccess` will be executed, which will update the contents of the `sssr_content` element with the results returned.

Now we just need to create a template that will let `i-bem.js` know that the `sssr` block has JS representation:

```js
// desktop.blocks/sssr/sssr.bemhtml

block('sssr').js()(true);
```

OK, so now we've got an initial version of the application, still very raw and rudimentary. To launch it, we need to build the files with our build tool, and from the built bundle, run `index.node.js`:

```
$ enb make && node ./desktop.bundles/index/index.node.js
```

Now we can do some testing. To do that, let's open the page [localhost:3000](http://localhost:3000/), enter something in the input field, select the relevant checkboxes and try to submit the form. If we've done everything right, we will see search results returned for our query appear below the header.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/8-sssr-server-ajax-no-static.png)

As you can see, the statics didn't load because the server doesn't know the image paths. To remedy this, we need to freeze the images using `borschik`. This will require adding a `.borschik` configuration file to the root folder of our project.

```
{
    "freeze_paths": {
        "libs/**": ":base64:",
        "libs/**": ":encodeURIComponent:"
    }
}
```

Now let's make a build in `production` mode:

```
> YENV=production enb make && node desktop.bundles/index/index.node.js
```

Viewing the page in the browser shows us that the images are now displayed.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/8-sssr-server-ajax-static.png)

### Adding interactivity. The `spin` block

Clicking the button that submits the form triggers some action, but that action is transparent to the user. The user may have the impression that the system is hung.
Let's try and fix this by adding a `spin` block, which will serve to indicate the request sending process. The block is already included in our BEMJSON declaration. The source code for the block is contained in the `bem-components` library and has its own API. Let's test how it works from the browser console:

```js
modules.require(['jquery'], function($) {
    $('.spin').bem('spin').setMod('visible');
});
```

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/9-sssr-server-spinner-test.png)

We have set the boolean modifier `spin_visible` to `true` and should now see a spinning wheel next to the input field.

This workaround is acceptable in testing, but you shouldn't use it in the JS code for blocks.

Let's add styles for this block to the `./desktop.blocks/sssr/sssr.styl` file:

```css
.sssr
{
    .spin
    {
        margin-left: 1em;
        vertical-align: middle;
    }
}
```

Let's make the progress indicator part of the program flow. Let's edit `./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit', this._doRequest, this);
                }
            },
            loading: function(modName, modVal) {
                console.log('visible: ', modVal);
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

        // …

        _doRequest: function() {
            this.setMod('loading');
            this._sendRequest();
        },

        _onSuccess: function(html) {
            this.delMod('loading');
            BEMDOM.update(this.elem('content'), html);
        }
    }))
})
```

We can use either JS functionality or CSS style rules on the same modifiers. Let's have the page content shaded while the page is loading. To achieve that, let's edit `./desktop.bundles/sssr/sssr.styl`:

```css
.sssr
{
    .spin
    {
        margin-left: 1em;
        vertical-align: middle;
    }

    &_loading .content
    {
        opacity: 0.5;
    }
}
```

Let's test our application: [localhost:3000](http://localhost:3000/). When a request is being sent and data is loading, the `spin` block should come up, and the page content should be shaded.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/10-sssr-server-spinner-mod.png)

#### Checking the form fields

Currently, if the input field is left blank and the service checkboxes are cleared, the form can still be sent. Let's modify this behaviour and add a method called `isEmpty()`:

`./desktop.blocks/form/form.js`:

```js
isEmpty: function() {
    return !this.findBlockInside('input').getVal().trim() ||
        this.findBlocksInside('checkbox').every(function(checkbox) {
            return !checkbox.hasMod('checked');
        });
}
```

We check the value of the `input` field and the modifier `checkbox_checked` and return the result of the check.

Now we need to include the newly-written check in the `sssr` block, before the request sending code:

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit', this._doRequest, this);
                }
            },
            loading: function(modName, modVal) {
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

    _doRequest: function() {
        if (this.findBlockInside('form').isEmpty()) {
            return;
        }
        this.setMod('loading');
        this._sendRequest();
    },

    _sendRequest: function() {
        //…

})
```

We have introduced additional checking for the form into `_doRequest()`, to verify that the input fields are filled in.

Let's make sure the form is not resent if the request is already in progress. To achieve that, we will rewrite the method `_sendRequest()` and add the methods `clear()` and `_updateContent()`.

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit', this._doRequest, this);
                }
            },
            loading: function(modName, modVal) {
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

    _doRequest: function() {
        if (this.findBlockInside('form').isEmpty()) {
            return;
        }
        this.setMod('loading');
        this._sendRequest();
    },

    clear: function() {
        this._xhr && this._xhr.abort();
        this._updateContent('');
        this.delMod('loading');
    },

    _sendRequest: function() {
        this._xhr && this._xhr.abort();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }
}));
})
```

#### Autoupdate on input field changes

Let's get the system to send a request and update the content automatically when a search query or checkbox selections are changed. To do that, let's edit the `form` block and add a `change` event handler for the `input` block.

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.bindTo('submit', this._onSubmit);
                    this.findBlockInside('input').on('change', this._onChange, this);
                }
            }
        },

        _onChange: function() {
            this.emit('change');
        },

        // …
})
```

We will listen for the `change` event in the `sssr` block — to do that, we need to edit the file `./desktop.blocks/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit change', this._doRequest, this);
                }
            },
    // …
}));
})
```

Let's add another such handler for changes in checkbox selections. To do that, let's edit the file `./desktop.blocks/form.js`:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.bindTo('submit', this._onSubmit);
                    this.findBlockInside('input').on('change', this._onChange, this);
                    BEMDOM.blocks.checkbox.on(this.domElem, 'change', this._onChange, this);
                }
            }
        },

        // …
})
```

We can check request sending upon form updates using the browser console:

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/11-sssr-server-onchange-network.png)

Right now typing a word into the field may trigger a lot of unnecessary requests that get sent with the entry of each new symbol. Let's add a delay on request sending. To do that, we'll use the module `debounce` from the `bem-core` package. Let's add it to the dependencies of the `sssr` blocks in the `sssr.deps.js` file:

```js
({
    shouldDeps: [
        { block: 'server' },
        { block: 'island', mods: { type: ['twitter'] }},
        {
            block: 'functions',
            elem: 'debounce'
        }
    ]
})
```

We will also add a wrapper method for delayed request sending. Please note that we have added `functions__debounce` to the modular system dependencies and get it as `debounce`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.findBlockInside('form').on('submit change', this._doRequest, this);
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },
        loading: function(modName, modVal) {
            this.findBlockInside('spin').setMod('visible', modVal);
        }
    },

    _doRequest: function(e) {
        this.setMod('loading');
        if (this.findBlockInside('form').isEmpty()) {
            this._clear();
            return;
        }
        e.type === 'change' ? this._debounceRequest(): this._sendRequest();
    },

    _clear: function() {
        this._xhr && this._xhr.abort();
        this._updateContent('');
        this.delMod('loading');
    },

    _sendRequest: function() {
        this._xhr && this._xhr.abort();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }

}));

});
```

Opening the application page in the browser helps confirm that requests are now sent with a delay. That is a good thing — it means we have optimized the code and reduced the number of requests sent to the server.

### Autorefresh

Let's add a capability for our application to refresh automatically at set intervals. We will enable autorefresh using a modifier on the `sssr` block and pass the parameters in a `params` object.

`index.bemjson.js`:

```js
{
    block: 'sssr',
    mods: { autorefresh: true },
    js: {
        url: '/search/',
        refreshInterval: 10000
    },
    // ...
}
```

Let's add the necessary files for the block modifier: `./desktop.blocks/sssr/_autorefresh/sssr_autorefresh.js`:

```js
modules.define('sssr', ['tick'], function(provide, tick, Sssr) {
    provide(Sssr.decl({ modName: 'autorefresh' }, {
        onSetMod: {
            loading: function(modName, modVal) {
                // calling block methods
                this.__base.apply(this, arguments);
                // reset if refresh is in progress
                // start timer when refresh is done
                modVal ? this._clearTimer(): this._setTimer();
            }
        },
        _setTimer: function() {
            this._counter = 0;
            tick.on('tick', this._onTick, this);
        },
        _onTick: function() {
            // check the time and send request on time
            (++this._counter * 50) % this.params.refreshInterval || this._sendRequest();
        },
        _clearTimer: function() {
            tick.un('tick', this._onTick, this);
        },
        getDefaultParams: function() {
            return {
                refreshInterval: 10000
            };
        }
    }));
});
```

We use `this._base` to extend the `sssr_loading` modifier. The module `tick` lets us carry out required actions at a set interval. One cycle is 50 ms. Checking the value of the `sssr_loading` modifier either clears or resets the timer.

The `refreshInterval` value is taken from the `sssr` block parameters if those are specified. We can specifie default parameters in the `getDefaultParams` method. If no value is set in the block parameters, it will be taken from the object returned by that method.

Now we just need to update the file with the `sssr` block dependencies. Let's edit `desktop.blocks/sssr/sssr.deps.js`:

```
({
    shouldDeps: [
        'server',
        {
            block: 'functions',
            elem: 'debounce'
        },
        {
            block: 'island',
            mods: { type: ['twitter'] }
        }
    ]
})
```

Let's test the application. It should refresh every 10 seconds.

### Optimization and refactoring

### Block search caching

If our blocks are not replaced dynamically at runtime, we can cache them in the memory so as not to run a search by the blocks each time.

We can store the execution result for the expression `this.findBlockInside('form')` in the `this._form` variable, and refer to it when needed. The same can be done for the `spin` block.

So we have all the necessary blocks cached during the `sssr` block initialization and can now use them in subsequent work, which saves us running unnecessary searches.

```js
modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._spin = this.findBlockInside('spin');
                this._form = this.findBlockInside('form')
                    .on('submit', this._doRequest, this);
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },
        loading: function(modName, modVal) {
            this._spin.setMod('visible', modVal);
        }
    },

    _doRequest: function(e) {
        this.setMod('loading');
        if (this._form.isEmpty()) {
            this._clear();
            return;
        }
        e.type === 'change' ? this._debounceRequest(): this._sendRequest();
    },

    _clear: function() {
        this._abortRequest();
        this._updateContent('');
        this.delMod('loading');
    },

    _abortRequest: function() {
        this._xhr && this._xhr.abort();
    },

    _sendRequest: function() {
        this._abortRequest();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: this.params.url,
            data: this._form.getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(result) {
        BEMDOM.update(this.elem('content'), result);
    }

}));

});
```

Also, we have moved the recurrent request cancellation code to a separate method called `_abortRequest()`.

#### Delayed initialization

If there are lots of blocks on the page, their automatic initialization can lead to an increase in load time and memory space consumed by the browser.

Instead we could employ event-triggered block initialization — something that is known as `lazy` or `live` initialization. You can find the detailed description of lazy initialization in the `i-bem.js` documentation.

Specifically, we don't need to have the `sssr` and `form` blogs initialized right at the start, they can be initialized when needed. Let's implement that idea in code: 

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._form = this.findBlockInside('form');
                this._spin = this.findBlockInside('spin');
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },

        loading: function(modName, modVal) {
            this._spin.setMod('visible', modVal);
        }
    },

    _clear: function() {
        this._abortRequest();
        this._updateContent('');
        this.delMod('loading');
    },

    _doRequest: function(needDebounce) {
        if (this._form.isEmpty()) {
            this._clear();
            return;
        }
        this.setMod('loading');
        needDebounce? this._debounceRequest() : this._sendRequest();
    },

    _sendRequest: function() {
        this._abortRequest();

        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            url: this.params.url,
            data: this._form.getVal(),
            cache: false,
            success: this._onSuccess.bind(this)
        });
    },

    _abortRequest: function() {
        this._xhr && this._xhr.abort();
    },

    _onSuccess: function(result) {
        this._updateContent(result);
        this.delMod('loading');
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }

}, {

    live: function() {
        this.liveInitOnBlockInsideEvent('submit change', 'form', function(e) {
            this._doRequest(e.type === 'change');
        });
    }

}));

});
```

Adding `live` initialization to the `form` block:

`./desktop.blocks/form/form.js`:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {

        js: {
            inited: function() {
                this._input = this.findBlockInside('input');
                this._checkboxes = this.findBlocksInside('checkbox');
            }
        }

    },

    // …

    isEmpty: function() {
        return !this._input.getVal().trim() ||
            this._checkboxes.every(function(checkbox) {
                return !checkbox.hasMod('checked');
            });
    }

}, {

    live: function() {
        var ptp = this.prototype;

        this
            .liveBindTo('submit', ptp._onSubmit)
            .liveInitOnBlockInsideEvent('change', 'input', ptp._onChange)
            .liveInitOnBlockInsideEvent('change', 'checkbox', ptp._onChange);
    }

}));

});
```

Thus by caching search results for the blocks `input` and `checkbox`, we have enhanced performance and discarded unnecessary `findBlockInside` operations.

### In conclusion

We have used the full BEM technology stack to build a search aggregator that gathers results from multiple social networking services. In doing that, we covered technologies from the server-side two-step templating to the client framework `i-bem.js`, learned about the BEMTREE template engine, which is used to build a BEM tree, and the BEMHTML template engine, which converts a BEM tree into HTML.

The [sssr](https://github.com/bem/sssr/tree/master/desktop.blocks/service/_type)
repository contains examples of implementations of service_type_* blocks using Instagram's and Yandex.Photo's APIs.

We hope this article is useful for you and fulfils its purpose of walking you through the process of creating a project. We have tried to keep it simple and straightforward to make it easier for the reader to get to grips with our technologies and try to use them in real-life projects.

We will be glad to hear your opinion of this article and to help you with anything you are still struggling with.

Feel free to share your thoughts and suggestions as well as ask questions you might have here or on our [forum](https://en.bem.info/forum/).
