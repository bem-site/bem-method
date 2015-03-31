# JavaScript for BEM. The main terms

Stack of BEM technologies contains an `i-bem` block of the [bem-core](https://en.bem.info/libs/bem-core) library.

The JavaScript implementation of this block uses BEM data domain. The use of the `i-bem` block allows one to manipulate the client-side JavaScript/DOM in *BEM-style* according to *BEM-Principles*, not only in the design of visible components, but also their behavior.

## Why do we need one more framework?

Oldschool designers still remember the good days when there was nothing even jQuery existed. They had to program everything from scratch.
Each project had its own `common.js` file that included a set of commonly used functions.
At the beginning of this file was a section which would be copy-&-pasted from project to project. Later these functions were collected into a small JavaScript library.

That was the evolution of JavaScript frameworks.

The same thing happened to BEM.  Initially, we understood that we wanted to have `blocks`, which were `Interface Modules`, their elements and modifiers implemented only in CSS.  Later the JavaScript developers wanted to work using a similar structure. They also wanted to include the key-concept of `levels` which allows one to build upon and improve the behavior of the blocks from project to project.

So, the i-bem` helper-block was implemented in JavaScript. `i-bem.js` is the core framework for writing JavaScript in BEM terms.

## Connection with HTML code
As all JavaScript components, code for `i-bem.js` has to be matched for some HTML, eventually intended to be the functional code behind some part of an interface. In order to use `i-bem`, you have to add the `i-bem` CSS class and define the `onclick` field to contain the parameters of the block.

```js
<div
    class="myblock i-bem"
    onclick="return {
        myblock: { }}">

    <span class="myblock__item"></span>

</div>
```

Usually, the blocks initialization starts at the `domReady` event. Due to the ability to read the `onclick` attribute and receive a native JavaScript object we do not need any `id` components or parse CSS classes. All blocks marked with `i-bem` CSS class will be transformed according to their parameter components.

## Behavior declaration
A block behavior is described in a JavaScript file which has the same name as the block (`myblock.js`).

According to the OOP, the similar blocks form  the class. Furthermore, every time the block appears on the page, an instance of this class creates.

The `decl` method is used for describing the block behavior, it receives the following parameters:
 1. The `name` of the block we are deal with.
 2. This specific instance properties.
 3. The static properties of the class to which the block belongs.

```js
modules.define('myblock', ['i-bem__dom'], function(provide, BEMDOM) {

  provide(BEMDOM.decl(this.name, {

        /\* the own instance properties \*/

    }, {

        /\* the static properties \*/

    }));

});
```

In JavaScript, the reference to the instance you can always get using the `this` keyword and its reserved fields — `__self` and  `__base`.

 * `this.__self`<br/>
 Refers to the class static methods (to which the instance belongs)&
 * `this.__base`<br/>
  Performs a `super call`, which means the base method implementation calling.

The last one allows to operate within different `levels`.
When a developer extends functionality of the current block, he always has access to the block behavior defined on the previous level.
In other words, methods can be fully overwritten or just extended with additional behavior.

```js
modules.define('myblock', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl('myblock', {

        method: function() {

            this.__base();
            this.doMore();

        }

    }));
});
```

Except the definition levels inheritance, a block could be inherited from another block. So, we can call the definition levels inheritance as a merge of the blocks implementations.

## Selectors of the blocks
To find other blocks, use the `find*` methods. The method type depends on the location of the needed block relative to the current block:

```js
// Search within the current block context
this.findBlockInside([elem], block)

// Search outside of the current block context
this.findBlockOutside([elem], block)

// Search of the current block on the DOM-node
this.findBlockOn([elem], block)
```

All these methods return a JavaScript object, the found instance of the block.

In a similar way you could find a collection of blocks:

```js
// Search inside the current block context
this.findBlocksInside([elem], block)

// Search outside of the current block context
this.findBlocksOutside([elem], block)

// Search of the current block on the DOM-node
this.findBlocksOn([elem], block)
```

## Elements
There are the methods to access the block elements: `elem` and `findElem`.
The difference between these methods is, that the `elem` method cashes its result at the first call; therefore, there is no need to store the result of the `elem` method in a variable. It is already implemented by this method.

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

The methods for working with modifiers are the same as for blocks and elements.

The first (optional) parameter shows what is going on.

```js
// Get the value of the block modifier
this.getMod(modName)

// Get the value of the the element modifier
this.getMod(elem, modName)

// Verify the modifier
this.hasMod([elem], modName, modVal)

// Set the modifier
this.setMod([elem], modName, modVal)

// Delete the modifier
this.delMod([elem], modName)

// Toggle the modifier value
this.toggleMod([elem], modName,
    modVal1, modVal2, [condition])
```


Modifiers describe a block state. Every block has the `onSetMod` property that specifies the block reaction on its state changes.

```js
modules.define('myblock', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl('myblock', {
        onSetMod : {
            'mod1' : {

                // set the `mod1` modifier to the `val1` value
                'val1' : function(mod, val, oldVal) {
            },
            // set the `mod1` modifier to any value
            'mod2' : function(mod, val, oldVal) {
            }
        }
    }));
});
```

The element modifiers have a similar declaration:

```js
modules.define('myblock', ['i-bem__dom'], function(provide, BEMDOM) {

  provide(BEMDOM.decl('myblock', {
    // …

    onElemSetMod : {

        // the structure that is similar to the block one
        'elem' : {
            'mod1' : {

                // an additional `elem` parameter
                'val1' : function(elem, mod, val, oldVal) {
                }
            }
        }
    }

}));

});
```

## Events
Events play a key-role in JavaScript. So the events are also implemented in `i-bem`. There are special methods that allow to work with events on the DOM nodes corresponding to blocks, and with events on BEM-objects (JavaScript objects that are the block instances).

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

A DOM event does not need any explanations, it the result of a user's actions: click, key press, scroll, etc.

The BEM events are like ”custom events“. They exist to create an API for the blocks.

## Initialization
The block starts to work after it is initialized. The moment a block is initialized, it receives the `js_inited` modifier.

Similar to other modifiers, as a respond to set of the modifier a declared code can be executed.
In other words, it is possible to write a ”constructor“.

```js
onSetMod : {

    'js' : {

        'inited' : function(){

            // The block ”constructor“

        }
    }
}
```

`i-bem` makes possible the lazy initialization for the blocks, and creation of blocks without DOM representation.

This article is based on [Vladimir Varankin's](https://github.com/narqo) talk [BEM and JavaScript: Why Did We Created a JS-framework?](https://events.yandex.ru/events/yasubbotnik/msk-sep-2012/talks/323/) that was presented at Ya.Subbotnik (Yandex Developer's Day) in Moscow, September 8, 2012.
