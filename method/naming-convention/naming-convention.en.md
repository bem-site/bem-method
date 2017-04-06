# Naming convention

Working with [BEM entities](../key-concepts/key-concepts.en.md#bem-entity) requires a knowledge of their naming rules.

The main idea of the naming convention is to make names of CSS selectors as informative and clear as possible. This will help make code development and debugging easier and also solve some of the problems faced by web developers.

Let's say we have a CSS selector named `menuitemvisible`. A quick view of such a notation doesn't allow us to identify types of BEM entities from the name of the selector.

Let’s add a delimiter:

* `menu-item-visible`;
* `menuItemVisible`.

Written like this, the name of the selector is clearly divided into logical parts. We can assume `menu` to be a block, `item` to be an element, and `visible` to be a modifier. However, real-life examples are often more complicated and not as straightforward, and that’s where the BEM naming convention comes in useful.

The BEM methodology provides an idea for creating naming rules and implements that idea in its canonical [CSS selector naming convention](#css-selector-naming-convention). However, a number of [alternative schemes](#alternative-naming-schemes) based on the BEM principles also exist in the world of web development.

## CSS selector naming convention

* Names of BEM entities are written using **numbers** and **lowercase** **Latin characters**.
* Individual words within names are separated by a **hyphen** (`-`).
* Information about the names of blocks, elements, and modifiers is stored using **CSS classes**.

Naming rules for:

* [blocks](#block-name)
* [elements](#element-name)
* [modifiers](#modifier-name)

### Block name

A block name follows the `block-name` scheme and defines a [namespace](https://en.wikipedia.org/wiki/Namespace) for elements and modifiers.

Different prefixes can sometimes be added to block names.

> Our experience of using prefixes is told in detail in the article [The History of BEM](../history/history.en.md#blocks-to-the-rescue).

**Example**

`menu`

`lang-switcher`

*HTML*

```html
<div class="menu">...</div>
```

*CSS*

```css
.menu { color: red; }
```

### Element name

The namespace defined by the name of a block identifies an element as belonging to the block. An element name is delimited by a double underscore (`__`).

The full name of an element is created using this scheme:

`block-name__elem-name`

If a block has several identical elements, such as in the case of menu items, all of them will have the same name `menu__item`.

> **Important!** [Using elements within elements is not recommended by the BEM methodology](../../faq/faq.en.md#why-does-bem-not-recommend-using-elements-within-elements-block__elem1__elem2).

**Example**

`menu__item`

`lang-switcher__lang-icon`

*HTML*

```html
<div class="menu">
  ...
  <span class="menu__item"></span>
</div>
```

*CSS*

```css
.menu__item { color: red; }
```

### Modifier name

The namespace defined by the name of a block identifies a modifier as belonging to that block or its element. A modifier name is delimited by a single underscore (`_`).

The full name of a modifier is created using the scheme:

* For Boolean modifiers — `owner-name_mod-name`.
* For key-value type modifiers — `owner-name_mod-name_mod-val`.

> **Important!** In the BEM methodology, [a modifier cannot be used outside of the context of its owner](../../faq/faq.en.md#why-include-the-block-name-in-names-of-modifier-and-element).

#### Block modifier

* **Boolean modifier**.

  The value of such a modifier is not specified. The full name is created using the scheme: `block-name_mod-name`.

  **Example**

  `menu_hidden`

* **Key-value type modifier**.

  The value of a modifier is separated from its name by a single underscore (`_`). The full name is created using the scheme: `block-name_mod-name_mod-val`.

  **Example**

  `menu_theme_islands`

  *HTML*

  ```html
  <div class="menu menu_hidden">...</div>
  <div class="menu menu_theme_islands">...</div>
  ```

  > *Incorrect notation*
  >
  > ```html
  > <div class="menu_hidden">...</div>
  > ```
  >
  > Here the notation is missing the block that is affected by the modifier.

  *CSS*

  ```css
  .menu_hidden { display: none }
  .menu_theme_islands { color: green; }
  ```

#### Element modifier

* **Boolean modifier**.

  The value of such a modifier is not specified. The full name is created using this scheme: `block-name__elem-name_mod-name`.

  **Example**

  `menu__item_visible`

* **Key-value type modifier**.

  The value of a modifier is separated from its name by a single underscore (`_`). The full name is created using the scheme: `block-name__elem-name_mod-name_mod-val`.

  **Example**

  `menu__item_type_radio`

  *HTML*

  ```html
  <div class="menu">
    ...
    <span class="menu__item menu__item_visible menu__item_type_radio">...</span>
  </div>
  ```

  *CSS*

  ``` css
  .menu__item_type_radio { color: blue; }
  ```

### Example of using the naming convention

The implementation of an authorization form in HTML and CSS:

*HTML*

```html
<form class="form form_login form_theme_forest">
    <input class="form__input">
    <input class="form__submit form__submit_disabled">
</form>
```

*CSS*

```css
.form {}
.form_theme_forest {}
.form_login {}
.form__input {}
.form__submit {}
.form__submit_disabled {}
```

## Alternative naming schemes

There are some alternative solutions that are based on the BEM naming convention.

### Two Dashes style

`block-name__elem-name--mod-name`

* Names are written in lower case.
* Words within the names of BEM entities are separated by a hyphen (`-`).
* An element name is separated from a block name by a double underscore (`__`).
* Boolean modifiers are delimited by double hyphens (`--`).
* Key-value type modifiers are not used.

> **Important!** Double hyphen within the comment (`--`) is perceived as part of the comment and therefore its presence lead to error during document validation. [HTML5 Specification](http://www.w3.org/TR/html5/syntax.html#comments)

### CamelCase style

`MyBlock__SomeElem_modName_modVal`

This style differs from the classic one in that it uses [CamelCase](https://en.wikipedia.org/wiki/CamelCase) instead of a hyphen for separating words within BEM entity names.

### ”Sans underscore“ style

`blockName-elemName--modName--modVal`

* Names are written in CamelCase.
* An element name is separated from a block name by a single hyphen (`-`).
* Modifiers are delimited by double hyphens (`--`).
* The value of a modifier is separated from its name by a double hyphen (`--`).

> **Important!** Double hyphen within the comment (`--`) is perceived as part of the comment and therefore its presence lead to error during document validation. [HTML5 Specification](http://www.w3.org/TR/html5/syntax.html#comments).

### No namespace style

`_available`

This style is characterized by the absence of a block or element name before a modifier. Such a scheme puts limitations on the use of [mixes](../key-concepts/key-concepts.en.md#Mix), as it makes it impossible to determine what block or element a modifier belongs to.

## Which style to choose

The BEM methodology offers general principles for naming BEM entities. The choice of a particular naming scheme depends on your project requirements and personal preferences. One considerable advantage of using [the naming convention](#css-selector-naming-convention) offered by the methodology is the existence of ready-made development tools that are specifically geared towards the ”classic naming“.

Besides, the BEM methodology is not limited in its scope to the HTML and CSS technologies, which are discussed in this document. The concepts of blocks, elements, and modifiers are used when working with the JavaScript, templates and file structure of a BEM project. The [bem-naming](https://en.bem.info/toolbox/sdk/bem-naming/) tool enables us to use the same names for BEM entities in all of the [implementation technologies](../key-concepts/key-concepts.en.md#implementation-technology) that may be used.

By default, `bem-naming` is configured to use the naming convention according to the methodology, but it allows you to add rules so you can use alternative schemes.
