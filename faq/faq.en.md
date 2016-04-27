Frequently asked questions
==========================

Why BEM?
--------

-   [How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?](#how-does-bem-differ-from-oocss-amcss-smacss-suitcss)
-   [What is the difference between BEM and Web Components?](#what-is-the-difference-between-bem-and-web-components)
-   [What is the difference between BEM and Bootstrap?](#what-is-the-difference-between-bem-and-bootstrap)

Blocks and elements
-------------------

-   [A block or an element: when should I use which?](#a-block-or-an-element-when-should-i-use-which)
-   [Why does BEM not recommend using elements within elements (block\__elem1\__elem2)?](#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2)
-   [Why include the block name in names of modifier and element?](#why-include-the-block-name-in-names-of-modifier-and-element)
-   [How do I make global modifiers for blocks?](#how-do-i-make-global-modifiers-for-blocks)
-   [Why create separate directories and files for every block and technology?](#why-create-separate-directories-and-files-for-every-block-and-technology)

JavaScript
----------

-   [Why use i-bem.js when you have jQuery?](#why-use-i-bemjs-when-you-have-jquery)

CSS
---

-   [Why should I avoid using nested selectors?](#why-should-i-avoid-using-nested-selectors)
-   [Why does BEM advise against using combined selectors for creating CSS rules for modifiers?](#why-does-bem-advise-against-using-combined-selectors-for-creating-css-rules-for-modifiers)
-   [Can I combine a tag and a class in a selector (e.g. button.button)?](#can-i-combine-a-tag-and-a-class-in-a-selector-eg-buttonbutton)
-   [Why are custom tags not used for blocks in BEM?](#why-are-custom-tags-not-used-for-blocks-in-bem)
-   [Why can't I use a CSS Reset?](#why-cant-i-use-a-css-reset)
-   [Why can't I write block\_mod instead of block block\_mod, when the modifier name already contains all the block data?](#why-cant-i-write-block_mod-instead-of-block-block_mod-when-the-modifier-name-already-contains-all-the-block-data)
-   [Why can't I include a CSS property name in a modifier name: .block\__element\_border-color\_grey?](#why-cant-i-include-a-css-property-name-in-a-modifier-name-block__element_border-color_grey)

**No answer found?** — [Place your question on our forum!](https://en.bem.info/forum/)

How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?
-------------------------------------------------------

1.  BEM is applicable to JavaScript as well as CSS.
2.  BEM has more in common with Web Components than with the CSS solutions listed. ([What is the difference between BEM and Web Components?](#what-is-the-difference-between-bem-and-web-components))
3.  BEM provides a comprehensive solution for creating the architecture for your project and helps organize development processes.

> Find out more about the [BEM methodology](https://en.bem.info/method/).

It is possible to use BEM at the CSS level only. You just need to follow the [guidelines proposed by the methodology](../method/naming-convention/naming-convention.en.md).

What is the difference between BEM and Web Components?
------------------------------------------------------

Browser support

-   Web Components [are not supported](http://caniuse.com/#search=Web%20Components) by Safari, iOS Safari, Internet Explorer, Firefox.
-   BEM works in all browsers.

Encapsulation

-   Web Components use Shadow DOM.
-   BEM uses block [elements](../method/key-concepts/key-concepts.en.md#element).

Template execution

-   In Web Components, templates are always executed in the browser. This may involve solving some indexing problems.
-   In BEM, template generation is possible at the development stage. This lets us pass the ready HTML. Templates can be executed both in the browser and on the server side.

-   Web Components are based on an imperative principle, using string interpolation.
-   BEM uses a declarative approach, which helps manage templating in a flexible way and avoid redundancy.

Build vs HTML import

-   Web Components use HTML Imports, which work directly in the browser. The [Vulcanize](http://webcomponents.org/articles/introduction-to-html-imports/#aggregating-network-requests) tool is used to aggregate multiple HTML files into one file.
-   BEM uses build tools: [ENB](https://en.bem.info/tools/bem/enb-bem/) or [bem-tools](https://en.bem.info/tools/bem/bem-tools/).

Abstraction over a DOM tree vs Custom Elements

-   In Web Components, Custom Elements are used. Such an approach allows only for one component to be hosted on a single DOM node.
-   BEM introduces the concept of a [BEM tree](../method/key-concepts/key-concepts.en.md#bem-tree). BEM uses [mixes](../method/key-concepts/key-concepts.en.md#mix) — the practice of hosting several BEM entities on a single DOM node.

What is the difference between BEM and Bootstrap?
------------------------------------------------

In BEM terms, [Bootstrap](http://getbootstrap.com/) is a set of ready-made blocks. BEM, on the other hand, is not a library of interface elements but a methodology that allows you to

-   Create the architecture for your project
-   Develop web applications based on independent blocks
-   Facilitate project support.

BEM does provide its own block library, called [bem-components](https://en.bem.info/libs/bem-components/). [Other](https://en.bem.info/libs/) BEM libraries are also available.

A block or an element: when should I use which?
-----------------------------------------------

1.  If you're dealing with a fragment of code that can be reused and does not depend on the implementation of other components of the page, you should implement it as a [block](../method/key-concepts/key-concepts.en.md#block).
2.  If it's a fragment of code that cannot be used on its own, without a parent entity (block), in most cases that should be an [element](../method/key-concepts/key-concepts.en.md#element).

This rule does not apply when implementing elements that, for reasons of simplifying the development process, have to be broken down into smaller, sub-element, parts. The BEM methodology [does not recommend creating elements of elements](#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2). So, in cases like this, instead of an element, a service block should be created.

Why does BEM not recommend using elements within elements (block\__elem1\__elem2)?
--------------------------------------------------------------------------------

The existence of elements of elements hinders the ability to change the internal structure of the block: elements cannot be swapped around, removed or added without modifying the existing code.

In the BEM methodology, blocks are the only entities that support nested structure (`block__elem`). A block name defines a namespace that [ensures the dependence](../method/naming-convention/naming-convention.en.md#element-name) of elements on the block.

A block can have a nested element structure in a DOM tree.

```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
```

In the BEM methodology, though, the same structure is always represented by a flat list of elements.

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

This makes it possible to change the DOM structure of the block without modifying the code of each individual element.

```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2"></div>
    </div>
    <div class="block__elem3"></div>
</div>
```

The structure of the block changes while the rules for its elements and their names remain the same.

Why include the block name in names of modifier and element?
------------------------------------------------------------------------

A block name in the names of [BEM entities](../method/key-concepts/key-concepts.en.md#bem-entity) is used for

-   [Namespace](#namespace)
-   [Mixes](#mixes)
-   [Code searching](#code-searching)

---------------------------------------------------

**NB**: The BEM methodology [allows freedom of choice](../method/naming-convention/naming-convention.en.md#alternative-naming-schemes) when it comes to a choosing a preferred naming strategy, however consistency of names is required. For example, the following are all valid options: `context`, `ctx` or `c`, `attributes`, `attrs` or `as`. Select one name and stick with it throughout the project.

#### Namespace

A block name defines a namespace and ensures unique names for elements and modifiers. This helps reduce the impact of elements and modifiers of one block on the implementation of another.

#### Mixes

A [mix](../method/key-concepts/key-concepts.en.md#mix) is an instance of different BEM entities being hosted on a single DOM node. When mixing a modifier, a block name indicates what block the modifier will be applied to. If a block name is not specified, the modifier will be applied to all the mixed BEM entities.

Let's say we have a mix of a menu item (`menu_item`) and a button (`button`:

```html
<div class="menu__item button"></div>
```

Let's add a modifier called `active` in short notation (with no block name):

```html
<div class="menu__item button active"></div>
```

This kind of HTML markup leaves it unclear as to whether the modifier relates to the menu item (`menu__item.active`) or the button (`button.active`). Specifying the block name (`button_active`) indicates the BEM entity to which the modifier will be applied.

Likewise, notation like `<div class="block mod">` leaves it unclear as to what BEM entities are being used. For example, you can't tell from `<div class="checkbox button">` whether it's a mix of a modifier and a block or a mix of two blocks.

The full name of the modifier `<div class="block block_mod">` leaves no doubt as to the types of entities: `<div class="checkbox checkbox_button">`.

#### Code search

Explicit and unique names facilitate searching the code or the file system for specific entities.

Let's compare the results of a global search during the debugging stage. Let's find a modifier called `active`. If short notation is used (`active`), the search results will include all possible combinations and HTML fragments containing `active`. In the BEM-recommended notation the name of the modifier already contains a additional search parameter in the form of the block name (`button_active`). Because the modifier name is unique, the search will return only relevant code fragments.

How do I make global modifiers for blocks?
------------------------------------------

BEM does not accommodate the concept of global modifiers — any modifier always belongs to one specific [BEM entity](../method/key-concepts/key-concepts.en.md#bem-entity).

If a CSS property needs to be moved outside of a block and applied to different BEM entities in the project, a separate block should be created, implemented in the CSS technology.

BEM allows us to combine the implementation of different blocks using [mixes](../method/key-concepts/key-concepts.en.md#mix):

```html
<div class="block1 block2"></div>
```

Why create separate directories and files for every block and technology?
-------------------------------------------------------------------------

For the purpose of convenient development and support, the file system of a BEM project is divided into nested directories and files.

The use of the recommended file system structure is optional. You can use any alternative project structure that conforms to the principles of BEM file system organization, for example:

**flex scheme**

-   One block per directory.
-   Elements and modifiers are implemented in separate files.

```files
blocks/
  input/
      input_layout_horiz.css
      input_layout_vertical.css
      input__elem.css
      input.css
      input.js
  button/
```
-   One block per directory.
-   Elements and modifiers are implemented inside block files.

```files
blocks/
  input/
      input.css
      input.js
  button/
```

-   Blocks don't have their own directories.
-   Elements and modifiers are implemented inside block files.

```files
blocks/
  input.css
  input.js
  button.css
  button.js
```

**flat scheme**

-   Blocks don't have their own directories.
-   Optional elements and modifiers are implemented in separate files.

```files
blocks/
  input_type_search.js
  input_type_search.bemhtml
  input__box.bemhtml
  input.css
  input.js
  input.bemhtml
  button.css
  button.js
  button.bemhtml
  button.png
```
Why use i-bem.js when you have jQuery?
----------------------------------------

[i-bem.js](https://en.bem.info/technology/i-bem/) is a specialized framework for developing projects with JavaScript in terms of blocks, elements, and modifiers.

`i-bem.js` is not meant to replace any general-purpose framework, such as jQuery.

`i-bem.js` allows you to

-   Develop a web interface in terms of blocks, elements, modifiers
-   Integrate JavaScript code with templates and BEM-style CSS rules
-   Describe the logic of a block as a set of states.

Why should I avoid using nested selectors?
------------------------------------------

BEM is all about independent blocks. Nested selectors increase coupling within the code and make code reuse impossible. This is in contradiction to the BEM principles.

The BEM methodology allows nested selectors, but recommends keeping their use to a minimum.

For instance, nesting is appropriate for changing elements depending on the state of a block or its assigned theme.

```css
.nav_hovered .nav__link
{
    text-decoration: underline;
}
```

```css
.nav_theme_islands .nav__item
{
    line-height: 1.5;
}
```

Why does BEM advise against using combined selectors for creating CSS rules for modifiers?
------------------------------------------------------------------------------------------

Combined selectors make block redefinition more difficult because of their higher CSS specificity compared to single selectors. Combined selectors for a block modifier (`.block1.mod`) and for a redefined block (`.block2 .block1`) have the same specificity. Block redefinition would depend only on the order of rules in the declaration.

Consider an example:

```html
<div class="header">
    <button class="button active">
</div>
```

The rules for the modifier `active` for the button are written as the combined selector `.button.active`. To redefine the button with the parent block `header`, selector `.header .button` is created. Both selectors have the same specificity, so the application of CSS rules is determined by their declaration order.

Using the block name in the name of a modifier gives a higher priority to CSS rules for block redefinition. The
`.header .button` selector will be always of a higher priority than `.button_active`.

> [Reasons for including the block name in a modifier name](#why-include-the-block-name-in-modifier-names-and-element-names)

Can I combine a tag and a class in a selector (e.g. button.button)?
---------------------------------------------------------------------

Combining a tag and a class in one selector increases its CSS specificity. Adding a modifier won't redefine the CSS rules of the block since the specificity of the block selector is higher.

Let's look at an example:

```html
 <button class="button">
```

Let's use a `button.button` selector for the CSS rules of this block.

Now with a modifier:

```html
 <button class="button button_active">
```

The `.button_mod` selector will not redefine CSS properties of the block with the `button.button` selector, as the latter has higher specificity. For the redefinition to work, the selector for the modifier needs to be combined with the tag as well: `button.button_mod`.

As your project keeps growing, you may have blocks with selectors like `input.button`, `span.button` and, say, `a.button`. Then all modifiers of the `button` block and all its nested elements will require four different declarations for each instance.

Why are custom tags not used for blocks in BEM?
-----------------------------------------------

> Blocks could be represented in HTML by custom tags, with CSS rules defined for them. In that case classes would only be used for modifiers: `<button class="mod"/>`.

Custom tags can indeed be used for creating block selectors, but the following restrictions apply

-   [Mixes](../method/key-concepts/key-concepts.en.md#mix) can't be used.
-   Not all blocks can be represented by custom tags. For example, all links require an `<a>` tag, and all fields require `<input>`.

Why cannot I use a CSS Reset?
----------------------------

Blocks are independent components. They must not be affected by page-wide CSS rules. Otherwise their independence is compromised and their reuse becomes problematic.

A CSS Reset is carried out using [global CSS rules](#how-do-i-make-global-modifiers-for-blocks), which are in most cases written for [tag selectors](#why-are-custom-tags-not-used-for-blocks-in-bem), which is not recommended practice for a BEM project.

If you must reset your styles, in BEM you can do it on a per-block basis.

Here is an example. If a menu block and a list block in your project are both represented by a `<ul>` tag in HTML, then each block must provide a CSS Reset for `<ul>`. Duplication in the resultant code can be avoided by using a CSS optimizer.

If your project does not use a CSS optimizer that combines selectors with the same sets of rules, you can use a CSS preprocessor. Then you can have a reset of rules for every new block, [mixing](../method/key-concepts/key-concepts.en.md#mix) the proper code. E.g., in SASS it would look like this:

```css
.menu {
    @include reset-list;
}
.menu__item {
    @include reset-list-item;
}
...
.list {
    @include reset-list;
}
.list__item {
    @include reset-list-item;
}
```

This method is only appropriate in the absence of an optimizer.

Why cannot I write block\_mod instead of block block\_mod, when the modifier name already contains all the block data?
---------------------------------------------------------------------------------------------------------------------------------------------------

Using multiple modifiers on the same block (e.g., `<div class="block_theme_christmas block_size_big">`) will cause duplication of the code that implements the basic functionality (logic and styles) of the block.

Why cannot I include a CSS property name in a modifier name: .block\__element\_border-color\_grey?
----------------------------------------------------------------------------------------------------

-   If the block or the element changes its look, you will have to edit not only the CSS code but also the selector names. E.g., if the border color is changed from `grey` to `red`, you will need to edit the templates, and most likely, the JavaScript code.
-   If other properties (background, margins) are added, the name of the modifier will no longer match the content.

The BEM methodology recommends choosing names for modifiers based on semantics rather than visual representation.

<small>This FAQ is partially based on http://getbem.com/faq/</small>
