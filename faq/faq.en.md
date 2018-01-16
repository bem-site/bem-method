# Frequently Asked Questions

Do you have questions about BEM? We can help you find answers quickly.

## Why BEM?

* [How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?](#how-does-bem-differ-from-oocss-amcss-smacss-suitcss)
* [What is the difference between BEM and Web Components?](#what-is-the-difference-between-bem-and-web-components)
* [What is the difference between BEM and Bootstrap?](#what-is-the-difference-between-bem-and-bootstrap)

## Blocks and elements

* [A block or an element: which one should I create?](#a-block-or-an-element-which-one-should-i-create)
* [How to change the appearance of a block?](#how-to-change-the-appearance-of-a-block)
* [Why include the block name in modifier and element names?](#why-include-the-block-name-in-modifier-and-element-names)
* [Why create separate directories and files for every block and technology?](#why-create-separate-directories-and-files-for-every-block-and-technology)
* [Do block elements inherit the block's CSS properties?](#do-block-elements-inherit-the-blocks-css-properties)
* [Why not create wrapper blocks?](#why-not-create-wrapper-blocks)
* [Why not create elements of elements (block__elem1__elem2)?](#why-not-create-elements-of-elements-block__elem1__elem2)

## Modifiers and mixes

* [A modifier or a mix: which one should I create?](#a-modifier-or-a-mix-which-one-should-i-create)
* [When to create a Boolean modifier, and when to create a key-value modifier?](#when-to-create-a-boolean-modifier-and-when-to-create-a-key-value-modifier)
* [How to choose a name for a modifier?](#how-to-choose-a-name-for-a-modifier)
* [How to make global modifiers for blocks?](#how-to-make-global-modifiers-for-blocks)
* [Why isn't the name of the block modifier written in the element name (block_mod__elem)?](#why-isnt-the-name-of-the-block-modifier-written-in-the-element-name-block_mod__elem)

## CSS

* [How to adapt the site to different devices?](#how-to-adapt-the-site-to-different-devices)
* [Can I combine tags and classes in a selector?](#can-i-combine-tags-and-classes-in-a-selector)
* [Can I use nested selectors?](#can-i-use-nested-selectors)
* [Can I use combined selectors?](#can-i-use-combined-selectors)
* [Can I use selectors for user-defined tags?](#can-i-use-selectors-for-user-defined-tags)
* [Why shouldn't I use a CSS Reset?](#why-shouldnt-i-use-a-css-reset)
* [Why not write block_mod instead of block block_mod?](#why-not-write-block_mod-instead-of-block-block_mod)
* [When should I create helper blocks?](#when-should-i-create-helper-blocks)
* [Why is external geometry and positioning set via the parent block?](#why-is-external-geometry-and-positioning-set-via-the-parent-block)

## JavaScript

* [Why use i-bem.js when you have jQuery?](#why-use-i-bemjs-when-you-have-jquery)

## I have a question that isn't listed here

If you can't find the answer to your question, please contact us [in the forum](https://en.bem.info/forum/).

## How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?

1. BEM is applicable to [JavaScript](../method/bem-for-js/bem-for-js.en.md) as well as [CSS](../method/bem-for-css/bem-for-css.en.md).

2. BEM has more in common with [Web Components](https://www.webcomponents.org) than with the CSS solutions listed.

3. BEM provides a comprehensive solution for creating the architecture for your project and helps organize development processes.

   > Read more in the section [Using BEM to solve common issues in web development](../method/solved-problems/solved-problems.en.md).

## What is the difference between BEM and Web Components?

**Browser support**

* Web Components is [not supported](http://caniuse.com/#search=Web%20Components) in Safari, iOS Safari, Internet Explorer, or Firefox.
* BEM works in all browsers.

**Encapsulation**

* Web Components use Shadow DOM.
* BEM uses the [elements](../method/key-concepts/key-concepts.en.md#element) of a block.

**Template execution**

* In Web Components, templates are always executed in the browser. This may involve solving some indexing problems.
* In BEM, template generation is possible at the development stage. This lets us pass the ready HTML. Templates can be executed both in the browser and on the server side.
* Web Components are based on an imperative principle, using string interpolation.
* BEM uses a declarative approach, which helps manage templating in a flexible way and avoid redundancy.

**Build vs HTML import**

* Web Components uses [HTML Imports](https://w3c.github.io/webcomponents/spec/imports/), which work directly in the browser. To combine HTML files, use the [Vulcanize](http://webcomponents.org/articles/introduction-to-html-imports/#aggregating-network-requests) tool.
* BEM uses a build. Files are combined using build tools: [ENB](https://en.bem.info/toolbox/enb/) and [Gulp](http://gulpjs.com).

**Abstraction over a DOM tree vs Custom Elements**

* In Web Components, [Custom Elements](https://www.w3.org/TR/custom-elements/) are used. This approach allows only for one component to be hosted on a single DOM node.

* BEM uses the [BEM tree](../method/key-concepts/key-concepts.en.md#bem-tree). This approach allows you to place multiple components ([BEM entities](../method/key-concepts/key-concepts.en.md#bem-entity))  on a single DOM node.

   > Read more in the section about [mixes](../method/key-concepts/key-concepts.en.md#mix).

## What is the difference between BEM and Bootstrap?

[Bootstrap](http://getbootstrap.com/) is a free set of ready-made blocks for creating sites and web applications.

BEM is a methodology that allows you to:

* Create the architecture for your project.
* Develop web applications based on independent blocks.
* Facilitate project support.

There are also a number of open source libraries:

* [bem-components](https://en.bem.info/platform/libs/bem-components/) – A block library of form controls and other basic components for web interfaces.
* [bem-core](https://en.bem.info/platform/libs/bem-core/) – A library of blocks providing a specialized [JavaScript Framework](https://en.bem.info/platform/i-bem/) for web development.
* [bem-history](https://en.bem.info/platform/libs/bem-history/) – A BEM wrapper for the History API.

## A block or an element: which one should I create?

The BEM methodology does not establish strict rules for creating blocks and elements. Much will depend on the specific implementations and personal preferences of the developer. Review the [recommendations](../method/quick-start/quick-start.en.md#should-i-create-a-block-or-an-element) and choose what is right for you.

## How to change the appearance of a block?

The appearance of the block can be changed with modifiers or mixes.

### Use modifiers

If you are likely to reuse the block with the same design.

### Use mixes

If the block has a specific design only for this environment that won't be re-used in the project.

> Read more about using mixes and modifiers in the section [A modifier or a mix: which one should I create?](#a-modifier-or-a-mix-which-one-should-i-create).

## Why include the block name in modifier and element names?

The name of the block in the names of modifiers and elements:

* Provides a namespace.

   > This helps reduce the impact of elements and modifiers of one block on the implementation of another.
   >
   > **Example**
   >
   > ```html
   > <!-- The `button_size_m` and `select_size_m` modifiers will not affect each other. -->
   > <div class="button button_size_m">...</div>
   > <div class="select select_size_m">...</div>
   > ```

* Allows the use of mixes.

   > When using mixes, the namespace for the modifiers must be specified explicitly so that it's clear which entity the modifier will be applied to on this DOM node.
   >
   > **Example**
   >
   > ```html
   > <!-- The name of the `button_size_m` modifier indicates that the modifier belongs to the button, and not to the mix (the `dropdown` block). -->
   > <div class="button dropdown button_size_m">...</div>
   > ```

* This makes searching in the code easier.

   > Unique names make it easier to find entities in the code or file system.

## Why create separate directories and files for every block and technology?

For convenience of development and support of the project, the file structure of a BEM project is divided into nested directories and files.

You can follow the [recommended project structure](../method/filestructure/filestructure.en.md#nested) or use any alternative:

* [Flat](../method/filestructure/filestructure.en.md#flat)
* [Flex](../method/filestructure/filestructure.en.md#flex)

## Do block elements inherit the block's CSS properties?

Yes. The inheritance mechanism for CSS properties in BEM is no different from normal CSS inheritance.

The best way to assign the same properties to all elements of a block is to set CSS rules for the block itself.

To give the elements different properties, define CSS rules separately for each element. To avoid duplication in the resulting code, use a CSS optimizer.

## Why not create wrapper blocks?

Abstract wrappers are not necessary, because the tasks they would solve are implemented using mixes and additional block elements.

> Read more in the section [BEM for HTML](../method/bem-for-html/bem-for-html.en.md).

## Why not create elements of elements (block__elem1__elem2)?

The existence of elements of elements hinders the ability to change the internal structure of the block. Elements cannot be swapped around, removed or added without modifying the existing code.

> Read more in the section [Quick start](../method/quick-start/quick-start.en.md#guidelines-for-using-elements).

## A modifier or a mix: which one should I create?

### Create a modifier

If the implementation you need can be reused and does not depend on the implementation of other page components. For example, a `select` block has the modifiers: **hovered**, **pressed**, **disabled**, **focused**, and **opened**.

![Modifiers of the select block](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/faq/faq_create_modifier.svg)

### Create a mix

If the implementation you need is for a specific context and it definitely won't be re-used in the project with the same design.

For example, in most cases a mix is ​​created if:

* The implementation is for a specific business logic of the project.
* An [external geometry](../method/bem-for-css/bem-for-css.en.md#external-geometry-and-positioning) is defined for this context.

## When to create a Boolean modifier, and when to create a key-value modifier?

### Create a Boolean modifier

If only the presence or absence of the modifier is important for the block, and its value is unimportant. For example, a modifier describing the "disabled" state: `disabled`.

**Example**

```html
<div class="button button_disabled">...</div>
```

### Create a key-value modifier

If the block can have multiple states. For example, to define block sizes, you can use the `size` modifier with the possible values `s`, `m` and `l`.

**Example**

```html
<div class="button button_size_s">...</div>
<div class="button button_size_m">...</div>
```

## How to choose a name for a modifier?

Choose modifier names based on semantics, not on the CSS properties they describe.

**Example**

```html
<!-- Uninformative modifier name -->
<button class="button button_background_yellow">...</button>
<!-- Informative modifier name -->
<button class="button button_view_action">...</button>
```

The name `button_background_yellow` is not informative because:

* If you change the background from `yellow` to `red`,  in addition to changing the CSS code, you will also have to change the name of the selector, the template, and possibly the JavaScript code.
* When you add other CSS properties, such as `border` or`line-height`, the name of the modifier will no longer match its content.

## How to make global modifiers for blocks?

BEM does not accommodate the concept of global modifiers, because any modifier name always contains the name of a block or element.

If a CSS property needs to be moved outside of a block and applied to different BEM entities in the project, a separate block should be created that is implemented in the CSS technology. Then you can combine the implementation of different blocks using [mixes](../method/key-concepts/key-concepts.en.md#mix):

> Read more in the section [Styling groups of blocks](../method/bem-for-css/bem-for-css.en.md#styling-groups-of-blocks).

## Why isn't the name of the block modifier written in the element name (block_mod__elem)?

The element is an integrated part of the block, but not of the block modifier. Accordingly, only the block name can set the namespace for elements.

This is important for the following reasons:

* A block can have multiple modifiers.

   > **Example**
   >
   > ```html
   > <div class="button button_size_m button_theme_islands button_type_submit">
   >     <div class="button__text">...</div>
   > </div>
   > ```

* A modifier determines the state of the block or element, which can change during JavaScript execution.

## How to adapt the site to different devices?

There are several ways to adapt the page layout based on the width of the browser window:

* [Using Media Queries](#media-queries)
* [Switching modifiers](#switching-modifiers)

In both cases, you need to define breakpoints, which are the conditions for switching between layouts of the site.

### Media Queries

File structure:

```files
common.blocks/
    button/
        button.css    # CSS button implementation
```

CSS implementation:

```css
@media (max-width: 767px) {
    .button {
    	  left: 0;
    }
}

@media (max-width: 479px) {
    .button {
        right: 0;
    }
}
```

> **Note:** The block names should be general enough to use them for more than one purpose. Do not name a block `sidebar-left` if its position changes to `right` when the screen width changes.

### Switching modifiers

File structure:

```files
common.blocks/
    button/
        _position/
            button_position_left.css   
            button_position_right.css    
        button.js                         # JS button implementation
```

button_position_left.css:

```css
.button_position_left {
    left: 0;
}
```

button_position_right.css:

```css
.button_position_right {    
    right: 0;
}
```

The CSS classes on the DOM node are modified using JavaScript.

> Read more in the section [Toggling modifiers](https://en.bem.info/platform/tutorials/i-bem/modifiers/#modifiers).

## Can I combine tags and classes in a selector?

Combining a tag and a class in one selector increases its CSS specificity. The BEM methodology does not recommend combining tags and classes in a selector.

> Read more in the section [Combining a tag and a class in a selector](../method/bem-for-css/bem-for-css.en.md#combining-a-tag-and-a-class-in-a-selector).

## Can I use nested selectors?

Nested selectors increase code coupling and make reuse impossible. The BEM methodology allows nested selectors, but recommends keeping their use to a minimum.

> Read more in the section [Nested selectors](../method/bem-for-css/bem-for-css.en.md#nested-selectors).

## Can I use combined selectors?

Combined selectors have a higher CSS specificity compared to single selectors. The success of redefining these selectors is strongly tied to the order in which they are declared. The BEM methodology does not recommend the use of combined selectors.

> Read more in the section [Combined selectors](../method/bem-for-css/bem-for-css.en.md#combined-selectors).

## Can I use selectors for user-defined tags?

In HTML, blocks can be expressed with user-defined HTML elements ([Custom Elements](https://www.w3.org/TR/custom-elements/)) with the aim of:

* Improve the structure of a webpage and add semantic value to the content.
* Use selectors for custom tags instead of class selectors.
* Link additional data with the HTML element so that JavaScript can work with it later.

The BEM methodology encourages improvements to webpage semantics, but you should not avoid class selectors in favor of user-defined tags. If you do so, the classes can only be used for modifiers.

**Example**

HTML implementation:

```html
<icon-twitter class="icon_social_twitter">...</icon-twitter>
```

CSS implementation:

```css
icon-twitter {}
.icon_social_twitter {}
```

There are several limitations to this approach:

* You can't use [ mixes](../method/key-concepts/key-concepts.en.md#mix).
* Not all blocks can be represented by user-defined HTML tags. For example, all links must have the `  <a>  ` tag, and fields must have `  <input>  ` .

## Why shouldn't I use a CSS Reset?

Blocks must not be affected by page-wide CSS rules. Otherwise their independence is compromised and their reuse becomes problematic.

A CSS Reset is carried out using [global CSS rules](#how-to-make-global-modifiers-for-blocks), which are in most cases written for tag selectors. This is not recommended practice for a BEM project.

## Why not write block_mod instead of block block_mod?

If you write the modifier class without specifying the class of the block or element, the modifier has to define all the basic CSS properties of the block or element.

A modifier determines the state of the block or element, which can change during JavaScript execution. So you would have to copy the CSS code for the block's basic functionality to all its modifiers, as well.

**Example**

```html
<div class="button_size_m button_theme_islands button_type_submit">
    <div class="button__text">...</div>
</div>
```

> **Note:** Putting multiple modifiers on the same DOM node would lead to duplication of the code that implements the block's basic features (logic and styles).

## When should I create helper blocks?

The BEM methodology does not establish strict rules for creating helper blocks. Much will depend on the specific implementations and personal preferences of the developer. If such a block is necessary, you can use [a mix](../method/key-concepts/key-concepts.en.md#mix).

An example of a helper block in [ bem-core](https://en.bem.info/platform/libs/bem-core/) is the `clearfix`block, and in [bem-components](https://en.bem.info/platform/libs/bem-components/) an example is ` z-index-group`.

## Why is external geometry and positioning set via the parent block?

To keep a component independent, the CSS properties that prevent its reuse in other contexts (such as `margin` and `position`) are set via the parent block.

> Read more in the section [External geometry and positioning](../method/bem-for-css/bem-for-css.en.md#external-geometry-and-positioning)

## Why use i-bem.js when you have jQuery?

[i-bem.js](https://en.bem.info/technology/i-bem/) is not meant to replace any general-purpose framework, such as jQuery.

`The i-bem.js` framework makes it possible to:

* Develop a web interface in terms of blocks, elements, modifiers.
* Integrate JavaScript code with templates and BEM-style CSS rules.
* Describe the logic of a block as a set of states.
