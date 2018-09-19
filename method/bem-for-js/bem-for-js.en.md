# JavaScript with BEM

In the BEM methodology, JavaScript is used for making a webpage “come alive” and is considered one of the block [implementation technologies](../key-concepts/key-concepts.en.md#implementation-technology).

BEM enforces [additional rules](#javascript-implementation-using-the-bem-methodology) on JavaScript that help to apply all the concepts of the component approach of the BEM methodology.

## Basic principles of the component approach in JavaScript for BEM

JavaScript is one of the block implementation technologies, so the main concepts of the BEM methodology can be observed when working with JavaScript:

* [Unified subject domain](#unified-subject-domain) — using blocks, elements, and modifiers named according to general [naming conventions](../naming-convention/naming-convention.en.md).
* [Separating the code into parts](#dividing-the-code-into-parts) and the same [rules for organizing the file structure of a BEM project](../filestructure/filestructure.en.md).
* [Dividing the code by redefinition levels and using assembly](#working-with-redefinition-levels).

### Unified subject domain

In web development, the final product (such as a webpage) consists of different technologies (HTML, CSS, JS, and so on). In BEM, working with all these technologies uses the same terminology and implementation approaches. This means that the entire team of a BEM project gets a unified language for communication, operating in terms of blocks, elements, and modifiers.

So the JavaScript implementation of blocks doesn’t use the concepts of DOM elements, but uses the next level of abstraction — the [BEM tree](../key-concepts/key-concepts.en.md#bem-tree). The advantage to this is we don’t rely on classes, and can independently describe the behavior of blocks and their optional elements. In JavaScript, modifiers are used for expressing the logic of a block or element (similar to CSS, where modifiers are used for defining appearance). The behavior of blocks and elements is described in JavaScript as a set of states.

Using the same concepts in all the technologies means we can implement various helpers in JavaScript for working with components and avoid hard coding the names of blocks and separators. This approach allows us to, for example, find all the elements with a particular name within the scope of a block, set a modifier for them, and check its value.

**Example**

Let’s take the example of a popup window (`popup`).
There are several ways to show a popup window:

* Use the common solution of adding the appropriate class. This method isn’t necessarily convenient, because you have to hard code the block name.

  ```js
  document.querySelector('.button')
    .addEventListener('click', function() {
      document.querySelector('.popup').classList.toggle('popup_visible');
  }, false);
  ```

* Use BEM principles and operate not in classes, but in blocks, elements, and modifiers.
  In this case, a component is searched for not by the class, but by the name of the block, which can be identified in the project not only by a class, but also by a tag, attribute, and so on. Displaying the popup window (switching the `popup` block to the `visible` state) is also performed using a modifier, not a class.

  ```js
  block('button').click(function() {
      block('popup').toggleMod('visible');
  });
  ```

> **Important!** Examples written for the BEM methodology use pseudocode. Real implementation examples are provided in the documentation for [i-bem.js](https://en.bem.info/technology/i-bem/v2/i-bem-js/) .

Using a unified subject domain makes it possible to interact with components at a higher level.

#### Working with modifiers

Modifiers can set specific states for blocks. The block logic is implemented in JavaScript and described using states. A block can be switched to another state by setting or removing a modifier. The change to the modifier creates an event that can be used for working with the block.

For example, to select a checkbox, you need to set the `checked` modifier to `true` for the `checkbox` block.

In a BEM project, you can’t change the states in runtime by using modifiers and directly changing the CSS class on the corresponding DOM node. For the JavaScript to work correctly, all actions with modifiers must be performed using helper methods.

> For implementation examples, see the documentation for [i-bem.js](https://en.bem.info/technology/i-bem/current/i-bem-js-mods/).

#### Response to changes in modifiers

Switching a block from one state to another often causes changes in its appearance. If the CSS uses a modifier to define the block’s appearance, changing the block state called by the same modifier will automatically apply all the necessary styles.

In BEM, the response to setting or removing a modifier is described [declaratively](../bem-js-principles/bem-js-principles.en.md#declarative-style). So, for example, if an additional class (or modifier) appears in the CSS during execution, all of this modifier’s properties are automatically applied to the DOM node of this class. The same thing occurs in JavaScript: if a modifier appears (a new class is added to the DOM node), the entire functionality of this modifier is applied. If the modifier disappears, the functionality is disabled.

To dynamically change the states of blocks and elements, we use special methods for setting and removing modifiers.

> For implementation examples, see the documentation for [i-bem.js](https://en.bem.info/technology/i-bem/v2/i-bem-js-mods/) .

**Example**

Let’s look at a form for sending a message. The following condition should be met: if an invalid email is entered, the Send button (the `button` block) is inactive (it gets the `button_disabled` modifier).

We could hard code all the conditions and continuously check it. This approach is inconvenient because any change will require manual changes to the code.

We could declare the block behavior and get the ability to override each modifier separately on a new redefinition level. The [declaration](https://en.bem.info/technology/i-bem/current/i-bem-js-decl/) can specify which block or element should respond to modifier changes.

```js
block('button').onSetMod({
    focused: {
        true: this.onFocus,
        '': this.onBlur
    }
});
```

This approach allows us to:

* Respond to the modifier regardless of how it was installed or removed (via the JavaScript API: `block('button').setMod('focused')` or the user set/removed the focus with the cursor).
* Define the appearance for each state by adding styles to the modifier.
* Change or completely override the behavior of the block using [redefinition levels](#working-with-redefinition-levels) .

### Dividing the code into parts

We can apply the main BEM principles for organizing and storing code to JavaScript:

* Dividing code into separate parts — each block’s logic and its optional elements and modifiers are described in separate files.
* JavaScript files for each component are stored according to the [rules for organizing the file structure](../filestructure/filestructure.en.md) of a BEM project.

**Example**

Let’s look at an example of a logo (the `logo` block) implemented in two technologies: a template and styles.

HTML implementation of the block:

```html
<a class="logo" href="/"> Your awesome company</a>
```

CSS implementation of the block:

```css
.logo {
    width: 150px;
    height: 100px;
}
```

The `logo` block in the project’s file structure:

```files
logo/
    logo.css   # Block's appearance
    logo.tmpl  # Templates for generating the block’s HTML representation
```

Adding JavaScript functionality to the `logo` block: now clicking the logo causes an action. According to the BEM methodology, the new behavior of the `logo` block will be implemented like this:

* In a separate file.
* The file name will match the block name, with the `.js` extension.
* The `logo.js` file will be located in the block’s `logo/` directory.

JavaScript implementation of the block:

```js
document.querySelector('.logo').addEventListener('click', doSomething, false);
```

The `logo.js` file in the block’s file structure:

```files
logo/
    logo.css   # Block’s appearance
    logo.tmpl  # Templates for generating the block’s HTML representation
    logo.js    # Dynamic behavior of the block in the browser
```

Dividing the code into parts and strictly organizing the project’s file structure not only make it easier to navigate the project and reuse or migrate components, but also allow us to work with redefinition levels for JavaScript and use assembly.

### Working with redefinition levels

The documentation for the BEM methodology provides [many examples](../redefinition-levels/redefinition-levels.en.md#examples-using-redefinition-levels) where the final CSS implementation of a block is assembled from different redefinition levels. Applying BEM principles to JavaScript allows us to similarly divide a block’s behavior into different levels:

* Implement new block functionality on a different redefinition level while preserving the previous block behavior, inheriting it and extending it (make a super call).
* Completely override the block behavior (redefine it).
* Add new blocks with new functionality that didn’t exist on previous levels.

Use redefinition levels to create a generic JavaScript library of blocks and change it at the project level. Then use assembly and only include the necessary block behaviors in the project.

**Example**

Let’s return to the example of a form for sending a message:

```js
block('button').onSetMod({
    focused: {
        true: this.onFocus,
        '': this.onBlur
    }
});
```

BEM style allows us to:

* Completely override the block’s behavior on a different redefinition level.

  ```js
  block('button').onSetMod({
      focused: {
          true: this.someCustomOnFocused
      }
  });
  ```
* Add or partially change the block’s behavior on a different redefinition level.

  ```js
  block('button').onSetMod({
      focused: {
          true: function() {
              this.__base.apply(this, arguments);
              this.someCustomOnFocused();
          }
      }
  });
  ```

> You can use a specialized framework for working with redefinition levels in BEM, such as [i-bem.js](https://en.bem.info/technology/i-bem/current/i-bem-js/), since it was created to meet BEM requirements.

## How to switch to BEM-style JavaScript

The fastest way is to start applying the principles of the BEM methodology in your project and get your first results without using a specialized framework.

To immediately use all the BEM concepts in your project, you need to:

* Use the [unified terminology](#unified-subject-domain) of blocks, elements, and modifiers in all technologies.
* Create independent components (blocks) at the JavaScript level.
* Change the behavior of blocks, elements, and modifiers using redefinition levels similar to CSS.
* Reuse blocks and migrate them between projects.
* Facilitate and accelerate project development and debugging due to components being independent, so blocks can be developed individually.
* Include only the necessary JavaScript implementation of a block for assembly.
* Simplify navigation through the project’s file structure.

## JavaScript implementation using the BEM methodology

* [Declarative style](#declarative-style)
* [OOP principles in JavaScript for BEM](#oop-principles-in-javascript-for-bem)
* [DOM representation of dynamic blocks](#dom-representation-of-dynamic-blocks)
* [Interaction between blocks](#interaction-between-blocks)
* [Interaction of a block with its elements](#interaction-of-a-block-with-its-elements)

## Declarative style

Declarative JavaScript in a BEM project is shown by the following:

* The behavior of each block is described separately.
* The block states are set declaratively. When [changing states](../bem-for-js/bem-for-js.en.md#response-to-changes-in-modifiers), the code is automatically called that is declared for this state.
* The block’s logic is described as a set of actions and conditions for performing these actions. This makes it possible to separate the block’s functionality into individual parts and use [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level).

> [More information about applying redefinition levels in JavaScript](#working-with-redefinition-levels)

## OOP principles in JavaScript for BEM

In the BEM methodology, the basic principles of object-oriented programming (OOP) are applied to JavaScript.

### Encapsulation

In BEM, the JavaScript implementation of one block is separated from another block. Each block provides an API for [interacting with other blocks](#Interaction-between-blocks).

The block declaration allows it to hide its internal implementation. Since elements are always an internal implementation of a block, [they can be accessed](#Interaction-between-block-and-its-elements) only through the block’s API.

### Inheritance

The declarative description of block behavior makes it possible to use the methods of a base block inside a derivative block and inherit them. The new block can get all the properties and methods of the base block.

You can also create inheritance chains, meaning that a block inherits from another one that, in turn, inherits from a third block, and so on.

> For implementation examples, see the documentation for [i-bem.js](https://en.bem.info/technology/i-bem/current/i-bem-js-decl/#block-inheritance).

## DOM representation of dynamic blocks

Blocks with JavaScript implementation can correspond to nodes in HTML. We refer to this as the **blocks having a DOM representation**.

In the simplest case, a block has a one-to-one relationship with a DOM node. However, a DOM node and a block are not always equivalent. You can put multiple blocks on the same DOM node (this is called a [mix](../key-concepts/key-concepts.en.md#mix)), or implement a single block on multiple DOM nodes.

There are also **blocks without DOM representation**. In JavaScript, they are presented as objects with their own methods.

> For implementation examples, see the documentation for [i-bem.js](https://en.bem.info/technology/i-bem/current/i-bem-js-decl/#declaration-syntax).

## Interaction between blocks

The BEM methodology involves working with independent blocks. But in practice, blocks can’t be completely independent of each other.

Blocks can interact with each other using:

* Subscriptions to events of other block instances.
* Subscriptions to changes in modifiers.
* Direct calls to the methods of other block instances or the static methods of another block’s class.
* Any interaction patterns. For example, the event channel: all communication takes place through messages that components publish and listen to using an intermediary.

> For implementation examples, see the documentation for [i-bem.js](https://en.bem.info/technology/i-bem/current/i-bem-js-decl/#i-bem-js-interaction).

The BEM methodology recommends arranging interaction between the blocks hierarchically according to their location in the DOM tree. A nested block shouldn’t know anything about the parent block, since this would violate the principle of independent components.

## Interaction of a block with its elements

An element is the internal implementation of a block.
In the BEM methodology, a block normally has additional helpers for working with its elements. It is not possible to access an element of another block directly. An element can be accessed only through the API of the block that this element belongs to.
