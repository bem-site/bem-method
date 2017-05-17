# FAQ

## Why BEM?

* [1tag] (2 tag&nbsp;)
* BEM basics.
* the [what is the difference between BEM and Bootstrap?](#-what-difference-between-BAM-and-bootstrap)

## Blocks and items

* the [In which case create a block in which element?](#In-which-case-new-unit-in-which-the)
* the [Why BEM is not recommended to create elements of elements (block__elem1__elem2)?](#Why-to-BAM-not-recommended-create-elements-element-block__elem1__elem2)
* the [Why write the name of the block name modifiers and elements?](#Why-write-name-block-name-modifier--)
* the [Why can't I write the name of the modifier unit in the item's name (block_mod__elem)?](#Why-not-write-name-modifier-block-in-name-item-block_mod__elem)
* the [How to make global modifiers for blocks?](#How-make-global-modifiers-for-block)
* the [Why create separate directories and files for each unit and technology?](#Why-create-separate-folder-and-files-for-each-block-and-technology)

## JavaScript

* the [Why use i-bem.js if you have jQuery?](#Why-use-i-bemjs-if-can-write-on-jquery)

## CSS

* the [Why should I avoid using nested selectors?](#Why-don-use-nested-selectors)
* the [Why BEM is not recommended to use combined selectors to create CSS rules for modifiers?](#Pochemu-V-BAM-ne-rekomenduetsya-ispolzovat-kombinirovannye-selector-dlya-sozdaniya-css-pravil-K-modifikator)
* the [Can I combine a tag and a class selector (e.g., button.button)?](#is it Possible to combine tag-and-class-in-the-selector-for Example-buttonbutton)
* the [Why does BEM not use custom tags (custom tag) for blocks?](#Why-to-BAM-not-use-custom-tags custom-tags-for-block)
* the [Why not to do a total reset (reset)?](#Why-can't-do-General-reset-styles-reset)
* the [Why can't I write block_mod is block block_mod if the modifier name already contains all the information about the block?](#Pochemu-nelzya-pisati-block_mod-vmesto-block-block_mod-esli-ima-modifikator-use-soderzhit-WSU-informaciyu-o-bloke)
* the [Why not indicate the name of the CSS property in the name of the modifier: .block__element_border-color_grey?](#Pochemu-nelzya-okazyvat-nazvanie-css-svoystva-V-imeni-modifikator-block__element_border-color_grey)


the **Not found the answer?** — [Ask a question to the team forum](https://ru.bem.info/forum/)

## What is the difference from BEM, OOCSS, AMCSS, SMACSS, SUITCSS?

1. BEM is not just for CSS but also with JavaScript.
1. BEM has more in common with Web Components than with the CSS solutions listed. ([what is the difference between BEM and Web Components?](#-what-difference-between-BAM-and-web-components))
1. BEM provides a complete solution for creating the architecture of the project and helps to organize development processes. Read more in the section [Application of methodology for solving problems web development](../method/solved-problems/solved-problems.EN.md).

>Read more about [the BEM methodology,](https://ru.bem.info/method/).

You can use BEM only at the CSS level. To do this, simply follow the [recommendations methodology](../method/naming-convention/naming-convention.EN.md).

## What is the difference between BEM and Web Components?

Browser support

* Web Components [not supported](http://caniuse.com/#search=Web%20Components) in Safari, iOS Safari, Internet Explorer, Firefox.
* BEM works in all browsers.

Encapsulation

* In Web Components is implemented using Shadow DOM.
* In the BEM using [](../method/key-concepts/key-concepts.EN.md#Item) block.

Work templates

* In Web Components, templates are always executed in the browser. This may require additional solutions to the problems with indexing.
* В БЭМ генерация шаблона возможна на этапе разработки. This allows you to give HTML. Templates can be executed in the browser and on the server.


* Web Components использует императивный принцип — интерполяцию строк.
* BEM uses a declarative approach, which allows to flexibly manage the standardization and to avoid repetition. Detail about the difference between declarative and imperative approaches, see the report of the [Sergey Berezhnoy](https://ru.bem.info/authors/berezhnoy-sergey/) — [template Engines](https://events.yandex.ru/lib/talks/553/).

Instead of importing the HTML build

* Web Components uses the import HTML (HTML Imports) that works directly in the browser. To merge HTML files use [Vulcanize](http://webcomponents.org/articles/introduction-to-html-imports/#aggregating-network-requests).
* BEM uses collectors: [ENB](https://ru.bem.info/tools/bem/enb-bem/) or [bem-tools](https://ru.bem.info/tools/bem/bem-tools/).

Instead of Custom Elements — abstraction over the DOM tree

* In Web Components use the Custom Elements. This approach allows to place on one DOM node with only one component.
* In BEM there is the concept of [BEM-tree](../method/key-concepts/key-concepts.EN.md#BEM-tree). БЭМ использует [миксы](../method/key-concepts/key-concepts.ru.md#Микс) — размещение нескольких БЭМ-сущностей на одном DOM-узле.

## What is the difference between BEM and Bootstrap?

In terms of BEM [Bootstrap](http://getbootstrap.com/) is a set of ready-made blocks. BEM is not a library of interface elements, and methodology:

* to create the architecture of the project;
* to develop a web application independent blocks;
* to simplify the project support.

The library of blocks made on the BEM [bem-components](https://ru.bem.info/libs/bem-components/). Also available are the [](https://ru.bem.info/libs/) BEM library.

## In which case, create a block, in which the element?

BEM methodology does not define strict rules establishing a uniform approach for creating blocks or elements. Much depends on the specific implementations and the personal preferences of the developer. However, there are [some guidelines](../method/quick-start/quick-start.EN.md#When-new-block-when-the) to help you understand this issue.

## Why BEM is not recommended to create elements of elements (block__elem1__elem2)?

The presence of elements of elements limits the ability to change the internal structure of the block: elements can not be reversed, removed or added without modifying existing code.

>Read more in the section [Quick start](../method/quick-start/quick-start.EN.md#Nested-1).

## Why write the name of the block name modifiers and elements?

The name of the block name modifiers and elements provides:

* the [namespace](#Space-name)
* the [Mixes](#Mixes)
* the [code Search](#Search-in-code)

the **Important!** BEM Methodology [allow](../method/naming-convention/naming-convention.EN.md#Alternative-schema-naming) convenient naming strategy, but it requires keeping consistency in the names. Так, например, все варианты верны: `context`, `ctx` или `c`, `attributes`, `attrs` или `as`. You must choose one of them and use throughout the project.

### Namespace

Block name specifies the namespace and provides unique names for elements and modifiers. This allows to limit the influence of elements and modifiers one unit to another.

### Mixes

When using the mixes you must explicitly specify the namespace for modifiers, to make it clear which of the entities on the DOM node is the modifier. If the block name is not specified, the modifier will apply to all the mixed BEM entities.

For example, consider a mix of a menu item (`menu_item`) and (`button`):

```html
&lt;div class=&quot;menu__item button&quot;&gt;&lt;/div&gt;
```

Let's add a modifier to the `active` in short notation (no block name):

```html
&lt;div class=&quot;menu__item button active&quot;&gt;&lt;/div&gt;
```

In this form, the HTML markup does not understand what a modifier belongs: to the menu item (`menu__item.active`) or a button (`button.active`). Block name (`button_active`) clearly indicates BEM entity to which the modifier will be applied.

Also the entry `&lt;div class=&quot;block mod&quot;&gt;` does not understand what BEM-entities are being used. For example, from `&lt;div class=&quot;checkbox button&quot;&gt;` cannot be uniquely determined, is a mixture of a modifier and a block or a mix of the two blocks.

The full name of the modifier is `&lt;div class=&quot;block block_mod&quot;&gt;` shows what kind of entity is it: `&lt;div class=&quot;checkbox checkbox_button&quot;&gt;`.

### Search in the code

Explicit and unique names make it easier to find the entities in code and file system.

Compare the global search results when you debug your project. You will find a modifier called `active`. In abbreviated form (`active`) in the search results will include all possible combinations and HTML-fragments containing the `active`. In the recording, recommended methodology, the name itself already contains a lookup parameter for the block name (`button_active`). As the modifier name unique, the search results will include only relevant code fragments.

## Why can't I write the name of the modifier unit in the item's name (block_mod__elem)?

Element — an integral part of the block but not a block modifier. Thus, only the block name can specify a namespace for elements.

This is important because:
* A block can have many modifiers.
```html
<div class="block block_mod1 block_mod2 block_mod3">
    <div class="block__elem"></div>
</div>
```
* The modifier defines the condition of the block/item, which can be changed during the execution of your JavaScript.

## How to make global modifiers for blocks?

In BEM there is no concept of a global modifier as the modifier always refers to one specific [BEM-entity](../method/key-concepts/key-concepts.EN.md#BEM-entity).

If you want to make CSS property beyond a single block and apply it to different BEM-entities in the project, you must create a separate block that is implemented in the CSS technology.

BEM allows to combine the implementation of different blocks with [mixes](../method/key-concepts/key-concepts.EN.md#Mix):

```html
&lt;div class=&quot;block1 block2&quot;&gt;&lt;/div&gt;
```

## Why create a separate directory and files for each unit and technology?

The file system of the BEM project is divided into a hierarchy of directories and files for the [ease of development and support of the project](../method/filesystem/filesystem.ru.md#Realizacia-Bloka-razdevaetsya-na-otdelnye-file).

Adhere to the [recommended file system](../method/filesystem/filesystem.EN.md#nested) not necessarily. You can use any alternative structure of the project, consistent with the principles of the organization of the file system of the BEM, for example:
* the [Flat](../method/filesystem/filesystem.EN.md#flat).
* the [Flex](../method/filesystem/filesystem.EN.md#flex).

## Why use i-bem.js if you have jQuery?

the [i-bem.js](https://ru.bem.info/technology/i-bem/) is a specialized framework for the development of projects in JavaScript in terms of blocks, elements and modifiers.

the `i-bem.js` is not intended to replace General-purpose framework, such as jQuery.

the `i-bem.js` allows to:

* to develop a web interface in terms of blocks, elements, modifiers);
* integrate JavaScript code with templates and CSS rules in the style of BEM;
* to describe the logic of a block as a set of States.

## Why should I avoid using nested selectors?

BEM — independent blocks. the [Nested selectors](http://htmlbook.ru/css/selector/descendant) increase coupling and make code reuse impossible. This is contrary to the principles of the BEM.

The BEM methodology allows the use of selectors, but recommends that the maximum shortening it.

For example, nesting is appropriate to change the elements depending on the condition of the unit or its assigned topics:

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

## Why BEM is not recommended to use combined selectors to create CSS rules for modifiers?

Combined selectors complicate the redefinition of the unit, as they have a higher CSS specificity than a single. The specificity of the combined selector for a block modifier (`.block1.mod`) and for a redefined block (`.block2 .block1`) are the same. Redefine the block will depend only on the order of the rules in the Declaration.

Consider this example:

```html
&lt;div class=&quot;header&quot;&gt;
&lt;button class=&quot;button active&quot;&gt;
&lt;/div&gt;
```
Правила модификатора `active` для кнопки записываются как комбинированный селектор `.button.active`. When overriding the button with the parent block `header` creates a selector, `.header .button`. The specificity of both selectors are the same, so the application of CSS rules determines the order of their Declaration.

Use the block name in the title modifier provides a higher priority to CSS rules when overriding the block.
Selector to the `.header .button` will always have higher priority than the `.button_active`.

>the [why use the block name in the name of the modifier](#Why-write-name-block-name-modifier--)

## Can I combine a tag and a class selector? For example, a button.button.

The combination of the tag and class selector increases specificity of CSS rules. Adding a modifier block rules can't be overridden, because the specificity of the selector unit above.

Consider this example:

```html
&lt;button class=&quot;button&quot;&gt;
```

Recorded for it CSS rules in the selector `button.button`.

Let's add a modifier:

```html
&lt;button class=&quot;button button_active&quot;&gt;
```

Selector to the `.button_active` will not override the properties of the block, written as `button.button`, as the specificity of the `button.button` above. To successfully override selector block modifier must also be combined with the tag `button.button_active`.

The development of the project may have blocks with selectors like `input.button`, `span.button`, for example `a.button`. In this case, all modifiers of the `button` and its nested elements will require four different declarations for each case.

## Why does BEM not use custom tags (custom tags) for blocks?

>The blocks can be represented in HTML with custom tags to which a CSS rule. In this case, classes can only be used for modifiers are: `&lt;button class=&quot;mod&quot;/&gt;`.

Custom tags can be used to create block selectors, but there are some limitations:

* You cannot use the [mixes](../method/key-concepts/key-concepts.EN.md#Mix).
* Not all blocks can be represented by custom tags. For example, all links you need the `&lt;a&gt;` and field `&lt;input&gt;`.

## Why not do a master reset (reset)?

Block — independent component. Should not influence the CSS rules that are created for the entire page. This violates the independence of blocks and makes them difficult to reuse.

Reset styles in fact is implemented using [CSS](#How-make-global-modifiers-for-block), which in most cases are written to the [selectors on the](#Why-to-BAM-not-use-custom-tags custom-tags-for-block), that it is undesirable to use in a BEM project.

If you reset the styles still required, in the BEM is done in each block.

Let's consider an example. If the project blocks the menu and list are expressed in HTML using the tag `&lt;ul&gt;`, so each unit must provide a CSS reset for `&lt;ul&gt;`. Repetitions in the resulting code can be avoided by using a CSS optimizer.

If the project does not use a CSS optimizer that combines selectors with the same set of rules, you can use a CSS preprocessor. Then for each new block you can do a reset of rules, [mixing](../method/key-concepts/key-concepts.EN.md#Mix) clean code. For example, in SASS it will look like this:

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

This method should only be used when there is no optimizer.

## Why can't I write block_mod is block block_mod if the modifier name already contains all the information about the block?

If you write `block_mod` instead of `block_mod block`, all of the basic CSS properties of the block will need to determine the modifier `block_mod`. Modifiers can occur in the process block (e.g., as a response to DOM events block) and on request from other units. So, copy the CSS code that implements the functionality of the base unit, will have all its modifiers. This will lead to code duplication.

## Why not indicate the name of the CSS property in the name of the modifier: .block__element_border-color_grey?

* If you change the appearance of a block or element will have to change not only the CSS code, but the selector names. For example, if the border color will change from gray (`grey`) red (`red`), you will need to edit the templates, and probably JavaScript.
* When you add other properties (background, margins), the name will no longer match the content of the modifier.

The BEM methodology recommends choosing names for modifiers based on semantics, not visual design.
