# CSS for BEM

In the BEM methodology, CSS is used for page layout and is considered one of the [block implementation technologies](../key-concepts/key-concepts.en.md#implementation-technology).

Core principles of working with CSS detail in the following sections:
* [Selectors](#selectors)
  * [Class selectors](#class-selectors)
  * [Combining a tag and a class in a selector](#combining-a-tag-and-a-class-in-a-selector)
  * [Nested selectors](#nested-selectors)
  * [Naming](#naming)
* [Modifiers](#modifiers)
* [Mixes](#mixes)
 * [External geometry and positioning](#external-geometry-and-positioning)
 * [Styling groups of blocks](#styling-groups-of-blocks)
* [Dividing the code into parts](#dividing-code-into-parts)
 * [Single responsibility principle](#single-responsibility-principle)
 * [Open/closed principle](#openclosed-principle)
 * [DRY principle](#dry)
 * [Composition instead of inheritance](#composition-instead-of-inheritance)
* [Dividing code by redefinition levels and building an assembly](#working-with-redefinition-levels)
* [How to switch to BEM-style CSS](#how-to-switch-to-bem-style-css)

### Selectors

BEM doesn't use tag and ID selectors. The styles of BEM blocks and elements are defined by class selectors.

#### Class selectors

Позволяют указать конкретный HTML-элемент страницы, независимо от тега. Обращение к селектору класса происходит через атрибут `class`, который должен имет каждый HTML-элемент.

**Example**

HTML implementation:

```html
<button class="button">
    <span class="button__text">...</span>
</button>
```

CSS implementation:

```css
.button {}
.button__text {}
```

Выше рассмотрены значения атрибута `class`, состоящие из одного слова. In HTML, the value of the `class` attribute can be a space-separated list of words. This allows you to use several [BEM entities](../key-concepts/key-concepts.en.md#bem-entity) on a single DOM node.

**Example**

HTML implementation:

```html
<header class="header">
    <!--
    `header__button` — mix (element in the `header` block);
    `button` — block;
    `button_theme_islands` — modifier.
    -->
    <button class="header__button button button_theme_islands">...</button>
</header>
```

#### Combining a tag and a class in a selector

The BEM methodology not recommended to combine a tag and a class in a selector. This method makes the CSS rules more specific, which makes it more difficult to override them. This starts priority battles, in which stylesheets are loaded by overly complicated selectors.

**Example**

HTML implementation:

```html
 <button class="button">...</button>
```

CSS rules are defined in the `button.button` selector.

Let's say we added the `active` modifier to the block and set the value to `true`:

```html
<button class="button button_active">...</button>
```

This is how priority is weighted for style selectors:

* A tag selector has a weight of 1.
* A class selector has a weight of 10.
* An ID selector has a weight of 100.
* An inline style has a weight of 1000.

So the `.button_active` selector doesn't redefine the block properties written as `button.button`, because `button.button` has a weight of 11 (10 for the class name, and 1 for the tag selector), while `.button_active` only has 10. For successful redefinition, the selector for the block modifier also must be combined with the `button.button_active` tag.

As the project develops, it's possible that blocks could be added with the selectors `input.button`, `span.button` and `a.button`. In this case, all the modifiers of the `button` block and nested elements would require four different declarations for each case.

Try to keep selectors as short as possible.

CSS implementation:

```css
.button {}
.button_active {}
```

#### Nested selectors

The BEM methodology does allow using selectors like this, but we recommend keeping them to a minimum. Nested selectors increase code coupling and make reuse impossible.

For example, nesting is appropriate if you need to change the styles of elements relative to the state of the block or the theme set:

**Example**

CSS implementation:

```css
.button_hovered .button__text
{
    text-decoration: underline;
}

.button_theme_islands .button__text
{
    line-height: 1.5;
}
```

#### Naming

The name of the selector should fully and accurately describe the entity represented by the selector.

As an example, let's look at these four lines of CSS code:

```css
.button {}                 
.button__icon {}         
.button__text {}           
.button_theme_islands {}    
```

We can be fairly sure that we are dealing with a single block, and its HTML implementation looks like this:

```html
<button class="button button_theme_islands">
    <span class="button__icon"></span>

    <span class="button__text">...</span>
</button>
```

It's harder to make the same assumption with a group of selectors like this:

```css
.button {}                 
.icon {}            
.text {}         
.theme_islands {}
```

The names `icon`, `text`, and `theme_islands` aren't as informative.

The general [rules for naming blocks, elements, and modifiers](../naming-convention/naming-convention.en.md) allow you to:
* Make the names of CSS selectors as informative and clear as possible.
* Solve the problem of name collisions.
* Independently define styles for blocks and their optional elements.

**Example**

HTML implementation:

```html
<!-- `logo` block -->
<div class="logo logo_theme_islands">
    <img src="URL" alt="logo" class="logo__img">
</div>

<!-- `user` block -->
<div class="user user_theme_islands">
    <img src="URL" alt="user-logo" class="user__img">
    ...
</div>
```

Naming CSS classes:

```css
.logo {}                  /* CSS class for the `logo` block */

.logo__img {}             /* CSS class for the `logo__img` element */

.logo_theme_islands {}    /* CSS class for the `logo_theme_islands` modifier */

.user {}                  /* CSS class for the `user` block */

.user__img {}             /* CSS class for the `user__img` element */

.user_theme_islands {}    /* CSS class for the `user_theme_islands` modifier */
```

### Modifiers

BEM modifiers set the appearance, state, and behavior for blocks. A block's design is changed by setting or removing a modifier.

**Example**

HTML implementation:

```html
<button class="button button_size_s">...</button>
```

CSS implementation:

```css
.button {
    font-family: Arial, sans-serif;
    position: relative;
}

.button_size_s {
    font-size: 13px;
    line-height: 24px;
}

.button_size_m {
    font-size: 15px;
    line-height: 28px;
}

```
You can use modifiers to change a block's design by redefining specific points in the necessary CSS properties.

For example, like this:

```html
<button class="button button_size_s">...</button>

<button class="button button_size_m">...</button>
```

This frees you from unneeded copying and pasting.

### Mixes

Allow you to:
* combine the behavior and styles of multiple entities without duplicating code.
* same style different HTML elements.

#### External geometry and positioning

In CSS with BEM, styles that are responsible for the external geometry and positioning are set via the parent block.

**Example**

HTML implementation:

```html
<!-- `header` block -->
<header class="header">  
    <button class="button">...</button>  
</header>

<!-- `form` block -->
<form class="form" >
</form>
```

CSS implementation of a button:

```css
.button {
    font-family: Arial, sans-serif;
    position: relative;
    border: 1px solid black;
    margin: 30px;               /* Margin */
}
```

**Task**

Use the same button in the `form` block.

The `button` block includes a padding of `30px`, which may prevent its reuse.

The solution looks like this:

**Example**

HTML implementation:

```html
<!-- `header` block -->
<header class="header">  
    <!-- Added the `header__button` class to the `button` block -->
    <button class="button header__button">...</button>  
</header>

<!-- `form` block -->
<form class="form" >
    <button class="button">...</button>  
</form>
```

CSS implementation of a button:

```css
.button {
    font-family: Arial, sans-serif;
    border: 1px solid black;
}
```

CSS implementation of the `button` element in the `header` block:

```css
.header__button {
    margin: 30px;
    position: relative;
}
```

In this example, the external geometry and positioning of the `button` block are set via the `header__button` element. Now the `button` block is independent and universal, because it doesn't specify any padding.

#### Styling groups of blocks

Sometimes you need to apply the same formatting to multiple different HTML elements on a page at once.
Group selectors are often used for this purpose.

**Example**

HTML implementation:

```html
<article class="article"></article>

<footer class="footer">
    <div class="copyright"></div>
</footer>
```

CSS implementation:

```css
article, .footer div {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #000;
}
```

In this example the text inside the `article` and `copyright` blocks to have the same color and font.

Although group selectors do allow you to quickly change the design of the page, this approach tightens code coupling.

This is why BEM uses [mixes](../key-concepts/key-concepts.en.md#mix) to uniformly format an entire set of HTML elements.

**Example**

HTML implementation:

```html
<article class="article text"></article>

<footer class="footer">
    <div class="copyright text"></div>
</footer>
```

CSS implementation:

```css
.text {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #000;
}
```

### Dividing code into parts

These basic principles for structuring and storing code are applied to BEM-style CSS:
  * Code is divided into separate parts. The logic of each block and its optional elements and modifiers is defined in separate files.
  * CSS files for each component are stored according to the [rules of file system organization](../filesystem/filesystem.en.md) for a BEM project.

Dividing code into parts and controlling the structure of the project's file system make it possible to:
  * Simplify navigation through the project.
  * Re-use and move components.
  * Work with redefinition levels and [use an assembly](../build/build.ru.md).

**Example**

The `button` block in the project's file system:

```files
button/                      # Directory of the `button`
    _size
        button_size_s.css    # CSS implementation of the modifier

    button.css               # CSS implementation of the `button` block
```

This separation allows you to quickly find needed files.

#### Single responsibility principle

Just as in object-oriented programming, the single responsibility principle in the BEM approach to CSS means that every CSS implementation must have a single responsibility.

**Example**

HTML implementation:

```html
<header class="header">  
    <button class="button header__button">...</button>  
</header>
```

CSS implementation:

```css
.button {
    font-family: Arial, sans-serif;
    border: 1px solid black;
    background: #fff;                     
}
```

Responsibility: external geometry and positioning (let's set the external geometry and positioning for the `button` block via the `header__button` element).

Correct:

```css
.header__button {
    margin: 30px;
    position: relative;
}
```

Incorrect:

```css
.header__button {
    font-family: Arial, sans-serif;
    position: relative;
    border: 1px solid black;    
    margin: 30px;
}
```

Single responsibility selectors give the code more flexibility.

#### Open/closed principle

Any HTML element on a page should be open for extension by modifiers, but closed for changes. You should develop new CSS implementations without needing to change existing ones.

**Example**

HTML implementation:

```html
<button class="button">...</button>
<button class="button">...</button>
```

CSS implementation:

```css
.button {
    font-family: Arial, sans-serif;
    position: relative;  
    font-size: 11px;
    line-height: 20px;
}
```

Let's say we need to change the size of a button.
According to the open/closed principle, we extend the button.

HTML implementation:

```html
<button class="button">...</button>
<button class="button button_size_s">...</button>
```

CSS implementation:

```css
.button {
    font-family: Arial, sans-serif;
    position: relative;  
    font-size: 11px;
    line-height: 20px;
}

.button_size_s {
    font-size: 13px;
    line-height: 24px;
}
```

The existing button functionality is extended using the `button_size_s` class (the `font-size` and `line-height` properties are redefined). Now the page has two buttons of different sizes.

HTML implementation:

```html
<button class="button">...</button>
<button class="button button_size_s">...</button>
```

**Violating the open/closed principle**

* Changing an existing CSS implementation

  ```css
  .button {
      font-family: Arial, sans-serif;
      position: relative;
      font-size: 13px;
      line-height: 24px;
  }
  ```

  The current CSS implementation of the button should be closed for changes. Changes will apply to all the `button` blocks.

* Modification by context

  ```css
  .button {
      font-family: Arial, sans-serif;
      position: relative;  
      font-size: 11px;
      line-height: 20px;
  }

  .content .button {  
      font-size: 13px;
      line-height: 24px;
  }
  ```

  The button design now depends on its location. Changes will apply to all `button` blocks inside the `content` block.

#### DRY

DRY ("don't repeat yourself") is a software development principle aimed at reducing repetitions in code.

In relation to the BEM methodology, the essence of this principle is that each BEM entity must have a single, unambiguous representation within the system.

**Example**

HTML implementation:

```html
<button class="button">...</button>
<button class="btn">...</button>
```

CSS implementation:

```css
.button {
    font-family: Arial, sans-serif;
    position: relative;
    color: #000;
    background: #fff;
}

.btn {
    font-family: Arial, sans-serif;
    position: relative;
    color: #000;
    background: rgba(255, 0, 0, 0.4);
}
```

As shown in the example, the `btn` selector repeats the existing implementation of the `button` block.

Let's rewrite this example using the DRY principle:

HTML implementation:

```html
<button class="button button_theme_islands">...</button>
<button class="button button_theme_simple">...</button>
```

CSS implementation:

```css
.button {
    font-family: Arial, sans-serif;
    position: relative;
}

.button_theme_islands {
    color: #000;
    background: #fff;
}

.button_theme_simple {
    color: #000;
    background: rgba(255, 0, 0, 0.4);
}
```
With the addition of modifiers, we got rid of the `btn` block.

**Important** The DRY principle only applies to functionally similar components of a page, such as buttons.

**Example**

![buttons](buttons.png)

As the example shows, there are some small external differences between them. With the DRY principle, we are talking about entities that are functionally similar but have different formatting.

There isn't any reason to combine different types of blocks just because they have, for instance, the same color or size.

**Example**

![yellow-blocks](yellow-blocks.png)

#### Composition instead of inheritance

Inheritance is a mechanism for defining a new CSS class based on an existing one (a parent or base class). The derived class can add its own properties, as well as use the parent properties.

New CSS implementations are formed in BEM by combining existing ones. This keeps the code uncoupled and flexible.

**Example**

Let's say we have three existing implementations:

* button — the `button` block
* menu — the `menu` block
* popup window — the `popup` block

**Task**

Implement a drop-down list (the `select` block).

Developing a drop-down list with a custom appearance is not an easy task. However, if you have ready-made components (a button, a popup window, and a menu), you just need to correctly describe how they interact.

**Example**

HTML implementation:

```html
<div class="select">
    <button class="button select__button">
        <span class="button__text">Block</span>
    </button>
</div>

<div class="popup">
    <div class="menu">
        <div class="menu-item">Block</div>
        <div class="menu-item">Element</div>
        <div class="menu-item">Modifier</div>
    </div>
</div>
```

### Working with redefinition levels

Applying BEM principles to CSS allows you to separate block representations into different levels.

Разделение по уровням позволяет:
* Implement a new appearance for a block on a different redefinition level while preserving the previous one by inheriting and extending it.
* Completely override a block's appearance (redefine it).
* Add blocks with a new representation.

You can use redefinition levels to create a universal CSS block library and change it on the project level. You can then use use an assembly to only include the desired block representations in the project.

**Example**

```files
common.blocks/
    button/
        button.css    # Basic CSS implementation of a button

desktop.blocks/
    button/
        button.css    # Button specifics for desktop

mobile.blocks/
    button/
        button.css    # Button specifics for mobile
```

During the build, the `desktop.css` file gets all the basic CSS rules for the button from the `common` level and the redefinition rules from the `desktop` level.

```css
@import "common.blocks/button/button.css";    /* Basic CSS rules */
@import "desktop.blocks/button/button.css";   /* Specifics for desktop */
```

The `mobile.css` file will include the basic CSS button rules from the `common` level and the redefinition rules from the `mobile` level.

```css
@import "common.blocks/button/button.css";    /* Basic CSS rules */
@import "mobile.blocks/button/button.css";    /* Specifics for mobile */
```

Разделив представление блока `button` по уровням, можно:

* Completely override a block's appearance on another redefinition level.

   `common.blocks/button/button.css`

  ```css
  .button {
      font-family: Arial, sans-serif;
      font-size: 11px;
      line-height: 24px;
      background: #fff;
  }
  ```

  `desktop.blocks/button/button.css`

  ```css
  .button {
      font-family: 'Roboto', sans-serif;
      font-size: 13px;
      line-height: 28px;
      background: yellow;
  }
  ```

* Add or partially change a block's appearance on another redefinition level.

  `common.blocks/button/button.css`

  ```css
  .button {
      font-family: Arial, sans-serif;
      font-size: 11px;
      line-height: 24px;
      background: #fff;
  }
  ```

  `desktop.blocks/button/button.css`

  ```css
  .button {
      background: #fff;
      color: rgb(255, 0, 0);
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  ```

  ## How to switch to BEM-style CSS

  To implement BEM principles in a project:

  * Put aside the DOM model and learn to create blocks.
  * Don't use ID selectors or tag selectors.
  * Minimize the number of nested selectors.
  * Use the CSS class naming convention in order to avoid name collisions and make selector names as informative and clear as possible.
  * Work in the terms of blocks, elements, and modifiers.
  * Move CSS properties of a block to modifiers if they seem likely to be changed.
  * Use mixes.
  * Divide code into small independent parts for ease of working with individual blocks.
  * Re-use blocks.

  ### How do I start using BEM concepts in an existing project?

  * Create new components using the BEM methodology, and change the old ones as needed.
  * When desigining blocks, follow the principles covered above.
  * Use prefixes in names of CSS classes (such as `bem-`) in order to differentiate the new code from the old code.

  Once you are familiar with BEM-style CSS, you can look at the specifics of implementing [BEM for JavaScript](../bem-for-js/bem-for-js.en.md).
