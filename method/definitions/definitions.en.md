## What is BEM?
`BEM` stands for Block, Element, Modifier. The meaning of these terms will be described
further in the article.

One of the most common examples of a methodology in programming is Object-Oriented Programming.
It's a programming paradigm embodied by many languages. In some ways, BEM
is similar to OOP. It's a way of describing reality in code, a range of patterns, and
a way of thinking about program entities regardless of programming languages being used.

We used BEM principles to create a set of front-end development techniques and tools, that
allow us to build websites quickly and maintain them over a long time.

### Unified Data Domain
Imagine an ordinary website, like the one pictured below.

![](http://img-fotki.yandex.ru/get/9347/221798411.0/0_babd8_4e505a88_XXL.png)

While developing such a site it is useful to mark out "blocks" of which the site consists.

For example, in this picture there are `Head`, `Main Layout` and `Foot` blocks. The
`Head` in turn consists of `Logo`, `Search`, `Auth block` and `Menu`. `Main
Layout` contains a `Page Title` and a `Text Block`.

![](http://img-fotki.yandex.ru/get/9258/221798411.0/0_babd7_c4c0b5d6_XXL.png)

Giving each part of the page a name is very useful when it comes to team communication.

A project manager could ask:
 * to make the `Head` bigger or
 * to create a page without a `Search` form in the `Head`

An HTML guy could ask a fellow JavaScript developer
 * to make `Auth Block` animated, etc.

Let's now take a closer look at what constitutes BEM:

#### Block
A `block` is an independent entity, a "building block" of an application.
A block can be either simple or compound (containing other blocks).

**Example**  
Search form block  

![](http://img-fotki.yandex.ru/get/9316/221798411.0/0_babd5_c3d7b2b5_XL.png)

#### Element
An `element` is a part of a block that performs a certain function. Elements are
context-dependent: they only make sense in the context of the block they belong to.

**Example**  
An input field and a button are elements of the Search Block

![](http://img-fotki.yandex.ru/get/5013/221798411.0/0_babd3_d1278b96_XXL.png)

### Means of describing pages and templates
Blocks and elements constitute page content. Besides simply being present on a page,
their arrangement is also important.

Blocks (or elements) may follow each other in a certain order.

For example, a list of goods on a commerce website:

![](http://img-fotki.yandex.ru/get/9109/221798411.0/0_babcc_d935a8ec_XXL.png)

…or menu items:

![](http://img-fotki.yandex.ru/get/6726/221798411.0/0_babd1_f14000fa_XL.png)

Blocks may also be contained inside other blocks.

For example, a `Head Block` includes other blocks:

![](http://img-fotki.yandex.ru/get/5008/221798411.0/0_babce_7deef28f_XXL.png)

Besides our building blocks we need a way to describe page layout in plain text.
To do so, every block and element should have a keyword that identifies it.

A keyword designating a specific block is called `block name`.

For example, `menu` can be a keyword for the `Menu Block`, `head` can be a
keyword for the `Head` block.

A keyword designating an element is called `element name`.

For example, each item in a menu is an element `item` of the `menu` block.

Block names must be unique within a project to unequivocally designate which
block is being described. Only instances of the same block can have same names.
In this case we say that one block is present on the page 2 (3, 4, …) times.

Element names must be unique within the scope of a block.
An element can be repeated several times.

For example, menu items:

![](http://img-fotki.yandex.ru/get/6726/221798411.0/0_babd1_f14000fa_XL.png)

Keywords should be put in certain order.
Any data format that supports nesting (XML, JSON) will do:

```xml
<b:page>
  <b:head>
    <b:menu>
      …
    </b:menu>
    <e:column>
      <b:logo/>
    </e:column>
    <e:column>
      <b:search>
        <e:input/>
        <e:button>Search</e:button>
      </b:search>
    </e:column>
    <e:column>
      <b:auth>
        …
      </b:auth>
    <e:column>
  </b:head>
</b:page>
```

In this example, `b` and `e` namespaces separate block nodes from element nodes.

The same in JSON:

```js
{
  block: 'page',
  content: {
    block: 'head',
    content: [
      { block: 'menu', content: … },
      {
        elem: 'column',
        content: { block: 'logo' }
      },
      {
        elem: 'column',
        content: [
          {
            block: 'search',
            content: [
              { elem: 'input' },
              { elem: 'button', content: 'Search' }
            ]
          }
        ]
      },
      {
        elem: 'column',
        content: {
          block: 'auth', content: …
        }
      }
    ]
  }
}
```

Examples above show an object model with blocks and elements nested inside each other.
This structure can also contain any number of custom data fields.

We call this structure `BEM tree` (by analogy with DOM tree).

Final browser markup is generated by applying template transformations (using XSL or
JavaScript) to a BEM tree.

If a developer needs to move a block to a different place on a page, he does so by
changing the BEM tree. Templates generate the final view themselves.

You can use any format to describe the BEM tree and any template engine.

We went with JSON as a page description format.
It is then turned into HTML by a JS-based template engine BEMHTML.

### Block Independence
As projects grow, blocks tend to be added, removed, or moved around the page. For example,
you may want to swap the `Logo` and `Auth Block` or to place the `Menu` under the
`Search Block`.

![](http://img-fotki.yandex.ru/get/9110/221798411.0/0_babcf_819f07f2_XXL.png)

![](http://img-fotki.yandex.ru/get/9153/221798411.0/0_babcd_313420f0_XXL.png)

To make this process easier, blocks must be `independent`.

An `independent` block is implemented in a way that allows arbitrary placement —
anywhere on the page, including nesting inside another block.

====Independent CSS
From the CSS point of view it means that

 * A block (or an element) must have a unique "name" (a CSS class) that could be used in a CSS rule.
 * HTML elements must not be used in CSS selectors (`.menu td`) as such selectors are inherently
   not context-free.
 * Cascading selectors should be avoided.

===== Naming for independent CSS classes
Here's one of the possible CSS class naming scheme:

 * CSS class for a block coincides with its `block name`

```xml
<ul class="menu">
  …
</ul>
```
 * CSS class for an element is a `block name` and an `element name` separated
 by some character(s)

```xml
<ul class="menu">
  <li class="menu__item">…</li>
  <li class="menu__item">…</li>
</ul>
```

It is necessary to include block name into a CSS class for an element to minimize cascading.

It is also important to use separators consistently to allow the tools and helpers (described
further) unambiguous programmatic access to the elements.

We use hyphen to separate words in long names (for example, `block-name`) and two underscores
to separate the name of the block form the name of the element (`block-name_~_element-name`).

But you can use any other separators for it.

E.g.:
  * `block-name-~-element-name` or
  * `blockName-elementName`

#### Independent templates
From the template engine's perspective, block independence means that:

 * Blocks and elements must be described in the input data  
    Blocks (or elements) must have unique "names" to make things like "`Menu` should be
    placed here" expressible in our templates.
 * Blocks may appear anywhere in a BEM tree

##### Independent templates for blocks
Coming upon a block in a template, the template engine should be able to unambiguously transform
it into HTML. Thus, every block should have a template for that.

For example, a template can look like this in XSL:

```xml
<xsl:template match="b:menu">
  <ul class="menu">
    <xsl:apply-templates/>
  </ul>
</xsl:template>

<xsl:template match="b:menu/e:item">
  <li class="menu__item">
    <xsl:apply-templates/>
  </li>
<xsl:template>
```

We are gradually discarding XSLT in our products in favor of our own JavaScript-based
template engine [XJST](https://github.com/veged/xjst). This template engine absorbs everything
we like about XSLT (we are fans of declarative programming), and implements it with JavaScript's
productivity on either client or server side.

We write our templates using a domain-specific language called BEMHTML, which is based on XJST.
[The main ideas of BEMHTML](/libs/bem-core/1.0.0/bemhtml/rationale/).

[BEMHTML](https://github.com/bem/bem-bl/tree/master/blocks-common/i-bem/__html)

### Blocks Reiteration
The second `Menu Block` can occur in the `Foot Block` of a site. Or, a `Text Block`
can turn into two, separated by an advertisement.

Even if a block was developed as a singular unit, the same one can appear on a page at any moment.

In CSS related terms, it means:
 * ID-based CSS selectors must not be used  
    Only class selectors satisfy our non-uniqueness requirement.

On the JavaScript side it means:
 * Blocks with similar behavior are detected unequivocally: they have the same CSS classes  
    Using CSS class selectors allow picking all blocks with a given name to apply the required
    dynamic behavior.

### Modifiers for Blocks
We often need to create a block very similar to an existing one, but with slightly altered
its appearance or behavior.

Let's say, we have a task:
 * Add another `Menu` in the `Footer` with a *different layout*.

![](http://img-fotki.yandex.ru/get/9255/221798411.0/0_babd6_ec71b7f8_XXL.png)

To avoid developing another block that is only minimally different from an existing one,
we can use a `modifier`.

A `modifier` is a property of a block or an element that alters its look or behavior.

A modifier has a name and a value. Several modifiers can be used at once.

**Example**  
A block modifier specifies background color

![](http://img-fotki.yandex.ru/get/9325/221798411.0/0_babd2_7da50c7b_XL.png)

**Example**  
An element modifier changes the look of the "current" item

![](http://img-fotki.yandex.ru/get/9313/221798411.0/0_babd0_503ecad_L.png)

#### From the input data point of view
In a BEM tree, modifiers are properties of an entity that describes a block or an element.

For example, they can be attribute nodes in XML:

```xml
<b:menu m:size="big" m:type="buttons">
  …
</b:menu>
```

The same expressed in JSON:

```js
{
  block: 'menu',
  mods: [
   { size: 'big' },
   { type: 'buttons' }
  ]
}
```

#### From the HTML/CSS point of view
A modifier is an additional CSS class for a block or an element.

```xml
<ul class="menu menu_size_big menu_type_buttons">
  …
</ul>
```

```css
.menu_size_big {
  // CSS code to specify height
}
.menu_type_buttons .menu__item {
  // CSS code to change item's look
}
```

### Element modifiers
Element modifiers are implemented in the same fashion.

Again, when writing CSS by hand, it is very important to use separators consistently for programmatic access.

E.g., current menu item can be marked with a modifier:

```xml
<b:menu>
  <e:item>Index<e:item>
  <e:item m:state="current">Products</e:item>
  <e:item>Contact<e:item>
</b:menu>
```

```js
{
  block: 'menu',
  content: [
    { elem: 'item', content: 'Index' },
    {
      elem: 'item',
      mods: { 'state' : 'current' },
      content: 'Products'
    },
    { elem: 'item', content: 'Contact' }
  ]
}
```

```css
.menu__item_state_current
{
  font-weight: bold;
}
```

Which could be represented in HTML as follows:

```xml
<ul class="menu">
  <li class="menu__item">Index</li>
  <li class="menu__item menu__item_state_current">Products</li>
  <li class="menu__item">Contact</li>
</ul>
```

Or to make menu classes independent of the implementation details of its layout:

```xml
<div class="menu">
  <ul class="menu__layout">
    <li class="menu__layout-unit">
      <div class="menu__item">Index</div>
    </li>
    <li class="menu__layout-unit">
      <div class="menu__item menu__item_state_current">Products</div>
    </li>
    <li class="menu__layout-unit">
      <div class="menu__item">Contact</div>
    </li>
  </ul>
</div>
```

```xml
<div class="menu">
  <table class="menu__layout">
  <tr>
    <td class="menu__layout-unit">
      <div class="menu__item">Index</div>
    </td>
    <td class="menu__layout-unit">
      <div class="menu__item menu__item_state_current">Products</div>
    </td>
    <td class="menu__layout-unit">
      <div class="menu__item">Contact</div>
    </td>
  </tr>
  </table>
</div>
```

### Subject-Matter Abstraction
When many people work on a project they should agree on a data domain and use it
when naming their blocks and elements.

For example, a `Tag Cloud` block is always named `tags`. Each of its elements is a
`tag`. This convention spreads across all languages: CSS, JavaScript, XSL, etc.

From the development process' point of view:
 * All participants operate on the same terms

From the CSS point of view:
 * CSS for blocks and elements can be written in a pseudo language that compiles
   down to CSS according to the naming convention.

```css
.menu {
  __layout {
    display: inline;
  }
  __layout-item {
    display: inline-block;
    …
  }
  __item {
    _state_current {
      font-weight: bold;
    }
  }
}
```

On the JavaScript side:
 * Instead of using class selectors directly to find DOM elements, a special helper
   library may be used:

```js
$('menu__item').click( … );
$('menu__item').addClass('menu__item_state_current');
$('menu').toggle('menu_size_big').toggle('menu_size_small');
```

The naming convention for CSS classes of blocks and elements can change in the course of
time. Using special JavaScript functions to access blocks and elements and to work with their
modifiers makes it possible to change only these functions if the naming convention changes.

```js
block('menu').elem('item').click( … );
block('menu').elem('item').setMod('state', 'current');
block('menu').toggleMod('size', 'big', 'small');
```

The code above is abstract. In real life we use the JavaScript core of `i-bem` block
from the `bem-bl` block library:
 <http://bem.github.com/bem-bl/sets/common-desktop/i-bem/i-bem.en.html>

### Blocks consistency
A site has a `Button` block with certain dynamic behavior.

![](http://img-fotki.yandex.ru/get/6728/221798411.0/0_babcb_d1c8832d_M.png)

When a block is hovered, it changes its appearance.

![](http://img-fotki.yandex.ru/get/9110/221798411.0/0_babca_47ce403c_M.png)

A manager could ask to use the same button on another page.

Having a CSS implementation of a block is not enough. Reusing a block also means reusing its
behavior, described in JavaScript.

So a block must "know" everything about itself. To implement a block we describe its appearance
and behavior in all technologies being used - we call that `multilingualism`.

`Multilingual` presentation is a description of a block in all the programming languages (techs)
that are necessary to implement the view and the functionality of a block.

To have a block present on a page as a UI element we need to implement it in the following techs:
 * Templates (XSL, TT2, JavaScript, etc), which turn block declarations into HTML code
 * CSS that describes appearance of the block
 * A JavaScript implementation for the block, if a block has dynamic behavior
 * Images
 * Documentation

Everything that constitutes a block is a block technology.

### Real examples
[Yandex](http://company.yandex.ru) is a large (mostly Russian) company that
use BEM methodology to develop its services.

BEM methodology does not request you to use certain framework. You also don't
have to use BEM for all the technologies you have on your pages (but that would
be the most efficient).

[All the services of Yandex](http://www.yandex.ru/all) have BEM in their
CSS and JavaScript code and XSL templates of the pages. E.g.,
 * [Yandex.Maps](http://maps.yandex.ru/?text=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&sll=37.609218%2C55.753559&ll=37.609218%2C55.753563&spn=2.570801%2C0.884460&z=9&l=map)
 * [Yandex.Images](http://images.yandex.ru/yandsearch?text=Yandex+office&rpt=image)  
    This is a service for searching images in the Internet.
 * [Yandex.Video](http://video.yandex.ru/#search?text=yac%202011)  
    This is a service for both hosting and searching images.
 * [Yandex.Auto](http://auto.yandex.ru/)
 * [Turkish Yandex](http://www.yandex.com.tr/)

Some services don't use XSL templates and build their pages with our newest template
product, `bemhtml` template engine which was mentioned above. These are the following
services:
 * [Yandex Search](http://yandex.ru/yandsearch?text=BEM+methodology+front-end&lr=213)  
    or [Yandex Search in English](http://yandex.com/yandsearch?text=%22What+is+BEM%3F%22+front-end&lr=213)
 * [Mobile Apps Search](http://apps.yandex.ru/)  
    This site is to look under smartphones.

There are also other companies that use BEM methodology.

For example, guys in [Mail.ru](http://mail.ru) partly use BEM for their services.
Some blocks on their pages are BEM-based in terms of CSS code. They also have their
own C++ template engine and write block templates according to the methodology.

More examples:
 * [Rambler.News](http://beta.news.rambler.ru/)
 * [HeadHunter](http://hh.ru/)
 * [TNK Racing Team](http://futurecolors.ru/tnkracing/)

You may also be interested in sites that use [bem-bl](http://bem.github.com/bem-bl/index.ru.html) block library:
 * [BEM based web form with JZ validation](http://form.dev.eot.su/)
 * [Mikhail Troshev vCard](http://mishanga.pro/)  
    Source code is hosted at GitHub: ((https://github.com/mishanga/bem-vcard))
