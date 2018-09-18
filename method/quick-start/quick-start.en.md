# Quick start

## Introduction

BEM (Block, Element, Modifier) is a component-based approach to web development.
The idea behind it is to divide the user interface into independent blocks. This makes interface development easy and fast even with a complex UI, and it allows reuse of existing code without copying and pasting.

## Contents

* [Block](#block)
* [Element](#element)
* [Should I create a block or an element?](#should-i-create-a-block-or-an-element)
* [Modifier](#modifier)
* [Mix](#mix)
* [File structure](#file-structure)

## Block

A functionally independent page component that can be reused. In HTML, blocks are represented by the `class` attribute.

Features:

* The [block name](../naming-convention/naming-convention.en.md#block-name) describes its purpose ("What is it?" — `menu` or `button`), not its state ("What does it look like?" — `red` or `big`).

**Example**

```html
<!-- Correct. The `error` block is semantically meaningful -->
<div class="error"></div>

<!-- Incorrect. It describes the appearance -->
<div class="red-text"></div>
```

* The block shouldn't influence its environment,  meaning  you shouldn't set the external geometry (margin) or positioning for the block.
* You also shouldn't use CSS tag or `ID` selectors when using BEM.

This ensures the necessary independence for reusing blocks or moving them from place to place.

### Guidelines for using blocks

#### Nesting

* Blocks can be nested in each other.
* You can have any number of nesting levels.

**Example**

```html
<!-- `header` block -->
<header class="header">
    <!-- Nested `logo` block -->
    <div class="logo"></div>

    <!-- Nested `search-form` block -->
    <form class="search-form"></form>
</header>
```

## Element

A composite part of a block that can't be used separately from it.

Features:

* The [element name](../naming-convention/naming-convention.en.md#element-name) describes its purpose ("What is this?" — `item`, `text`, etc.), not its state ("What type, or what does it look like?" — `red`, `big`, etc.).
* The structure of an element's full name is `block-name__element-name`. The element name is separated from the block name with a double underscore (`__`).

**Example**

```html
<!-- `search-form` block -->
<form class="search-form">
    <!-- `input` element in the `search-form` block -->
    <input class="search-form__input">

    <!-- `button` element in the `search-form` block -->
    <button class="search-form__button">Search</button>
</form>
```

### Guidelines for using elements

* [Nesting](#nesting-1)
* [Membership](#membership)
* [Optionality](#optionality)

#### Nesting

* Elements can be nested inside each other.
* You can have any number of nesting levels.
* An element is always part of a block, not another element. This means that element names can't define a hierarchy such as `block__elem1__elem2`.

**Example**

```html
<!--
    Correct. The structure of the full element name follows the pattern:
    `block-name__element-name`
-->
<form class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">

        <button class="search-form__button">Search</button>
    </div>
</form>

<!--
    Incorrect. The structure of the full element name doesn't follow the pattern:
    `block-name__element-name`
-->
<form class="search-form">
    <div class="search-form__content">
        <!-- Recommended: `search-form__input` or `search-form__content-input` -->
        <input class="search-form__content__input">

        <!-- Recommended: `search-form__button` or `search-form__content-button` -->
        <button class="search-form__content__button">Search</button>
    </div>
</form>
```

The block name defines the namespace, which [guarantees that the](../naming-convention/naming-convention.en.md#element-name) elements are dependent on the block (`block__elem`).

A block can have a nested structure of elements in the DOM tree:

**Example**

```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
```

However, this block structure is always represented as a flat list of elements in the BEM methodology:

**Example**

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

This allows you to change a block's DOM structure without making changes in the code for each separate element:

**Example**

```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2"></div>
    </div>

    <div class="block__elem3"></div>
</div>
```

The block's structure changes, but the rules for the elements and their names remain the same.

#### Membership

An element is **always part of a block**, and you shouldn't use it separately from the block.

**Example**

```html
<!-- Correct. Elements are located inside the `search-form` block -->
<!-- `search-form` block -->
<form class="search-form">
    <!-- `input` element in the `search-form` block -->
    <input class="search-form__input">

    <!-- `button` element in the `search-form` block -->
    <button class="search-form__button">Search</button>
</form>

<!--
    Incorrect. Elements are located outside of the context of
    the `search-form` block
-->
<!-- `search-form` block -->
<form class="search-form">
</form>

<!-- `input` element in the `search-form` block -->
<input class="search-form__input">

<!-- `button` element in the `search-form` block-->
<button class="search-form__button">Search</button>
```

#### Optionality

An element is an optional block component. Not all blocks have elements.

**Example**

```html
<!-- `search-form` block -->
<div class="search-form">
    <!-- `input` block -->
    <input class="input">

    <!-- `button` block -->
    <button class="button">Search</button>
</div>
```

## Should I create a block or an element?


### Create a block

If a section of code might be reused and it doesn't depend on other page components being implemented.

### Create an element

If a section of code can't be used separately without the parent entity (the block).

The exception is elements that must be divided into smaller parts – subelements – in order to simplify development. In the BEM methodology, [you can't create elements of elements](#nesting-1). In a case like this, instead of creating an element, you need to create a service block.

## Modifier

An entity that defines the appearance, state, or behavior of a block or element.

Features:

* The [modifier name](../naming-convention/naming-convention.en.md#block-modifier-name) describes its appearance ("What size?" or "Which theme?" and so on — `size_s` or `theme_islands`), its state ("How is it different from the others?" — `disabled`, `focused`, etc.) and its behavior ("How does it behave?" or "How does it respond to the user?" — such as `directions_left-top`).
* The modifier name is separated from the block or element name by a single underscore (`_`).

### Types of modifiers

#### Boolean

* Used when only the presence or absence of the modifier is important, and its value is irrelevant. For example, `disabled`. If a Boolean modifier is present, its value is assumed to be `true`.

* The structure of the modifier's full name follows the pattern:

  * `block-name_modifier-name`
  * `block-name__element-name_modifier-name`

**Example**

```html
<!-- The `search-form` block has the `focused` Boolean modifier -->
<form class="search-form search-form_focused">
    <input class="search-form__input">

    <!-- The `button` element has the `disabled` Boolean modifier -->
    <button class="search-form__button search-form__button_disabled">Search</button>
</form>
```

#### Key-value

* Used when the modifier value is important. For example, "a menu with the `islands` design theme": `menu_theme_islands`.

* The structure of the modifier's full name follows the pattern:

  * `block-name_modifier-name_modifier-value`
  * `block-name__element-name_modifier-name_modifier-value`

**Example**

```html
<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <!-- The `button` element has the `size` modifier with the value `m` -->
    <button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- You can't use two identical modifiers with different values simultaneously -->
<form class="search-form
             search-form_theme_islands
             search-form_theme_lite">

    <input class="search-form__input">

    <button class="search-form__button
                   search-form__button_size_s
                   search-form__button_size_m">
        Search
    </button>
</form>
```

### Guidelines for using modifiers

#### A modifier can't be used alone

From the BEM perspective, a modifier can't be used in isolation from the modified block or element. A modifier should change the appearance, behavior, or state of the entity, not replace it.

**Example**

```html
<!--
    Correct. The `search-form` block has the `theme` modifier with
    the value `islands`
-->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>

<!-- Incorrect. The modified class `search-form` is missing -->
<form class="search-form_theme_islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>
```

> [Why write the block name in the names of modifiers and elements?](../../faq/faq.en.md#why-include-the-block-name-in-modifier-and-element-names)

## Mix

A technique for using different BEM entities on a single DOM node.

Mixes allow you to:

* Combine the behavior and styles of multiple entities without duplicating code.
* Create semantically new UI components based on existing ones.

**Example**

```html
<!-- `header` block -->
<div class="header">
    <!--
        The `search-form` block is mixed with the `search-form` element
        from the `header` block
    -->
    <div class="search-form header__search-form"></div>
</div>
```

In this example, we combined the behavior and styles of the `search-form` block and the `search-form` element from the `header` block.
This approach allows us to set the external geometry and positioning in the `header__search-form` element, while the `search-form` block itself remains universal.
As a result, we can use the block in any other environment, because it doesn't specify any padding. This is why we can call it independent.

## File structure

The component approach adopted in the BEM methodology also applies to [projects in the file structure](../filestructure/filestructure.en.md#file-structure-organization). The implementations of blocks, elements, and modifiers are divided into independent technology files, which means we can connect them individually.

Features:

* A single block corresponds to a single directory.
* The block and the directory have the same name. For example, the `header` block is in the `header/` directory, and the `menu` block is in the `menu/` directory.
* A block's implementation is divided into separate technology files. For example, `header.css` and `header.js`.
* The block directory is the root directory for the subdirectories of its elements and modifiers.
* Names of element directories begin with a double underscore (`__`). For example, `header/__logo/` and `menu/__item/`.
* Names of modifier directories begin with a single underscore (`_`). For example, `header/_fixed/` and `menu/_theme_islands/`.
* Implementations of elements and modifiers are divided into separate technology files. For example, `header__input.js` and `header_theme_islands.css`.

**Example**

```files
search-form/                           # Directory of the `search-form`

    __input/                           # Subdirectory of the `search-form__input`
        search-form__input.css         # CSS implementation of the
                                       # `search-form__input` element
        search-form__input.js          # JavaScript implementation of the
                                       # `search-form__input` element

    __button/                          # Subdirectory of the `search-form__button`
                                       # element
        search-form__button.css
        search-form__button.js

    _theme/                            # Subdirectory of the `search-form_theme`
                                       # modifier
        search-form_theme_islands.css  # CSS implementation of the `search-form` block
                                       # that has the `theme` modifier with the value
                                       # `islands`
        search-form_theme_lite.css     # CSS implementation of the `search-form` block
                                       # that has the `theme` modifier with the value
                                       # `lite`

    search-form.css                    # CSS implementation of the `search-form` block
    search-form.js                     # JavaScript implementation of the
                                       # `search-form` block
```

This file structure makes it easy to support the code and re-use it.

> The branched file structure assumes that in production the code will be [assembled into shared project files](../build/build.en.md#building-a-bem-project).

You aren't required to follow the [recommended file structure](../filestructure/filestructure.en.md#nested). You can use any alternative project structure that follows the BEM principles for organizing the file structure, such as:

* [Flat](../filestructure/filestructure.en.md#flat)
* [Flex](../filestructure/filestructure.en.md#flex)
