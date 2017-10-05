# BEM for HTML

When using BEM, you can create HTML markup manually or [generate it automatically](#generating-html-automatically).

The page markup is described in terms of [blocks](../key-concepts/key-concepts.en.md#block), [elements](../key-concepts/key-concepts.en.md#element), and [modifiers](../key-concepts/key-concepts.en.md#modifier). When we apply the unified subject domain to all technologies, it affects the HTML code in several ways:

* [Binding blocks to a DOM node](#binding-blocks-to-a-dom-node) 
* [Nesting elements](#nesting-elements) 
* [Using HTML wrappers](#using-html-wrappers) 

## Binding blocks to a DOM node

Blocks, elements and modifiers are represented by the HTML `class` attribute, which contains the name of the BEM entity.

In the simplest case, a single DOM node corresponds to a single block:

```html
<span class="menu"> </span> 
``` 

There are cases when you need to place multiple BEM entities on the same DOM node in order to combine their styles and behavior. To do this, set the value of the `class` attribute to a space-separated list of BEM entities. This approach is called a [mix](../key-concepts/key-concepts.en.md#mix).

For example, use a mix in order to add new styles to a `menu` block by applying the `menu_theme_bright` modifier for this block:

```html
<span class="menu menu_theme_bright"> </span> 
``` 

> [For more information, see](../bem-for-css/bem-for-css.en.md#mixes) 

The same BEM entity may be represented by multiple DOM nodes. This approach is usually used with JavaScript. For example, you could do this if you need to simultaneously initialize a block instance that is located on different parts of the page in the interface.

> [For more information, see](https://en.bem.info/platform/i-bem/html-binding/#one-js-block-to-multiple-html-elements) 

## Nesting elements

Elements can be nested inside each other. You can have any number of nesting levels.

> **Important** [The naming convention](../naming-convention/naming-convention.en.md#naming-convention) does not allow element names that reflect the hierarchy, such as `block__elem1__elem2`. 
> [For more information, see](../../faq/faq.en.md#can-i-create-elements-of-elements-block__elem1__elem2) 

In the example below, menu items are shown as links. This block structure is implemented via nested elements: 

```html
<ul class="menu"> 
    <li class="menu__item"> 
        <a class="menu__link" href="https://"> ...</a>
    </li>
</ul> 
```

## Using HTML wrappers

The BEM methodology does not recommend using HTML wrappers to [position a block relative to another block](#positioning-a-block-relative-to-other-blocks) or [control the position of elements inside a block](#positioning-elements-inside-a-block). BEM uses [mixes](../key-concepts/key-concepts.en.md#mix) and additional block elements instead of HTML wrappers.

### Positioning a block relative to other blocks

To position a block relative to other blocks, a [mix](../key-concepts/key-concepts.en.md#mix) is used in most cases.

In the example, the `header` and `footer` blocks are positioned on the page using a mix with the `page` block elements that set the desired styles.

HTML implementation:

```html
<body class="page"> 
    <!-- header and navigation--> 
    <header class="header page__header"> ...</header> 
    <!-- footer --> 
    <footer class="footer page__footer"> ...</footer> 
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

### Positioning elements inside a block

To control the position of nested HTML elements, use an additional block element (for example, `block__inner`).

In the example, the `header` block is positioned relative to the page (the `page` block) using styles from the `page__inner` element.

HTML implementation:

```html
<body class="page"> 
    <div class="page__inner"> 
        <!-- header and navigation --> 
        <header class="header"> ...</header> 
        <!-- footer --> 
        <footer class="footer"> ...</footer> 
    </div> 
</body> 
```

CSS implementation:

```css
.page__inner {
    margin: auto;
    width: 960px;
}
```

## Generating HTML automatically

In HTML, the block markup is repeated every time the block appears on the page. If you create the HTML markup manually and then need to fix an error or make changes, you will need to modify the markup for every instance of the block. In order to generate HTML code and apply changes automatically, BEM uses templates. 

The template technology is a block implementation that generates the HTML code for the block. Using templates, an existing HTML element can be [replaced with a different one](#redefining-a-template) or [extended with new ones](#adding-additional-html-elements). 

> The BEM platform includes the [BEMHTML](https://ru.bem.info/platform/bem-xjst/8/) technology for creating templates. All the examples in this section use this template engine.

Just as in CSS and JavaScript, templates are written declaratively in BEM. This allows us to apply the main principles of the BEM methodology:

* [Applying a unified subject domain](#unified-subject-domain) 
* [Dividing the code into parts](#dividing-code-into-parts)
* [Using redefinition levels and builds](#using-redefinition-levels-and-builds) 

### Unified subject domain

Templates are defined in terms of blocks, elements, and modifiers. For this purpose, there is an additional abstraction level above the DOM tree for working with templates: the [BEM tree](../key-concepts/key-concepts.en.md#bem-tree). The BEM tree defines the names of BEM entities, along with their states, order, and nesting. The template engine uses this information to build a node tree for a block's HTML markup.

In real projects, the BEM tree can use any format that supports a hierarchical tree structure.

Example of a DOM tree and the corresponding BEM tree:

```html
<header class="header"> 
    <img class="logo"> 
    <form class="search-form"> 
        <input class="input"> 
        <button class="button"> </button> 
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

### Dividing code into parts

Template code is stored in separate block files according to the [file system organization guidelines](../filestructure/filestructure.en.md). 

You can create templates for an entire block, or for separate elements or modifiers.

Example of the file structure for the `menu` block:

```files
menu/ 
    __item/ 
        menu__item.css 
        menu__item.js 
        menu__item.tmpl   # Template for the `menu__item` element 
    menu.css 
    menu.js 
    menu.tmpl             # Template for the `menu` block
```

Template for the `menu` block:

```js
block('menu')(
  tag()('ul')               //The <ul> tag is set for the `menu` block
);
```

Template for the `menu__item` element:

```js
block('menu').elem('item')(
  tag()('li')               //The <li> tag is set for all `menu__item` elements
);
```

HTML implementation of the `menu` block after applying the template:

```html
<ul class="menu"> 
    <li class="menu__item"> ...</li> 
    <li class="menu__item"> ...</li> 
</ul> 
```

### Using redefinition levels and builds

Templates are written declaratively. This approach makes it possible to use [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level) and [builds](../build/build.en.md) to: 

* [Redefine an entire template or sections of it](#redefining-a-template) 
* [Add additional HTML elements to the block markup](#adding-additional-html-elements) 

#### Redefining a template

The declarative nature of BEM templates allows you to use redefinition levels to modify templates. 

The example shows a template for the `menu` block from a library that is connected to the project on a separate redefinition level:

```files
project 
    library.blocks/              # Redefinition level with blocks from the library 
        menu/                    # The `menu` block from the library 
            __item/ 
                menu__item.tmpl  # Template for the `menu__item` element 
            menu.css 
            menu.js 
            menu.tmpl            # Template for the `menu` block 
    common.blocks/                  
```

Templates for the `menu` block and the `menu__item` element from the library:

```js
// Template for the menu block 
    block('menu')( 
        tag()('ul'), 
        attrs()(function() { ... }), 
        addJs()(true), 
        addMix()({ ... }) 
    ); 

// Template for the menu__item element 
    block('menu').elem('item')( 
        tag()('li') 
    );
```

The `menu` block is represented by this BEM tree in the project:

```
menu menu__item menu__item
```

By default, the template engine uses the BEM tree to generate the HTML markup in list format (`ul + li`):

```html
<ul class="menu">
    <li class="menu__item"> <li> 
    <li class="menu__item"> <li> 
</ul> 
```

To redefine the template and change the binding of `ul + li` to `nav + a`, you need to:
* Create template files on the project level.
* Set a new value for the `tag` property.

File system for the project:

```files
project 
    library.blocks/             # Redefinition level with library blocks 
        menu/                   # The `menu` block from the library 
            __item/ 
                menu__item.tmpl 
            menu.css 
            menu.js 
            menu.tmpl 
    common.blocks/              # Redefinition level with project blocks 
        menu/ 
            __item/ 
                menu__item.tmpl # Redefined template for the `menu__item` element 
            menu.tmpl           # Redefined template for the `menu` block
```

Templates from the `common.blocks` level:

```js
// Template for the 'menu' block
block('menu')(
    //Only the value of the 'tag' property is redefined
    tag()('nav')
);

// Template for the menu__item element
block('menu').elem('item')(
    tag()('a')
);
```

The build applies all the changes in the template to all the `menu` blocks and all the `menu__item` elements in the project:

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
    <a class="menu__item" href="..."> ...</a>
    <a class="menu__item" href="..."> ...</a>
</nav> 
```

#### Adding additional HTML elements 

You can use templates to change blocks at runtime. For example, you can do this to add new HTML elements. 

The `menu` block is represented by this BEM tree in the project:

```
menu 
    menu__item 
    menu__item
```

In order to position elements (`menu__item`) inside the block (`menu`), you need to create an auxiliary element such as `menu__inner`. The new element isn't related to the block's data and is only used for adding markup. This means you can add it at runtime, when rendering the block in HTML. 

In the example, the `menu__inner` element is added to the tempate via JavaScript:

```js
block('menu')( 
    tag()('menu'), 
    // Adding the menu__inner element 
    content()(function() { 
        return { 
            elem: 'inner', 
            content: this.ctx.content 
        }; 
    }) 
); 

// Setting the <li> tag for the menu__inner element 
elem('inner')( 
	tag()('ul') 
);
```

As a result of applying the template, the `menu__inner` element is added to the HTML tree as a separate node:

```html
<menu class="menu"> 
    <ul class="menu__inner">           // Added the new menu__inner element  
        <li class="menu__item"> </li> 
        <li class="menu__item"> </li> 
    </ul> 
</menu> 
```
