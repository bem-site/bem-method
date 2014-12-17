# JavaScript for BEM: the main terms

Stack of BEM technologies contains a block [i-bem](http://bem.github.com/bem-bl/sets/common-desktop/i-bem/i-bem.ru.html).

It's JavaScript implementation uses BEM data domain. The use of this library allows one to manipulate the client-side JavaScript/DOM in *BEM-Style* according to *BEM-Principles*, not only in the design of visible components, but also their behavior.


## Why do we need one more framework?

Principally, all existent JavaScript libraries can be divided into the following categories:

 * Libraries that responsible for the normalization of the browser API (shims)<br/>
   For example jQuery and base2 (a long time ago, at the dawn of stack frameworks, it was very popular).
 * Ready-made Widget Sets
 * Complicated Libraries
   which for now we'll call "Rich UI Interfaces".
 * "Monsters"<br/>
   Robust libraries for writing complex web-applications

This categorization is not absolute, and probably many libraries answer problems which exist across several categories.  The important thing here is that each of these libraries has been designed with one similar goal; to help us solve our problems.


OldSchool designers still remember the good'ol days when nothing like jQuery existed and they had to program everything from scratch.
Each project had its own `common.js` which included a set of commonly used functions.
At the beginning of it was a section which would be copy-&-pasted from project to project.  Later these functions might be collected into a small JavaScript library.

That was the evolution of JavaScript frameworks.

The same thing happened to BEM.  Initially, we understood that we wanted to have these things called `blocks` which were `Interface Modules`, their smaller CSS-elements and modifiers existed only in CSS.  Later developers wanted to work using a similar structure, but this time in JavaScript.  During this time developers also wanted to include the key-concept of `levels` which allows one to build upon and improve the behavior of blocks from project to project.

This is why the JavaScript was written for the *helper block* [i-bem.js](https://github.com/bem/bem-bl/tree/master/blocks-common/i-bem) which lives over at GitHub.  It is the core framework for writing JavaScript in `BEM Terminology`.

## Connection with HTML code
As all JavaScript components, code for `i-bem.js` has to be coupled with some HTML, eventually intended to be the functional code behind some part of an interface.  In order to use `i-bem` all you have to do is add the CSS-Class `i-bem`, and define the `onclick` attribute to contain the parameters of the block.

```js
<div
    class="myblock i-bem"
    onclick="return {
        myblock: { }}">

    <span class="myblock__item"></span>

</div>
```

If you are curious about why `onclick` attribute is used, see Sergey Berezhnoy's talk (Russian only) "[Different ways of creating components for the client-side](https://events.yandex-team.ru/events/yasubbotnik/msk-jul-2012/talks/302/)" - presented at [Ya.Subbotnik (Yandex Developer Day)](https://events.yandex-team.ru/events/yasubbotnik/) in July 2012.

Usually, the blocks initialization starts on `domReady` event.  Thanks to the ability to read the `onclick` attribute and receive a native javascript object we don't need any `id` components or parse CSS classes.  All blocks marked with `i-bem` CSS class will be transformed according to their parameter components.

## Behavior declaration
A block behavior is described in a JavaScript file which has the same name as the block it's self (`myblock.js`).

From an OOP point of view, similar blocks form classes.  Furthermore, for every block on the page an instance of each corresponding "class" is generated.

The `decl` method is used for describing the block behaviour, it receives 3 parameters:
 1. The `name` of the block we're talking about.
 2. This specific instance properties.
 3. The static properties of the class to which the block belongs.

```js
BEM.DOM.decl('myblock', {

    /\* Properties specific to this instance \*/

}, {

    /\* Static properties specific to the class to which this block belongs \*/

});
```

Inside JavaScript, the reference to the instance you can always get with help of keyword `this` and use its reserved fields `__self` and  `__base`.

 * `this.__self`<br/>
 Refers to the class static methods (to which the instance belongs)
 * `this.__base`<br/>
  Perform a `super call`, which means to call the base method implementation.

The last one allows us to operate within different `levels`.
When extending functionality of a current block, a developer always has access to the block behaviour as defined on the previous level.
In other words, methods can be fully overwritten or they can be extended with additional behavior.

```js
BEM.DOM.decl('myblock', {

    method: function() {

        this.__base();
        this.doMore();

    }

});
```

Other than inheritance by definition levels, a block has the possibility to inherit one from another block.  Because of the possibility of inheritance from one level to another, it's better to understand this of the merging of implementations.

## Selectors of blocks
To find other blocks it is possible to use of the `find*` methods, it depends on where the desirable block is located relative to the current block:

```js
// Search within the current block context.
this.findBlockInside([elem], block)

// Search outside of the current block context.
this.findBlockOutside([elem], block)

// Search DOM-node of the named block.
this.findBlockOn([elem], block)
```

All these methods return a JavaScript object, an instance of the block which was located by the search method.

In a similar way a collection of blocks can be found:

```js
// Search inside the current block context.
this.findBlocksInside([elem], block)

// Search outside of the current block context.
this.findBlocksOutside([elem], block)

// Search DOM-node of the named block
this.findBlocksOn([elem], block)
```

## Elements
There are methods for accessing a block `elements`: `elem` and `findElem`.
The difference between them is that the `elem` method cashes its result when it's called at the firs time, therefore there is no need to store a result of `elem` method in a variable.  It's already implemented for this method.

```js
//cashing selector
this.elem(name,
    [modName], [modVal])

//non-cashing selector
this.findElem([ctx], name,
    [modName], [modVal])
```

## Modifiers
Modifiers in JavaScript express the state of a block or element.

The methods for working with modifiers are the same for blocks and for elements.

The first(optional) parameter shows what is going on.

```js
// Get the value of the block modifier
this.getMod(modName)

// Get the value of the the element modifier
this.getMod(elem, modName)

// Verify the modifier
this.hasMod([elem], modName, modVal)

// Set the modifier
this.setMod([elem], modName, modVal)

// Delete modifiers
this.delMod([elem], modName)

// Toggle the modifier value
this.toggleMod([elem], modName,
    modVal1, modVal2, [condition])
```


Modifiers describe a block state.  Every block has `onSetMod` property that specifies what should be done when the block state is changed.

```js
BEM.DOM.decl('myblock', {
    onSetMod : {
        'mod1' : {

            // Set the value of `mod1` to `val1`
            'val1' : function(mod, val, oldVal) {
            }

        },

        // Set the value of the modifier `mod2` to any value
        'mod2' : function(mod, val, oldVal) {
        }
    }
});
```

We declare modifiers for elements in a similar way:

```js
BEM.DOM.decl('myblock', {
    // …

    onElemSetMod : {

        // The same structure as the block
        'elem' : {
            'mod1' : {

                // the additional parameter `elem`
                'val1' : function(elem, mod, val, oldVal) {
                }

            }
        }
    }

});
```

## Events
Events play a key-role in JavaScript.  There are special methods which allow us to work with events on the DOM nodes corresponding to blocks, and with events on BEM-objects. (JavaScript objects that are the block instances).

```js
// DOM-event
this
    .bindTo([elem], event, fn)
    .unbindFrom([elem], event)

// BEM-event
this
    .on(event, [data], fn, [ctx])
    .un(event, [data], fn, [ctx])
    .trigger(event, [data])
```

A DOM-event doesn't need any explanations, it the result of a user action: click, key press, scroll, etc.

BEM-events are like "custom events", they exist for the possibility to create an API for blocks.

## Initialization
The block starts to work after it is initialised.  The moment a block is initialised, it receives the `js_inited` modifier.

Similar to other modifiers, as a respond to set of the modifier a declared code can be executed.
In other words, it's possible to write a "constructor".


```js
onSetMod : {

    'js' : {

        'inited' : function(){

            // The block "constructor"

        }
    }
}
```

`i-bem` makes possible lazy initialization for the blocks, and creation of blocs without DOM-representation. <br/>
More information can be found at [the `i-bem` block page ](http://bem.github.io/bem-bl/sets/common-desktop/i-bem/i-bem.en.html).

This article is based on [Vladimir Varankin's](https://github.com/narqo) talk ["BEM and JavaScript: Why Did We Created a JS-framework?"](https://events.yandex.ru/events/yasubbotnik/msk-sep-2012/talks/323/) that was presented at Ya.Subbotnik (Yandex Developer Day) in Moscow September 8, 2012.
