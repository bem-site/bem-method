# Ways to modify a block

[Blocks](../key-concepts/key-concepts.en.md#block) — logically and functionally independent, reusable page components. The same blocks can be used in different projects. To prevent these projects from looking identical, blocks can be modified using:

* [Modifiers](#using-a-modifier-to-change-a-block) 
* [Mixes](#using-a-mix-to-change-a-block) 
* [Redefinition levels](#using-redefinition-levels-to-change-a-block) 
* [Context](#using-context-to-change-a-block) 

None of these methods for changing a block require you to:

* Copy the block code to make changes.
* Change the original implementation of the block.
* Create a new block based on an existing one.

## How to choose a block modification method

* [Use a modifier](#using-a-modifier-to-change-a-block) to change one specific instance of a block. Setting or removing a modifier should only affect the modified block and have no relationship to the surrounding blocks.
* [Use a mix](#using-a-mix-to-change-a-block) to: 
  * [Place](#placing-a-block-inside-another-block) one block inside another block.  
  * [Apply the same style to several different blocks](#styling-groups-of-blocks) on a page, instead of applying group selectors.	  
* [Use redefinition levels](#using-redefinition-levels-to-change-a-block) to simultaneously change all the blocks with the same name in the project.
* [Use context](#using-context-to-change-a-block) to define the block style in advance when you don't know what the content of a nested block will be. 

## Using a modifier to change a block

The block is changed by setting or removing a modifier containing code that describes the changes. You can add [an unlimited number of modifiers](#adding-multiple-modifiers) to the block at once.

The modifier can define the block's:

* [appearance](#changing-the-blocks-appearance) 
* [behavior](#changing-the-blocks-behavior) 
* [state](#changing-the-blocks-state) 
* [structure](#changing-the-blocks-structure) 

Let's use a `popup` block as an example for how to change a block using a modifier.

HTML implementation:

```html
<!-- Popup block --> 
<div class="popup"> ...</div> 
```

![Default popup](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__popup-default.svg) 

### Changing the block's appearance 

The `theme` modifier with the value `sun` sets a yellow background for the popup window.

HTML implementation:

```html
<!-- Popup with the "theme" modifier set to "sun"--> 
<div class="popup popup_theme_sun"> ...</div> 
```

![ Popup window with a yellow background](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__popup-theme-sun.svg) 

### Changing the block's behavior

The `direction` modifier determines which way the popup window opens.

For example, the `direction` modifier with the value `right` opens the popup window to the right.

HTML implementation:

```html
<!-- Popup block --> 
<div class="popup popup_direction_right"> ...</div>
```

![Popup window to the right](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__popup-theme-sun.svg) 

### Changing the block's structure

The `has-tail` modifier with the `true` value adds to the `popup` block a new element — ”tail“. This modifier also adds offsets to the block to create space for the tail.

> Information about when and how to use a [boolean modifier](../../faq/faq.en.md#when-to-create-a-boolean-modifier-and-when-to-create-a-key-value-modifier).

HTML implementation:

```html
<!-- Popup block --> 
<div class="popup popup_has-tail"> ...</div>
```

![Popup window with a tail](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__popup-with-arrow.svg) 

### Changing the block's state

The `disabled` modifier switches the `button` block, which opens the popup window, to the ”disabled“ state. In other words, it turns off the popup window so it can't be shown.

HTML implementation:

```html
<!-- The "button" block with the "disabled" modifier --> 
<div class="button button_disabled"> ...</div> 
```

![Disabled button](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__popup-disabled.svg) 

### Adding multiple modifiers 

You can add any number of modifiers to a block. For example:

* `theme` with the value `sun`
* `has-tail` with the value `true` 

HTML implementation:

```html
<!-- Popup block --> 
<div class="popup popup_theme_sun popup_has-tail"> ...</div>
```

The popup window opens at the bottom and has a yellow background and a tail:

![Popup window with a yellow background and a tail](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__popup-with-arrow-theme-sun.svg) 

## Using a mix to change a block

The block is changed by placing additional BEM entities on the same DOM node as the block. [Mixes](../key-concepts/key-concepts.en.md#mix) allow you to combine the behavior and style of multiple entities without duplicating code.

### Placing a block inside another block

In the BEM methodology, a block's position on the page is set in the parent block. This allows the blocks to be independent and reusable.

> More information about [external geometry and positioning](../bem-for-css/bem-for-css.en.md#external-geometry-and-positioning).

The example shows a `header` block from an integrated library. By default, the `header` block doesn't know anything about the position of blocks that are nested in it. To add the `logo`, `search`, and `user` blocks to the header, you need to define the offsets for each nested block: 

![Universal header block](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__header-default.svg) 

The header and the nested `logo`, `search`, and `user` blocks must remain independent. For this reason, the position of the nested blocks is set in elements of the `header` block that are mixed with the blocks.

HTML implementation:

```html
<!-- "header" block --> 
<header class="header"> 
	<div class="logo header__logo"> ...</div> 
	<div class="search header__search"> ...</div> 
	<div class="user header__user"> ...</div> 
</header> 
```

![Header block with nested blocks](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/block-modification/block-modification__header-with-blocks.svg) 

The styles of the nested `logo`, `search`, and `user` blocks haven't changed, and still don't contain any offsets. The blocks remain independent and can be reused anywhere.

### Styling groups of blocks

Mixes are used to keep styles consistent in a set of different HTML elements on the page.

> Information about [why BEM doesn't use global modifiers](../../faq/faq.en.md#how-to-make-global-modifiers-for-blocks).

In the example, the text inside the `article` and `copyright` blocks needs to have the same color and font. To do this, you can mix the `text` block, which has styles defining the text color and font, with the `article` and `copyright` blocks.

HTML implementation:

```html
<article class="article text"> ...</article> 
<footer class="footer"> 
	<div class="copyright text"> ...</div> 
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

## Using redefinition levels to change a block

Changes are made to the block by combining the block properties from different [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level). Blocks can be [extended and redefined](../redefinition-levels/redefinition-levels.en.md#changing-the-block-implementation). Changes to a block are defined on a separate level and applied during assembly. 

> More information about [how redefinition levels work](../redefinition-levels/redefinition-levels.en.md).

### Example

Universal blocks from the library should look different in different projects. All you need to do is connect the library to the project as a separate level, and describe the block changes on a different redefinition level.

Original implementation of the `button` block in the library:

![Original button implementation](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/redefinition-levels/redefinition-levels__button-default.svg) 

To change the button color, redefine the CSS rules for the `button` block on the project level (`project.blocks`).

File structure with the new rules for the button (`button.css`) on the `project.blocks` level:

```files
project/ 
    library.blocks/ 
        button/ 
            button.css  # original CSS implementation of the button in the library 
    project.blocks/ 
        button/ 
            button.css  # redefinition on the project level
```

As a result, rules from both redefinition levels will be applied to the `button` block:

```css
@import "library.blocks/button/button.css"; /* Original CSS rules from the library level */
@import "project.blocks/button/button.css"; /* Properties from the project.blocks level */
```

New appearance of the button:

![Redefined button](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/redefinition-levels/redefinition-levels__button-redefined.svg) 

> More [examples using redefinition levels](../redefinition-levels/redefinition-levels.en.md#examples-using-redefinition-levels).

## Using context to change a block

The block is changed by placing one block inside another one. The rules of the parent block cascade down to the nested blocks.

> **Important** You should use context to change the appearance or behavior of a block only when you can't use [mixes](#using-a-mix-to-change-a-block). Using context to make changes restricts the independence of the blocks.

The most common case for using context to stylize a block is the implementation of blocks for comments in blogs or forums in any CMS. 

For example, you can predefine the rules for the main tags that users can apply: 

```css
.comments p {
    font-family: Arial, sans-serif;
    text-align: center; 
}
```
