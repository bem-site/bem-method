# HTML with BEM

When using BEM, you can create HTML markup [manually](#creating-html-manually) or [generate it automatically](#automatic-html-generation). In both cases, the HTML code follows the same principles:

* [Binding blocks to a DOM node](#binding-blocks-to-a-dom-node)
* [Nesting of elements](#nesting-of-elements)
* [Using HTML wrappers](#using-html-wrappers)

## Binding blocks to a DOM node

The page markup is described in terms of [blocks](../key-concepts/key-concepts.en.md#block), [elements](../key-concepts/key-concepts.en.md#element) and [modifiers](../key-concepts/key-concepts.en.md#modifier).

To specify that a block, an element or a modifier is located on a DOM node, its name is written in the `class` attribute.

In the simplest case, a single DOM node corresponds to a single block:

```html
<span class="menu"></span>
```

### Several blocks on one DOM node

To combine the styles and behavior of several [BEM entities](../key-concepts/key-concepts.en.md#bem-entity), place them on the same DOM node. To do this, add the names of the BEM entities separated with spaces in the `class` attribute. This approach is called a [mix](../key-concepts/key-concepts.en.md#mix).

For instance, you can use a mix to add a modifier to a block or an element. In this example, a mix is used to add new styles to the `menu` block by applying the `menu_theme_bright` modifier to this block.

```html
<span class="menu menu_theme_bright"></span>
```

> [Learn more about mixes](../bem-for-css/bem-for-css.en.md#mixes)

### One block on multiple DOM nodes

For JavaScript tasks, such as simultaneous initialization of a block instance in different parts of the page, place one BEM entity on multiple DOM nodes.

> This example shows the implementation of the i-bem.js framework. [Learn more about i-bem.js](https://en.bem.info/platform/i-bem/html-binding/#one-js-block-on-several-html-elements)

## Nesting of elements

[The naming convention](../naming-convention/naming-convention.en.md#naming-convention) [doesn't allow](../../faq/faq.en.md#why-not-create-elements-of-elements-block__elem1__elem2) including the hierarchy in the element name (`block__elem1__elem2`). But you can nest HTML elements in each other. The nesting depth isn't limited.

In this example, the menu items are shown as links. This block structure is implemented with nested elements:

```html
<ul class="menu">
    <li class="menu__item">
        <a class="menu__link" href="https://">...</a>
    </li>
</ul>
```

## Using HTML wrappers

The BEM methodology does not recommend using HTML wrappers to [position one block relative to another block](#positioning-a-block-relative-to-other-blocks) or [position blocks within another block](#positioning-html-elements-inside-a-block). For these purposes, always use [mixes](../key-concepts/key-concepts.en.md#mix).

### Positioning a block relative to other blocks

To position a block relative to other blocks, use a [mix](../key-concepts/key-concepts.en.md#mix).

In the example, the `header`  and `footer`  blocks are positioned on the page using a mix with the `page` block elements that set the styles. The `page__header`  and `page__footer` elements are optional. They are applied to the `page` block to add the header (`header`) or the footer (`footer`) to the page. The `page`, `header`  and `footer` blocks remain independent because they don't contain styles that deal with mutual positioning.

HTML implementation:

```html
<body class="page">
    <!-- Header and navigation -->
    <header class="header page__header">...</header>
    <!-- footer -->
    <footer class="footer page__footer">...</footer>
</body>
```

CSS implementation:

```css
.page__header {
    padding: 20px;
}

.page__footer {
    padding: 50px;
}
```

### Positioning HTML elements inside a block

To position HTML elements inside a block, use an additional block element (for example, `button__inner`). The `button__inner` element contains styles that deal with positioning inside the `button` block. It replaces an abstract wrapper.

In the example, the icon (the `icon` block) is positioned inside the universal button using the `button_inner` element styles.

HTML implementation:

```html
<button class="button">
    <span class="button__inner">
        <span class="icon"></span>
    </span>
</button>
```

CSS implementation:

```css
.button__inner {
    margin: auto;
    width: 10px;
}
```

## Creating HTML manually

To create HTML manually, follow the rules above.

In HTML, the block markup is repeated every time the block appears on the page. If you create the HTML markup manually and then need to fix an error or make changes, you will need to modify the markup for every instance of the block. Therefore, BEM projects don't commonly use HTML written by hand.

## Automatic HTML generation

The HTML code can be generated automatically. BEM allows you to make changes in the block implementation in one file and apply them to all block instances in the markup. To do this, use templates.

The template technology is a block implementation that generates the HTML code for the block. Using templates, an existing HTML element can be [replaced with a different one](#redefining-a-template) or [extended with new ones](#adding-additional-html-elements).

> The BEM platform offers [BEMHTML](https://en.bem.info/platform/bem-xjst/8/) technology for creating templates. All examples in this section use this template engine.

Templates in BEM are written declaratively. This allows us to apply the main principles of the BEM methodology:

* [Applying a unified subject domain](#unified-subject-domain)
* [Dividing the code into parts](#dividing-the-code-into-parts)
* [Using redefinition levels](#using-redefinition-levels)

### Unified subject domain

Templates are defined in terms of blocks, elements, and modifiers. For this purpose, there is an additional abstraction level above the DOM tree for working with templates: the [BEM tree](../key-concepts/key-concepts.en.md#bem-tree). The BEM tree defines the names of BEM entities, along with their states, order, and nesting. The template engine uses this information to build a node tree for a block's HTML markup.

The BEM tree can use any format that supports a hierarchical tree structure.

Example of a DOM tree and the corresponding BEM tree:

```html
<header class="header">
    <img class="logo">
    <form class="search-form">
        <input class="input">
        <button class="button"></button>
    </form>
    <ul class="lang-switcher">
        <li class="lang-switcher__item">
            <a class="lang-switcher__link" href="url">en</a>
        </li>
        <li class="lang-switcher__item">
            <a class="lang-switcher__link" href="url">ru</a>
        </li>
    </ul>
</header>
```

BEM tree:

```
header
    logo
    search-form
        input
        button
    lang-switcher
        lang-switcher__item
            lang-switcher__link
        lang-switcher__item
            lang-switcher__link
```

### Dividing the code into parts

Template code is stored in separate block files according to the [file structure organization rules](../filestructure/filestructure.en.md) for a BEM project.

You can create templates for an entire block, or for separate elements or modifiers.

Example of the file structure for the `menu` block.

```files
menu/
    __item/
        menu__item.css
        menu__item.js
        menu__item.tmpl     # Template for the `menu__item` element
    menu.css
    menu.js
    menu.tmpl               # Template for the `menu` element
```

Template for the `menu` block:

```js
block('menu')(
  tag()('ul')               // The <ul> tag is set for the `menu` block
);
```

Template for the `menu__item` element:

```js
block('menu').elem('item')(
  tag()('li')               // The <li> tag is set for all `menu__item` elements
);
```

HTML implementation of the `menu` block after applying the templates:

```html
<ul class="menu">
  <li class="menu__item">...</li>
  <li class="menu__item">...</li>
</ul>
```

### Using redefinition levels

Use [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level) to:

* [Redefine an entire template or sections of it](#redefining-a-template)
* [Add HTML elements to the block markup](#adding-additional-html-elements)

#### Redefining a template

The example shows a template for the `menu` block from a library connected to the project on a separate redefinition level:

```files
project
    library.blocks/                 # Redefinition level with blocks from the library
        menu/                       # The `menu` block from the library
            __item/
                menu__item.tmpl     # The `menu__item` element template
            menu.css
            menu.js
            menu.tmpl               # The `menu` block template
    common.blocks/
```

Templates for the `menu` block and the `menu__item` element from the library:

```js
// The menu block template
block('menu')(
    tag()('ul'),
    attrs()(function() { ... }),
    addJs()(true),
    addMix()({ ... })
);

// The 'menu__item' element template
block('menu').elem('item')(
  tag()('li')
);
```

The `menu` block is represented by this BEM tree in the project:

```
menu
    menu__item
    menu__item
```

By default, the template engine uses the BEM tree to generate the HTML markup in the `ul + li` list format:

```html
<ul class="menu">
  <li class="menu__item"><li>
  <li class="menu__item"><li>
</ul>
```

To redefine the template and change the binding of `ul + li` to `nav + a`, you need to:

* Create template files on the project level.
* Set a new value for the `tag` property.

File system for the project:

```files
project
    library.blocks/                 # Redefinition level with library blocks
        menu/                       # The `menu` block from the library
            __item/
                menu__item.tmpl
            menu.css
            menu.js
            menu.tmpl
    common.blocks/                  # Redefinition level with project blocks
        menu/
            __item/
                menu__item.tmpl     # Redefined template for the `menu__item` element
            menu.tmpl               # Redefined template for the `menu` block
```

Templates from the `common.blocks` level:

```js
// Template for the menu
block('menu')(
    // Only the value of the 'tag' property is redefined
    tag()('nav')
);

// Template for the 'menu__item' element
block('menu').elem('item')(
  tag()('a')
);
```

The build applies all the changes in the template to all `menu` blocks and all `menu__item` elements in the project:

```js
// Template for the 'menu' block from the library level
block('menu')(
    tag()('ul'),
    attrs()(function() { ... }),
    addJs()(true),
    addMix()({ ... })
);

// Redefined template for the 'menu' block
block('menu')(
    // Only the value of the 'tag' property is redefined
    tag()('nav')
);

// Template for the 'menu__item' element from the library level
block('menu').elem('item')(
  tag()('li')
);
// Redefined template for the 'menu__item' element
block('menu').elem('item')(
  tag()('a')
);
```

Similar to CSS, the lower-level rule redefines the higher-level rule. As a result of applying the template, the HTML code changes to:

```html
<nav class="menu">
  <a class="menu__item" href="...">...</a>
  <a class="menu__item" href="...">...</a>
</nav>
```

#### Adding additional HTML elements

You can use templates to change blocks in runtime. For example, you can add new HTML elements.

The `menu` block is represented by this BEM tree in the project:

```
menu
    menu__item
    menu__item
```

To position elements (`menu__item`) inside a block (`menu`), you need to create a utility element such as `menu__inner`. The new element isn't related to the block's data and is only used for adding markup. This means you can add it in runtime, when rendering the block in HTML.

In the example, the `menu__inner` element is added to the template via JavaScript:

```js
block('menu')(
    tag()('menu'),
    // Adding the 'menu__inner' element
    content()(function() {
        return {
            elem: 'inner',
            content: this.ctx.content
        };
    })
);

// Setting the <ul> tag for the 'menu__inner' element
elem('inner')(
    tag()('ul')
);
```

As a result of applying the template, the `menu__inner` element is added to the HTML tree as a separate node:

```html
<menu class="menu">
    <ul class="menu__inner">           // adds new element
      <li class="menu__item"></li>
      <li class="menu__item"></li>
    </ul>
</menu>
```
