The Yandex-developed BEM methodology has been the topic of many a Habr post. We have decided it's time to offer a more structured look into its origin and what made BEM what it is today. We believe it will be interesting not just for existing BEM practitioners but also for those who consider this methodology to be unsuitable for their particular projects. They may find that we were addressing issues similar to their own and discover something of benefit to themselves.

<img src="https://habrastorage.org/getpro/habr/post_images/09d/d3b/d6d/09dd3bd6d684e767c5f4d5b9564607d8.png" alt="image"/>

Naturally, it was Yandex’s own needs that kicked it all off. As the company grew, so did the number of staff involved in front-end development. Eventually the team reached the size when it became obvious that it would be difficult to work without some common standards. Besides, we are based in different Yandex offices in different cities. An idea of a common methodology emerged, one that would help set up processes in a big team working on different projects. Crucially, our goals were not limited to streamlining and speeding up the development process — we also wanted to shorten the learning curve for newcomers.

## What the BEM methodology is for
These are the requirements that we identified:

* Developers should always understand their own code (even a year on after they wrote it) as well as the code of any programmer in their BEM project team.
* Any code block can be re-used: we must create a common knowledge base and use ready-made solutions where possible instead of starting from scratch every time.
* When working in the same team, programmers, managers, designers, and front-end developers must all stick to the same terminology. In other words, they must use the same lingo.
* Teams can exchange engineers for implementing some specific functionality.
* The learning curve for anyone joining a new project must be shortened by using a standard organizational structure across all of the BEM projects and standard naming rules for all entities.


We were aiming for a model whereby having more developers in a team results in better quality of the product. That means that the developers must keep abreast of each other’s work and not reinvent something that’s already been implemented. We wanted to create a single team that works on different projects.

## The history of BEM evolution
### Front-end development 10 years ago
When we started out, things like component-based approaches or modularity weren’t even on the agenda. Web pages were built with all the CSS pushed into a single stylesheet, `project.css`, and JavaScript code, of which there was very little, placed in a single `project.js`, while images were stored in a separate folder called `images`.

Back in 2005, front end-wise, a standard Yandex project was a set of static HTML pages. In those days a typical project structure looked like this:

```files
about.html      # There was a separate HTML file for each page
index.html
…
project.css     # The styles for the entire project were kept in a single file
project.js      # The scripts for the entire project were stored in one file
images/         # Images were placed into a separate folder yandex.png
```

`id` , class and tag selectors were used in CSS rules.

**Example**

```css
    #foot div div div div
    {
        background-position: 54%;
        background-image: url(../i/foot-4.png);
    }
```

Back then our CSS code typically contained long cascade rules.

Minor changes required a fair amount of refactoring. Static HTML pages were manually copied into templates. If the HTML changed, corresponding changes had to be made to the template manually.

When it came to bigger projects, things were getting out of hand.


<a name="present"> </a>
### The basics of BEM methodology
Technologies (HTML, CSS, JavaScript) that we used varied from project to project, but the BEM principles had to be universal.

We formulated the main rules to govern the progress and development of our projects, rules that would be technology- and tool-agnostic.

To speed up the development process, we needed to make the maintenance of HTML and CSS for individual page components easier, to reduce code coupling. To achieve that, we split the page into separate parts. That’s how a new concept was born — a [block](https://en.bem.info/method/key-concepts/#block). A block could consist of different [elements](https://en.bem.info/method/key-concepts/#element), which were not used outside of the block itself. The state and behavior of a block and an element could be defined using [modifiers](https://en.bem.info/method/key-concepts/#modifier).

These were the three key concepts that most of the rules were based on. The acronym for the words **B**lock, **E**lement, **M**odifier gave the name to the methodology — BEM.


#### Block
A logically and functionally independent page component. A block is fully self-contained: it can have its own behavior, templates, styles, documentation, and more. Blocks can be placed on a page wherever you need them, the same block can be used more than once, even in different projects.

Blocks can be nested inside each other, grouped together, used for creating compound blocks.

<img src="https://habrastorage.org/getpro/habr/post_images/569/22d/95c/56922d95c9a9725976d8010279baf919.png" alt="image"/>


#### Element
A constituent part of a block that can’t be used outside of it and makes sense only in the context of its parent block. Elements can be mandatory or optional.

An important tip to bear in mind when dealing with elements: it is not recommended to create elements of elements. Embedding one element into another makes it impossible to change the internal structure of the block: elements cannot be swapped around, removed or added without modifying the existing code.

<img src="https://habrastorage.org/getpro/habr/post_images/f4f/9c7/a51/f4f9c7a516e679b4dec1e90eb25f6640.png" alt="image"/>


#### Modifier
A property of a block or an element that modifies their appearance, state or behavior.
A modifier has a name and it can also have a value. The use of modifiers is optional. One block or element can have several different modifiers.

For example, a modifier can be used to change not only the color of the sword but also its functionality (as is shown in the example with the red sword):

<img src="https://habrastorage.org/getpro/habr/post_images/81c/325/0b2/81c3250b2a8b7cbb09420e82aed2c34c.png" alt="image"/>


### Naming rules for CSS selectors
All of the BEM principles were developed and adopted in stages. We began by defining strict rules for naming CSS selectors.

In the BEM methodology, blocks are not unique and can always be re-used, so we abandoned the use of `id` selectors in describing CSS rules.

A block must neither be dependent on nor affect other blocks around it, which is why in CSS we abandoned the use of:

* Tags;
* Nested selectors;
* CSS Reset for the entire page.

A block became an important defining entity in the naming of selectors:

* The full name of an element/modifier is formed in such a way as to indicate what block this element/modifier belongs to.
* The name of an element modifier must give a clear indication as to what specific element of what specific block this modifier belongs to.



#### Naming rules for BEM entities

* Every BEM entity must have its class.
* Only class names are used to describe CSS properties for blocks, elements, and modifiers.
* Individual words within names are separated by a hyphen (`-`).
* An element name is delimited by a double underscore (`__`). A modifier name is delimited by a single underscore (`_`).
* Names of BEM entities are written using numbers and lowercase Latin characters.

We experimented with prefixed names for quite a while, but in the end decided to drop them.

**Example**

* Block name — `header`.
* Block element name — `header__search-form` — the element `search-form` of the block `header`.
* Block modifier name — `header_theme_green-forest` — the modifier `theme` witht the value `green-forest` of the block `header` .
* Element modifier name — `header__search-form_disabled` — the boolean modifier `disabled` of the element `search-form` of the block `header`.


HTML

```html
<div class="header header_theme_green-forest"> ...</div>
```

CSS

```css
.header { color: red; }
```

There are also some [alternative naming schemes](https://en.bem.info/method/naming-convention/#alternative-naming-schemes). You are free to choose whichever one you like.

However, we recommend using the scheme above as it is the one that the BEM platform tools are specifically geared towards.


### BEM in HTML
We wanted to structure HTML and eventually found ourselves no longer writing HTML manually. For details, see the section describing the [BEM tools](#tools).

In HTML, every BEM entity is defined by its class name.

```html
<div class="block-name">
    <div class="block-name__elem"> </div>
    ...
</div>
```

In the simplest case, there is a one-to-one correspondence between a block and a DOM node. However, a DOM node does not always equal a block. A single DOM node can host several BEM entities. This is called a [mix](https://en.bem.info/method/key-concepts/#mix).

Mixes allow you to

* Combine the behaviors and styles of several BEM entities while avoiding code duplication.
* Create semantically new interface components on the basis of existing blocks, elements, and modifiers.
* Define the position of a nested block inside its parent without creating any additional modifiers.


**Example**

In a project, buttons are implemented with a block called `button`. We need to put a button in a search form (`search-form`) and indent the button. Let's use a mix of the `button` block and the `button` element of the `search-form` block:

```html
<div class="search-form">
    <div class="button search-form__button"> </div>
</div>
```

The mix allows us to use a universal button that knows nothing of the indentation within the borders of a specific form. In this case there is an element — `search-form__button` — inside the search form, which knows its position, and a block — `button` — which must be displayed.

Instead of a mix we could create an extra modifier for the `button` block, but this method is not recommended as the positioning of the `button` block is not part of the universal block semantically but only is applicable to its specific place of use.


### File system organization
We weren’t quite happy with the original project file structure: it was difficult to navigate and locating needed entity technologies within it wasn't too easy, either.

What we were looking to achieve with the new structure:

* A unified file system for all BEM projects.
* A universal extensible repository structure. For any new technology that is added to a project, associated files are stored in a pre-determined location.
* A quick search through the file system of a project.
* Code re-use.
* Unlimited moving of the code of an entire block between projects.


At first we tried organizing the project repository by technology:

```files
css/
html/
js/
xml/
xsl/
```

This approach didn’t yield any significant changes. So we moved the common part of the code that can be shared between projects and platforms into a separate directory called `common`. Specific implementations required only for certain projects were stored separately, in a directory called `service`. Another directory — `examples` — was used to store examples.

```files
common/
    css/
    js/
    xml/
    xsl/
    example/
    html/
    service/
    auto/
    css/
    xml/
```

Locating the necessary code for specific projects thus became easier. But even this structure didn’t fulfill all of our requirements.


#### Blocks before technologies
In a bid to create the desired project structure and fulful our goals, we shifted the focus from technologies to blocks.

A block in a file system is absolutely independent: all the technologies required for its implementation are kept in the block directory.


##### What we achieved
**Faster development**

* Blocks can be re-used.
* Block implementations can be modified on a new redefinition level without affecting the basic functionality and styles.
* A block is an independent page component; everything that is needed to ensure the proper functioning of a block is contained within the block directory. This makes it easy to move blocks from project to project: you only need to copy the block directory.

**Faster refactoring**

* Developers work with small blocks of code.
* The implementation technologies of one block are separated from those of any other block.
* The uniform repository structure allows you to navigate the project and locate necessary files easily.

**Universal extensible system**

* Redefinition levels appeared.
* The number of technologies is unlimited. Any new implementation technologies is contained in a file for a specific block. For instance, we weren't expecting to write unit tests in JavaScript at the time of creating the new file structure. But when later we found ourselves needing to do just that, we knew where in the project to put the files.

#### Implementation technologies
We invented a new term — **implementation technology**.

Blocks can have different functions on a page. The implementation of a block may vary depending on its purpose. In BEM, implementation means behavior, appearance, templates, documentation for a block, all types of tests, images, etc.

Blocks can be implemented in one or more technologies, for example:

* behavior — JavaScript, CoffeeScript
* appearance — CSS, Stylus, Sass
* templates — Jade, Handlebars, XSL, BEMHTML, BH
* documentation — Markdown, Wiki, XML.

You are not limited in your choice of implementation technologies, except maybe by your project requirements.

The new file structure is organized in such a way that each implementation technology is represented by an individual file with the corresponding extension. All implementation files for a block are stored in that block’s directory.

The whole project is then rebuilt around this new principle. The block becomes the key concept in BEM. The file system structure is modified accordingly.


#### Principles of file system organization for BEM projects

* A block is represented by a separate directory in the file system. The block directory has the same name as the block.
* A block implementation is divided into separate files.
* Files related to a block are always stored in the block directory.
* Optional elements and modifiers are stored in separate files.
* A project is divided into [redefinition levels](https://en.bem.info/method/key-concepts/#redefinition-level).


**Example**

```<source lang="files">
blocks/
    input/                  # input block directory
        _theme/             # theme optional modifier directory
            input_theme_forest.css # Implementation of theme modifier with the value forest in CSS technology
        __clear/             # clear optional modifier directory
            input__clear.css # Implementation of clear optional modifier in CSS technology
            input__clear.png # Implementation of clear element in PNG technology
        input.css            # input block in CSS technology
        input.js             # input block in JavaScript technology
    button/                  # button block directory
        button.css
        button.js
        button.png
```

##### Redifinition level

Redefinition level is the term we use to refer to directories containing block implementations. The introduction of levels enabled us to change the implementation of a block by adding new properties (extending) or modifying old ones (overriding) on a different level. The final implementation of a block is assembled from all the levels in consecutive order.

Redefinition levels allow us to
* Link libraries and update them without changing the code.
* Store common parts of block implementations on one level and specific instances (e.g., specific implementation for particular services) on another.
* Divide a project into platforms. Store implementation common to all platforms on one level and store platform-specific implementation on another.
* Avoid code duplication and the creation of new entities if existing functionality needs to be changed. If we compare levels to layers, then the basic layer is the original implementation of the block, and each next layer is added on top and complements (inherits) or modifies the basic implementation.

<img src="https://habrastorage.org/getpro/habr/post_images/a9f/9a7/157/a9f9a71573795ac5d54e513b4141a2af.png" alt="image"/>

**Example**

```files
project/            # project level
    input/          # Modified implementation of input block
    button/
    header/
library-blocks/     # Library level
    input/          # Basic implementation of input block
    button/
    popup/
```


### How to get started with BEM
As you may have noticed, our team implemented BEM in stages. The flexibility of BEM allows you to adapt this methodology to your current processes.

There is no “one-size-fits-all” way to start using the methodology in your project. Each particular team integrates it into their development process and uses it in a way that best suits them.

Say, you have a project where you would like to use BEM only for the layout. You use CSS and HTML in the project, so you can start with naming rules for CSS selectors. This is the most common way of applying the BEM methodology. As such, it is the starting point for a lot of teams. This is also how we got started.

As more new rules get introduced, the need for your own tools and technologies makes itself felt.


#### BEM and its technologies
In web development, a final product is a mix of different technologies (e.g., HTML, CSS, JavaScript). The main principle of the BEM methodology is to use unified terms and implementation approaches in all the technologies that you use.


##### JavaScript
To operate in BEM terms and write declarative JavaScript that could be separated into redefinition levels, we introduced our own framework — [i-bem](https://en.bem.info/technology/i-bem/).


##### BEM tree
Our typical web development process basically consisted in writing HTML and then copying the result into templates. If the design changed, we’d have to manually edit the HTML and the templates.
To eliminate the manual work, we added a new abstraction level — a **BEM tree**, which allowed us to manipulate a web page structure in terms of blocks, elements, and modifiers. A BEM tree is an abstraction over a DOM tree.

A BEM tree describes all the BEM entities that are used on a page, their states, their order, and nesting. It can be presented in any format that supports a tree-like structure, such as XML or JSON.

**Example**

Let's say we have the following DOM tree:

```html
<header class="header">
    <img class="logo">
    <form class="search-form">
        <input type="input">
        <button type="button"></button>
    </form>
    <div class="lang-switcher"></div>
</header>
```

The corresponding BEM tree looks like this:

```files
header
    logo
    search-form
        input
        button
    lang-switcher
```

It can be compared to the [Jade](http://jade-lang.com/) templating engine, but the difference is that we use abstractions instead of HTML.

This is what the same BEM tree will look like in XML and BEMJSON formats:

XML

```xml
<block:header>
    <block:logo/>
    <block:search-form>
        <block:input/>
        <block:button/>
    </block:search-form>
    <block:lang-switcher/>
</block:header>
```

[BEMJSON](https://en.bem.info/technology/bemjson/) is a JavaScript format that lets you operate in BEM terms. BEMJSON allows you to describe a page in terms of blocks, elements, and modifiers, abstracting away HTML markup.

```javascript
{
    block: 'header',
    content : [
        { block : 'logo' },
        {
            block : 'search-form',
            content : [
                { block : 'input' },
                { block : 'button' }
            ]
        },
        { block : 'lang-switcher' }
    ]
}
```

We describe a page that we want to see in a browser as a BEM tree instead of writing HTML code manually: the [BEMHTML](https://en.bem.info/technology/bemhtml/v2/rationale/) template engine then processes the BEMJSON and generates the HTML.


<a name="tools"> </a>
#### BEM and its tools
To make it easier for developers to work with all the different technologies, we decided on a structure whereby a project is divided into many separate files. That gave us the advantages described above. However, [code building](https://en.bem.info/method/build/) and optimization were also needed to make the code work in a browser.

Assembling files manually was impractical, so we set about automating a lot of routine processes. This resulted in the creation of [bem-tools](https://en.bem.info/tools/bem/bem-tools) — a toolkit for working with BEM files. bem-tools was later superseded by [ENB](https://en.bem.info/tools/bem/enb-bem/).

To be able to assemble unrelated files spread throughout the system, we introduced a technology called [DEPS](https://en.bem.info/technology/deps/), which specifies the dependencies of one block on another one or a set of blocks.

The BEM tools are intended to give the developer leeway as far as coding is concerned, leaving it for robots to take care of optimization and linking relevant files to the project in a correct order.


#### BEM and its libraries
A lot of BEM libraries are available as open-source software. The following are the the main ones:

* [bem-core](https://en.bem.info/libs/bem-core/) — the core block library containing the JavaScript framework `i-bem` as well as 20 helper blocks for web development in BEM terms.
* [bem-components](https://en.bem.info/libs/bem-components/) — a universal library of ready-made visual components (blocks). It contains form controls and other basic components for creating interfaces.

The bem-components library can be linked Bootstrap-fashion: add the pre-built library files and insert them into the HTML pages using the `link` and `script` elements.

```html
<link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
<script src="https://yastatic.net/bem-components/latest/desktop/bem-components.js+bemhtml.js"> </script>
```

This distribution method is known as [Dist](https://en.bem.info/libs/bem-components/v2.4.0/) and includes pre-built CSS and JavaScript code and templates. You won't need build tools or template engines with it, as all the blocks are already built and working.

To learn about linking files via CDN or locally, using bower or building library files from source code, read the [library description](https://en.bem.info/libs/bem-components/current/#usage).


#### Project stub
The quickest way to start with your own BEM project is by using [project-stub](https://en.bem.info/tutorials/project-stub/) — a project with pre-configured technologies and tools. You can familiarize yourself with it using [Quick start with BEM](https://en.bem.info/tutorials/quick-start-static/).

The extended example of using project-stub is discussed in the [Starting your own BEM project](https://en.bem.info/tutorials/start-with-project-stub) tutorial.


### In conclusion
The BEM methodology is a set of rules and guidelines on how to organize your work on a project.

Somewhere along the line we separated the methodology from its practical implementation — the platform.
The BEM platform is an instance of the implementation of BEM's general principles. Since all the technologies were designed to meet the requirements of our projects and kept evolving over time, the BEM platform encompasses all the possibilities offered by the BEM methodology. You can read about it in detail [here](https://en.bem.info/method/).

All parts of the BEM platform are integrated to work together but can be also used individually. Each part serves a specific purpose and can be adapted to your process or substituted for some other part.

Choose whatever suits you project best, feel free to experiment. You can even upload your projects to our [website](https://en.bem.info/built-with-b/). We appreciate your feedback.
