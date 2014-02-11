<!--
{
    "title": "Filesystem",
    "createDate": "02-10-2012",
    "editDate": "06-08-2013",
    "summary": "Filesystem according to BEM methodology.",
    "thumbnail": "",
    "authors": ["harisov-vitaly"],
    "tags": ["BEM"],
    "translators": ["belov-sergey"],
    "type": "method"
} 
#META_LABEL-->

## File System Representation for a Block
BEM is a collection of ideas and methods, a **methodology**. Each company and each team may integrate
it into an existing workflow gradually, finding out what works best for them.

Being able to navigate the code base quickly is crucial, when
  * a project is long-lived and under constant development
  * the development team consists of several people, grows and changes

### File naming
#### Blocks in one file
I assume you've got a web project and want to give BEM a try by using it here and there in your HTML and CSS.

Have a single file per each techonology you use (html, css, js) and put all block declarations together:

```
myfacebook/
  myfacebook.css
  myfacebook.js
  myfacebook.html
```

Files `myfacebook.css` and `myfacebook.js` contain all the CSS/JS codebase of the project and are linked from HTML as is.

There is now process of building and optimizing such a files. It is the simplest case to start.

In fact, BEM is used only for CSS-classes naming.

#### Blocks in files
If the whole CSS code is inside one large file it is necessary to scroll all the time.

When the project is big it is not convenient.
And the code is much easier to find if it's located in the files of the same name as the block itself.

```
blocks/
  head.css
  menu.css

all.css

index.html
about.html
```

File `all.css` could consist of `@import` of appropriate files from the `blocks` directory:

```css
@import url(blocks/head.css);
@import url(blocks/menu.css);
…
```

#### Not compulsory in separate files
If there are elements/modifiers in your blocks which are not used on all pages, you can put the implementation in the individual files to include just what you need.

You can use this scheme of file location on the file system for this:

  * Block's main code is in the file named `block-name`
    * File name coincides with the name of the block
    * Technical implementation of the block is placed in the files with the appropriate extensions
  * An element corresponds to a file `block-name_~_element-name`
    * File name coincides with the name of the element
    * Technical implementation of the element is placed in the files with the appropriate extensions
  * A modifier corresponds to a file `block-name_name-of-the-modifier_value-of-the-modifier`
    * The name of the file consists of the name of the modifier along with it's value
    * Technical implementation of the modifier is placed in the files within this directory

And you can use any different scheme for naming.

**Example**

```
blocks/
  head.css
  head__search.css
  head_size_big.css
  menu.css

about.css
about.html

index.css
index.html
```

File `index.css` contains enlarged header but without the search form:

```css
@import url(blocks/head.css);
@import url(blocks/head_size_big.css);
@import url(blocks/menu.css);
…
```

And file `about.css` contains header of the usual size and the search form:

```css
@import url(blocks/head.css);
@import url(blocks/head__search.css);
@import url(blocks/menu.css);
…
```

We could start using [bem-tools](https://github.com/bem/bem-tools) to build the project.

#### Each block in its own directory
There could be a task to reuse some blocks from a previous project in a new one.

We want the procedure of block reuse to be as simple as possible — like simply copying the files,
or using partial checkout of a repository from a "donor" project.

In both cases it is useful to have all of the files under the same directory:

```
blocks/
  menu/
    menu.xsl
    menu.js
    menu.css
```

#### Elements/modifiers in their own directories
When working on a project we might need to change a block at some point.

A manager could ask:
  * to change the color of the `Current Menu Item` or
  * to make the `Menu` react on hover

A developer could ask their colleague:
  * to help with `Search Form` styling for IE

To understand where the relevant code is located, follow these (or similar) rules:

  * Block code is placed in a separate directory
    * Directory name matches block name
    * Implementation is placed under this directory
  * Elements are placed in subdirectories under the block directory
    * Directory name matches element name
    * Implementation is placed under this directory
  * Modifiers are placed in subdirectories under the block directory
    * Directory name matches modifier name
    * Implementation is placed under this directory
    * File name includes both key and value of the modifier (again, for programmatic access)

You'l be able to understand a block structure just from its folder structure, without even reading a single line of code. This is an unprecedented level of transparency, although it comes at a cost.

**Example**  
File structure of a `Menu` block

```
menu/
  __item/
    _state/
      menu__item_state_current.css
      menu__item_state_current.xsl
    menu__item.css
    menu__item.xsl
  menu.css
  menu.js
  menu.xsl
```

Maintaining such file structure manually is, quite obviously, not convenient. So we've developed
[BEM tools](https://github.com/bem/bem-tools) to handle the burden. These tools help with
creating the directory structure, placing files, generating placeholder content, etc.

#### Grouping blocks in directories
Big internet portals often need to reuse the same blocks across different sites.

There could be a task:
  * to create the same `Footer` on *all the portal's sites* or
  * to create a *new project* using blocks from the existing sites

Working for a web design agency often means that one has to use typical solutions for typical web pages.

A project manager could ask you:
  * to create an order page with a web form *as on the previous project*

We have to do these tasks while, preferably, avoiding copying blocks around manually. So it's
nice to have a repository of shared blocks that can be linked to a project. Blocks then should
be united under a single directory for that.

Such a directory is usually called `blocks`.

**E.g.**

```
blocks/
  foot/
  head/
  menu/
  page/
  search/
```

That directory can be linked to another project straight from the version control system, so
that we can make changes to shared blocks in a single location.

### Levels of Definition
If a group of blocks (united under one directory) is linked to a project directly (via a partial
checkout, svn:externals, etc.), then every change committed for these blocks influences all projects.

When developing a site based on an existing one we might want:
  * to enlarge the font in the `Head` on site A without affecting site B
  * to add animation when showing a dropdown menu.

To do so, we need to be able to define or redefine blocks in different technologies for
a specific site only, or for certain pages only. It can be achieved using `definition levels`.

A `definition level` is a set of blocks grouped in one directory.

![Blocks grouped in one directory](http://img-fotki.yandex.ru/get/9107/221798411.0/0_babc3_6eb2cfbf_XXL.png)

An implementation of every block from the library can be changed (or completely redefined)
at project level.

![Block redefining](http://img-fotki.yandex.ru/get/9515/221798411.0/0_babc2_3e8566e4_XXL.png)

From page-building process' perspective:
  * When building a page we can set a list of levels (directories) to use their blocks on
    the page.
    E.g., `build-page -l blocks-common -l blocks-my my-page.html`

From the file structure point of view:
  * A project can have any number of levels. But only the levels that are evaluated during the build
    will be present on the page. It is possible to specify different sets of definition levels
    for different parts of the site.

On the JavaScript side:
  * We need to define dynamic behavior of a page in declarative style.
    Final behavior is gathered from different definition levels. E.g.,

```js
/* blocks-common/dropdown/dropdown.js */
Block('dropdown', {
  init: function() {
    …
  }
});

/* blocks-my/dropdown/dropdown.js */
Block('dropdown', {
  init: function() {
    this.__base();
    …
  }
});
```

From the viewpoint of a template engine:
  * To be able not only to define but to redefine a template, one needs to
    apply a preceding template implementation.
    E.g., for XSL:

```xml
<xsl:template match="b:head">
  <div> <!-- Node for extra design -->
    <xsl:apply-imports/>
  </div>
</xsl:template>
```

From the architectural point of view:
  * When developing a portal of several sites we can extract a block library that serves as one of the
    definition levels for all the sites which are part of the portal. The blocks for a specific
    site will form another level.
  * The same repo can hold blocks of both desktop and mobile versions.
    Such a project will have the following levels: common, mobile, desktop.
    Different combinations of these levels give the resulting implementation, required by specific pages.

[Open source block library bem-bl](https://github.com/bem/bem-bl) is an example of
having several definition levels in one repository.

### Building a Page
Working in terms of blocks means having a `subject-matter abstraction`. This abstraction is for
developers only, browsers will get a compiled version of the code.

So we have `code for people` and `code for browsers` — they are not the same.
  * Programmers code blocks — browsers get the code for the whole page

To turn `code for people` into `code for browsers` we `build` a page.

`Building a page` means generating HTML, CSS, and JavaScript code from a page declaration
(written in XML or JSON) by applying implementations of declared blocks.

On the CSS side:
  * All CSS files are combined into a single "page" CSS file  
    Despite the fact that CSS for every block, element or modifier is stored in separate
    files, we don't have to link these files to the page as-is. It is possible to
    collect all the required CSS implementations in one file.  
    This also solves the well-known 'number of imports' issue in IE and decreases the number of HTTP requests.
    For combining CSS we use [borschik](https://github.com/veged/borschik).
  * Browser gets minimized code  
    When building CSS, we can minimize and optimize CSS code using the
    [CSSO](https://github.com/afelix/csso) utility, for example.
  * Each browser can get CSS code written especially for it  
    It is also possible to divide CSS implementations for different browsers and deliver
    only the code needed for each browser.  
    [setochka — currently in prototype](https://github.com/afelix/setochka) can be used for that.

From the JavaScript point of view:
  * Similarly to CSS, JavaScript files can be combined into one.

From the template engine's point of view:
  * Only needed templates are included  
    Final set of templates that are used for displaying a page includes only the templates
    for required blocks. This boosts template performance and reduces the likelihood of side effects.

From the viewpoint of development process:
  * Robots serve people (not the other way around)  
    Developer writes code as they sees fit. "Robots" take (some) care of performance by optimizing the
    code (together with making it unreadable) when building a page.

In terms of work organization:
  * Division of labor  
    We have developers working on the core framework (compilers, tools, performance); library developers, who maintain
    the block library; application developers, who develop sites using the framework.

We use [BEM tools](https://github.com/bem/bem-tools) to build pages.

#### How to automate the building process?
The usage of [bem tools](https://github.com/bem/bem-tools) require to run several
commands for each page whenever page input data or blocks implementation are changed.
As a result of these commands you get CSS and JavaScript files for the page, page's template
and, if you are developing static pages, HTML code of your page.

To avoid running these commands manually we added `bem make` and `bem server` commands to the
[bem-tools](https://github.com/bem/bem-tools).

`bem make` is a command to build project statically. It builds all the files which dependencies were
changed since the last run of this command.

`bem server` is a command to launch HTTP server, which build project files on the fly during handling
of the requests. When the build finishes server serves just built files to the client.

Have a look at the [documentation](https://github.com/bem/bem-tools/#bem-make) to learn more on this topic.
