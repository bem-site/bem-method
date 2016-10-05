# Frequently asked questions

## Why BEM?

* [ How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?] ( #how-does-bem-differ-from-oocss-amcss-smacss-suitcss) 
* [ What is the difference between BEM and Web Components?] ( #what-is-the-difference-between-bem-and-web-components) 
* [
What is the difference between BEM and Bootstrap?]
(
#what-is-the-difference-between-bem-and-bootstrap)
 

## Blocks and elements

* [ Should I create a block or an element?] ( #should-i-create-a-block-or-an-element) 
* [
Why does BEM not recommend using elements within elements (block__elem1__elem2)?]
(
#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2)
 
* [
Why write the block name in the names of modifiers and elements?]
 (
#Why-write-the-block-name-in-the-names-of-modifiers-and-elements)
 
* [ Why isn't the name of the block modifier written in the element name (block_mod__elem)?] ( #why-isnt-the-name-of-the-block-modifier-written-in-the-element-name-block_mod__elem) 
* [
How do I make global modifiers for blocks?]
(
#how-do-i-make-global-modifiers-for-blocks)
 
* [ How should I choose between a boolean modifier and a key-value modifier?] (#how-should-i-choose-between-a-boolean-modifer-and-a-key-value-modifer) 
* [
Why create separate directories and files for every block and technology?]
(
#why-create-separate-directories-and-files-for-every-block-and-technology)
 
* [
What is the correct way to modify the appearance of every block instance on a page?]
(
#what-is-the-correct-way-to-modify-the-appearance-of-every-block-instance-on-a-page)
 

## JavaScript

* [
Why use i-bem.js when you have jQuery?]
(
#why-use-i-bemjs-when-you-have-jquery)
 

## CSS

* [
Why should I avoid using nested selectors?]
(
#why-should-i-avoid-using-nested-selectors)
 
* [
Why does BEM advise against using combined selectors for creating CSS rules for modifiers?]
(
#why-does-bem-advise-against-using-combined-selectors-for-creating-css-rules-for-modifiers)
 
* [
Can I combine a tag and a class in a selector (e.g. button.button)?]
(
#can-i-combine-a-tag-and-a-class-in-a-selector-eg-buttonbutton)
 
* [
Why are custom tags not used for blocks in BEM?]
(
#why-are-custom-tags-not-used-for-blocks-in-bem)
 
* [
Why can't I use a CSS Reset?]
(
#why-cannot-i-use-a-css-reset)
 
* [
Why can't I write block_mod instead of block block_mod, when the modifier name already contains all the block data?]
(
#why-cannot-i-write-block_mod-instead-of-block-block_mod-when-the-modifier-name-already-contains-all-the-block-data)
 
* [
Why can't I include a CSS property name in a modifier name: .block__element_border-color_grey?]
(
#why-cannot-i-include-a-css-property-name-in-a-modifier-name-block__element_border-color_grey)
 
* [How do I redefine CSS properties of BEM entities at breakpoints?] (#how-do-i-redefine-css-properties-of-bem-entities-at-breakpoints?) 

**
Didn't find the answer you were looking for?**
 – [
Submit your question on our forum!]
(
 https://ru.bem.info/forum/)
 

## How does BEM differ from OOCSS, AMCSS, SMACSS, SUITCSS?

1. BEM is applicable to JavaScript as well as CSS.
1. BEM has more in common with Web Components than with the CSS solutions listed. ([
What is the difference between BEM and Web Components?]
(
#what-is-the-difference-between-bem-and-web-components)
)
1. BEM provides a comprehensive solution for creating the architecture for your project and helps organize development processes. Find out more about [
how the BEM methodology is used for web development]
(
../method/solved-problems/solved-problems.en.md)
.

>More information about the [
BEM methodology]
(
https://en.bem.info/method/)
.

It is possible to use BEM at the CSS level only. You just need to follow the [
guidelines proposed by the methodology]
 (
../method/naming-convention/naming-convention.en.md)
.

## What is the difference between BEM and Web Components?

Browser support

* Web Components [
are not supported ]
(
http://caniuse.com/#search=Web%20Components)
 by Safari, iOS Safari, Internet Explorer, or Firefox.
* BEM works in all browsers.

Encapsulation

* Web Components use Shadow DOM.
* BEM uses block [
elements]
 (
../method/key-concepts/key-concepts.en.md#element)
.

Template execution

* In Web Components, templates are always executed in the browser. This may involve solving some indexing problems.
* In BEM, template generation is possible at the development stage. This lets us pass the ready HTML. Templates can be executed both in the browser and on the server side.


* Web Components are based on an imperative principle, using string interpolation.
* BEM uses a declarative approach, which helps manage templating in a flexible way and avoid redundancy. []()[]()

Build vs HTML import

* Web Components use HTML Imports, which work directly in the browser. The [Vulcanize] ( http://webcomponents.org/articles/introduction-to-html-imports/#aggregating-network-requests) tool is used to aggregate multiple HTML files into one file.
* BEM uses build tools: [
ENB]
 (
https://en.bem.info/tools/bem/enb-bem/)
 or [
bem-tools]
 (
https://en.bem.info/tools/bem/bem-tools/)
.

Abstraction over a DOM tree vs Custom Elements

* In Web Components, Custom Elements are used. Such an approach allows only for one component to be hosted on a single DOM node.
* BEM introduces the concept of a [
BEM tree]
 (
../method/key-concepts/key-concepts.en.md#bem-tree)
. BEM uses [
mixes]
 (
../method/key-concepts/key-concepts.en.md#mix)
 — the practice of hosting several BEM entities on a single DOM node.

## What is the difference between BEM and Bootstrap?

In BEM terms, [
Bootstrap]
 (
http://getbootstrap.com/)
 is a set of ready-made blocks. BEM, on the other hand, is not a library of interface elements but a methodology that allows you to:

* Create the architecture for your project.
* Develop web applications based on independent blocks.
* Facilitate project support.

BEM does provide its own block library, called [
bem-components]
 (
https://en.bem.info/libs/bem-components/)
. [
Other]
 (
https://en.bem.info/libs/)
 BEM libraries are also available.

## Should I create a block or an element?

The BEM methodology doesn't have strict rules for creating blocks and elements. A lot depends on specific implementations and the personal preferences of the developer. However, we do have [some recommendations] ( ../method/quick-start/quick-start.en.md#a-block-or-an-element-when-should-i-use-which) that can help you figure this out.

## Why does BEM not recommend using elements within elements (block__elem1__elem2)?

The existence of elements of elements hinders the ability to change the internal structure of the block: elements cannot be swapped around, removed or added without modifying the existing code.

>For more information, see the [
Quick Start]
 (
 ../method/quick-start/quick-start.en.md#nesting-1)
 .

## Why include the block name in modifier and element names?

A block name in in the names of BEM entities is used for:

* [
 Namespace]
 (
 #Namespace)
 
* [
 Mixes]
 (
 #mixes)
 
* [
Code searching]
 (
#code searching)
 

**
NB**
 The BEM methodology [
allows freedom of choice]
 (
../method/naming-convention/naming-convention.en.md#alternative-naming-schemes)
 when it comes to a choosing a preferred naming strategy, however consistency of names is required. For example, the following are all valid options: `
 context`
 , `
 ctx`
 or `
 c`
 , `
 attributes`
 , `
 attrs`
 or `
 as`
 . Select one name and stick with it throughout the project.

### Namespace

A block name defines a namespace and ensures unique names for elements and modifiers. This helps reduce the impact of elements and modifiers of one block on the implementation of another.

### Mixes

When mixing a modifier, a block name indicates what block the modifier will be applied to. If a block name is not specified, the modifier will be applied to all the mixed BEM entities.

Let's say we have a mix of a menu item (`
 menu__item`
 ) and a button (`
 button`
 ):

```html
<div class="menu__item button">
 </div>
 
```

Let's add a modifier called `
active`
 in short notation (with no block name):

```html
<div class="menu__item button active">
 </div>
 
```

This kind of HTML markup leaves it unclear as to whether the modifier relates to the menu item (`
 menu__item.active`
 ) or the button (`
 button.active`
 ). Specifying the block name (`
button_active`
) indicates the BEM entity to which the modifier will be applied.

Likewise, notation like ` <div class="block mod"> ` leaves it unclear as to what BEM entities are being used. For example, you can't tell from ` <div class="checkbox button"> ` whether it's a mix of a modifier and a block or a mix of two blocks.

The full name of the modifier ` <div class="block block_mod"> ` leaves no doubt as to the types of entities: ` <div class="checkbox checkbox_button"> `.

### Code search

Explicit and unique names facilitate searching the code or the file structure for specific entities.

Let's compare the results of a global search during the debugging stage. Let's find a modifier called `
active`
 . If short notation is used (`
active`
), the search results will include all possible combinations and HTML fragments containing `
active`
. In the BEM-recommended notation the name of the modifier already contains an additional search parameter in the form of the block name (`
 button_active`
 ). Because the modifier name is unique, the search will return only relevant code fragments.

## Why isn't the name of the block modifier written in the element name (block_mod__elem)?

The element is an integrated part of the block, but not of the block modifier. Accordingly, only the block name can set the namespace for elements.

This is important for the following reasons:
* A block can have multiple modifiers.
```html
<div class="block block_mod1 block_mod2 block_mod3">
    <div class="block__elem"></div>
</div>
```
* A modifier determines the state of the block or element, which can change during JavaScript execution.

## How do I make global modifiers for blocks?

BEM does not accommodate the concept of global modifiers — any modifier always belongs to one specific [
 BEM entity]
 (
../method/key-concepts/key-concepts.ru.md#БЭМ-сущность)
 .

If a CSS property needs to be moved outside of a block and applied to different BEM entities in the project, a separate block should be created, implemented in the CSS technology.

BEM allows us to combine the implementation of different blocks using [
mixes]
 (
../method/key-concepts/key-concepts.en.md#mix)
:

```html
<div class="block1 block2">
 </div>
 
```

## How should I choose between a boolean modifier and a key-value modifier?

A modifier's full name is created using a pattern:

* For boolean modifiers, it is `block-name_mod-name`.
* For key-value modifiers, it is `block-name_mod-name_mod-val`.

The modifier name makes it clear what state it refers to. If just the presence or absence of the modifier on the block is important and its value is irrelevant, use a boolean modifier. An example is a modifier that describes the "disabled" state: `disabled`.

** Example** 

```html
<div class="block block_disabled"> </div> <div class="block block_visible"> </div> <div class="block block_checked"> </div> 
```

If the block can have several states, use a key-value modifier. An example is a `size` modifier with possible values `s`, `m`, and `l` to describe the size of the block.

**
 Example**
 

```html
<div class="block block_size_s">
 </div>
 <div class="block block_size_m">
 </div>
 <div class="block block_size_l">
 </div>
 
```

## Why create separate directories and files for every block and technology?

For the purpose of [
convenient development and support]
(
 ../method/filesystem/filesystem.en.md)
, the file structure of a BEM project is divided into nested directories and files.

You aren't required to follow the [
recommended file system structure]
 (
../method/filesystem/filesystem.en.md#nested)
. You can use any alternative project structure that follows the BEM principles for organizing the file system, such as:
* [
 Flat]
 (
../method/filesystem/filesystem.en.md#flat)
.
* [
 Flex]
 (
 ../method/filesystem/filesystem.ru.md#flex)
 .

## What is the correct way to modify the appearance of every block instance on a page?

**
Task**


Reuse a button (the `
button`
 block) from the search form (the `
search-form`
 block) in the authorization block (`
auth`
). The buttons should have different colors and margins.

**
Solution**


Here is an example of the DOM tree:

```html
<form class="search-form">
 <input type="text" class="input">
 <button type="submit" class="button">
 Search</button>
 </form>
 <form class="auth">
 <input type="text" class="login">
 <input type="password" class="password">
 <!-- The button goes here --> </form>
 
```

The first thing to do is copy the button code to the `
auth`
 block.

*
 HTML*
 

```html
<form class="search-form">
 <input type="text" class="input">
 <button type="submit" class="button">
 Search</button>
 </form>
 <form class="auth">
 <input type="text" class="login">
 <input type="password" class="password">
 <button type="submit" class="button">
 Sign in</button>
 </form>
 
```

In order to define different margins for the buttons, you can use [
mixes]
(
 ../method/bem-for-css/bem-for-css.ru.md#mixes)
 and use these parent blocks to set styles for the external geometry. This allows you to define additional CSS rules for each of the buttons.

Adding the `
 search-form__button`
 and `
 auth__button`
 classes to the buttons.

*
 HTML*
 

```html
<form class="search-form">
 <input type="text" class="input">
 <button type="submit" class="search-form__button button">
 Search</button>
 </form>
 <form class="auth">
 <input type="text" class="login">
 <input type="password" class="password">
 <button type="submit" class="auth__button button">
 Sign in</button>
 </form>
 
```

Now each button has its own unique CSS rules defining the margins.

*
 CSS*
 

```css
.search-form__button {
    margin: 30px;
}

.auth__button {
    margin: 40px;
}
```

You can implement the color of the blocks using a:
* Modifier – if it's possible that the block will be reused with this color scheme.
* Mix – if the block has a specific design just for this context, and it won't be reused in the project with this color.

Adding modifiers: `
 button_theme_lite`
, `
button_theme_dark`
.

*
 HTML*
 

```html
<form class="search-form">
 <input type="text" class="input">
 <button type="submit" class="search-form__button button button_theme_lite">
 Search</button>
 </form>
 <form class="auth">
 <input type="text" class="login">
 <input type="password" class="password">
 <button type="submit" class="auth__button button button_theme_dark">
 Sign in</button>
 </form>
 
```

The CSS implementation will look like this:

```css
.button_theme_lite {
    background: #fff;
}

.button_theme_dark {
    background: #000;
}
```

## Why use i-bem.js when you have jQuery?

[
 i-bem.js]
 (
 https://en.bem.info/technology/i-bem/)
 is a specialized framework for developing projects with JavaScript in terms of blocks, elements, and modifiers.

`
i-bem.js`
 is not meant to replace any general-purpose framework, such as jQuery.

`
 i-bem.js`
 allows you to:

* Develop a web interface in terms of blocks, elements, modifiers.
* Integrate JavaScript code with templates and BEM-style CSS rules.
* Describe the logic of a block as a set of states.

## Why should I avoid using nested selectors?

The main idea behind BEM is having independent blocks. [
Nested selectors]
 (
 http://htmlbook.ru/css/selector/descendant)
 increase code coupling and make reuse impossible. This is in contradiction to the BEM principles.

The BEM methodology does allow using selectors like this, but we recommend keeping them to a minimum.

For example, nesting is appropriate if you need to change elements relative to the state of the block or the theme set:

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

## Why does BEM advise against using combined selectors for creating CSS rules for modifiers?

Combined selectors make block redefinition more difficult because of their higher CSS specificity compared to single selectors. Combined selectors for a block modifier (`
.block1.mod`
) and for a redefined block (`
.block2 .block1`
) have the same specificity. Block redefinition would depend only on the order of rules in the declaration.

Let's look at an example:

```html
<div class="header">
 <button class="button active">
 </div>
 
```
The rules for the modifier `
active`
 for the button are written as the combined selector `
.button.active`
. To redefine the button with the parent block `
header`
, the selector `
.header .button`
 is created. Both selectors have the same specificity, so the application of CSS rules is determined by their declaration order.

Using the block name in the name of a modifier gives a higher priority to CSS rules for block redefinition.
The `
.header .button`
 selector will be always of a higher priority than `
.button_active`
.

>[
Reasons for including the block name in a modifier name]
 (
#why-include-the-block-name-in-names-of-modifier-and-element)
 

## Can I combine a tag and a class in a selector (e.g. button.button)?

Combining a tag and a class in a selector makes the CSS rules more specific. Adding a modifier won't redefine the CSS rules of the block since the specificity of the block selector is higher.

Let's look at an example:

```html
 <button class="button"> 
```

Let's use a `
button.button`
 selector for the CSS rules of this block.

Now with a modifier:

```html
 <button class="button button_active"> 
```

The `
.button_active`
 selector will not redefine CSS properties of the block with the `
button.button`
 selector, as `
button.button`
 has higher specificity. For successful redefinition, the selector for the block modifier also must be combined with the `
button.button_active`
 tag.

As the project develops, it's possible that blocks could be added with the selectors `
input.button`
, `
span.button`
 and `
a.button`
. In this case, all the modifiers of the `
button`
 block and nested elements would require four different declarations for each case.

## Why are custom tags not used for blocks in BEM?

>Blocks could be represented in HTML by custom tags, with CSS rules defined for them. In that case classes would only be used for modifiers: ` <button class="mod"/> `.

Custom tags can indeed be used for creating block selectors, but the following restrictions apply:

* [
Mixes]
 (
../method/key-concepts/key-concepts.en.md#mix)
 can't be used.
* Not all blocks can be represented by custom tags. For example, all links require an ` <a> ` tag, and all fields require ` <input> `.

## Why can't I use a CSS Reset?

Blocks are independent components. They must not be affected by page-wide CSS rules. Otherwise their independence is compromised and their reuse becomes problematic.

A CSS Reset is carried out using [
global CSS rules]
 (
#how-do-i-make-global-modifiers-for-blocks)
, which are in most cases written for [
tag selectors]
 (
#why-are-custom-tags-not-used-for-blocks-in-bem)
, which is not recommended practice for a BEM project.

If you must reset your styles, in BEM you can do it on a per-block basis.

Let's look at an example: If a menu block and a list block in your project are both represented by a ` <ul> ` tag in HTML, then each block must provide a CSS Reset for ` <ul> `. Duplication in the resultant code can be avoided by using a CSS optimizer.

If your project does not use a CSS optimizer that combines selectors with the same sets of rules, you can use a CSS preprocessor. Then you can have a reset of rules for every new block, [
mixing]
 (
../method/key-concepts/key-concepts.en.md#mix)
 the proper code. E.g., in SASS it would look like this:

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

## Why can't I write block_mod instead of block block_mod, if the modifier name already contains all the block information?

If you write `block_mod` instead of `block block_mod`, you have to define all the block's basic CSS properties in the `block_mod` modifier.

Modifiers can change when the block is being used (for example, in response to DOM events on the block), or when this is requested by other blocks. So you would have to copy the CSS code for the block's basic functionality to all its modifiers, as well.

Combining multiple modifiers on the same DOM node (for instance, ` <div class="block_theme_christmas block_size_big"> `) would lead to code duplication.

## Why can't I include a CSS property name in a modifier name: .block__element_border-color_grey?

* If the block or the element changes its look, you will have to edit not only the CSS code but also the selector names. E.g., if the border color is changed from `
grey`
 to `
red``
 you will need to edit the templates, and most likely, the JavaScript code.
* If other properties (background, margins) are added, the name of the modifier will no longer match the content.

The BEM methodology recommends choosing names for modifiers based on semantics rather than visual representation.

## How do I redefine CSS properties of BEM entities at breakpoints?

Sometimes you need to base page styles on the height and width of the entire browser window. To do this, you set breakpoints, which are conditions for switching between different layouts for the site.

You can change the CSS properties of a BEM entity during runtime:

* In CSS (using media queries). The name of the CSS selector must be general enough to use it for more than one purpose. For example, `block`.

  * CSS* 

  ```css
  @media screen and (min-width: 0px) and (max-width: 767px) {
      .block {
      	  left: 0;
      }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px)  {
      .block {
          right: 0;
      }
  }
  ```

* In JavaScript (by [toggling a modifier] («3» https://en.bem.info/platform/tutorials/i-bem/modifiers/#toggling-a-modifier) ). Make the names of CSS selectors as specific as possible. For example, `
 block_position_left`
 or `
 block_position_right`
.

  *
 CSS*
 

  ```css
  .block_position_left {
      left: 0;
  }

  .block_position_right {
      right: 0;
  }
  ```

  CSS classes on a DOM node are changed using JavaScript.
