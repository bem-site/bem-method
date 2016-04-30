# The history of BEM
Once upon a time, in a distant country far-far away, an IT company named [Yandex](https://company.yandex.com) started developing web search
and affiliated services. Time went by and services were growing, and more and more front-end developers put
their tireless efforts into improving the ecosystem of Yandex.

Great things they did, and amazing tools they built, making their developers lives easier,
and times now have come to share that knowledge with the community, to embrace the magic power
of Open Source and benefit all good people around.

This article tells about Yandex front-end developers constantly revising and improving the way they build web pages.
Front-end developers are well known for their enormous curiosity (that often brings innovation) and their remarkable
laziness that makes them devise sophisticated systems to save precious time, to unify and automate everything.

This is how many exciting things were born into life, but now let's travel back in time to 2005 and sneak a peek over
a shoulder of a really-really-busy Yandex front-end developer, and thus see...

## ...where it all began
Back in 2005, the focus was still pretty much on the server side of things. From frontender perspective, a typical Yandex project was a set of static HTML pages that served as a base reference for creating advanced templates like XSL stylesheets.

These pages were kept in a separate folder and looked like this after a checkout:

```files
about.html
index.html
…
project.css
project.js
i/
  yandex.png
```

There was a static HTML file for each page, with all the CSS pushed into a single stylesheet, `project.css`,
and all Javascript placed in a single `project.js`; both files were shared between project pages.

At those times, JavaScript was only sparsely applied to some controls, so all the interaction magic for the whole
project could fit comfortably into a single small file.

Images were placed into a separate folder, as they were numerous. With IE 5 roaming in the wild and no CSS3,
images were used for all sorts of eye-candy, even for creating rounded corners (although none of the younger
web developers would probably believe me :-)).

To keep some structure, style definitions for different page sections were separated using plain
CSS comments like this:

```css
/* Content container (begin) */
    #body
    {
        font: 0.8em Arial, sans-serif;

        margin: 0.5em 1.95% 0.5em 2%;
    }
/* Content container (end) */

/* Graphical banner (begin) */
    .banner
    {
        text-align: center;
    }

    .banner a
    {
        text-decoration: none;
    }
/* Graphical banner (end) */
```

Both IDs and classnames were used in the HTML markup.

Static HTML was manually copied into production XSL stylesheets, and all changes were synced two-way, manually.

That was hard, and even when it wasn't hard, it was dull.

## Mid-scale projects
At the beginning of 2006, the first version of Yandex.Music had been under heavy development.
Multiple pages, each unlike the other, didn't fit well into familiar simplistic concepts.

Dozens of CSS classes you had to invent meaningful names for, a growing number of unintentional
dependencies spread along the project — all that had been calling for a better solution.

Typical piece of CSS code from those days:

```css
/* Albums (begin) */
    .result .albums .info
    {
        padding-right: 8.5em;
    }

    .result .albums .title
    {
        float: left;
        padding-bottom: 0.3em;
    }

    .result .albums .album .listen
    {
        float: left;
        padding: 0.3em 1em 0 1em;
    }

    .result .albums .album .buy
    {
        float: left;
        padding: 0.4em 1em 0 1.6em;
    }

    .result .albums .info i
    {
        font-size: 85%;
    }
/* Albums (end) */
```

See that long cascade rules are used throughout the code.

Have another look:

```css
/* Background images (begin) */
    #foot div
    {
        height: 71px;
        background: transparent url(../i/foot-1.png) 4% 50% no-repeat;
    }

    #foot div div
    {
        background-position: 21%;
        background-image: url(../i/foot-2.png);
    }

    #foot div div div
    {
        background-position: 38%;
        background-image: url(../i/foot-3.png);
    }

    #foot div div div div
    {
        background-position: 54%;
        background-image: url(../i/foot-4.png);
    }

    #foot div div div div div
    {
        background-position: 71%;
        background-image: url(../i/foot-5.png);
    }

    #foot div div div div div div
    {
        background-position: 87%;
        background-image: url(../i/foot-6.png);
    }
/* Background images (end) */
```

See that `id` and tag names selectors are used in many rules.

At the same time, even bigger project was started — [Yaru](http://wow.yandex.ru) — a blogging platform, a place for people to interact, to share, to read and to engage.

There were dozens of various pages to support, and with the old-fashioned approach the code was running out of control on many levels.

### Blocks to the rescue
We needed to specify a data domain for managing page interface objects. This was a methodology thing,
we needed to put more clarity into the way we work with concepts like
`class`, `tag`, `visual component` etc.

For a typical web page of a Yandex project, HTML structure and its CSS styles were still the focus of
our development efforts, and JavaScript was understood as a supplementary technology.

For easier maintenance of HTML/CSS for many different components, a new term was invented: `block`.
Block is a part of a page design or layout having its specific and unique meaning defined either
semantically, or visually.

In most cases, any distinct page element (either complex or simple) may be seen as a block.
Then its HTML container gets a unique CSS class, which is also used as a block name.

CSS classes for blocks got prefixes (`b-`, `c-`, `g-`) to provide sort of a namespace emulation in CSS.

The naming convention itself was changed later, here's the initial list explained:
 * **b-**  block
   an independent block, placed on a page wherever you need it
 * **с-**  control
   a control (an independent block) with a JavaScript object bound to it
 * **g-**  global
   a global definition, used sparingly and always defined for a specific, unique reason;
   the number of these definitions kept at a minimum.

Some suffixes were employed as well, e.g.:
 * **-nojs**   no javascript
   style rule to be applied with JavaScript turned off. The onload callback may contain an `init()`
   function call that removes these suffixes from all objects, thus semantically marking them
   up as "JavaScript-enabled".

### What's inside?
In an HTML container forming a block, some nodes get a distinct CSS classname. This not only facilitates the creation of tagname-independent style rules, but also assigns semantically meaningful roles to each node. Such inner nodes are called "block elements", or simply "elements".

The core distinction between a block and an element is the element's inability to exist out of its parent block context. As long as you cannot detach something from a block, it's an element; detachable elements (probably) should become blocks themselves.

At first, elements could have been defined only inside their parent block container; later, a technique was provided to place some elements outside and still keep a block consistent.

In stylesheets, elements with lots of CSS got extra indentation and were wrapped in comments:

```css
/* Head (begin) */
    .b-head { … }

    /* Logo (begin) */
        .b-head .logo { … }
        .b-head .logo a { … }
    /* Logo (end) */

    /* Right side (begin) */
    .b-head .right { … }

        /* Info (begin) */
            .b-head .info { … }
            .b-head .info .exit a { … }
        /* Info (end) */

        /* Search (begin) */
            .b-head .search { … }
            .b-head .search div div, .b-head .search div div i { … }
        /* Search (end) */
    /* Right side (end) */
/* Head (end) */
```

### Project file structure evolves
At Yandex, a front-end developers usually support more than one project.

Switching between different repositories and various branches is easier when all projects
use the same (or very similar) file structure.

Granularity is another requirement as it provides more flexibility for version control systems
and helps avoid conflicts during concurrent development.

This led us to a more unified structure.

CSS, JavaScript, and image files reside in separate folders.

JavaScript was employed more and more daily, thus the addition of optional components and libraries.

Typical file structure:

```files
index.html
css/
  yaru.css
  yaru-ie.css
js/
  yaru.js
i/
  yandex.png
```

MSIE-specific hacks could have gone into the main CSS file (`yaru.css`) if they were in compliance with the CSS standards:

```css
/* Common definitions (begin) */
    body
    {
        font: 0.8em Arial, sans-serif;

        padding: 0 0 2em 0;
        background: #fff;
    }

    * html body
    {
        font-size: 80%;
    }
```

Non-valid workarounds were put in a standalone `yaru-ie.css` (loaded with IE-only conditional comments).

```css
/* Common blocks (begin) */
    /* Artist (begin) */
        .b-artist .i i
        {
            top: expression(7 + (90 - this.parentNode.getElementsByTagName('img')[0].height)/2);
            filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../i/sticker-lt.png', sizingMethod='crop');
        }
```

## Building up a framework: the beginning
Designing similar projects eventually leads to re-creating the same blocks over and over again.

Yandex is a portal having more than 100 services sharing the same corporate style, so careless
copy/paste doesn't work really well on this scale.

So, to have something to begin with, we had a small compilation of reusable components, which
inside Yandex was referred to as "common blocks library", or simply "the Common".

First page fragments to be unified were: header, footer and some typographic CSS definitions.

The corresponding files were hosted on an internal dedicated server (**common.cloudkill.yandex.ru** in the listings below).

This was the very beginning of our unified framework.

Styles could be imported directly from that server:

```css
@import url(http://common.cloudkill.yandex.ru/css/global.css);
@import url(http://common.cloudkill.yandex.ru/css/head/common.css);
@import url(http://common.cloudkill.yandex.ru/css/static-text.css);
@import url(http://common.cloudkill.yandex.ru/css/foot/common-absolute.css);
@import url(http://common.cloudkill.yandex.ru/css/foot/common-absolute-4-columns.css);
@import url(http://common.cloudkill.yandex.ru/css/list/hlist.css);
@import url(http://common.cloudkill.yandex.ru/css/list/hlist-middot.css);
@import url(http://common.cloudkill.yandex.ru/css/dropdown/dropdown.css);
@import url(http://common.cloudkill.yandex.ru/css/dropdown/dropdown-arrow.css);
@import url(slider.css);

/* Header (begin) */
    /* Service (begin) */
        .b-head .service h1 { … }
        .b-head .service h1, .b-head .service h1 a, .b-head .service h1 b { … }
```

Obviousy, too many imports, page loads slowly! So, we decided to pre-compile styles (and later, JS files) before deployment.

The compilation replaces `@import` directives with the actual contents of external files (this is called `inlining`)
and performs more optimizations, e.g. unrequired to browser whitespaces and comments.

Our internal inlining tool evolved from a simple wrapper perl script into an open source project [borschik](https://en.bem.info/tools/optimizers/borschik/); try it out!

## Independent blocks as a concept
By the fall of 2007, our everyday practice got some theory behind it.

The Independent Block concept, which was by that time the basis of our HTML layouts,
was featured at the ClientSide'2007 conference in Moscow, Russia.

In that presentation, the first attempt to define a `block` has been made.

### Blocks: the declaration of idependence
In our attempt to produce a formal (in fact, semi-formal) declaration of `block`, the following 3 principles were highlighted:
  1. Only classnames (not IDs) should be used to describe styles;
  1. Each block classname has a prefix;
  1. Any CSS rules except ones prefixed with g- must belong to a block.

As soon as unique IDs are dropped, the same block can be used on the same page more than once.
This also allows two or more classes to co-exist on the same DOM node, which turned out to be quite useful later.

#### Blocks simple and compound: the misclassification
We defined simple blocks as not being able to contain another blocks anywhere inside their markup.

Compound blocks were allowed (or sometimes, required) to have nested blocks embedded.

This classification was naive; even the simplest blocks sometimes were wrapped around other blocks
and had to be "upgraded" and refactored to fit the new role.

This misclassification in fact had struck back in so many cases that we had finally accepted the opposite
principle: any block should allow for arbitrary content to be embedded, whenever possible.

#### Completely independent blocks
CSS definitions aren't bulletproof when we mix a lot of styled content originating from different sources
on a single web page.

In complex layouts, blocks may alter each other appearance because of element names conflicts.
Tagname-based CSS rules may match more tags than we intended them to.

As soon as we had to fight these and similar bugs in production, a strict version of an independent block
(named Absolutely Independept Block, abbreviated AIB) was defined with the following extra rules:

  1. never match CSS to tagnames, use classnames for everything:
    `.b-user b -> .b-user .first-letter`
  2. classnames for block elements must be prefixed with the parent block name:
    `.b-user .first-letter -> .b-user-first_letter`

Such classnames tend to be much longer, and the resulting HTML code is considerably bigger in size.

This was the main reason why AIB was considered a "costly solution" to be used more as a remedy, not as an everyday practice.

#### Prefixes
As everybody is aware nowadays, giving names to variables is one of the most difficult problems in development, ever.

We approached it cautiously, and invented four prefixes allowed for block names, each one with its own semantics:

  * **b-**
    common blocks
  * **h-**
    holsters, used for gluing several elements together
  * **l-**
    layout grids
  * **g-**
    global styles

#### Modifications
`Modification` can be defined as a specific state of a block, or as a flag that holds some specific property.

This is best explained with an example: a block representing a button may have three default sizes: small, normal and big.

Instead of creating 3 different blocks, you should assign a `modification` to your block. The modification requires
a name (e.g. `size`) and a value (`small`, `normal` or `big`).

There are two reasons for a block to get a modification:
  1. Block may alter its presentation according to its placement in the layout.
     Such modification is called `context-dependent`.
  1. An additional (postfixed) classname may change block appearance. This is a context-independent (postfix-based) modification.
     `class="b-block b-block-postfix"`

## Unified portal-wide framework
At the beginning of 2008, Yandex had been going through a major review of its internal design policies. We decided to create a brand book (for internal use) to enforce best practices in interface design, company-wide.

This task was assigned to the front-end team, and after some pondering of options, we decided to proceed with technologies we were the most proficient with, namely: HTML and CSS code.

Interfaces evolve fast, so fast that any long-term attempt to describe interfaces with words and pictures will become obsolete even before completion. We needed a brand book that would represent our interfaces as they were: changing rapidly and still unified between different Yandex services and products.

Therefore, we decided that our interface brand book should be built with the same blocks we used to build our web sites. Blocks could be shared between projects and represent the latest in Yandex interface design.

We decided to build a portal-wide framework of blocks so all could benefit from it and contribute back. The project was internally named `Lego`.

### Lego repository structure, first approach
The topmost level corresponded to various available `implementations`:

```files
css/
html/
js/
xml/
xsl/
```

Each implementation contained its own sub-structure of folders.

CSS went into 3 different folders:

```files
css/
  block/
    b-dropdown/
      b-dropdown.css
  service/
    auto/
      block/
        b-head-logo-auto.css
      head.css
  util/
    b-hmenu/
      b-hmenu.css
```

 1. block — blocks shared between services
 1. util — general-purpose blocks ready to be opensourced
 1. service — CSS styles for specific Yandex services, used for branding, header/footer etc.

HTML folder structure was identical to CSS:

```files
html/
  block/
    b-dropdown.html
  service/
    auto/
      l-head.html
  util/
    b-hmenu.html
```

JavaScript was yet loosely structured and used inconsistently between services:

```files
js/
  check-is-frame.js
  check-session.js
  clean-on-focus.js
  dropdown.js
  event.add.js
  event.del.js
```

Each service had a corresponding XML file semantically describing its page header (and providing necessary project-specific data), which in conjunction with an XSL stylesheet generated header HTML code.

```files
xml/
  block/
    b-head-tabs-communication.xml
    common-services.ru.xml
    head-messages.ru.xml
  service/
    auto/
      head.xml
```

XSL templates for various blocks (one file per block) were contained in one folder:

```files
xsl/
  block/
    b-dropdown.xsl
    b-head-line.xsl
    i-common.xsl
    i-locale.xsl
    l-foot.xsl
    l-head.xsl
```

What about integration?

Lego is linked to projects with the help of a version control feature known as `svn:externals`.

When a package is built for production deployment, the external library (Lego) code is embedded into the package; this is similar to static library linking in compiled languages.

Lego provides an SVN branch for each of its major releases; sticking to a branch in svn:externals allows for hotfixes to arrive to a project; for extreme stability, project can freeze at a specific Lego revision. In either case, major versions switches can be prepared and made whenever necessary.

This simple technique proved quite flexible and is employed up to this day by many Yandex services.

#### Per-page files
Files linked from web pages were mostly importing corresponding block implementations from the Lego folder structure.

```css
@import url(../../block/l-head/l-head.css);
@import url(../../block/b-head-logo/b-head-logo.css);
@import url(../../block/b-head-logo/b-head-logo_name.css);
@import url(block/b-head-logo-auto.css);
```

The consistency of import directives was maintained manually.

At that point, we didn't yet come to a unified file naming convention and tried several approaches.

## Portal-wide framework lego 1.2 (2008)
Upon releasing Lego version 1.2, the code had been refactored and folder structure had changed.

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

Blocks previously separated and placed in `util` and `block` folders are now combined. Common styles shared by most blocks are stored in common/css.

We had been pondering the possibility of open-sourcing the code but postponed it until two years later.

```files
common/
  css/
    b-dropdown/
      arr/
        b-dropdown.arr.css
        b-dropdown.arr.ie.css
        b-dropdown.css
        b-dropdown.ie.css
```

MSIE-specific styles were renamed from *-ie.css to *.ie.css.

All contents of optional CSS files (such as `b-dropdown_arr.css`) was moved into separate folders (`arr/b-dropdown.arr.css`).

For classname-based modification of a block, the underscore was assigned as a separator, replacing a single dash that was used previously.

This made a block name visually separated from a modificator name, and proved quite useful while developing automated tools, as it allowed for unambiguous search and pattern matching.

## BEM, est. 2009
In March of 2009, Lego 2.0 had been released.

That event marked the end of the "independent blocks" epoch and formation of the BEM methodology.

BEM stands for Block, Element, Modifier; these are three key entities we use to develop web components.

### Lego 2.0 in 2009
What was the key update the 2.0 version had delivered?

What really changed our understanding of the methodology was the primacy of `block` regardless of the underlying implementation technologies.

Each block is contained in a separate folder; each technology (CSS, JS, XSL etc.) is represented by a separate file. Documentation just gets its own file type such as `.wiki`.

What additional terms did we operate on at that time?

#### Terminology excerpts
`Independent Block` may be used on any web page and placed anywhere in the layout.

In XML we apply XSL stylesheets to, the block is represented by a node in `lego` namespace:

```xml
<lego:l-head>
<lego:b-head-logo>
```

In HTML, block container gets a classname exactly corresponding to its name:

```html
<table class="l-head">
<div class="b-head-logo">
```

CSS:

```css
.l-head
.b-head-logo
```

All block files (CSS, JS, HTML, XSL) are stored in block folder:

```files
common/
  block/
    b-head-logo/
      b-head-logo.css
      b-head-logo.xsl
      b-head-logo.js
      b-head-logo.wiki
```

In XML files that describe page structure, blocks are described with nodes in `lego` namespace; block name prefix is omitted:

```xml
<lego:b-head-logo>
    <lego:name/>
</lego:b-head-logo>
```

HTML classes inside the block have their prefixes omitted as well.

```html
<div class="b-head-logo">
    <span class="name">Авто</span>
</div>

.b-head-logo .name { ... }
```

Files related to inner elements each get their own folder:

```files
common/
  block/
    b-head-logo/
      name/
        b-head-logo.name.css
        b-head-logo.name.png
        b-head-logo.name.wiki
```

Modifiers in XML are specified as node attributes in `lego` namespace:

```xml
<lego:b-head-tabs lego:theme="grey">
```

In HTML, an extra classname is added:

```html
<div class="b-head-tabs b-head-tabs_grey">

.b-head-tabs_grey { ... }
```

Modifier files (styles etc.) go into separate folders prefixed with an underscore:

```files
common/
  block/
    b-head-logo/
      _theme/
        b-head-logo_gray.css
        b-head-logo_gray.png
        b-head-logo_gray.wiki
```

#### Declaration in XML
All Lego components used in a project are described in an XML file:

```xml
<lego:page>
    <lego:l-head>
        <lego:b-head-logo>
            <lego:name/>
        </lego:b-head-logo>

        <lego:b-head-tabs type="search-and-content"/>
```

This XML allows for CSS imports to be generated:

```css
@import url(../../common/block/global/_type/global_reset.css);
@import url(../../common/block/l-head/l-head.css);
@import url(../../common/block/b-head-logo/b-head-logo.css);
@import url(../../common/block/b-head-logo/name/b-head-logo.name.css);
@import url(../../common/block/b-head-tabs/b-head-tabs.css);
@import url(../../common/block/b-dropdown/b-dropdown.css);
@import url(../../common/block/b-dropdown/text/b-dropdown.text.css);
@import url(../../common/block/b-pseudo-link/b-pseudo-link.css);
@import url(../../common/block/b-dropdown/arrow/b-dropdown.arrow.css);
@import url(../../common/block/b-head-search/b-head-search.css);
@import url(../../common/block/b-head-search/arrow/b-head-search.arrow.css);
@import url(../../common/block/b-search/b-search.css);
@import url(../../common/block/b-search/input/b-search.input.css);
@import url(../../common/block/b-search/sample/b-search.sample.css);
@import url(../../common/block/b-search/precise/b-search.precise.css);
@import url(../../common/block/b-search/button/b-search.button.css);
@import url(../../common/block/b-head-userinfo/b-head-userinfo.css);
@import url(../../common/block/b-head-userinfo/user/b-head-userinfo.user.css);
@import url(../../common/block/b-user/b-user.css);
@import url(../../common/block/b-head-userinfo/service/b-head-userinfo.service.css);
@import url(../../common/block/b-head-userinfo/setup/b-head-userinfo.setup.css);
@import url(../../common/block/b-head-userinfo/region/b-head-userinfo.region.css);
@import url(block/b-head-logo/b-head-logo.css);
@import url(block/b-head-search/b-head-search.css);
```

This example shows that common styles are imported first; then, project styles add extra definitions or redefine some of the common blocks. This makes project-specific changes possible while maintaining a common shared codebase.

Same XML declarations allow for JS includes to be autogenerated.

```js
include("../../common/block/i-locale/i-locale.js");
include("../../common/block/b-dropdown/b-dropdown.js");
include("../../common/block/b-search/sample/b-search.sample.js");
include("../../common/block/b-head-userinfo/user/b-head-userinfo.user.js");
```

XSL templates imports are autogenerated as well, using the same XML-based definitions:

```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:import href="../../common/block/i-common/i-common.xsl"/>
<xsl:import href="../../common/block/i-items/i-items.xsl"/>
<xsl:import href="../../common/block/l-head/l-head.xsl"/>
<xsl:import href="../../common/block/b-head-logo/b-head-logo.xsl"/>
<xsl:import href="../../common/block/b-head-logo/name/b-head-logo.name.xsl"/>
<xsl:import href="../../common/block/b-head-tabs/b-head-tabs.xsl"/>
<xsl:import href="../../common/block/b-dropdown/b-dropdown.xsl"/>
<xsl:import href="../../common/block/b-pseudo-link/b-pseudo-link.xsl"/>
<xsl:import href="../../common/block/b-head-search/b-head-search.xsl"/>
<xsl:import href="../../common/block/b-search/b-search.xsl"/>
<xsl:import href="../../common/block/b-search/input/b-search.input.xsl"/>
<xsl:import href="../../common/block/b-search/sample/b-search.sample.xsl"/>
<xsl:import href="../../common/block/b-search/precise/b-search.precise.xsl"/>
<xsl:import href="../../common/block/b-search/button/b-search.button.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/b-head-userinfo.xsl"/>
<xsl:import href="../../common/block/b-user/b-user.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/service/b-head-userinfo.service.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/setup/b-head-userinfo.setup.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/region/b-head-userinfo.region.xsl"/>

</xsl:stylesheet>
```

Code generation was an important step forward; from this point onwards, we don't have to maintain dependencies manually.

### CSS selector speed revisited, 2009
During major redesign of Yandex.Mail service in 2009, interface responsiveness and overall speed were the key factors. It was our goal to release a web application that feels as fast as a piece of desktop software, and maybe even faster.

Client-side (in-browser) XSL transformations were employed as a main templating solution (XML with all the data was loaded separately). XSL transforms are applied really fast, but the resulting HTML code takes significant time to be appended to the page DOM. However, disabling all CSS made this problem go away magically.

While studying various factors that could have affected the rendering speed, CSS selectors were identified as a major source of the slowdown. The bigger the DOM tree and the CSS stylesheet, the longer it takes for all CSS rules to be applied.

There’s a summary of our study available (in Russian):
[completely independent blocks](http://clubs.ya.ru/bem/replies.xml?item_no=338).

It turned out there is a way to make CSS many times faster: switching to simple selectors and eliminating CSS cascade wherever possible. Selectors based on a single classname are quick and browser handles them with ease. We already had a solution that could use such selectors: the so-called
[completely independent blocks](http://clubs.ya.ru/bem/replies.xml?item_no=338).

All Lego blocks were refactored to follow the completely independent blocks restrictions. As soon as all classnames become unique, most rules require a single class query and work way faster.

```html
<div class="b-head-logo">
    <span class="b-head-logo__name">
        Auto
    </span>
</div>
```

### Establishing naming conventions
After taking several attempts to modify naming conventions, we agreed on some naming principles that hadn't changed since then.

In file names, the dot separator was replaced by double underscore `__`. Before: `b-block.elem.css`,
after: `b-block__elem.css`; thus, file names were made consistent with CSS selectors.

Block elements were allowed to have their own modifiers, too.

`.b-block__elem_theme_green`, similar to `.b-block_theme_green`.

Modifiers were changed to be a key/value pair:
Before: `.b-menu__item_current`
After: `.b-menu__item_state_current`.

This change turned out to be useful when working with modifiers from JavaScript.

## Going open source (2010)
In 2010, we had published some code on [our GitHub account](https://github.com/bem) to continue growing as an open source project.

#### Creating bem-bl library
Blocks from Lego are being gradually ported to [bem-bl](https://en.bem.info/libs/bem-bl/), a library of blocks we consider useful for any web site, not just a Yandex project. As blocks are gradually open-sourced, we improve code and add new features.

This is very much a work in progress, and we invite everybody to make pull requests :-)

We also develop [bem-tools](https://en.bem.info/tools/bem/bem-tools/), a set of helper scripts and automation utilities that make working with BEM files easier. This is mostly done with Node.js, to keep the barriers low for front-end people familiar with JavaScript and willing to contribute.

### Redefinition levels in BEM
One size never fits all... but one BEM does! Because blocks and elements are represented on a file system as files and folders, and BEM file structure is unified and based mostly on semantic criteria, we can easily redefine a part of a BEM block, or add more functionality. Similar to the way we extend objects in JavaScript, BEM blocks can be extended using so-called "redefinition levels".

Typical redefinition levels may be defined like this:

 1. public bem-bl library pulled from github, extended by...
 1. internal block library (such as Lego), extended by..
 1. project-specific block library

You're free to go and add more levels. You might need some page-specific block improvements... oh, I believe you got the idea.

Example:

```files
bem-bl/
  b-logo/
lego/
  b-logo/
auto/
  blocks/
    b-logo/
```

It is also possible to use a custom file structure on a redefinition level; as long as you follow the BEM concept, all you need is to configure our build tools according to your new cool structure.

We won't go into much detail here, but there's a configuration file for that:

```files
.bem/
  level.js
```

You can specify different file naming patterns, or even flatten your folder structure completely.

### BEMHTML templating engine
We tried different templating solutions, and ended up developing our own, called BEMHTML.

This templating engine:

 1. operates on core BEM (Block, Element, Modifier) terms
 1. supports redefinition levels: build common blocks and tailor them to your needs
 1. precompiles templates into JavaScript code that runs either in a browser, or on a server

More details on BEMHTML will be available soon.

## BEM: try this at home!
As you can see, BEM has a long history of trial and error. It took Yandex a while to figure out what's important and what’s not.

The foundation of the BEM methodology are Block, Element and Modifier; these entities are consistently used in all our projects.

BEM as we know and use it today is not the final truth, nor the revelation, but something constantly being driven by practice, and tested on real-life projects. You can follow this methodology to the extent that you find useful.

BEM is quite flexible, as it is mostly a methodology; there is no such thing as BEM API, or BEM SDK. While we encourage you to try and use the open source tools we provide, which are indeed a BEM framework, you might find BEM principles good enough to be embedded into your products or technologies in some other way.

BEM is a development methodology that allows team members to collaborate and communicate ideas using the unified language consisting of simple yet powerful terms: blocks, elements, modifiers.

There is no such thing as "true BEM", and we don't try to create one. The implementation we offer is consistent and we like it a lot, but you may create your own and still call it BEM, as long as you stay true to the core principles.

BEM is a collection of ideas and methods, a *methodology*.
Each company and each team may integrate it into an existing workflow gradually, finding out what works best for them.

I assume you've got a web project and want to give BEM a try by using it here and there in your HTML and CSS.

That's great! It's how we started using BEM, too :-)

Choose an approach you find the easiest to understand and maintain, for example let your block elements have simple (non-prefixed) classes, and use modifiers with a key/value pair:

```css
.b-block
.b-block .elem
.b-block_size_l
.b-block .elem_size_l
```

You can go one step further and assign a specific class to all DOM nodes inside your block that have a semantic meaning (we call that "completely independent blocks", see above):

```css
.b-block
.b-block__elem
.b-block_size_l
.b-block__elem_size_l
```

Find CSS prefixes too long to type? Remove them!

```css
.block
.block__elem
.block_size_l
.block__elem_size_l
```

This is a perfect opportunity to try BEM concepts, and since we don't really have those strict rules, you're not really breaking anything as long as you hold on to the main principle of blocks, elements and modifiers.

Read more about [putting blocks to filesystem](/method/filesystem/).
