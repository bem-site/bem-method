# Tutorial on JavaScript in BEM terms

### Links
 * [Core document](../00-Intro/00-Intro.en.md)
 * [Previous chapter. Block structure](../01-Block-structure/01-Block-structure.en.md)

----------------------------------

## Modifiers
In BEM, modifiers express block states. To put a block into a special state we
set a modifier on it. Then a block runs a callback associated with
this modifier.

### Setting a modifier on a block and reacting to it

<pre>├── pure.bundles/
│   ├── 002-change-modifier/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   └── call-button/
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/002-change-modifier/blocks/call-button/call-button.bemhtml">call-button.bemhtml</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/002-change-modifier/blocks/call-button/call-button.css">call-button.css</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/002-change-modifier/blocks/call-button/call-button.js">call-button.js</a>
│   │   │       └── call-button.png
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/002-change-modifier/002-change-modifier.bemjson.js">002-change-modifier.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/002-change-modifier/002-change-modifier.html">002-change-modifier.html</a></pre>

In the
[002-change-modifier](http://bem.github.io/bem-js-tutorial/pure.bundles/002-change-modifier/002-change-modifier.html)
example you can see a button changing its state after a user clicks on it.

The button is a BEM block named `call-button` and is represented by CSS,
JavaScript and templates placed into [the block
folder](https://github.com/bem/bem-js-tutorial/tree/master/pure.bundles/002-change-modifier/blocks/call-button).

In JavaScript
[blocks/call-button/call-button.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/002-change-modifier/blocks/call-button/call-button.js)
there is a common BEM DOM block declaration.

The callback associated with `js_inited` modifier runs when a block is
initialized by the core. In this example it starts with binding to a `click`
event on the DOM node corresponding to the block. This is done with the `bindTo`
helper.<br/>
In the callback it is said to set a `calling` modifier
to the block and the `setMod` method serves for it.

> NOTE: In many cases using bindTo for events listening is not the best solution
> as it needs to watch every block of the kind. It becomes even worse with
> elements of the blocks since they are many. You will see below much better way
> in the `live` section.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('call-button', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                this.bindTo('click', function() {
                    this.setMod('calling');
                });
            }
        }

...

```

Take into account that here we use a `boolean modifier`, which has no value. But
as you will see below, modifiers are very often used as key-value pairs. In that
case, both modifier's name and its value have to be passed to the `setMod`
helper:

```js
this.setMod('status', 'on');
...
this.setMod('status', 'off');
```

The `setMod` method applies a modifier's CSS class to the blocks which makes the
block change its appearance. If you need additional changes on a block,
place them into a function corresponding to the modifier. Like the following:

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('call-button', {
    onSetMod: {
        'js' : { ... },
        'calling' : function() {
            this.elem('link').text('Calling...');
        }
    }
});

provide(DOM);

});
```
Here you can run your calculations, or code any functionality of the block. As
there is access to the block's DOM node and its children, the DOM structure can
also be changed.<br/>
With the `elem` helper you can select the elements of the block by their names.

The concept of pre-defined block states expressed with modifiers is a very
powerful and efficient way to describe an interface component.<br/>
Everything related to a particular block state is encapsulated in a relevant modifier.
From wherever you change a block modifier, it knows what to do.<br/>
Modifiers are described in a declarative manner, which empowers a programmer to extend
the code with further implementations or to redefine it completely, as is shown
in the tutorial below.

### Setting a modifier on an element

<pre>├── pure.bundles/
│   ├── 003-element-modifier/
│   │   ├── blocks
│   │   │   ├── .bem/
│   │   │   ├── page/
│   │   │   ├── sign/
│   │   │   ├── text/
│   │   │   └── traffic-light/
│   │   │       ├── __go/
│   │   │       │   └── traffic-light__go.mp3
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/003-element-modifier/blocks/traffic-light/traffic-light.bemhtml">traffic-light.bemhtml</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/003-element-modifier/blocks/traffic-light/traffic-light.css">traffic-light.css</a>
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/003-element-modifier/blocks/traffic-light/traffic-light.js">traffic-light.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/003-element-modifier/003-element-modifier.bemjson.js">003-element-modifier.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/003-element-modifier/003-element-modifier.html">003-element-modifier.html</a></pre>

According to BEM, elements can be modified in the same way as blocks. JavaScript methods
are similar in both. The next
example
[003-element-modifier](http://bem.github.io/bem-js-tutorial/pure.bundles/003-element-modifier/003-element-modifier.html)
illustrates this.

The `traffic-light` block contains three light elements `stop`, `slow` and `go`
each of which can have a `status` modifier with its `on` and `off` value. As follows:
[traffic-light.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/003-element-modifier/blocks/traffic-light/traffic-light.js).

Similar to the previous example, the `traffic-light` block is introduced to the
`i-bem` core as a DOM-equipped block.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('traffic-light', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                ...
                this.setMod('status', 'stop');
            }
        },
        ...
});

provide(DOM);

});
```

The traffic light works by switching its `status` modifier from the `stop` to the
`slow` and then to the `go` values. In its initializing method it is said to set
a modifier `status_stop` to the block, so that the cycle begins.

The `status` modifier is declared with its callback, once for all its values. This
is a good way to get rid of copy&paste if the corresponding states work similarly.

```js
modules.define('i-bem__dom', function(provide, DOM) {

var timer;

DOM.decl('traffic-light', {
    onSetMod: {
        'js' : { ... },
        'status' : function(modName, modVal, oldModVal) {
            clearTimeout(timer);
            var nextStatus = {
                'stop' : 'slow',
                'slow' : 'go',
                'go' : 'stop'
                },
                _this = this;
            oldModVal && this.setMod(this.elem(oldModVal), 'status', 'off');
            this.setMod(this.elem(modVal), 'status', 'on');
            timer = window.setTimeout(function(){
                _this.setMod('status', nextStatus[modVal]);
            }, 2000);
        }
    },
    ...
});

provide(DOM);

});
```

The arguments passed into the modifier callback are:

 1. Modifier name,
 1. Modifier value to be set,
 1. Previous modifier value.

With these, the actions can be a bit different depending on the modifier value.

Here a corresponding element is given the `status_on` modifier so that its light
turns on and the previously active projector is set `status_off`.

Modifiers are set on elements with the already familiar `setMod` helper with an
optional first parameter which means an element name.<br/>

So, by providing different parameters to the same `setMod` function you can:

```js
// apply a modifier to a current block
this.setMod('modName', 'modValue');

// apply a modifier to an element of a current block
this.setMod(this.elem('elemName'), 'modName', 'modValue');
```

Describing the actions related to element modifiers is similar to block modifier
actions. By analogy to `onSetMod` property you can user `onElemSetMod` with the
following syntax:

```js
DOM.decl('my-block', {
    onElemSetMod: {
        'elemName' : {
          'foo' : function() {
              // Runs when an element gets any value of `foo` modifier
          },
          'bar' : {
              'qux' : function() {
                  // Runs when an element gets 'qux' value of 'bar' modifier
              },
              '' : function() {
                  // Runs when `bar` modifier is removed from an element
              }
          }
        }
    }
});
```

In this example, only the `go` element is provided with a special functionality.

```js
modules.define('i-bem__dom', function(provide, DOM) {

var goSound = new Audio('blocks/traffic-light/__go/traffic-light__go.mp3'),
    timer;

DOM.decl('traffic-light', {
    onSetMod: { ... },
    onElemSetMod: {
        'go' : {
            'status' : {
                'on' : function() {
                    goSound.play();
                },
                'off' : function() {
                    goSound.pause();
                }
            }
        }
    }
});

provide(DOM);

});
```

This makes a browser play a traffic light sound when an element is switched into
`status_on` and to keep silent when the modifier goes off.

### Toggling a modifier

<pre>├── pure.bundles/
│   ├── 004-toggle-mod/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── page/
│   │   │   └── switch/
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/004-toggle-mod/blocks/switch/switch.bemhtml">switch.bemhtml</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/004-toggle-mod/blocks/switch/switch.css">switch.css</a>
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/004-toggle-mod/blocks/switch/switch.js">switch.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/004-toggle-mod/004-toggle-mod.bemjson.js">004-toggle-mod.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/004-toggle-mod/004-toggle-mod.html">004-toggle-mod.html</a></pre>

It is useful to toggle a modifier if there are 2 values of it to be changed one
by one. This is what the
[004-toggle-mod](http://bem.github.io/bem-js-tutorial/pure.bundles/004-toggle-mod/004-toggle-mod.html)
example demonstrates.

It shows a `switch` block, which is a nice button, with its `switched_off`
modifier meaning that the button is inactive at the moment. The
[switch.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/004-toggle-mod/blocks/switch/switch.js)
file of the block instructs the button to react to user clicks and toggle the
modifier from `switched_off` to `switched_on` and backwards by using the
`toggleMod` helper.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('switch', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                this.bindTo('click', function() {
                    this.toggleMod('switched', 'on', 'off');
                });
            }
        }
    }
});

provide(DOM);

});
```

Indeed, the same goes for elements which an additional first parameter for the
helper method.

### Deleting a modifier

<pre>├── pure.bundles/
│   ├── 005-modifier-removing/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── page/
│   │   │   └── todo/
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/005-modifier-removing/blocks/todo/todo.bemhtml">todo.bemhtml</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/005-modifier-removing/blocks/todo/todo.css">todo.css</a>
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/005-modifier-removing/blocks/todo/todo.js">todo.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/005-modifier-removing/005-modifier-removing.bemjson.js">005-modifier-removing.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/005-modifier-removing/005-modifier-removing.html">005-modifier-removing.html</a></pre>

Removing a modifier from an element (or a block) explained with
[005-modifier-removing](http://bem.github.io/bem-js-tutorial/pure.bundles/005-modifier-removing/005-modifier-removing.html)
example. This is a kind of To-Do list, where each task is a sticky note and can
be hidden (which means to be marked done) with a click.

The list is represented as a `todo` block where every item is name a `task`
block. As all the tasks are visible by default, it is emphasized by a
`visible_yes` modifier.

```html
<ul class="todo ..." data-bem="{ 'todo': {} }">
  <li class="todo__task todo__task_visible_yes" title="Click to remove">
    <a class="todo__task-inner">
      <h2>Lean more about BEM</h2>
      Visit bem.info to learn more.
    </a>
  </li>
  ...
```

How the block behaves is described in its [todo.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/005-modifier-removing/blocks/todo/todo.js)
file.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('todo', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                this.bindTo(this.elem('task'), 'click', function(e) {
                    this.delMod(e.domElem, 'visible');
                });
            }
        }
    }
});

provide(DOM);

});
```

Whenever a user clicks on a `task` element the `visible` modifier is removed
from it by `delMod` modifier.<br/>
The `delMod` helper can also be used for blocks as the first parameter (an
element object) is optional.

Notice that the `bindTo` helper works not with a block but with its elements
here.

> As it was mentioned above, `bindTo` helper listens for every element of the
> kind. If this block had 100 task elements, that would mean 100 event watchers.
> Moreover, a dynamically added new task should have been provided with an event
> listener as well. There is another way to work with the events fully explained
> in the `live` section. Make sure you have learnt it before starting with a
> real powerful application.

### Before a modifier is set

<pre>├── pure.bundles/
│   ├── 006-before-set-mod/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── page/
│   │   │   └── accordion-menu/
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/006-before-set-mod/blocks/accordion-menu/accordion-menu.bemhtml">accordion-menu.bemhtml</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/006-before-set-mod/blocks/accordion-menu/accordion-menu.css">accordion-menu.css</a>
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/006-before-set-mod/blocks/accordion-menu/accordion-menu.js">accordion-menu.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/006-before-set-mod/006-before-set-mod.bemjson.js">006-before-set-mod.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/006-before-set-mod/006-before-set-mod.html">006-before-set-mod.html</a></pre>

Besides the possibility to react on a modifier setting, you can do something
before that happens. It is widely adopted for the cases when you need to prevent
setting a modifier.

The
[006-before-set-mod](http://bem.github.io/bem-js-tutorial/pure.bundles/006-before-set-mod/006-before-set-mod.html)
example illustrates such a case with an
[accordion-menu](https://github.com/bem/bem-js-tutorial/tree/master/pure.bundles/006-before-set-mod/blocks/accordion-menu)
block. You can see a menu with a few items on a page. Each of them can reveal
its subitems when being clicked. To do that you need bind to a 'click' event on
the menu items, set `current` modifier into `true` for the related item and
ensure that previously selected item is closed (which means its `current`
modifier is set into `false`).

```js
modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

DOM.decl('accordion-menu', {

    onSetMod: {
        'js' : {
            'inited' : function() {
                this._current = this.findElem('item', 'current', true);
                this.bindTo('item', 'click', function(e) {
                    this.setMod($(e.currentTarget), 'current', true);
                });
            }
        }
    },

    onElemSetMod: {
        'item' : {
            'current' : {
                'true' : function(elem) {
                    this.delMod(this._current, 'current');
                    this._current = elem;
                }
            }
        }
    }

});

provide(DOM);

});
```
> You may also take notice that jQuery is used here to wrap the elements and this
> provides some changes into the code. The bem-core library is based on a
> [ymaps/modules](https://github.com/ymaps/modules) module system explained below.
> With it each module should be declared before using.

The example becomes more interesting when a disabled item appears. Such an item
has to prevent its being in the `current` state. That is always possible to put
an additional condition in the modifier callback but the core provides more
elegant solution. Similar to `onSetMod` and `onElemSetMod` properties you can
use `beforeSetMod` and `beforeElemSetMod` to instruct the block component what
to do previously. It is also prevents setting a modifier when a callback related
to the 'before' part returns `false`.

```js
modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

DOM.decl('accordion-menu', {
    beforeElemSetMod: {
        'item' : {
            'current' : {
                'true' : function(elem) {
                    return !this.hasMod(elem, 'disabled');
                }
            }
        }
    },
    ...
});

provide(DOM);

});
```

Here it checks if the clicked item is disabled and prevents such an item to be
`current`.

---------------------------------------
### Links
 * [Core document](../00-Intro/00-Intro.en.md)
 * [Previous chapter. Block structure](../01-Block-structure/01-Block-structure.md)
 * [Next chapter. Live initialization](../03-Live-initialization/03-Live-initialization.md)
