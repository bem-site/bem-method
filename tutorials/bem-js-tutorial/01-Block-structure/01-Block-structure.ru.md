# Туториал по JavaScript в терминах БЭМ

### Links
 * [Содержание](../00-Intro/00-Intro.ru.md)

----------------------------------

## Блок с JavaScript функциональностью
### Окружение
Для того чтобы начать писать на БЭМ-JavaScript, нужно подключиь к странице блок
`i-bem`, его элемент `dom` и все их зависимости. Это произойдет автоматически,
если полностью повторить в своём проекте структуру из репозитория
[project-stub](https://github.com/bem/project-stub/tree/bem-core).

### HTML структура
JavaScript можно написать для любого БЭМ блока. Для этого сначала нужно поместить
JavaScript файл в директорию блока.

```
├── desktop.blocks/
│   ├── my-block/
│       └── my-block.js
```

Затем в BEMJSON описании страницы нужно пометить блок флагом `js`.

```js
{
    block: 'my-block',
    js: true
}
```

Это даст (после сборки и отработки BEMHTML шаблонов на JSON) DOM узел,
помеченный дополнительным классом `i-bem` и атрибутом `data-bem` с параметрами
блока.

```html
<div class="my-block i-bem" data-bem="{'my-block':{}}">
    ...
</div>
```

Если вы не используете BEMJSON/BEMHTML, научите свои шаблоны производить такие
блоки или просто напишите этот HTML вручную. На таком HTML можно использовать
БЭМ-JavaScript.

Атрибут `data-bem` нужен для хранения параметров блока в JSON. Структура
используется следующая:

```js
{
    "my-block" : {
        "paramName": "paramValue"
    }
}
```

## Простой пример с console.log

<pre>├── pure.bundles/
│   ├── 001-simple-block/
│   │   ├── blocks/
│   │   │   ├── .bem/
│   │   │   └── my-block/
│   │   │       └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/blocks/my-block/my-block.js">my-block.js</a>
│   │   └── <a href="https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/001-simple-block.bemjson.js">001-simple-block.bemjson.js</a>

>> <a href="http://bem.github.io/bem-js-tutorial/pure.bundles/001-simple-block/001-simple-block.html">001-simple-block.html</a></pre>

Первый пример — самый простой. Он показывает структуру блока и работающий
JavaScript.<br/>
Загрузите пример
[001-simple-block](http://bem.github.io/bem-js-tutorial/pure.bundles/001-simple-block/001-simple-block.html)
в браузере с открытой консолью, и вы увидите вывод строки, соответствующей
`outerHTML` блока.

BEMJSON декларация этого примера
[001-simple-block.bemjson.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/001-simple-block.bemjson.js)
описывает простую страницу с одним-единственным блоком `my-block`.

Компонент `my-block` расположен на уровне переопределения
[001-simple-block/blocks](https://github.com/bem/bem-js-tutorial/tree/master/pure.bundles/001-simple-block/blocks/my-block)
и содержит JavaScript файл. Это файл
[my-block.js](https://github.com/bem/bem-js-tutorial/blob/master/pure.bundles/001-simple-block/blocks/my-block/my-block.js),
в нем довольно простой код.

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

Фреймворк `i-bem` использует 
[модульную систему
ymaps/modules](https://github.com/ymaps/modules). Поэтому первой строчкой
указывается, какой модуль использует компонент. В данном случае это модуль
`i-bem__dom`. Его можно найти в JavaScript файле элемента `dom` блока `i-bem`.
[Посмотреть можно
здесь](https://github.com/bem/bem-core/blob/v1/common.blocks/i-bem/__dom/i-bem__dom.js).

Далее внутри вы можете использовать объект `DOM` и его метод `decl` для описания
вашего блока.

Первый параметр — имя блока.<br/>
Второй — хэш динамических свойств блока. Каждый экземпляр блока получает их
копии.

Свойства могут быть какие угодно, но есть несколько специально
зарезервированных. Одно из них — `onSetMod` можно увидеть в следующем примере.
Оно используется для хранения коллбэков, которые нужно позвать, если блоку
назначается соответствующий модификатор. Синтаксис вот такой:

```js
DOM.decl('my-block', {
    onSetMod: {
        'foo' : function() {
            // Вызывается, если блоку назначается любое значение
            // модификатора 'foo'.
            // Работает и для 'булевых' модификаторов
        },
        'bar' : {
            'qux' : function() {
                // Вызывается, если блок приобретает модификатор
                // 'bar' со значением 'qux'
            },
            '' : function() {
                // Вызывается, если модификатор 'bar' удаляется
                // с блока
            },
            '*' : function() {
                // Запускается при назначению блока любого значения
                // модификатора bar
            }
        },
        '*' : function() {
            // Запускается при назначению блоку любого модификатора
        }
    }
});
```

В эти коллбэки приходят следующие параметры:

```js
function(modName, modVal, curModVal) {

    // modName
    // Имя модификатора

    // modVal
    // Значение для устанавливаемого модификатора. Это `String`,
    // или `true`/`false` в случае булевых модификаторов.

    // curModVal
    // Текущее значение модификатора

}
```

Первый модификатор, устанавливаемый на блок — это модификатор `js` со значением
`inited`.
Ядро фреймворка ищет на странице все блоки, промаркированные дополнительным
классом `i-bem`, инициализирует их и назначает каждому модификатор `js_inited`.
Таким образом, вы можете написать код, который запустится в самом начале работы
блока. Такой код нужно поместить в коллбэк, соответствуюший установке
модификатора `js_inited`.

В предыдущем примере это был код, выводящий в консоль `outerHTML` блока.

---------------------------------------
### Links
 * [Содержание](../00-Intro/00-Intro.ru.md)
 * [Далее. Модификаторы](../02-Modifiers/02-Modifiers.ru.md)
