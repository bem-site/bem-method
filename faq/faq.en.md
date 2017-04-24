# Frequently asked questions

## Why BEM?

* [How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?](#how-does-bem-differ-from-oocss-amcss-smacss-suitcss)
* [What is the difference between BEM and Web Components?](#what-is-the-difference-between-bem-and-web-components)
* [What is the difference between BEM and Bootstrap?](#what-is-the-difference-between-bem-and-bootstrap)

## Blocks and elements

* [Should I create a block or an element?](#should-i-create-a-block-or-an-element)
* [What is the correct way to modify the appearance of every block instance on a page?](#what-is-the-correct-way-to-modify-the-appearance-of-every-block-instance-on-a-page)
* [Why write the block name in the names of modifiers and elements?](#why-include-the-block-name-in-modifier-and-element-names)
* [Why create separate directories and files for every block and technology?](#why-create-separate-directories-and-files-for-every-block-and-technology)
* [Can block elements inherit CSS properties from the block?](#can-block-elements-inherit-css-properties-from-the-block)
* [Can I create wrapper blocks?](#can-i-create-wrapper-blocks)
* [Can I create elements of elements (block\__elem1\__elem2)?](#can-i-create-elements-of-elements-block__elem1__elem2)

## Modifiers and mixes

* [Should I create a modifier or a mix?](#should-i-create-a-modifier-or-an-mix)
* [How should I choose between a boolean modifier and a key-value modifier?](#how-should-i-choose-between-a-boolean-modifier-and-a-key-value-modifier)
* [What makes a good modifier name?](#what-makes-a-good-modifier-name)
* [How do I make global modifiers for blocks?](#how-do-i-make-global-modifiers-for-blocks)
* [Why isn't the name of the block modifier written in the element name (block\_mod\__elem)?](#why-isnt-the-name-of-the-block-modifier-written-in-the-element-name-block_mod__elem)

## CSS

* [How should my site adapt to devices?](#how-should-my-site-adapt-to-devices)
* [Can I combine tags and classes in a selector?](#can-i-combine-tags-and-classes-in-a-selector)
* [Can I use nested selectors?](#can-i-use-nested-selectors)
* [Can I use combined selectors?](#can-i-use-combined-selectors)
* [Can I use custom tag selectors?](#can-i-use-custom-tag-selectors)
* [Can I use a CSS reset?](#can-i-use-a-css-reset)
* [Can I write "block_mod" instead of "block block_mod", since the modifier name already contains information about the block?](#can-i-write-block_mod-instead-of-block-block_mod-since-the-modifier-name-already-contains-all-the-block-information)
* [Can I create helper classes?](#can-i-create-helper-classes)
* [Why are the geometry and positioning set in the parent block?](#why-are-the-external-geometry-and-positioning-set-via-the-parent-block)

## JavaScript

* [Why use i-bem.js, when there is jQuery?](#why-use-i-bemjs-when-there-is-jquery)

**I have a different question.** If you didn't find the answer you were looking for, submit your question [in our forum](https://en.bem.info/forum/).

## How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?

1. BEM is applicable to JavaScript as well as CSS.
2. BEM has more in common with Web Components than with the CSS solutions listed. ([What is the difference between BEM and Web Components?](#what-is-the-difference-between-bem-and-web-components) )
3. BEM provides a comprehensive solution for creating the architecture for your project and helps organize development processes. Find out more about [how the BEM methodology is used for web development](../method/solved-problems/solved-problems.en.md).

> More information about the [BEM methodology](https://en.bem.info/method/).

To use BEM only for CSS, you just need to follow the [recommendations of the methodology](../method/bem-for-css/bem-for-css.en.md).

## What is the difference between BEM and Web Components?

**Browser support**

* Web Components [are not supported](http://caniuse.com/#search=Web%20Components) in Safari, iOS Safari, Internet Explorer, and Firefox.
* BEM works in all browsers.

**Encapsulation**

* Web Components use Shadow DOM.
* BEM uses block [elements](../method/key-concepts/key-concepts.en.md#element).

**Template execution**

* In Web Components, templates are always executed in the browser. This may involve solving some indexing problems.
* In BEM, template generation is possible at the development stage. This lets us pass the ready HTML. Templates can be executed both in the browser and on the server side.
* Web Components are based on an imperative principle, using string interpolation.
* BEM uses a declarative approach, which helps manage templating in a flexible way and avoid redundancy.

**Build vs HTML import**

* Web Components use HTML Imports ([HTML Imports](https://w3c.github.io/webcomponents/spec/imports/)), which work directly in the browser. The [Vulcanize](http://webcomponents.org/articles/introduction-to-html-imports/#aggregating-network-requests) tool is used to aggregate multiple HTML files into one file.
* We use the following build tools on the BEM platform:
  * [ENB](https://en.bem.info/tools/bem/enb-bem/)
  * [Gulp](http://gulpjs.com)

**Abstraction over a DOM tree vs Custom Elements**

* In Web Components, [Custom Elements](https://www.w3.org/TR/custom-elements/) are used. Such an approach allows only for one component to be hosted on a single DOM node.
* BEM introduces the concept of a [BEM tree](../method/key-concepts/key-concepts.en.md#bem-tree). To host multiple [BEM entities](../method/key-concepts/key-concepts.en.md#bem-entity) on a single DOM node, BEM uses [mixes](../method/key-concepts/key-concepts.en.md#mix).

## What is the difference between BEM and Bootstrap?

In BEM terms, [Bootstrap](http://getbootstrap.com/) is a freely distributed set of ready-made blocks for building sites and web applications.

BEM is a methodology that allows you to:

* Create the architecture for your project.
* Develop web applications based on independent blocks.
* Facilitate project support.

It is also a framework of open-source libraries:

* [bem-components](https://en.bem.info/platform/libs/bem-components/) — A library of blocks with form controls and other basic web interface components.
* [bem-core](https://en.bem.info/platform/libs/bem-core/) — A library of blocks providing a specialized [JavaScript framework](https://ru.bem.info/platform/i-bem/) for web development.
* [bem-history](https://en.bem.info/platform/libs/bem-history/) — The BEM wrapper for the History API.

## Should I create a block or an element?

The BEM methodology doesn't have strict rules for creating blocks and elements. A lot depends on specific implementations and the personal preferences of the developer. However, we do have [some recommendations](../method/quick-start/quick-start.en.md#a-block-or-an-element-when-should-i-use-which) that can help you figure this out.

## What is the correct way to modify the appearance of every block instance on a page?

To change the styling of the same block, you can use:

* Modifiers, if you will probably re-use the block with this styling.
* Mixes, if the block has a specific design just for this context, and you won't be reusing it in the project with this styling.

> For more information about using mixes and modifiers, see [Should I create a modifier or a mix?](#should-i-create-a-modifier-or-an-mix)

## Why include the block name in modifier and element names?

The block name in the names of BEM entities:

* [Supports the namespace](#namespace).
* [Makes mixes possible](#mixes).
* [Simplifies code searching](#code-searching).

> The BEM methodology allows freedom of choice in the [naming strategy for BEM entities](../method/naming-convention/naming-convention.en.md#alternative-naming-schemes), but names should be consistent throughout the project.

### Namespace

A block name defines a namespace for elements and modifiers to make them unique. This helps reduce the impact of elements and modifiers of one block on the implementation of another.

### Mixes

When mixing modifiers, the namespace must be specified so that it's clear which entity the modifier will be applied to. If a block name is not specified, the modifier will be applied to all the mixed BEM entities.

Let's say we have a mix of a menu item (`menu__item`) and a button (`button`):

```html
<div class="menu__item button">...</div>
```

Add a modifier called `active` without the block name:

```html
<div class="menu__item button active">...</div>
```

In this form, the HTML markup doesn't specify:

* Whether the modifier related to the menu item `menu__item.active` or the button `button.active`.
* Which BEM entities it refers to (whether it's a mix of a modifier and a block, or two blocks).

When it includes the block name and the modifier name, the HTML markup becomes more informative and understandable:

```html
<div class="menu__item button button_active">...</div>
```

### Code search

Unique names make it easier to identify entities in the code and in the file system.

It's much easier to find all matches for `button_active` than for just `active`, since the search results will show all the possible combinations: `select_active` , `checkbox_active` , `menu__item_active` and so on.

## Why create separate directories and files for every block and technology?

For the purpose of [convenient development and support](../method/filestructure/filestructure.en.md#a-block-implementation-is-divided-into-separate-files), the file structure of a BEM project is divided into nested directories and files.

You aren't required to follow the [recommended file system structure](../method/filestructure/filestructure.ru.md#nested). You can use any alternative project structure that follows the BEM principles for organizing the file system, such as:

* [Flat](../method/filestructure/filestructure.en.md#flat).
* [Flex](../method/filestructure/filestructure.en.md#flex).

## Can block elements inherit CSS properties from the block?

BEM inheritance works the same way as regular inheritance, in which CSS properties belonging to an HTML element on the page are also applied to all nested elements.

This means that if you want to apply the same style to all of a block's elements, it makes sense to set the CSS rules for the block. If the block's elements should have different styles, define CSS rules specifically for the elements. To avoid the repetition that arises in the resulting code, use a CSS optimizer that combines selectors with the same set of CSS rules.

## Can I create wrapper blocks?

There is no point in using abstract wrappers, since their purpose is achieved using mixes and additional block elements.

> For more information, see [HTML for CSS](../method/bem-for-css/bem-for-css.en.md#wrappers).

## Can I create elements of elements (block\__elem1\__elem2)?

The presence of elements of elements restricts your ability to change the internal structure of the block. You can't move elements around, delete them, or add new ones without modifying the corresponding code.

> For more information, see the [Quick Start](../method/quick-start/quick-start.en.md#nesting-1).

## Should I create a modifier or an mix?

### Create a modifier

If you think you are going to re-use the implementation you need, and it doesn't depend on the implementation of other page components. For example, the `select` block has the modifiers **hovered**, **focused**, and **opened**.

![Modifiers of the "select" block](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/faq/select.svg)

### Create a mix

If you only need this implementation for a specific context, and you won't be re-using it in the project in this form.

For example, a mix is created in most cases when:

* Implementing specific business logic for the project.
* Defining the [external geometry](../method/bem-for-css/bem-for-css.en.md#external-geometry-and-positioning) for the context.

## How should I choose between a boolean modifier and a key-value modifier?

The modifier name describes the state of the block or element. It follows the format:

* For boolean modifiers – `block-name_mod-name`.
* For key-value modifiers – `block-name_mod-name_mod-val`.

### Create a boolean modifier

When the block's state depends on the presence or absence of the modifier, and the value is irrelevant. An example is a modifier that describes the "disabled" state: `disabled`.

**Example**

```html
<div class="button button_disabled">...</div>
<div class="checkbox checkbox_checked">...</div>
```

### Create a key-value modifier

If the block can have multiple states. An example is a `size` modifier with the values `s` , `m` and `l`.

**Example**

```html
<div class="button button_size_s">...</div>
<div class="button button_size_m">...</div>
```

## What makes a good modifier name?

The BEM methodology recommends choosing names for modifiers based on semantics rather than the CSS properties they describe.

Let's look at an example:

HTML implementation:

```html
<button class="button button_background_yellow">...</button>
```

The modifier name `button_background_yellow` is a poor choice, because:

* If the background color (`yellow`) is changed to, say, `red`, you will have to change not only the CSS code, but also the selector name, templates, and possibly JavaScript code, as well.
* If you add other CSS properties, such as `border` or `line-height`, the modifier's name will no longer match its content.

A good name is:

```html
<button class="button button_view_action">...</button>
```

## How do I make global modifiers for blocks?

BEM does not have a concept of global modifiers, because the name of any modifier is always set with:

* The name of the block.
* The name of the element.

If you need to move a CSS property outside of a block and apply it to different BEM entities in the project, create a separate CSS block. Then you can combine the implementation of the different blocks using [mixes](../method/key-concepts/key-concepts.en.md#mix):

> For more information, see [Styling groups of blocks](../method/bem-for-css/bem-for-css.en.md#styling-groups-of-blocks).

## Why isn't the name of the block modifier written in the element name (block\_mod\__elem)?

The element is an integrated part of the block, but not of the block modifier. Accordingly, only the block name can set the namespace for elements.

This is important for the following reasons:

* A block can have multiple modifiers.

  ```html
  <div class="block block_mod1 block_mod2 block_mod3">
      <div class="block__elem">...</div>
  </div>
  ```

* A modifier determines the state of the block or element, which can change during JavaScript execution.

## How should my site adapt to devices?

There are several ways to change the page markup based on the width of the browser window:

* [Using Media Queries](#media-queries).
* [Toggling modifiers](#switching-a-modifier).

In both cases, you must set the breakpoints, which are conditions for switching between different layouts for the site.

### Media Queries

File system:

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

> **Note** The names of blocks should be general enough to use them for more than one purpose. It's not a good idea to name a block `sidebar-left` if its position can change to `right` when the screen width changes.

### Switching a modifier

File system:

```files
common.blocks/
    button/
        _position/
            button_position_left.css
            button_position_left.css
        button.js   # JS button implementation
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

CSS classes on a DOM node are changed using JavaScript.

> For more information, see [Toggling modifiers](https://en.bem.info/platform/tutorials/i-bem/modifiers/#toggling-a-modifier).

## Can I combine tags and classes in a selector?

Combining a tag and a class in a selector makes the CSS rules more specific. The BEM methodology doesn't recommend combining tags and classes in a selector.

> For more information, see [Combining a tag and a class in a selector](../method/bem-for-css/bem-for-css.en.md#combining-tag-and-class-in-selector).

## Can I use nested selectors?

Nested selectors increase code coupling and make reuse impossible. The BEM methodology allows using nested selectors, but we recommend minimizing their use.

> For more information, see [Nested selectors](../method/bem-for-css/bem-for-css.en.md#nested-selectors).

## Can I use combined selectors?

Combined selectors have higher CSS specificity compared to single selectors. The ability to redefine combined selectors depends on the order in which they were declared. The BEM methodology does not recommend using combined selectors.

> For more information, see [Combined selectors](../method/bem-for-css/bem-for-css.en.md#combined-selectors).

## Can I use custom tag selectors?

In HTML, blocks can be expressed using [Custom Elements](https://www.w3.org/TR/custom-elements/) in order to:

* Improve the page structure and add semantic value to the content.
* Use custom tag selectors instead of class selectors, as a result.
* Associate an HTML element with additional data that will then by used by the JavaScript.

The BEM methodology encourages improving web page semantics, but it doesn't recommend rejecting class selectors in favor of custom tags. If you replace them, you will only be able to use the classes for modifiers.  

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

There are several limitations involved in this approach:

* You can't use [mixes](../method/key-concepts/key-concepts.en.md#mix).
* Not all blocks can be expressed using custom HTML elements. For example, all links require the `<a>` tag, but fields require `<input>`.

## Can I use a CSS reset?

A [block](../method/key-concepts/key-concepts.en.md#block) is a logically and functionally independent component on a page. It shouldn't be affected by page-wide CSS rules. Otherwise, the independence of blocks is compromised and their reuse becomes problematic.

A CSS Reset is carried out using [global CSS rules](#how-do-i-make-global-modifiers-for-blocks). These are usually written for tag selectors, which is not recommended practice for a BEM project.

**Example**

CSS implementation:

```css
ul, ol {
    list-style: none;
}
```

If you must reset your styles, in you can do it on a per-block basis in a BEM project.

Let's look at an example:

The project has `.menu` and `.list` blocks expressed by the HTML `<ul>` tag, which needs to be reset. So each block needs to reset the styles for `<ul>`. To avoid the repetition that arises in the resulting code, use a CSS optimizer that combines selectors with the same set of CSS rules.

If the project doesn't use a CSS optimizer, you can apply a CSS preprocessor. Then you can reset the rules for every new block by [mixing](../method/key-concepts/key-concepts.en.md#mix) point-by-point normalization of styles.

So in SASS it would look like this:

```css
/* Style reset for the `<ul>` tag */
.menu {
    @include reset-list;
}
...
/* Style reset for the `<ul>` tag */
.list {
    @include reset-list;
}
```

> **Note** Only use this method if your project doesn't have a CSS optimizer.

## Can I write block\_mod instead of block block\_mod, since the modifier name already contains all the block information?

If you leave just the modifier class without specifying the class of the block or element itself, you have to define all the block's basic CSS properties in the ```css .block_mod {}``` selector.

Modifiers can change when the block is being used (for example, in response to DOM events on the block), or when this is requested by other blocks. So you would have to copy the CSS code for the block's basic functionality to all its modifiers, as well.

Combining multiple modifiers on the same DOM node (for instance, `<div class="block_theme_christmas block_size_big">`) would lead to code duplication.

## Can I create helper classes?

The BEM methodology doesn't have strict rules for creating helper blocks. A lot depends on specific implementations and the personal preferences of the developer. If you need this type of block, you can use a [mix](../method/key-concepts/key-concepts.en.md#mix).

An example of a helper block in [bem-core](https://en.bem.info/platform/libs/bem-core/) is the `clearfix` block, and in [bem-components](https://en.bem.info/platform/libs/bem-components/) an example is `z-index-group`.

> For more information about applying mixes, see [Styling groups of blocks](../method/bem-for-css/bem-for-css.en.md#styling-groups-of-blocks).

## Why are the external geometry and positioning set via the parent block?

The point of BEM is to create extendable and reusable interface components. If you create a block that could be re-used, it makes sense to keep the block from "knowing" about CSS properties that would prevent this.

These CSS properties include:

* `margin`
* `position`

> For more information, see [External geometry and positioning](../method/bem-for-css/bem-for-css.en.md#external-geometry-and-positioning).

## Why use i-bem.js when there is jQuery?

[i-bem.js](https://en.bem.info/technology/i-bem/) is a specialized framework for developing JavaScript projects using blocks, elements, and modifiers.

`i-bem.js` is not meant to replace any general-purpose framework, such as jQuery.

`i-bem.js` allows you to:

* Develop a web interface in terms of blocks, elements, modifiers.
* Integrate JavaScript code with templates and BEM-style CSS rules.
* Describe the logic of a block as a set of states.
