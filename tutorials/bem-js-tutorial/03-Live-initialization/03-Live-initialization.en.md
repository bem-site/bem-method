<!--
{
    "title": "Live-initialization",
    "createDate": "04-02-2014",
    "editDate": "",
    "summary": "Before a block starts to function the core initializes it.",
    "thumbnail": "",
    "authors": ["stepanova-varvara"],
    "tags": ["i-bem.js", "JavaScript"],
    "translators": ["stepanova-varvara"]
}
#META_LABEL-->

# Tutorial on JavaScript in BEM terms

### Links
 * [Core document](../00-Intro/00-Intro.en.md)
 * [Previous chapter. Modifiers](../02-Modifiers/02-Modifiers.en.md)

----------------------------------

## Live initialization
Before a block starts to function the core initializes it. At the end of this
process the block gets `js_inited` modifier, which you are already familiar
with.

While a block is initialized, there appears a JavaScript object corresponding to
the block instance. Then a callback for `js_inited` modifier runs, and there can
be coded all the primary actions.

In the previous examples all the blocks on a page were initialized after
`domReady`. Although on a page full of block it is not needed to initialize all
the components at once. Sometimes a user loads a page just to press one button
on it. So, a better way is to save calculation time and browser memory
initializing block only when a user starts operating on them.

This is the so-called `live initialization` (or `lazy`).

### `live` static method
The instructions to initialize a block lazy can be given in a predefined `live`
static method.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('my-block', {
    onSetMod: {
        ...
    },
    ...
},{
    live: function() {
        // Here you can code when to initialize
        // this block instances
    }
});

provide(DOM);

});
```

In the previous examples, there was not static methods at all and this is equal
to setting the `live` property as `false`.<br/>
Here, as it is a function, the core understands that the instances of this block
should not be initialized before something special happens. This can be that a
DOM event fires of the block DOM node or on an element.

### Initializing a block on DOM event

<pre>├── pure.bundles/
│   ├── 010-live-init-on-event/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── text/
│   │   │   └── translate/
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/010-live-init-on-event/blocks/translate/translate.bemhtml">translate.bemhtml</a>
│   │   │       ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/010-live-init-on-event/blocks/translate/translate.css">translate.css</a>
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/010-live-init-on-event/blocks/translate/translate.js">translate.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/010-live-init-on-event/010-live-init-on-event.bemjson.js">010-live-init-on-event.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/010-live-init-on-event/010-live-init-on-event.html">010-live-init-on-event.html</a></pre>

On the
[010-live-init-on-event.html](http://bem.github.io/bem-js-tutorial/pure.bundles/010-live-init-on-event/010-live-init-on-event.html)
page you can see the text in Dutch. Actually, this text is divided into a lot of
pieces phrase by phrase. Then, they are framed with a `translate` block.

If a user reading the text does not understand its meaning he/she can see a
translation for an unclear phrase by clicking on the text.

```html
<span
    class="translate i-bem"
    data-bem="{'translate':{'prompt':'один мужчина заходит на почту;'}}">
    Een man gaat een postkantor binnen
    <i class="translate__prompt"></i>
</span>
```

As you can see from its HTML structure, the `translate` block holds a piece of
text in Dutch inside and its Russian translation in the block parameters (inside
the `data-bem` attribute). Also, there is a `prompt` element not displayed by
default, which is used to place the translation into it when needed.

Note that there is no `translate_js_inited` class on a block DOM node even after
the page is completely loaded. This means that there is no JavaScript object
related to the block yet.<br/>
In the
[translate.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/010-live-init-on-event/blocks/translate/translate.js)
file of the block it is said to initialize it only after a `click` launches on
the block DOM node.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('translate', {
    ...
},{
    live: function() {
        this.liveInitOnEvent('click');
    }
});

provide(DOM);

});
```

When clicked, the core applies `js_inited` modifier to the block instance and
runs block 'constructor', the function set to this modifier.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('translate', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                this.setMod(this.elem('prompt'), 'visible', true);
            }
        }
    },
    onElemSetMod: {
        'prompt': {
            'visible': function(elem) {
                elem.text(this.params['prompt']);
            }
        }
    }
},{
    ...
});

provide(DOM);

});
```
It makes the contained `prompt` element visible by setting on it the `visible`
modifier into `true`. And this means to take the corresponding translation from
the block parameters by getting the `this.params['paramName']` value.<br/>
In face, the translation could be placed into the `prompt` at the beginning since
it was invisible for a user anyway. But just to illustrate how the parameters can
be taken, its was placed into the `data-bem`.

Coming back to the live initialization, you can see that on a page with many
blocks of the kind the core initializes only those on which the event runs. This
approach saves the browser memory and makes the page function faster.

There is an [event delegation](http://davidwalsh.name/event-delegate) idea
behind live initialization. Thus, there is only one listener for the `click`
event on the `document` object, not a lot of them for every block on a
page.<br/>
Besides saving browser forces, this way provides some flexibility for
dynamically changed pages. This you can see with the following example.

### Delegated initialization
<pre>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/010_2-delegation/010_2-delegation.html">010_2-delegation.html</a></pre>

This page provides absolutely the same `translate` block as the previous one.
But there is also a piece of crazy inline JavaScript on a page which works when a
user clicks the pink button and dynamically append a few of new `translate`
blocks to the page. Then, with clicking on the phrases of this fresh joke you can
see that it work absolutely the same as the other `translate` blocks being on the
page at the beginning.

The core of `i-bem` framework listens to the events on the `document` object. So,
when a user clicks any `translate` block, this click bubbles up to the `document`
and core initializes the block as it was instructed it its `live` section.

### Binding to live events
<pre>├── pure.bundles/
│   ├── 011-live-bind-to/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── button/
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/011-live-bind-to/blocks/button/button.bemhtml">button.bemhtml</a>
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/011-live-bind-to/blocks/button/button.css">button.css</a>
│   │   │   |   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/011-live-bind-to/blocks/button/button.js">button.js</a>
│   │   │   └── page/
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/011-live-bind-to/011-live-bind-to.bemjson.js">011-live-bind-to.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/011-live-bind-to/011-live-bind-to.html">011-live-bind-to.html</a></pre>

The next [example with 100 BonBon
buttons](http://bem.github.io/bem-js-tutorial/pure.bundles/011-live-bind-to/011-live-bind-to.html)
shows that live events can be reacted not once when initializing a block but
every time.

This `button` block is again equipped with live initialization instructions since
it would be madness to initialize all the 100 buttons at once and then listen to
the clicks on each of them.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('button', {
    onSetMod: {
        'js' : {
            'inited' : function() {
                console.log('Here an object of ' + this.domElem[0].innerHTML + ' comes. Just once.');
            }
        }
    },
    ...
},{
    live: function() {
        this.liveBindTo('click');
    }
});

provide(DOM);

});
```

Similar to the examples with `liveInitOnEvent` this code initializes a block
instance and runs the `js_inited` modifier callback.

Unlike the `liveInitOnEvent` the `liveBindTo` method runs its callback not
just once but every time a user clicks the button.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('button', {
    onSetMod: {
        ...
    },
    onClick: function() {
        console.log('Here I can track clicks');
    }
},{
    live: function() {
        this.liveBindTo('click', function(e) {
            this.onClick();
        });
    }
});

provide(DOM);

});
```

### Live initialization on many events
<pre>├── pure.bundles/
│   ├── 012-live-init-many-events/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── checkbox/
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/012-live-init-many-events/blocks/checkbox/checkbox.bemhtml">checkbox.bemhtml</a>
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/012-live-init-many-events/blocks/checkbox/checkbox.css">checkbox.css</a>
│   │   │   |   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/012-live-init-many-events/blocks/checkbox/checkbox.js">checkbox.js</a>
│   │   │   └── page/
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/012-live-init-many-events/012-live-init-many-events.bemjson.js">012-live-init-many-events.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/012-live-init-many-events/012-live-init-many-events.html">012-live-init-many-events.html</a></pre>

In the previous examples the core watched only one `click` event to decide if a
block should start working or not. But sometimes reacting just one event is not
enough. This is illustrated with the
[012-live-init-many-events](http://bem.github.io/bem-js-tutorial/pure.bundles/012-live-init-many-events/012-live-init-many-events.html)
example, where you can see customized checkboxes.

```html
<span
    class="checkbox i-bem"
    data-bem="{'checkbox':{}}">
    <input class="checkbox__control" id="remember1" type="checkbox" value="on">
    <label class="checkbox__label" for="remember1"></label>
</span>
```

It is obvious an instance of this block has to be initialized when a user clicks
its `label` element.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('checkbox', {
    ...
    _onClick : function() {
        this.setMod('focused', true);
    },
    ...
},{
    live: function() {
        this.liveBindTo('label', 'click', function() {
            this._onClick();
        });
    }
});

provide(DOM);

});
```

The same `liveBindTo` method is used here to initialized the block and listen to
its next clicks. Notice that here it is provided with an additional parameter
(the first one) with the name of a block element whose clicks we are interested
in.

But more than that, the control can be changed with a keyboard (or from another
JavaScript piece) and this must also be taken into account.<br/>
You can put in the `live` method as many instructions about how to initialize as
you need. Here it happens after a `click` event on the `label` element and also
after a `change` event on the embedded `control` element, which is native `input`.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('checkbox', {
    ...
    _onClick : function() {
        this.setMod('focused', true);
    },
    _onChange : function(e) {
        this.setMod('checked', e.target.checked);
    }
},{
    live: function() {
        this.liveBindTo('label', 'click', function() {
            this._onClick();
        });

        this.liveBindTo('control', 'change', function(e){
            this._onChange(e);
        });
    }
});

provide(DOM);

});
```

The block should also be inited when focused in or focused out.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('checkbox', {
    ...
},{
    live: function() {
        this.liveBindTo('label', 'click', function() {
            this._onClick();
        });

        this.liveBindTo('control', 'change', function(e){
            this._onChange(e);
        });

        this.liveBindTo('control', 'focusin focusout', function(e){
            this.setMod('focused', e.type == 'focusin'? true : false);
        });
    }
});

provide(DOM);

});
```

As you can see, it is possible to bind to more than one event with the same
callback if list their names separated with a space.

Then, with adding modifiers' functionality to the components, it can be finished.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('checkbox', {
    onSetMod: {
        'focused' : {
            'true' : function() {
                this.elem('control').focus();
            },
            '' : function() {
                this.elem('control').blur();
            }
        },
        'checked' : function(modName, modVal) {
            this.elem('control').attr('checked', modVal ? 'checked' : false);
        }
    },
    ...
},{
    live: function() {
        ...
    }
});

provide(DOM);

});
```

This approach makes the control behaviour consistent. No matter how a user or
another piece of JavaScript or a browser start to interact with the component,
it will work fine. Getting the `focused` modifier from something, it would focus
the embedded input control. Having the control focused, it would set `focused`
modifier to itself providing the proper view. When changed either manually or
automatically the block would get `checked` modifier and a `checked` attribute
for the control or loose them.

#### Why not :checked?
As you might notice, in this example an internal 'control' element (the input)
is indicated to be checked with the `checked` modifier on its parent block.

```html
<span
    class="checkbox i-bem checkbox_js_inited checkbox_checked"
    data-bem="{'checkbox':{}}">
    <input
        class="checkbox__control"
        id="remember2"
        type="checkbox"
        value="on"
        checked="checked">
   <label class="checkbox__label" for="remember2"></label>
</span>
```

```css
.checkbox_checked .checkbox__label {
    left: 54px;
}

.checkbox_checked .checkbox__label:after {
    background: #00bf00;
}
```

Indeed, it would be possible to use `:checked` pseudo selector as it was done in
the [control prototype](http://codepen.io/bbodine1/pen/novBm).

```css
.checkbox input[type=checkbox]:checked + label {
  left: 54px;
}

.checkbox input[type=checkbox]:checked + label:after {
  background: #00bf00;
}
```

However the modifier approach supplies more flexibility making the whole block
be able to change if checked

```css
.checkbox_checked
{
    background-image: -webkit-linear-gradient(0deg, #333, #333 4px, #555 4px, #555 6px);
    background-image: linear-gradient(0deg, #333, #333 4px, #555 4px, #555 6px);
    background-size: 6px 6px;
}
```

as well as saves time for parsing selectors and bringing architectural
consistency to the code.

### BEM events

Besides DOM events, `i-bem.js` operates with custom JavaScript events on the
JavaScript objects corresponding to the blocks. These events are named `BEM
events` and usually serve to normalize a component API.

The [`link`
block](https://github.com/bem/bem-components/tree/a37156b9646b97472776b8ce035ca1736dc7257c/common.blocks/link)
of `bem-components` block library can provide an example of firing a custom BEM
event. Its JavaScript functionality is to trigger the `click` event on the
corresponding JavaScript object whenever a user clicks the left button if the
current link is not disabled. An event is triggered with the help of `emit` method
of the block.

```js
  _onClick : function(e) {
      e.preventDefault();
      this.hasMod('disabled') || this.emit('click');
  }
```

Thus, the `link` block has an API which can be used by other blocks on a page.

Another example is the [`menu` block](https://github.com/varya/bem-js-tutorial/tree/master/desktop.blocks/menu)
of this tutorial. It is represets a list of menu items in HTML, one of those can be
selected at the moment.

```html
<div class="menu i-bem" data-bem="{&quot;menu&quot;:{}}">
  <ul class="menu__layout">
    <li class="menu__layout-unit menu__layout-unit_position_first">
      <div class="menu__item menu__item_state_current">
        Item 1
      </div>
    </li>
    <li class="menu__layout-unit">
      <div class="menu__item menu__item_state_current">
        Item 2
      </div>
    </li>
    <li class="menu__layout-unit">
      <div class="menu__item menu__item_state_current">
        Item 3
      </div>
    </li>
  </ul>
</div>
```

The menu listens to the DOM clicks on its `item-selector` elements and emits the
`current` event which signals about changing the current item and provides the
data.

```js
this
    .delMod(prev, 'state')
    .emit('current', {
        prev    : prev,
        current : elem
    });
```

This event fires on the JavaScript object corresponding to the menu block instance.
With that, any other block subscribed to the `current` BEM event of the menu can
learn when it changes its current item and react on it.

### Live initialization on BEM a event of an inner block

<pre>├── components.bundles/
│   ├── 014-live-init-bem-event/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   ├── map-marks/
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map-marks/map-marks.bemhtml">map-marks.bemhtml</a>
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map-marks/map-marks.css">map-marks.css</a>
│   │   │   |   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map-marks/map-marks.js">map-marks.js</a>
│   │   │   ├── map/
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map/map.bemhtml">map.bemhtml</a>
│   │   │   |   ├── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map/map.deps.js">map.deps.js</a>
│   │   │   |   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map/map.js">map.js</a>
│   │   │   ├── menu/
│   │   │   |   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/menu/menu.css">menu.css</a>
│   │   │   └── page/
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/014-live-init-bem-event.bemjson.js">014-live-init-bem-event.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/components.bundles/014-live-init-bem-event/014-live-init-bem-event.html">014-live-init-bem-event.html</a></pre>

The example shows [`map-marks`
block](https://github.com/varya/bem-js-tutorial/tree/master/components.bundles/014-live-init-bem-event/blocks/map-marks)
which binds a menu and a map so that a user can select the menu item and see a
related mark in the map.

The `map-marks` block contains the blocks `menu` and `map`. This can be seen
from [bemjson description of the
page](https://github.com/varya/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/014-live-init-bem-event.bemjson.js)
or inside the page html
[014-live-init-bem-event.html](http://bem.github.io/bem-js-tutorial/components.bundles/014-live-init-bem-event/014-live-init-bem-event.html).

This block is only needed when a user has been started to interact with the
menu. So the block uses live initialization and it is declared to initialize the
block only when the `current` BEM event fires on the included `menu` block.

The JavaScript implementation of the block [map-marks.js](https://github.com/varya/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map-marks/map-marks.js)
uses live initialization depending on the inner block.

```js
modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

DOM.decl('map-marks', {
    ...
}, {
    live: function() {
        this.liveInitOnBlockInsideEvent('current', 'menu', function(e, data){
            this._showMap(e, data.current);
        });
    }
});

provide(DOM);

});
```

The `liveInitOnBlockInsideEvent` methods requests the names of an event and the
included block s well as a callback.

Once a user clicks a menu item, it becomes current and the menu block emits
`current` event. Being catched, it initializes the `map-marks` block, which means
it gets `js_inited` modifier ans the related method runs:

```js
modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

DOM.decl('map-marks', {

  onSetMod: {
      'js' : {
          'inited' : function () {
              this._menu = this.findBlockInside('menu');
              this._map = this.findBlockInside('map');
          }
      }
  },

  ...

}, {
    live: function() {
        ...
    }
});

provide(DOM);

});
```

Then the callback runs the `_showMap` method of the block instance. This shows a
mark on a map using the `map` block.

```js
modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

DOM.decl('map-marks', {

    ...

    _showMap: function(e, elem) {
        var params = this._menu.elemParams(elem);
        this._map.showAddress(params['address']);
    }

    ...

}, {
    live: function() {
        ...
    }
});

provide(DOM);

});
```

---------------------------------------
### Links
 * [Core document](../00-Intro/00-Intro.en.md)
 * [Previous chapter. Modifiers](../02-Modifiers/02-Modifiers.en.md)
