# Живая (ленивая) инициализация

Перед началом работы блок инициализируется ядром. В конце этого процесса блок
получает модификатор `js_inited`, о котором вы уже знаете.

В процессе инициализации возникает JavaScript-объект, соответствующий экземпляру
блока. Затем запускается callback модификатора `js_inited` со всеми инициирующими
действиями.

В предыдущих примерах все блоки инициализировались по `domReady`. Хотя на
страницах со множеством блоков нет никакой нужды инициализировать все сразу.
Иногда пользователь загружает страницу только, чтобы нажать на ней
одну-единственную кнопку. Так что лучше сэкономить на вычислениях и памяти
браузера, проинициализировав компонент только, когда пользователь начал с ним
работать.

Это называется "живая" или "ленивая" инициализация.

## Статический метод `live`

Инструкции по ленивой инициализации блока даются в статическом методе `live`.

```js
modules.define('i-bem__dom', function(provide, DOM) {

DOM.decl('my-block', {
    onSetMod: {
        ...
    },
    ...
},{
    live: function() {
        // Здесь можно сказать, когда инициализировать
        // экземпляр блока
    }
});

provide(DOM);

});
```

В предыдущих примерах вообще не было статических методов. Это рассматривалось
как то, что свойство `live` имеет значение `false`.<br/>
А в данном примере это функция, так что ядро понимает, что блок не нужно сразу
инициализировать, а нужно подождать возникновения специальных условий. Это может
быть, например, DOM-событие на блоке или элементе.

## Инициализация блока по DOM-событию

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

На странице
[010-live-init-on-event.html](http://bem.github.io/bem-js-tutorial/pure.bundles/010-live-init-on-event/010-live-init-on-event.html)
вы можете увидеть историю, написанную на голландском языке. На самом деле текст
разделен на множество маленьких кусочков по фразам. Каждая фраза завернута в
блок `translate`.

Если пользователь, читающий текст, не понимает его значения, он может увидеть
перевод, кликнув по нужной фразе.

```html
<span
    class="translate i-bem"
    data-bem="{'translate':{'prompt':'один мужчина заходит на почту;'}}">
    Een man gaat een postkantor binnen
    <i class="translate__prompt"></i>
</span>
```

Как видно из HTML-структуры, блок `translate` содержит фразу на голландском
языке, а ее русский перевод хранится как параметр блока в атрибуте `data-bem`.
Также есть элемент `prompt`, которого не видно, пока он не понадобится.

Обратите внимание, что у блока нет класса `translate_js_inited`, он не
появляется даже при полной загрузке страницы. Это означает, что и
JavaScript объект, соответствующий экземпляру блока, пока не создан.<br/>
В файле
[translate.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/010-live-init-on-event/blocks/translate/translate.js)
сказано, что блок нужно инициализировать тогда, когда на его DOM-узле случится
событие `click`.

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

По клику ядро устанавливает для блока модификатор `js_inited` и запускает
"конструктор" — функцию, проассоциированную с этим модификатором.

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

Вложенному элементу `prompt` назначается модификатор `visible` со значением
`true`, что делает его видимым на странице. Также это означает, что из
параметров блока берется перевод — свойство `this.params['prompt']` — и
вставляется внутрь элемента.<br/>
На самом деле текст перевода можно было и раньше вставить в элемент, ведь он не
был виден пользователю. Но для демонстрации того, как получать параметры из
`data-bem`, выбран этот вариант.

Возвращаясь к живой инициализации вы можете увидеть, что на странице со
множеством блоков ядро инициализирует только те, на которых произошло слушаемое
событие. Это экономит память и страница работает быстрее.

В основе лежит
[делегация событий](http://davidwalsh.name/event-delegate). То есть, несмотря на
то, что блоков много, есть всего один обработчик события `click` на объекте
`document`.<br/>
Это не только выгодно с точки зрения производительности, но и добавляет гибкости
для программирования динамически изменяемых страниц. В этом вы можете убедиться
на следующем примере.

## Делегированная инициализация
<pre>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/010_2-delegation/010_2-delegation.html">010_2-delegation.html</a></pre>

В этом примере используется блок `translate` — тот же самый, что и в предыдущем.
Но кроме этого там есть страшный JavaScript. Он срабатывает, если пользователь
нажал на розовую кнопку и динамически вставляет в страницу несколько новых
блоков `translate`. Если после этого вы кликните на некоторые фразы свежей
шутки, то увидите, что эти блоки работают абсолютно так же, как и те, что
присутствовали на странице с самого начала.

Ядро фреймворка `i-bem` слушает события на объекте `document`. Когда
пользователь кликает по блокам, событие поднимается наверх до `document`, и ядро
инициализирует блок, следуя инструкциям в секции `live`.

## Обработчики live событий
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

Следующий пример — [страница со 100 BonBon
кнопками](http://bem.github.io/bem-js-tutorial/pure.bundles/011-live-bind-to/011-live-bind-to.html)
— показывает, что реагировать на live события можно всегда,
а не только при инициализации.

У представленного на странице блока `button` есть live инициализация. Было бы
неразумно инициализировать их все сразу, и на каждом слушать событие click.

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

Также как и в предыдущем примере (где использовался `liveInitOnEvent`), этот код
инициализирует блок и запускает callback модификатора `js_inited`. Но разница
состоит в том, что `liveBindTo` говорит запускать callback не только при
инициализации, а каждый раз когда пользователь кликает по кнопке.

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

## Инициализация по нескольким событиям
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

В предыдущих примерах инициализация блоков проходила по возникновению на них
события  `click`. Но иногда слушать одно-единственное событие недостаточно.
Пример
[012-live-init-many-events](http://bem.github.io/bem-js-tutorial/pure.bundles/012-live-init-many-events/012-live-init-many-events.html)
демонстрирует такой случай на кастомизированном checkbox.

```html
<span
    class="checkbox i-bem"
    data-bem="{'checkbox':{}}">
    <input class="checkbox__control" id="remember1" type="checkbox" value="on">
    <label class="checkbox__label" for="remember1"></label>
</span>
```

Очевидно, что экземпляр блока должен быть инициализирован, когда пользователь
кликает по элементу `label`.

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

Здесь тоже используется метод `liveBindTo`, чтобы не только проинициализировать
блок, но и запускать callback на следующих кликах. Заметьте, что здесь
использован опциональный параметр с именем элемента `label`, т.к. нас интересуют
клики именно на нем.

Кроме того, контрол может быть изменен с клавиатуры (или другим JavaScript), и
это тоже нужно учесть.<br/>
Внутри метода `live` можно поместить столько инструкций по инициализации,
сколько нужно для данного блока. Здесь она случается по клику на элементе
`label` и по событию `change` элемента `control` (это узел `input`).

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

Также блок должен быть проинициализирован, если он оказывается в фокусе и если
фокус уходит из него.

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

Как видно из кода, один и тот же callback можно привязать к нескольким событиям.
Для этого имена событий пишутся через пробел.

После добавления функций callback на модификаторы, программирование блока закончено.

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

Такой подход позволяет описать компонент консистентно. Вне зависимости от того,
как начнет использоваться блок — взаимодействуя с пользователем, или из другого
JavaScript страницы, или реагируя на события в браузере — он будет работать, как
задумано. Получив модификатор `focused`, блок установит фокус на встроенном в
него input. И наоборот — увидев, что встроенный input по каким-то причинам
получил focus, блок установит себе модификатор `focused`, и таким образом
приобретет нужный внешний вид. При изменении блока — и вручную, и автоматически
— блок получит модификатор `checked` и задаст атрибут `checked` встроенному
input или снимет их.

## Почему не :checked?

Как вы могли заметить, в этом примере выделенность встроенного элемента
`control` (input) проверяется при помощи модификатора `checked` соответствующего
блока.

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

Конечно можно было бы воспользоваться псевдо-селектором `:checked`, как это
сделано здесь:
[control prototype](http://codepen.io/bbodine1/pen/novBm).

```css
.checkbox input[type=checkbox]:checked + label {
  left: 54px;
}

.checkbox input[type=checkbox]:checked + label:after {
  background: #00bf00;
}
```

Но использование модификаторов более гибкое, и позволяет всему блоку менять
внешний вид при выделении.

```css
.checkbox_checked
{
    background-image: -webkit-linear-gradient(0deg, #333, #333 4px, #555 4px, #555 6px);
    background-image: linear-gradient(0deg, #333, #333 4px, #555 4px, #555 6px);
    background-size: 6px 6px;
}
```

И, конечно, позволяет экономить на парсинге селекторов, и делает код более
консистентным.

## БЭМ-события

Кроме DOM-событий `i-bem.js` умеет работать с кастомными JavaScript событиями
на объектах, соответствующих блокам. Эти события назваются `БЭМ-события` и
обычно составляют API блока.

Примером порождения таких событий может быть [блок
`link`](https://github.com/bem/bem-components/tree/a37156b9646b97472776b8ce035ca1736dc7257c/common.blocks/link)
библиотеки `bem-components`. На JavaScript-объекте, соответствующем блоку,
возникает кастомное событие `click` в том случае, если пользователь кликает по
ссылке левой кнопкой, и ссылка не является неактивной в данный момент.
Запускается это событие при помощи метода `emit`.

```js
  _onClick : function(e) {
      e.preventDefault();
      this.hasMod('disabled') || this.emit('click');
  }
```

Таким образом, блок `link` получает API, и им может воспользоваться любой другой
блок страницы.

Другим примером может служить
[блок
`menu`](https://github.com/varya/bem-js-tutorial/tree/master/desktop.blocks/menu).
Он представляет список пунктов меню в HTML, один из которых может быть выделен.

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

Блок слушает DOM-события click на своих элементах `item-selector` и запускает
событие `current`, сигнализирующее о смене выделенного пункта меню и дающее
данные о текущем пункте.

```js
this
    .delMod(prev, 'state')
    .emit('current', {
        prev    : prev,
        current : elem
    });
```

Это событие возникает на JavaScript объекте, соответствующем экземпляру блока.
Используя это, другой блок может подписаться на БЭМ-событие `current` блока
`menu`, узнавать об изменении текущего пункта меню и реагировать на это.

## Live инициализация по БЭМ-событию вложенного блока

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

На этом примере вы можете видеть
[блок
`map-marks`](https://github.com/varya/bem-js-tutorial/tree/master/components.bundles/014-live-init-bem-event/blocks/map-marks).
Он связывает вместе блоки меню и карты таким образом, что пользователь, кликающий
по меню, может видеть соответствуюшую точку на карте.

Блок `map-marks` содержит блок `menu` и `map`. Это можно увидеть из
[bemjson описания
страницы](https://github.com/varya/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/014-live-init-bem-event.bemjson.js)
или заглянув в HTML
[014-live-init-bem-event.html](http://bem.github.io/bem-js-tutorial/components.bundles/014-live-init-bem-event/014-live-init-bem-event.html).

Этот блок нужен только при взаимодействии пользователя со страницей. Поэтому
блок использует live-инициализацию, где сказано инициализировать блок только
тогда, когда на вложенном в него блоке `menu` возникнет событие `current`.

JavaScript реализация блока
[map-marks.js](https://github.com/varya/bem-js-tutorial/blob/master/components.bundles/014-live-init-bem-event/blocks/map-marks/map-marks.js)
использует live инициализацию, зависящую от вложенного блока.

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

Методу `liveInitOnBlockInsideEvent` в качестве параметров передаются имя
события, имя блока и callback.

Как только пользователь кликает по какому-нибудь пункту меню, он становится
активным, и на блоке `menu` возникает событие `current`. Событие ловится блоком
`map-marks`, и блок инициализируется. То есть блок приобретает модификатор
`js_inited`, и запускается соответствующий callback:

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

Затем вызывается метод `_showMap` экземпляра блока. Он показывает точку на
карте, обращаясь к блоку `map`.

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
