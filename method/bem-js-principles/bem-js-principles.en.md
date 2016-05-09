# JavaScript implementation using the BEM methodology

* [Declarative style](#Declarative-style)
* [OOP principles in JavaScript for BEM](#OOP-principles-in-javascript-for-BEM)
* [DOM representation of dynamic blocks](#dom-representation-of-dynamic-blocks)
* [Interaction between blocks](#Interaction-between-blocks)
* [Interaction of a block with its elements](#Interaction-of-block-with-its-elements)

## Declarative style

Declarative JavaScript in a BEM project is shown by the following:

* The behavior of each block is described separately.
* The block states are set declaratively. When [changing states](#Reaction-to-changing-modifiers), the code is automatically called that is declared for this state.
* The block’s logic is described as a set of actions and conditions for performing these actions. This makes it possible to separate the block’s functionality into individual parts and use [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level).

> [More information about applying redefinition levels in JavaScript](#Working-with-redefinition-levels)

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

In the simplest case, a block has a one-to-one relationship with a DOM node. However, a DOM node and a block are not always equivalent. You can put multiple blocks on the same DOM node (this is called a [mix](../key-concepts/key-concepts.en.md#Mix)), or implement a single block on multiple DOM nodes.

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
