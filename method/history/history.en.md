# The history of BEM

* [Typical markup in Yandex (2005)](#typical-yandex-markup-in-2005)
* [Birth of the methodology (2006)](#birth-of-the-methodology)
* [Beginning of the unified portal-wide framework (2006)](#building-up-the-unified-framework)
* [Independent blocks (2007)](#layout-with-independent-blocks)
* [Lego framework (2008)](#lego-unified-framework)
* [Lego 1.2 framework (2008)](#lego-framework-12-2008)
* [Lego 2.0. The birth of BEM (2009)](#lego-20-birth-of-bem)
* [BEM and open source (2010)](#bem-and-open-source-2010)

## Typical Yandex markup in 2005

The history of BEM began in 2005. Back then, from the frontender perspective, a typical Yandex project was a set of static HTML pages that served as a base for creating XSL templates.

The HTML pages were kept in a separate folder with the following structure:

```files
about.html
index.html
…
project.css
project.js
i/
  yandex.png
```

* There was a separate HTML file for each page. The layout used `IDs` and `classes`.
* All scripts for the project were kept in a single `project.js` file. JavaScript was used as an auxiliary tool for interactive elements, so `project.js` was small.
* Images were put in a separate folder. Because of the need to support IE 5 and the lack of CSS3 in browsers, images were used for all sorts of design elements — even for creating rounded corners.
* Styles and scripts were written in files: `project.css` and `project.js`. To separate the styles of different parts of a page, we used comments to indicate the beginning and the end:

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
  
  /* Graphical banner (end) */
  ```

The static HTML pages were divided up into XSL templates. If the HTML changed, all the edits had to be manually copied to the XSL. And the opposite was also true: template changes required manual edits in the HTML (to keep the static HTML up to date).

## Birth of the methodology

In 2006, we started working on our first large projects: Yandex.Music and Ya.Ru. These projects, with dozens of pages, revealed the main drawbacks of the current approach to development:

* Any changes to the code of one page affected the code of other pages.
* It was difficult to choose classnames.

A typical CSS back then contained a long cascade:

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

/* Albums (end) */
```

ID and tag name selectors were used at the same time:

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
/* Background images (end) */
```

A big project's layout was unmanageable. To avoid this, we needed to set rules for dealing with classes, tags, visual components, and so on.

### The introduction of blocks

Developers were spending most of their time creating the HTML structure of a page and writing CSS styles for it. JavaScript was regarded as nothing more than a supplementary technology.

To speed up development, we needed to simplify the support of HTML and CSS for separate page components. We introduced the concept of blocks for this purpose.

A block is a part of a page design or layout that has a specific and unique meaning defined either semantically or visually.

In most cases, any page element (either complex or simple) may be viewed as a block. The block's HTML container gets a unique CSS class that uses the same name as the block.

We added prefixes (`b-`, `c-`, `g-`) to the block classes to distinguish them from internal classes:

* **b-** — Block.

   An independent block that can be used in any part of the page.

* **с-** — Control.

   A control (an independent block) with an associated JavaScript object that provides its functionality. Can be used anywhere on the page.

* **g-** — Global.

   Global definition, used if necessary. The number of these definitions is kept at a minimum.

Postfixes were also used along with the prefixes. For example:

* **-nojs** — No javascript.

The style to be applied with JavaScript turned off. If JavaScript is enabled, the `init()` method in onload is called when loading the page, and the postfix is ​​removed from all classes. This is how JavaScript was ”turned on“ for the blocks.

### The introduction of elements

In an HTML container forming the block, some nodes got a distinct CSS class. This facilitated the creation of style rules independent from tag names. It also allowed us to assign a semantically meaningful role to each node. We called these inner nodes ”block elements“, or simply ”elements“.

The key difference between a block and an element at that moment was:

* An element can't exist outside of its parent block context.
* An element can't be detached from the block.

Detachable elements become blocks themselves.

Later, it became possible to detach some elements from the block while still keeping the block in working condition.

Elements with a lot of code were marked with comments.

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

### Unifying the project file structure

Interface designers usually support several projects simultaneously. Working with multiple projects is easier if they have the same (or very similar) file structure. To this end, we unified the repository structure of the projects.

We started storing CSS, Javascript and images in separate directories.

JavaScript was used more and more often, and additional components and libraries were added to projects.

The typical project layout structure in 2006 looked like this:

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

The basic code for Internet Explorer was added to the main CSS file, such as `yaru.css`.

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

The IE-specific rules (temporary hacks) were put in a separate file. The file name was extended with a special `ie` identifier: `yaru-ie.css`.

```css
/* Common blocks (begin) */
    /* Artist (begin) */
        .b-artist .i i
        {
            top: expression(7 + (90 - this.parentNode.getElementsByTagName('img')[0].height)/2);
            filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../i/sticker-lt.png', sizingMethod='crop');
        }
```

## Building up the unified framework

Designing similar projects eventually leads to re-creating the same blocks over and over again.

At that point, Yandex had more than 100 services sharing the same style. For this volume of data, copying and pasting between the projects didn't work anymore.

We created a shared storage of reusable components, referred to as the ”common blocks library“, or simply `Common`.

The first blocks in `Common` were the header, footer and standard text styles.

> The block files were hosted on an internal dedicated server (**common.cloudkill.yandex.ru** in the example below).

This was the beginning of our unified framework. Styles could be imported to the main project file directly from that server:

```css
@import url(http://common.cloudkill.yandex.ru/css/global.css);
@import url(http://common.cloudkill.yandex.ru/css/head/common.css);
@import url(http://common.cloudkill.yandex.ru/css/static-text.css);
@import url(http://common.cloudkill.yandex.ru/css/list/hlist.css);
@import url(http://common.cloudkill.yandex.ru/css/list/hlist-middot.css);
@import url(slider.css);

/* Header (begin) */
    /* Service (begin) */
        .b-head .service h1 { … }        .b-head .service h1, .b-head .service h1 a, .b-head .service h1 b { … }
```

This caused an issue: many imports slowed down the loading of the page. So we decided to pre-compile styles (and later, JavaScript files) before deployment.

Compiling replaces `@import` with the contents of external files (this is called `inlining`) and optimizes the code. For example, it removes spaces and comments not required by the browser.

Our internal optimization tool evolved from a simple Perl script into an open source project [borschik](https://github.com/borschik/borschik/blob/master/docs/index/index.en.md).

## Layout with independent blocks

By the fall of 2007, we had developed clear layout rules. We saw the practical benefits of the new approach, so we decided to share our experience outside Yandex.

The [independent block layout](http://vitaly.harisov.name/article/independent-blocks.html), which was by that time the basis of our HTML pages, was featured at the ClientSide'07 conference in Moscow, Russia.

The presentation at the conference officially introduced the block concept:

> A block is a page fragment with certain markup and styles.

Blocks could be simple and compound.

> Simple blocks can't contain other blocks, whereas compound blocks can.

This classification proved to be wrong: even the simplest blocks sometimes were wrapped around other blocks, so that we had to change the layout. In the end, we accepted the opposite principle:

> Any block should allow nested blocks, whenever possible.

### Rules for block independence

We introduced the first rules for independence of a block.

1. Only `classes` (not `IDs`) should be used to describe an element.
2. Each block has a prefix.
3. The CSS sheets don't contain classes outside the blocks.

Dropping `IDs` was an important decision.

Now it became possible to:

* Display the same block on the page several times.
* Use multiple classes on the same DOM node (which proved to be useful later).

#### Rules for absolutely independent blocks

The approach we were using still had a number of problems with CSS:

* CSS sometimes didn't work right if the page included code fragments written by third-party developers (such as libraries).
* Blocks were sometimes displayed incorrectly because of conflicts in element names.
* Tag selectors sometimes matched more HTML elements than we intended.

To deal with these issues, we defined absolutely independent blocks with stricter block independence rules:

1. Do not use tag selectors. Describe the block and element styles with class selectors.

**Example**

`.b-user b -> .b-user .first-letter`

2. Name classes within the block starting with the block name.

**Example**

`.b-user .first-letter -> .b-user-first_letter`

We were aware that assigning a class to each DOM node would dramatically increase the volume of the HTML code. At that point we considered this solution too costly and decided to apply it only in exceptional cases.

### The first naming rules: prefixes

Naming is a common problem in development. We decided to use prefixes in the block names, each one with its own semantics:

* **b-** — Common blocks
* **h-** — Wrappers for several blocks
* **l-** — Layout grids
* **g-** — Global styles

### The addition of block modifications

While using blocks, we realized they can be in different states.

For example, the `button` block can be:

* Small
* Normal
* Large

Instead of creating three different blocks, we applied modifications.

We defined a modification as a specific state of a block, or as a label that adds some specific property to the block.

The modification was defined by its name (such as `size`) and a value (such as `small`, `normal` or `large`).

Modification can be used in the following cases:

1. The block can change its appearance depending on its location. This is called context-dependent modification.
2. A second class can be added to the block. This is a postfix-based modification, independent from the context.

**Example**

`class="b-block b-block-postfix"`

## Lego unified framework

At the beginning of 2008, we needed to create a brand book describing the style of our portal. We decided to get started by writing HTML/CSS code.

The project was named `Lego`.

### Repository structure

The topmost level corresponded to implementations:

```files
css/
html/
js/
xml/
xsl/
```

Each implementation contained its own sub-structure of folders.

CSS went into the following folders:

1. `block` — Common unified blocks.
2. `util` — Blocks that can be used outside Yandex and can be opensourced.
3. `service` — CSS styles for specific Yandex services. They can be connected to the service to display a header or footer.

**Example**

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

The HTML folder structure was identical to CSS:

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

JavaScript wasn't widely used yet and was stored in a single directory:

```files
js/
  check-is-frame.js
  check-session.js
  clean-on-focus.js
  dropdown.js
  event.add.js
  event.del.js
```

Each service had a corresponding XML file used for building the page header.

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

XSL templates for the blocks were located in one folder. One file corresponded to one block:

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

Lego is connected to projects using *svn:externals*.

When a package is built for production deployment, the library code is included into the project, which is similar to static linking in compiled languages.

This approach allows us to release service versions with different versions of Lego and switch to the new version when it is convenient for the project team.

#### CSS files

CSS files linked from web pages consisted mostly of block implementation `@import`s.

```css
@import url(../../block/l-head/l-head.css);
@import url(../../block/b-head-logo/b-head-logo.css);
@import url(../../block/b-head-logo/b-head-logo_name.css);
@import url(block/b-head-logo-auto.css);
```

These `@import`s were maintained manually.

### Naming rules

We didn't have a unified file naming convention and tried several approaches.

## Lego framework 1.2 (2008)

### Repository structure

In Lego version 1.2, the code was refactored and the project repository folder structure changed.

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

The difference between `util` and `block` was removed, and common CSS styles were now put in `common/css`.

We rejected the idea of open sourcing the code at that moment and returned to it two years later.

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

The content of optional CSS files (the `b-dropdown_arr.css` and `b-dropdown_arr.ie.css` files) was moved into separate folders (`arr/`). There was less code in the main block file.

### Naming rules

In IE-specific files, the IE indicator was moved from the file name to the suffix. That is, `-ie.css` was changed to `.ie.css`. File extensions could now contain several words.

For modifier postfixes, the single dash was replaced with an underscore. This made a block name visually separated from a modifier name, and proved useful while developing tools for working with code.

## Lego 2.0. Birth of BEM

In March of 2009, Lego 2.0 was released.

This event marked the end of the independent block layout and the beginning of BEM.

**BEM** stands for Block, Element, Modifier. These are three key entities we use to develop web components.

What was the key update the 2.0 version delivered?

The main change was that we moved the blocks to the forefront, instead of the implementations. Blocks became the primary units, and implementation technologies became secondary.

Each block is stored in a separate folder; each technology is represented by a separate file inside the folder. Also, each block had documentation — the `.wiki` file inside the block.

### Independent block

Can be used anywhere on the page.

In XML, the block is represented with a tag in the `lego` namespace:

```xml
<lego:l-head>
<lego:b-head-logo>
```

The HTML class of the block corresponds to the name of this tag:

```html
<table class="l-head">
<div class="b-head-logo">
```

The CSS rules are written for the class:

```css
.l-head
.b-head-logo
```

All files (`css`, `js`, `html`, `xsl`) related to the block are stored in its directory:

```files
common/
  block/
    b-head-logo/
      b-head-logo.css
      b-head-logo.xsl
      b-head-logo.js
      b-head-logo.wiki
```

### Element

A part of the block that can't be used outside the block.

In XML, the element is represented in the `lego` namespace without a prefix:

```xml
<lego:b-head-logo>
    <lego:name/>
</lego:b-head-logo>
```

The HTML class corresponds to the element name without a prefix.

```html
<div class="b-head-logo">
    <span class="name">Auto</span>
</div>
```

The CSS rules are written for the class:

```css
.b-head-logo .name { ... }
```

The element files are stored in a separate folder.

```files
common/
  block/
    b-head-logo/
      name/
        b-head-logo.name.css
        b-head-logo.name.png
        b-head-logo.name.wiki
```

The element file names use the dot as a separator: `b-head-logo.name.css`

### Modifier

Defines the appearance, state, and sometimes the behavior of the block.

In XML, the modifier is represented with an attribute in the  `lego` namespace:

```xml
<lego:b-head-tabs lego:theme="grey">
```

In HTML, an extra class is added:

```html
<div class="b-head-tabs b-head-tabs_grey">...</div>
```

The CSS rules are written for the class:

```css
.b-head-tabs_grey { ... }
```

The modifier files are placed in a separate folder. The name of the modifier directory begins with an underscore:

```files
common/
    block/
        b-head-logo/
            _theme/
                b-head-logo_gray.css
                b-head-logo_gray.png
                b-head-logo_gray.wiki
```

### Declaration of blocks in use

All Lego components are described in the XML file.

```xml
<lego:page>
    <lego:l-head>
        <lego:b-head-logo>
            <lego:name/>
        </lego:b-head-logo>

        <lego:b-head-tabs type="search-and-content"/>
```

It is used to generate CSS files.

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
@import url(../../common/block/b-search/b-search.css);
@import url(../../common/block/b-search/input/b-search.input.css);
@import url(../../common/block/b-search/sample/b-search.sample.css);
@import url(../../common/block/b-search/precise/b-search.precise.css);
@import url(../../common/block/b-search/button/b-search.button.css);
@import url(../../common/block/b-head-userinfo/b-head-userinfo.css);
@import url(../../common/block/b-user/b-user.css);
@import url(block/b-head-logo/b-head-logo.css);
@import url(block/b-head-search/b-head-search.css);
```

This example shows that common code is imported first, then the styles are added to adapt the Lego blocks to the project design.

The JavaScript files are also generated from the XML declaration.

```js
include("../../common/block/i-locale/i-locale.js");
include("../../common/block/b-dropdown/b-dropdown.js");
include("../../common/block/b-search/sample/b-search.sample.js");
include("../../common/block/b-head-userinfo/user/b-head-userinfo.user.js");
```

And the XSL files are, too.

```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:import href="../.. /common/block/i-common/i-common.xsl "/> < xsl: import href ="../../common/block/i-items/i-items.xsl"/>
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

We stopped writing these files manually and started generating code.

### Selector speed (2009)

When implementing a new version of Yandex.Mail, our goal was to make it fast.

To achieve this, we started using XSL in the browser (and loading XML needed to render the data on the page). We faced a problem: XSL transformations were applied fast, but the resulting HTML code was appended to the DOM too slowly. Disabling CSS solved the problem.

It turned out that everything is slowed down by the CSS selectors. With a large DOM tree and a large style sheet, they have a significant effect on how fast the page is rendered by the browser.

We had a solution ready — *absolutely independent blocks (AIB)*.

We refactored all `Lego` blocks to follow the AIB notation. Since then we've been creating them so that each DOM node has a `class` to write the styles to. Also, we don't use the Tag Rules in CSS.

Element classnames contain the name of the block. Selectors are simple and fast.

```html
<div class="b-head-logo">
    <span class="b-head-logo__name">
        Auto
    </span>
</div>
```

### Establishing naming conventions

Gradually we achieved the point where code notation and file structure were stable and didn't change.

* In file names, the `.` separator was replaced with `__`.

   **Example**

   `b-block.elem.css` —> `b-block__elem.css`

   Now they matched CSS selectors.

* We implemented element modifiers similar to block modifiers:

   `.b-block__elem_theme_green` following the pattern of `.b-block_theme_green`.

* The modifier type was included in the modifier file name and class.

   Previous value:

   `.b-menu__item_current`

   Current value:

   `.b-menu__item_state_current`

   The reason for this change is to work with modifiers from JavaScript.

## BEM and open source (2010)

In 2010, we again returned to the idea of ​​open source. We created a [bem](https://github.com/bem) organization on GitHub.

### The bem-bl library

We began moving blocks from Lego to [bem-bl](https://github.com/bem/bem-bl), refactoring them at the same time.

While moving the blocks to the new library, we published information about them.

### Tools

To work with files using BEM methodology, we needed our own tools. We started implementing [bem-tools](https://en.bem.info/tools/bem/bem-tools/) in JavaScript for Node.js.

### Redefinition levels

A new concept was introduced: the redefinition level. We started using it for folders with block implementation.

For example, a project might contain:

1. A public block library from GitHub.
2. An internal lego library.
3. Blocks for the project itself.

**Example**

```files
bem-bl/
  b-logo/
lego/
  b-logo/
auto/
  blocks/
    b-logo/
```

You can use different naming patterns for files and folders on a redefinition level. To do this, you need to specify a new level in the configuration:

```files
.bem/  
    level.js
```

For example, you can set different separators between the block name and the element name. Or discard all folders and flatten the project folder structure.

### BEMHTML template engine

After experimenting with template engines, we developed [BEMHTML](https://en.bem.info/platform/bem-xjst/), which allows you to:

1. Write templates using BEM terminology.
2. Redefine them on [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level).
3. Use these templates both on the server and in the browser, because the templates are compiled into simple and fast JavaScript.

## Summary

Before BEM appeared in its current form, it had to go through a long period of tests and experiments.

Despite that, it was still BEM at all stages of its development.

The BEM that we use now isn't the only right solution to everything.

We recommend using BEM in your projects to the extent that brings the greatest benefit. You can try using it only for layout. This is what we ourselves started from. BEM methodology is flexible. You can customize it to suit your current processes and organize the work on the project.

The main thing is to understand the benefits BEM can bring to your project, choose an approach that suits you, and start applying it!

If you have any questions, ask us in the [forum](https://en.bem.info/forum/).
