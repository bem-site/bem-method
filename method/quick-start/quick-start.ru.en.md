# Quick Start

## Introduction

BEM (Block, Element, Modifier) is a component-based approach to web development.&nbsp;
The idea behind it is to divide the user interface into independent blocks.&nbsp; This makes interface development easy and fast even with a complex UI, and it allows reuse of existing code without copying and pasting.

##  Introdaction lalal

* the [](#Block)
* the [](#Item)
* [Should I create a block or an element?](#should-i-create-a-block-or-an-element)
* [Modifire](#modifier(
* the [Mix](#Mix)
* the [File structure](#File-structure)

## Unit

Functionally independent components of the page, which can be reused. In HTML, blocks are represented by the `class`&nbsp;attribute.

Features:

* the [Name](../naming-convention/naming-convention.EN.md#block-Name) describes the meaning ("what is this?" — "menu: `menu`, "button": `button`), not as (what looks like?" — "red": `red`, "big": `big`).

**Example**

```html
&lt;!-- Correct. The `error` block is semantically meaningful` --&gt; &lt;div class="error"&gt;&lt;/div&gt; &lt;!-- Incorrect. It describes the appearance --&gt; &lt;div class="red-text"&gt;&lt;/div&gt;
```

* The unit should not affect their surroundings, etc E. the unit should not be set external geometry (in the form of indents, borders, affecting the sizes and positioning.
* In CSS in BEM is also not recommended to use selectors on tags, or the `id`.

This ensures the independence in which it is possible to reuse or transfer of units from place to place.

### Guidelines for using blocks

#### Nesting

 * Blocks can be nested in each other.
 * Valid any nested blocks.

**Example**

```html
&lt;!-- The block `header` --&gt;
&lt;header class=&quot;header&quot;&gt;
&lt;!-- The inner block `logo` --&gt;
&lt;div class=&quot;logo&quot;&gt;&lt;/div&gt;

&lt;!-- The inner block `search-form` --&gt;
&lt;form class=&quot;search-form&quot;&gt;&lt;/form&gt;
&lt;/header&gt;
```

## Item

Part of the block that can't be used in isolation from it.

Features:

* the [Name](../naming-convention/naming-convention.EN.md#Name-of the item) describes the meaning ("what is this?" "item": `item`, text: `text`), not as (what looks like?" — "red": `red`, "big": `big`).
* The structure of the full name of an element corresponds to: `block-name__-name`. The element name is separated from the block name with two underscores (`__`).

**Example**

```html
&lt;!-- The block `search-form` --&gt;
&lt;form class=&quot;search-form&quot;&gt;
&lt;!-- The element `input` block `search-form` --&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;!-- Element `button` block `search-form` --&gt;
&lt;button class=&quot;search-form__button&quot;&gt;Find&lt;/button&gt;
&lt;/form&gt;
```
### Principles of work with elements

* the [Nesting](#Nested-1)
* the [Affiliation](#Affiliation)
* the [Optional](#Optional)

#### Nesting

* Elements can be nested in each other.
* Any valid nesting of elements.
* Element is always part of the unit and not another element. This means that in the name of the elements can not prescribe a hierarchy of `block__elem1__elem2`.

**Example**

```html
&lt;!--
True. The structure of the full name of the elements corresponds to:
`block-name__name-element`
--&gt;
&lt;form class=&quot;search-form&quot;&gt;
&lt;div class=&quot;search-form__content&quot;&gt;
&lt;input class=&quot;search-form__input&quot;&gt;
&lt;button class=&quot;search-form__button&quot;&gt;Find&lt;/button&gt;
&lt;/div&gt;
&lt;/form&gt;

&lt;!--
Wrong. The structure of the full name of elements doesn't fit the pattern:
`block-name__name-element`
--&gt;
&lt;form class=&quot;search-form&quot;&gt;
&lt;div class=&quot;search-form__content&quot;&gt;
&lt;!--
Recommended:
`search-form__input` or `search-form__content-input`
--&gt;
&lt;input class=&quot;search-form__content__input&quot;&gt;

&lt;!--
Recommended:
`search-form__button` or `search-form__content-button`
--&gt;
&lt;button class=&quot;search-form__content__button&quot;&gt;Find&lt;/button&gt;
&lt;/div&gt;
&lt;/form&gt;
```

Block name specifies the namespace that [ensures the dependence](../naming-convention/naming-convention.EN.md#Name-of the item) elements from the block (`block__elem`).

A block can have a nested element structure in the DOM tree:

**Example**

```html
&lt;div class=&quot;block&quot;&gt;
&lt;div class=&quot;block__elem1&quot;&gt;
&lt;div class=&quot;block__elem2&quot;&gt;
&lt;div class=&quot;block__elem3&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
```

However, the same unit structure in the BEM methodology, will always be presented a flat list of elements:

**Example**

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

This allows you to change the DOM structure of the block without modifying the code of each individual item:

**Example**

```html
&lt;div class=&quot;block&quot;&gt;
&lt;div class=&quot;block__elem1&quot;&gt;
&lt;div class=&quot;block__elem2&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div class=&quot;block__elem3&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
```

The structure of the block changes, and the rules for elements and their names remain the same.

#### Affiliation

Element — the **always part of the block** and should not be used separately from it.

**Example**

```html
&lt;!-- True. The elements are inside the block `search-form` --&gt;
&lt;!-- The block `search-form` --&gt;
&lt;form class=&quot;search-form&quot;&gt;
&lt;!-- The element `input` block `search-form` --&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;!-- Element `button` block `search-form` --&gt;
&lt;button class=&quot;search-form__button&quot;&gt;Find&lt;/button&gt;
&lt;/form&gt;

&lt;!-- Wrong. The items lie outside the context of the block `search-form` --&gt;
&lt;!-- The block `search-form` --&gt;
&lt;form class=&quot;search-form&quot;&gt;
&lt;/form&gt;

&lt;!-- The element `input` block `search-form` --&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;!-- Element `button` block `search-form` --&gt;
&lt;button class=&quot;search-form__button&quot;&gt;Find&lt;/button&gt;
```

#### Optional

Element, an optional feature block. Not all blocks need to be elements.

**Example**

```html
&lt;!-- The block `search-form` --&gt;
&lt;div class=&quot;search-form&quot;&gt;
&lt;!-- The block `input` --&gt;
&lt;input class=&quot;input&quot;&gt;

&lt;!-- Block `button` --&gt;
&lt;button class=&quot;button&quot;&gt;Find&lt;/button&gt;
&lt;/div&gt;
```

## Should I create a block or an element?

1. Если фрагмент кода может использоваться повторно и не зависит от реализации других компонентов страницы, необходимо создавать блок.
2. Если фрагмент кода не может использоваться самостоятельно, без родительской сущности (блока), в большинстве случаев создается элемент.

The exceptions are elements whose implementation to simplify the development requires division into smaller parts — sub-elements. In the BEM methodology [create items](#Nested-1). В подобном случае вместо элемента необходимо создавать служебный блок.

## Modifier

Entity that defines the appearance, condition or behaviour of the unit or element.

Features:

* the [Name modifier](../naming-convention/naming-convention.EN.md#Name-modifier) characterizes the appearance ("what size?", "what's the theme?" etc p. — "size": `size_s`, subject: `theme_islands`), state (different from the others?" — "disabled": `disabled`, "focused": `focused`) and the behavior (how it behaves?", "how to communicate with the user?" — direction: `directions_left-top`).
* The name of the modifier is separated from the name of a block or element with a single underscore (`_`).

### Types of modifiers

#### Boolean

* Used when it is important only the presence or absence of the modifier and the value is irrelevant. For example, "disabled": `disabled`. It is believed that in the presence of the Boolean modifier of the entity, its value is `true`.
* The structure of the full name of the modifier corresponds to:
  * the `name-blokka-modifier`;
  * the `name of unit__name-elementia-modifier`.

**Example**

```html
&lt;!-- The block `search-form` has a Boolean modifier `focused` --&gt;
&lt;form class=&quot;search-form search-form_focused&quot;&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;!-- Element `button` has a Boolean `disabled` modifier --&gt;
&lt;button class=&quot;search-form__button search-form__button_disabled,&quot;&gt;Find&lt;/button&gt;
&lt;/form&gt;
```

#### Key-value

* Used when it is important the value of the modifier. For example, a "menu theme `islands`": the `menu_theme_islands`.
* The structure of the full name of the modifier corresponds to:
  * the `name-blokka-modifikationen-modifier`;
  * the `name of unit__name-elementia-modifikationen-modifier`.

**Example**

```html
&lt;!-- The block `search-form` has modifier `theme` with value `islands` --&gt;
&lt;form class=&quot;search-form search-form_theme_islands&quot;&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;!-- Element `button` is the `size` with value `m` --&gt;
&lt;button class=&quot;search-form__button search-form__button_size_m&quot;&gt;Find&lt;/button&gt;
&lt;/form&gt;

&lt;!--
You cannot use two of the same modifier
with different values
--&gt;
&lt;form class=&quot;search-form
search-form_theme_islands
search-form_theme_lite&quot;&gt;

&lt;input class=&quot;search-form__input&quot;&gt;

&lt;button class=&quot;search-form__button
search-form__button_size_s
search-form__button_size_m&quot;&gt;
Find
&lt;/button&gt;
&lt;/form&gt;
```

### How to work with modifiers

#### Modifier cannot be used alone

From the point of view of the BEM methodology, the modifier may not be used in isolation from the modified block or element. The modifier needs to modify appearance, behavior or state of the entity, and not to replace it.

**Example**

```html
&lt;!-- True. The block `search-form` has modificati `theme` with value `islands`--&gt;
&lt;form class=&quot;search-form search-form_theme_islands&quot;&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;button class=&quot;search-form__button&quot;&gt;Find&lt;/button&gt;
&lt;/form&gt;

&lt;!-- Wrong. Missing a modifiable class `search-form` --&gt;
&lt;form class=&quot;search-form_theme_islands&quot;&gt;
&lt;input class=&quot;search-form__input&quot;&gt;

&lt;button class=&quot;search-form__button&quot;&gt;Find&lt;/button&gt;
&lt;/form&gt;
```

> the [Why write the name of the block name modifiers and elements?](../../faq/faq.EN.md#Why-write-name-block-name-modifier--)

## Mix

Allows to use different BEM entities on a single DOM node.

Mixes allow you to:

* to combine the behaviors and styles of multiple entities without duplicating code;
* to create a semantically new interface components based on available.

**Example**

```html
&lt;!-- The block `header` --&gt;
&lt;div class=&quot;header&quot;&gt;
&lt;!-- To the block `search-form` premiksov the element `search-form` block `header`--&gt;
&lt;div class=&quot;search-form header__search-form&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
```

In this example, we combined the behavior and styles of the `search-form` and `search-form` `header`.
This approach allows us to define the external geometry and the positioning in the `header__search-form`, and the `search-form` to leave universal.
Thus, the unit can be used in any other environment because it does not specify any padding. This allows us to speak about its independence.

## File structure

Adopted in the BEM methodology, the component approach is applied to the [project in the file structure](../filestructure/filestructure.EN.md#Organization-file structure). The implementation of blocks, elements and modifiers are divided into independent files technology that allows us to connect optional.

Features:

* One unit — one directory.
* The names of the unit and directory are the same. For instance, the `header` directory `header/`, unit `menu` directory `menu`.
* The block implementation is divided into separate files technology. For example: `header.css`, `header.js`.
* The block directory is the root for subdirectories corresponding elements and modifiers.
* The directory path elements start with a double underscore (`__`). For example: `header/__logo/`, `menu/__item/`.
* The names of directories modifiers begin with a single underscore (`_`). For example: `header/_fixed/`, `menu/_theme_islands/`.
* Implementation of the elements and modifiers are divided into separate files technology. For example: `header__input.js`, `header_theme_islands.css`.

**Example**

```files
search-form/ # Directory block `search-form`,

__input/ # Subdirectory of the element `search-form__input`
search-form__input.css # Implementation of the element `search-form__input`
# in the CSS technology
search-form__input.js # Implementation of `search-form__input`
# JavaScript

__button/ # Subdirectory of the element `search-form__button`
search-form__button.css
search-form__button.js

_theme/ # Subdirectory modifier
# `search-form_theme`
search-form_theme_islands.css # block Implementation `search-form`, having
# the modifier `theme` with value `islands`
# in the CSS technology
search-form_theme_lite.css # block Implementation `search-form`, having
# the modifier `theme` with value `lite`
# in the CSS technology

search-form.css # block Implementation `search-form`,
# in the CSS technology
search-form.js # the block Implementation `search-form`,
# JavaScript
```

This file structure makes it easy to maintain and reuse code.

> Extensive file structure assumes that in production your code will [to gather in a common project files](../build/build.EN.md#Methodology-build-BEM-project).

Adhere to the [recommended file structure](../filestructure/filestructure.EN.md#nested) not necessarily. You can use any alternative structure of the project, consistent with the principles of the organization of the file structure of the BEM, for example:
* the [Flat](../filestructure/filestructure.EN.md#flat)
* the [Flex](../filestructure/filestructure.EN.md#flex)
