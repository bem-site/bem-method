# Naming convention

The name of a BEM entity is unique. The same BEM entity always has the same name in all technologies (CSS, JavaScript, and HTML). The primary purpose of the naming convention is to give names meaning so that they are as informative as possible for the developer.

Compare the same name for a CSS selector that is written in different ways:

* `menuitemvisible`
* `menu-item-visible`
* `menuItemVisible`

To understand the meaning of the first name, you need read through each word carefully. In the last two examples, the name is clearly divided into its parts. But none of these names helps us understand that `menu` is a block, `item` is an element, and `visible` is a modifier. The rules for naming BEM entities were developed in order to make entity names unambiguous and easy to understand.

## Naming rules

` block-name__elem-name_mod-name_mod-val`

* Names are written in lowercase Latin letters.
* Words are separated by a hyphen (`-`).
* The block name defines the [namespace](https://en.wikipedia.org/wiki/Namespace) for its elements and modifiers.
* The element name is separated from the block name by a double underscore (`__`).
* The modifier name is separated from the block or element name by a single underscore (`_`).
* The modifier value is separated from the modifier name by a single underscore (`_`).
* For boolean modifiers, the value is not included in the name.

> **Important:** Elements of elements [do not exist in the BEM methodology](../../faq/faq.en.md#can-i-create-elements-of-elements-block__elem1__elem2). The naming rules do not allow creating elements of elements, but you can nest elements inside each other in the DOM tree.

### Examples

In HTML, BEM entities are represented by the `class` attribute. In BEM, for any of the technologies, there is a call to the class:
* [CSS](../bem-for-css/bem-for-css.en.md#selectors)
* [JavaScript](../bem-for-js/bem-for-js.en.md#dom-representation-of-dynamic-blocks)
* [templates](../bem-for-html/bem-for-html.en.md#generating-html-automatically)

Examples of the naming rules are applied to CSS.

#### Block name

`menu`

> [Why don't block names need prefixes?](../history/history.en.md#blocks-to-the-rescue)

*HTML*

```html
<div class="menu">...</div>
```

*CSS*

```css
.menu { color: red; }
```

#### Element name

`menu__item`

> **Important:** Identical elements in the same block have the same names. For example, all menu items in the menu block are called `menu__item`.

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

#### Block modifier name

`menu_hidden`  
`menu_theme_islands`

*HTML*

```html
<div class="menu menu_hidden"> ... </div>
<div class="menu menu_theme_islands"> ... </div>
```

*CSS*

```css
.menu_hidden { display: none; }
.menu_theme_islands { color: green; }
```

#### Element modifier name

`menu__item_visible`  
` menu__item_type_radio`

*HTML*

```html
<div class="menu">
    ...
    <span class="menu__item menu__item_visible menu__item_type_radio"> ... </span>
</div>
```

*CSS*

```css
.menu__item_visible {}
.menu__item_type_radio { color: blue; }
```

## Alternative naming schemes

The naming rules above describe the classic approach to naming BEM entities. All [BEM tools](https://en.bem.info/toolbox/) follow the classic naming scheme by default.

There are alternative solutions that are actively used in the BEM community. To have all technologies apply identical names that were created using alternative naming schemes, use the [bem-naming](https://github.com/bem/bem-sdk#naming) tool. By default, `bem-naming` is configured to use the methodology's standard naming convention, but it allows you to add rules so you can use alternative schemes.

### Two Dashes style

`block-name__elem-name--mod-name--mod-val`

* Names are written in lowercase Latin letters.
* Words within the names of BEM entities are separated by a hyphen (`-`).
* The element name is separated from the block name by a double underscore (`__`).
* Boolean modifiers are separated from the name of the block or element by a double hyphen (`--`).
* The value of a modifier is separated from its name by a double hyphen (`--`).

> **Important:** A double hyphen inside a comment (`--`) may cause an error during [validation of an HTML document](http://www.w3.org/TR/html5/syntax.html#comments).

### CamelCase style

`blockName-elemName_modName_modVal`

* Names are written in Latin letters.
* Each word inside a name begins with an uppercase letter.
* The separators for names of blocks, elements, and modifiers are the same as in the standard scheme.

### React style

`BlockName-ElemName_modName_modVal`

* Names are written in Latin letters.
* Names of blocks and elements begin with an uppercase letter. Names of modifiers begin with a lowercase letter.
* Each word inside a name begins with an uppercase letter.
* An element name is separated from the block name by a single hyphen (`-`).
* The separators between names and values of modifiers are the same as in the standard scheme.

### No Namespace style

`_available`

* Names are written in Latin letters.
* The name of the block or element is not included before the modifier.

This naming scheme limits the use of [mixes](../key-concepts/key-concepts.en.md#mix), because it makes it impossible to determine which block or element a modifier belongs to.

### Your naming system

You can create your own custom naming solution for BEM entities. The most important thing is that your new naming system makes it possible to programmatically separate blocks from elements and modifiers.
