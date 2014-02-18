# Туториал по JavaScript в терминах БЭМ

### Ссылки
 * [Содержание](/tutorials/articles/bem-js-tutorial)
 * [Ранее. Структура блока](/tutorials/articles/bem-js-tutorial/01-block-structure)

----------------------------------

## Модификаторы
В БЭМ модификаторы выражают состояние блока. Чтобы привести блок в новое
состояние, ему назначают модификатор. Это запускает соответствующий модификатору
коллбэк.

### Установка модификатора на блок и реакция на это

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

В примере
[002-change-modifier](http://bem.github.io/bem-js-tutorial/pure.bundles/002-change-modifier/002-change-modifier.html)
вы можете увидеть кнопку, меняюшую свое состояние по клику на ней.

Кнопка — это БЭМ блок `call-button`, представленный CSS, JavaScript и шаблонами.
Все эти технологии находятся в
[папке
блока](https://github.com/bem/bem-js-tutorial/tree/master/pure.bundles/002-change-modifier/blocks/call-button).

В JavaScript файле
[blocks/call-button/call-button.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/002-change-modifier/blocks/call-button/call-button.js)
— стандартная декларация для DOM блока.

Коллбэк, соответствующий модификатору `js_inited`, запускается, когда ядро
инициализирует блок. В этом примере все начинается с назначения обработчика для
события `click` на DOM-узле блока. Для этого используется метод `bindTo`.<br/>
А коллбэк устанавливает блоку модификатор `calling` при помощи метода `setMod`.

> ВАЖНО: В большинстве случаев не рекомендуется использовать bindTo для работы
> с событиями, потому что он навешивает обработчик на событие для каждого
> отдельного экземпляра блока. Это особенно ощутимо, если таких блоков на
> странице много. Чуть позже, в описании `live` секции вы найдете
> рекомендованный способ.

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

Обратите внимание, что здесь используется `булев модификатор`, у него нет
значений. Но как вы раньше могли видеть, очень часто модификатор — это пара
«ключ-значение». В таких случаях в метод `setMod` передается и имя, и значение
модификатора:

```js
this.setMod('status', 'on');
...
this.setMod('status', 'off');
```

Метод `setMod` назначает блоку соответствующий модификатору CSS-класс, и блок
меняет свой внешний вид. Если кроме этого нужны ещё какие-то действия, запишите
их в коллбэке на установку модификатора. Например, так:

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

Здесь вы можете производить любые вычисления и совершать любые действия с
блоком. А раз есть доступ к DOM-узлу блока и вложенным в него элементам,
структуру блока тоже можно поменять.<br/>
Для обращения к элементам блока используется метод `elem`, а в качестве
параметра передается имя элемента.

Концепция известных состояний блока, выраженных модификаторами, — это очень
мощный и эффективный способ описания интерфейсных компонент.<br/>
Всё что относится к определенному состоянию блока, инкапсулировано в нужный
модификатор. Откуда бы вы ни изменили модификатор блока, блок знает, что
делать.<br/>
Действия модификаторов описываются декларативно. Это позволяет разработчику
расширить функциональность модификатора при реиспользовании, или полностью ее
переопределить. Ниже в туториале это продемонстрировано.

### Установка модификатора для элемента

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

Согласно БЭМ, модификаторы могут быть не только у блоков, но и у элементов.
Используемые для этого методы похожи.

Посмотрите на следующем примере
[003-element-modifier](http://bem.github.io/bem-js-tutorial/pure.bundles/003-element-modifier/003-element-modifier.html).

Блок `traffic-light` содержит три элемента: `stop`, `slow` и `go`. У каждого из
них может быть модификатор `status` со значениями `on` и `off`.
[traffic-light.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/003-element-modifier/blocks/traffic-light/traffic-light.js).

Также как и в предыдущем примере, блок `traffic-light` объявляется как DOM-блок.

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

Светофор работает, переключая модификатор `status` со значения `stop` на `slow`
и затем на `go`. При инициализации блока устанавливается модификатор
`status_stop`, и это начинает цикл.

Действия модификатора `status` описаны в коллбэке, общем для всех значений. Это
позволяет избежать копипаста в случаях с похожей функциональностью разных
модификаторов.

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

В коллбэк приходят следующие аргументы:

 1. Имя модификатора,
 1. Устанавливаемое значение,
 1. Предыдущее значение.

С использованием этой информации можно действовать по-размному в зависимости от
устнавливаемого значения.

Здесь соответствующему элементу назначается модификатор `status_on` — его фонарь
включается, а предыдущий активный прожектор получает модификатор `status_off`.

Для установки модификаторов на элементы используется уже знакомый метод
`setMod`, но в него передается дополнительный первый параметр — имя
элемента.<br/>

То есть, используя разные параметры, методом `setMod` можно:

```js
// назначить модификатор блоку
this.setMod('modName', 'modValue');

// назначить модификатор элементу блока
this.setMod(this.elem('elemName'), 'modName', 'modValue');
```

Программирование действий, соответствующих модификаторам элементов, похоже на то
же самое для модификаторов блоков. По аналогии с `onSetMod`, можно
воспользоваться свойством `onElemSetMod` со следующим синтаксисом:

```js
DOM.decl('my-block', {
    onElemSetMod: {
        'elemName' : {
          'foo' : function() {
              // Запускается, если элемент получает любое значением
              // модификатора `foo`
          },
          'bar' : {
              'qux' : function() {
                  // Запускается при установке на элементе значения `qux` для
                  // модификатора `bar`
              },
              '' : function() {
                  // Запускается при удаляении модификатора
                  // `bar` с элемента
              }
          }
        }
    }
});
```

В этом примере какая-то функциональность есть только у элемента `go`.

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

Это включает звук светофора, когда элемент переключен в состояние `switched_on`,
и выключает его при назначении модификатора `switched_off`.

### Переключение (toggle) модификатора

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

Если у модификатора 2 значения, и они должны меняться друг за другом, удобно
воспользоваться переключением (toggle). Это показано в примере
[004-toggle-mod](http://bem.github.io/bem-js-tutorial/pure.bundles/004-toggle-mod/004-toggle-mod.html).

На этой странице вы можете видеть кнопку — блок `swicth` с модификатором
`switched_off`, что означает выключенное состояние. Файл
[switch.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/004-toggle-mod/blocks/switch/switch.js)
говорит кнопке слушать события `click` и переключаться из состояния
`swicthed_off` в `switched_on` и обратно при помощи метода `toggleMod`.

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

Конечно, то же самое работает и для элементов, если передать элемент в качестве
первого опционального параметра.

### Удаление модификатора

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

Удаление модификатора с элемента (или блока) проиллюстрировано примером
[005-modifier-removing](http://bem.github.io/bem-js-tutorial/pure.bundles/005-modifier-removing/005-modifier-removing.html).
Это страница с todo-листом, в котором каждое дело показано клейким листочком.
Листочек можно спрятать (пометить как выполненный), кликнув на нем.

Список представлен блоком `todo`, а каждое дело в нем — элементом `task`. По
умолчанию все дела видимы, им назначен модификатор `visible_yes`.

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

Поведение блока описано в файле
[todo.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/005-modifier-removing/blocks/todo/todo.js).

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

Как только пользователь кликает на элемент `task`, его модификатор `visible`
удаляется при помощи метода `delMod`.<br/>
Поскольку первый параметр (объект элемента) — опциональный, этот же метод можно
применять и к блокам.

Обратите внимание, что здесь метод `bindTo` работает не с блоком, а с
элементами.

> Как было сказано выше, метод `bindTo` вешает обработчик на каждый такой
> элемент. Если бы у блока было 100 элементов, он бы назначил 100 обработчиков.
> Кроме того, динамически добавляемые элементы должны тоже получать отдельный
> обработчик. Другой, намного лучший, способ работы с событиями изложен при
> описании секции live. Дочитайте до этого места прежде чем начинать
> разрабатывать сложный блок.

### До установки модификатора

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

Иногда нужно произвести какие-то действия до установки модификатора. Это
особенно применимо, если в результате вычислений оказывается, что установку
модификатора надо предотвратить.

Пример
[006-before-set-mod](http://bem.github.io/bem-js-tutorial/pure.bundles/006-before-set-mod/006-before-set-mod.html)
демонстрирует такой случай на примере блока
[accordion-menu](https://github.com/bem/bem-js-tutorial/tree/master/pure.bundles/006-before-set-mod/blocks/accordion-menu).
Меню на странице состоит из нескольких пунктов, каждый из которых может
раскрываться по клику и открывать доступ к своим подпунктам. Чтобы это
произошло, обработчик события `click` устанавливает активному пункту модификатор
`current` со значением `true` и закрывает ранее открытый пункт (то есть задает
ему модификатор `current` со значением `false`).

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

> Обратите внимание, здесь используется jQuery, а для этого потребовалось
> изменить декларацию модуля. Библиотека bem-core, предоставляющая фреймворк для
> БЭМ-JavaScript, использует модульную систему 
> [ymaps/modules](https://github.com/ymaps/modules). При описании модуля, все
> зависимые модули должны быть явно указаны.

Пример с меню становится более интересным, если у меню могут быть неактивные
(disabled) пункты. Такой пункт меню не может быть в состоянии `current`.
Конечно, всегда можно добавить дополнительную проверку в коллбэк на установку
модификатора, но bem-core предлагает более элегантное решение. По аналогии со
свойствами `onSetMod` и `onElemSetMod` можно воспользоваться свойствами
`beforeSetMod` и `beforeElemSetMod`, чтобы сообщить блоку, что делать до
установки модификатора. А если такой коллбэк возвращает `false`, это
предотвратит установку модификатора.

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
Здесь происходит проверка, активен ли эдемент, и если нет — такой элемент не
может получить модификатор `current`.

---------------------------------------
### Ссылки
 * [Содержание](/tutorials/articles/bem-js-tutorial)
 * [Ранее. Структура блока](/tutorials/articles/bem-js-tutorial/01-block-structure)
 * [Далее. Живая (ленивая)
инициализация](/tutorials/articles/bem-js-tutorial/03-live-initialization)
