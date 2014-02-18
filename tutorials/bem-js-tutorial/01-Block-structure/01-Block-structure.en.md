# Block structure
## JavaScript-enriched block
### Prerequisites
Block `i-bem` and its `dom` element, with all their dependencies, must be included
into your page's js file if you are going to enjoy BEM. This happens
automatically if you borrow the project structure from the
[project-stub repository](https://github.com/bem/project-stub/tree/bem-core).

### HTML structure
Any BEM block can be equipped with JavaScript. To do this, you just need to place
a JavaScript file into your block's directory.

```
├── desktop.blocks/
│   ├── my-block/
│       └── my-block.js
```

Then, just mark a block with a `js` flag when declaring it in the BEM tree.

```js
{
    block: 'my-block',
    js: true
}
```

This gives (after running BEMHTML templates on the JSON) a corresponding DOM
node marked with an `i-bem` class and having `data-bem` attribute with the block
parameters.

```html
<div class="my-block i-bem" data-bem="{'my-block':{}}">
    ...
</div>
```

If you are not using BEMHTML templates, instruct your templates to produce the same
output or write this HTML manually. Then you can use BEM JavaScript with this HTML.

The `data-bem` attribute stores block parameters in JSON, which structure is:

```js
{
    "my-block" : {
        "paramName": "paramValue"
    }
}
```

## The console.log example

<pre>├── pure.bundles/
│   ├── 001-simple-block/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   └── my-block/
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/blocks/my-block/my-block.js">my-block.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/001-simple-block.bemjson.js">001-simple-block.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/001-simple-block/001-simple-block.html">001-simple-block.html</a></pre>

The first example is the most simple. It demonstrates the block's structure and
shows how the JavaScript starts working.<br/>
Load the example page
[001-simple-block](http://bem.github.io/bem-js-tutorial/pure.bundles/001-simple-block/001-simple-block.html)
with your console tool open, and you can see the `outerHTML` of the `my-block` on
the page.

The BEMJSON declaration of the example
[001-simple-block.bemjson.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/001-simple-block.bemjson.js)
describes a simple page with only one `my-block` component.

The `my-block` component is represented on the
[001-simple-block/blocks](https://github.com/bem/bem-js-tutorial/tree/master/pure.bundles/001-simple-block/blocks/my-block)
level with a JavaScript file. The
[my-block.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/blocks/my-block/my-block.js)
file is filled with a simple piece of code.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('my-block', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                console.log(this.domElem[0].outerHTML);
            }
        }
    }
});

provide(DOM);

});
```

The `i-bem` utilizes a special [module system
ymaps/modules](https://github.com/ymaps/modules), so the first line defines which
modules to use for the component. In this case it is `i-bem__dom`, a
module represented as a `dom` element of `i-bem` block from `bem-core` library.
[Link to its code, if you need
it](https://github.com/bem/bem-core/blob/v1/common.blocks/i-bem/__dom/i-bem__dom.js).

Inside you can use the `DOM` object and its `decl` method to describe a block.

The block name is the first parameter.<br/>
The second is a hash of dynamic
properties of the block. Every instance of the block gets a copy of them.

Aside from custom properties, the hash can also contain some special ones. You can see one
of them, an `onSetMod` property in the example. It is used to store callbacks to
run when a block gets a modifier. The syntax is the following:

```js
DOM.decl('my-block', {
    onSetMod: {
        'foo' : function() {
            // Runs when a block gets any value of `foo` modifier
            // This also works for 'boolean' modifiers
        },
        'bar' : {
            'qux' : function() {
                // Runs when a block gets 'qux' value of 'bar' modifier
            },
            '' : function() {
                // Runs when `bar` modifier is removed from a block
            },
            '*' : function() {
                // Runs for any value of 'bar' modifier
            }
        },
        '*' : function() {
            // Runs for any modifier of the block
        }
    }
});
```

These callbacks get following parameters:

```js
function(modName, modVal, curModVal) {

    // modName
    // Modifier's name is operated

    // modVal
    // Modifier's value to be set. It is a `String` for modifiers with values
    // or `true`/`false` for boolean modifiers

    // curModVal
    // Current value of the modifier

}
```

The first modifier any block gets is a `js` modifier with its `inited` value.
The framework core reads all the `i-bem` marked blocks on a page and then initializes
them and sets the `js_inited` modifier on each block. Thus, you can
write a code to be run after the block starts functioning by 
defining a callback to the `js_inited` modifier.

In the example presented above, this code is a `console.log` call with the block's `outerHTML`.

---------------------------------------
### Links
 * [Core document](/tutorials/articles/bem-js-tutorial)
 * [Next chapter. Modifiers](/tutorials/articles/bem-js-tutorial/02-modifiers)
