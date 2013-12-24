# Попробуй БЭМ на вкус!

Эта статья рассказывает о том, как создать проект с использованием БЭМ-технологий.<br/>
Мы шаг за шагом создадим [страничку каталога товаров](http://varya.me/online-shop-dummy/desktop.bundles/index/index.html),
пользуясь принципами БЭМ в CSS, возможностями писать декларативный JavaScript на фреймворке
i-bem.js и с использованием шаблонизатора BEMHTML. Помогать делать всё это будут bem tools,
в частности — инструмент для разработки bem server.

![Онлайн магазин](http://img-fotki.yandex.ru/get/6505/14441195.26/0_6f0b2_557ef428_L.jpg "Онлайн магазин")

## Что такое БЭМ?

Для начала небольшое лирическое отступление для тех, кто не в курсе, что обозначает эта аббревиатура.<br/>
БЭМ расшифровывается как «Блок, Элемент, Модификатор». Это методология разработки web-проектов,
способ удобно делить интерфейс на отдельные штучки, применимый для любой технологии. Кроме того,
БЭМ — это набор инструментов для автоматизации работы. И наконец, БЭМ — это возможность создания
интерфейсных библиотек для быстрой и эффективной разработки.

## Необходимые инструменты
Чтобы пройти по всем шагам этого мануала, вам нужно установить [bem tools](https://github.com/bem/bem-tools).
Это набор инструментов с command line интерфейсом для оперирования БЭМ-сущностями
и сборки проекта. Инструкция по установке есть в описании репозитория.<br/>
На момент написания этой статьи была актуальна версия `0.5.33`.

## Создание собственного репозитория проекта
Проще всего создать свой проект простым копированием существующего репозитория с
подходящей структурой.<br/>
Для проекта с использованием полного стека БЭМ подойдёт репозиторий
[project-stub](https://github.com/bem/project-stub). На момент напиания
статьи использовалась ветка `start-project-stub`.

```js
    $ git clone git://github.com/bem/project-stub.git -b start-project-stub my-pretty-project
    $ cd my-pretty-project/
    $ rm -rf .git
    $ git init
```

Затем проект нужно собрать. Для этого запускается команда

```js
    $ make
```

Это занимает некоторое время, потому что именно в этот момент в директорию
проекта устанавливаются все необходимые npm-пакеты.

Для запуска разработческого сервера запускаем команду:

```js
    $ make server
```

В конце вы увидите следующее сообщение:

   info: Server is listening on port 8080. Point your browser to http://localhost:8080/

На вашем компьютере запустился `bem server` — инструмент для разработки, который
будет автоматически пересобирать ваш проект, если вы внесете в него изменения.

## Внесение изменения в страницы
Сейчас на вашем проекте есть одна страница
[index.html](http://localhost:8080/desktop.bundles/index/index.html), которую вы
можете открыть в браузере.<br/>
Первый запрос к странице будет обрабатываться заметное время, потому что в этот
момент `bem server` подгружает необходмые для её сборки библиотеки.

Структура проекта предполагает, что блоки будут размещены в директории
`desktop.blocks`, а страницы — в директории `desktop.bundles`.<br/>
Вообще, строго говоря, desktop.bundles хранит «набор» блоков. Это могут быть
частоиспользуемые блоки нескольких страниц (то, что обычно называют `common`),
наборы, объединяющие несколько страниц (`all`, если объединены все страницы)
или — самый простой случай — наборы блоков, каждый из которых соответствует одной
странице. Здесь будет рассматриваться последний, простой вариант.

Вы можете отредактировать страницу, меняя файл `desktop.bundles/index/index.bemjson.js`.

### Описание блока в bemjson
Сначала мы разместим на странице Шапку. В терминах БЭМ это блок `head`:

```js
    { block: 'head' }
```

Здесь и далее полный код страницы на разных стадиях можно будет находить на Gist:
https://gist.github.com/4175550

Перезагрузив страницу, вы увидите что в ней появился соответствующий `<div>`.

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="head"></div>
        </body>
    </html>
```

Шапку мы наполним содержанием: форма поиска, логотип и раскладка, располагающая
содержание как нужно.

Сначала в BEMJSON-описании страницы внутрь блока `head` помещаем блок `layout`
с двумя элементами: `left` и `right`.

```js
    content: [
        {
            block: 'head',
            content: {
                block: 'layout',
                content: [
                    {
                        elem: 'left',
                        content: 'left here'
                    },
                    {
                        elem: 'right',
                        content: 'right here'
                    }
                ]
            }
        }
    ]
```

https://gist.github.com/4175573

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="head">
                <div class="layout">
                    <div class="layout__left">left here</div>
                    <div class="layout__right">right here</div>
                </div>
            </div>
        </body>
    </html>
```

Это создаст необходимую разметку (вы можете увидеть её, обновив страницу), к которой
нужно написать стили. То есть реализовать блок `layout` в технологии CSS.

## Создание блока
Для создания файла технологии воспользуемся командой `bem create`.

```js
    $ bem create -l desktop.blocks/ -T css -b layout
```

Команда создаст файл `desktop.blocks/layout/layout.css`, в котором уже есть селектор,
соответствующий файлу блока. Правило нужно дополнить соответственно назначению блока.<br/>
Сейчас можно просто скопировать: https://gist.github.com/4175598

## Использование блоков из библиотек
Вложенные в `layout` блоки поисковой формы и логотипа реализовывать самостоятельно не
нужно. Они уже реализованы в [библиотеке bem-bl](https://gist.github.com/4175598),
достаточно просто задекларировать их на странице. То есть вставить BEMJSON-описание
блока в страницу `desktop.bundles/index/index.bemjson.js`

Для нашей страницы мы воспользуемся блоками
[b-searh](http://bem.github.com/bem-bl/sets/common-desktop/b-search/b-search.ru.html)
и
[b-logo](http://bem.github.com/bem-bl/sets/common-desktop/b-logo/b-logo.ru.html).<br/>
https://gist.github.com/4175640

Картинку для логотипа можно взять [отсюда](http://varya.me/online-shop-dummy/desktop.blocks/b-logo/b-logo.png)
или указать свою.

![Использование блоков из библиотеки](http://img-fotki.yandex.ru/get/4119/14441195.26/0_6f0b9_2d1d77a3_XL.jpg "Использование блоков из библиотеки")

### Доопределение блоков библиотек
#### Доопределение в CSS
Используемый нами блок `b-logo` предоставляет только нужную разметку. CSS для неё
каждый разработчик может написать сам, потому что всем нужна разная разметка.

Эту разметку мы поместим в блок `b-logo` на своём уровне переопределения:

```js
    $ bem create -l desktop.blocks/ -T css -b b-logo
```

Разметку для блока можно взять отсюда: https://gist.github.com/4175675

То же самое для блока `b-search`:

```js
    $ bem create -l desktop.blocks/ -T css -b b-search
```

https://gist.github.com/4195433

![Шапка со стилями](http://img-fotki.yandex.ru/get/5708/14441195.26/0_6f0ba_bb628e4c_XL.jpg "Шапка со стилями")

#### Доопределение BEMHTML
Чтобы сделать страницу центрированной, нужен дополнительный контейнер. Для этого мы
доопределим шаблоны блока `b-page`, создав такой же блок на своём уровне. В качестве
шаблонизатора используется `BEMHTML`.

```js
    $ bem create -l desktop.blocks/ -b b-page -T bemhtml
```

В получившемся файле `desktop.blocks/b-page/b-page.bemhtml` нужно написать код,
оборачивающий контент блока в дополнительный контейнер.

```js
    block b-page, content: {
        elem: 'body-i',
        content: this.ctx.content
    }
```

https://gist.github.com/4175742

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head">
                    <div class="layout">...</div>
                </div>
            </div>
        </body>
    </html>
```

Для получившейся разметки создаются свои CSS-правила:

```js
    $ bem create -l desktop.blocks/ -T css -b b-page
```

Контент для получившегося файла `desktop.blocks/b-page/b-page.css` можно скопировать отсюда:
https://gist.github.com/4175763

А для того, чтобы блок шапки был заметен на странице, я задам ему border:

```js
    $ bem create -l desktop.blocks/ -T css -b head
```

Контент для файла `desktop.blocks/head/head.css`: https://gist.github.com/4175776.

![Шапка с рамкой](http://img-fotki.yandex.ru/get/6505/14441195.26/0_6f0bc_d000a7a2_L.jpg "Шапка с рамкой")

## BEMHTML шаблоны
BEMHTML шаблоны могут не просто определять теги, которым представлен блок, и их
атрибуты, но и генерировать оформительский контент.

Например, давайте разместим на странице список товаров. Он представлен в
BEMJSON-декларации страницы блоком `goods`, и декларация содержит необходимые данные.

```js
    {
        block: 'goods',
        goods: [
            {
                title: 'Apple iPhone 4S 32Gb',
                image: 'http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg',
                price: '259',
                url: '/'
            },
            {
                title: 'Samsung Galaxy Ace S5830',
                image: 'http://mdata.yandex.net/i?path=b0206005907_img_id5777488190397681906.jpg',
                price: '73',
                url: '/'
            },
            ...
    }
```

https://gist.github.com/4176078

Для того, чтобы эти данные превратились в нужную разметку, блок должен быть
реализован в технологии BEMHTML. Для внешнего вида — технология CSS. Поэтому можно
создать блок во всех технологиях, предусмотренных по умолчанию.

```js
    $ bem create -l desktop.blocks -b goods
```

В BEMHTML шаблоне блока `desktop.blocks/goods/goods.bemhtml` нужно написать код,
который превратит JSON с данными в элементы блока. А также, пользуясь модой `tag` указать,
какими DOM-элементами представить блок и его элементы.

```js
    block goods {

        tag: 'ul'

        ...

        elem item, tag: 'li'

        elem title, tag: 'h3'

    }
```

https://gist.github.com/4176118

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head">...</div>
                <ul class="goods">
                    <li class="goods__item">
                        <h3 class="goods__title">Apple iPhone 4S 32Gb</h3>
                        <img class="goods__image" src="http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg"/>
                        <span class="goods__price">259</span>
                    </li>
                    <li class="goods__item">...</li>
                    <li class="goods__item">...</li>
                </ul>
            </div>
        </body>
    </html>
```

Шаблон может создавать не только элементы блока, но и другие блоки. Например, цену
товара можно завернуть в ссылку, используя для этого блок `b-link` из библиотеки `bem-bl`.

```js
    {
        elem: 'price',
        content: {
            block: 'b-link',
            url: item.url,
            content: item.price
        }
    }
```

https://gist.github.com/4176996

Кроме того, для того, чтобы избежать каскада при оформлении этой ссылки стилями,
её можно пометить как элемент блока `goods`.

```js
    {
        block: 'b-link',
        mix: [{ block: 'goods', elem: 'link' }],
        url: item.url,
        content: item.price
    }
```

https://gist.github.com/4177113

```js
    // ...
    <ul class="goods">
        <li class="goods__item">
            <h3 class="goods__title">Apple iPhone 4S 32Gb</h3>
            <img class="goods__image" src="http://mdata.yandex.net/i?path=b1004232748_img_id8368283111385023010.jpg"/>
            <span class="goods__price">
                <a class="b-link goods__link" href="/">259</a>
            </span>
        </li>
        <li class="goods__item">...</li>
        <li class="goods__item">...</li>
    </ul>
```

Также нужно пометить элементы о новых товарах модификатором и добавить выравнивающих элементов.<br/>
https://gist.github.com/4177157

CSS для блока можно скопировать отсюда: https://gist.github.com/4177163<br/>
Создавать блок отдельно в технологии CSS не нужно, потому что он изначально был создан со
всеми необходимыми файлами.

![Список товаров](http://img-fotki.yandex.ru/get/6508/14441195.26/0_6f0c7_e5284b82_L.jpg "Список товаров")

Понадобится и CSS для IE. Он не входит в список технологий по умолчанию.

```js
    $ bem create block -l desktop.blocks/ -T ie.css goods
```

Содержание для получившегося файла `desktop.blocks/goods/goods.ie.css` можно взять на Gist:
https://gist.github.com/4177174

## Зависимости блоков
Помимо декларации нужно гарантировать подключение к странице шаблонов, CSS и
JavaScript блока. Для этого у блока можно описать зависимости, это делается
представлением блока в технологии `deps.js`.

```js
    $ bem create -l desktop.blocks/ -T deps.js -b goods
```

Можно воспользоваться нестрогой зависимостью `shouldDeps`, указав, что нужен блок `b-link`.

```js
    ({
        shouldDeps: [
            { block: 'b-link' }
        ]
    })
```

https://gist.github.com/4177031

## Подключение библиотек
Хочется представить шапку и каждый товар модными прямоугольниками с тенью. Блок для этого я
позаимствую из [библотеки моего друга](https://github.com/john-johnson/j).<br/>
Там есть всего один блок, который называется `box` и делает то, что мне нужно.

Чтобы получить код библиотеки, мне нужно указать её адрес в `./bem/make.js`,
по аналогии с соседними библиотеками.

```js
    getLibraries: function() {

        return {
            'bem-bl': {
                type: 'git',
                url: 'git://github.com/bem/bem-bl.git',
                treeish: '0.3'
            },
            'bemhtml' : {
                type: 'git',
                url: 'git://github.com/bem/bemhtml.git'
            },
            'john-lib' : {
                type: 'git',
                url: 'git://github.com/john-johnson/j.git'
            }
        };

    }
```

https://gist.github.com/4177229

А также указать в настройках бандлов (страниц), что этот уровень нужно использовать
при сборке. Это делается в файле `desktop.bundles/.bem/level.js`.

```js
    exports.getConfig = function() {

        return BEM.util.extend(this.__base() || {}, {
            bundleBuildLevels: this.resolvePaths([
                '../../bem-bl/blocks-common',
                '../../bem-bl/blocks-desktop',
                '../../bemhtml/common.blocks',
                '../../john-lib/blocks/',
                '../../desktop.blocks'
            ])
        });

    };
```

https://gist.github.com/4177250

К сожалению, пока что при изменении конфигурации проекта приходится перезапускать `bem server`.
Текущий процесс придётся прервать и снова набрать команду `make server`.<br/>
В будущих версиях необходимость перезапуска обещают убрать.

## Миксы блоков и элементов
Теперь можно использовать блок `box`. Я могу просто обернуть им мои блоки. Но чтобы
сэкономить разметку, можно смешать на одной DOM-ноде 2 блока. Это называется `mix`.

Один из способов смешения — описать его во входных данных (BEMJSON).<br/>
В данном случае нужно смешать блок `head` с блоком `box`, изменив код страницы.

```js
    {
        block: 'head',
        mix: [ { block: 'box' } ],
        content: ...
    }
```

https://gist.github.com/4177292

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head box">
                    <div class="layout">...</div>
                </div>
                <ul class="goods">...</ul>
            </div>
        </body>
    </html>
```

Не забудьте записать блок `box` в зависимости блока `head`.

```js
    $ bem create -l desktop.blocks/ -T deps.js -b head
```

```js
    ({
        shouldDeps: [
            { block: 'box' }
        ]
    })
```

https://gist.github.com/4235143

![Шапка с блоком box](http://img-fotki.yandex.ru/get/5803/14441195.26/0_6f0c4_4e3f9249_XL.jpg "Шапка с блоком box")

Смешивать можно не только блоки, но и элементы с блоками.<br/>
В шаблоне блока `goods` смешаем каждый элемент `item` с блоком `box`.

```js
    content.push({
        elem: 'item',
        mods: mods,
        mix: [{ block: 'box' }],
        content: ...
```

https://gist.github.com/4177350

```js
    <!DOCTYPE html>
    <html class="i-ua_js_yes i-ua_css_standard">
        <head>...</head>
        <body class="b-page b-page__body">
            <div class="b-page__body-i">
                <div class="head box">
                    <div class="layout">...</div>
                </div>
                <ul class="goods">
                    <li class="goods__item box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__item goods__item_new_yes box">...</li>
                    <li class="goods__item box">...</li>
                    <li class="goods__sizer">...</li>
                    ...
                </ul>
            </div>
        </body>
    </html>
```

![Товары в блоке box](http://img-fotki.yandex.ru/get/6511/14441195.26/0_6f0c5_bcef9ce9_L.jpg "Товары в блоке box")

## Декларативный JavaScript
### Блоки с JavaScript функциональностью
Блок `box`, который появился у меня на проекте благодаря подключенной сторонней библиотеке,
предоставляет также и динамическую JavaScript-функциональность — он умеет сворачиваться.

Для сообщения, что я хочу использовать эту JavaScript-функциональность в шапке, мне нужно
изменить описание блока `head`, указав, что у примешиваемого блока `box` есть JavaScript-реализация:

```js
    mix: [{ block: 'box', js: true }]
```

https://gist.github.com/4202622

Также требуется разместить внутри блока элемент `switcher`:

```js
    content: [
        {
            block: 'layout',
            ...
        },
        {
            block: 'box',
            elem: 'switcher'
        }
    ]
```

https://gist.github.com/4202651

Получается блок со стрелочкой, которая умеет сворачивать и разворачивать его.

![Стрелочка](http://img-fotki.yandex.ru/get/4603/14441195.26/0_6f0c8_b65eea6_L.jpg "Стрелочка")

### Доопределение JavaScript
Мне недостаточно JavaScript-функциональности блока box. Я хочу, чтобы он сворачивался не
только по вертикали, но и по горизонтали. При этом вносить изменения в чужую библиотеку
я не могу. Но благодаря тому, что JavaScript блока написан с использованием
[декларативного фреймворка из блока i-bem](https://github.com/bem/bem-bl/tree/master/blocks-common/i-bem),
у меня есть возможность изменить (переопределить или доопределить) поведение блока на своём уровне.

```js
    bem create -l desktop.blocks -T js -b box
```

В получившемся файле `desktop.blocks/box/box.js` нужно оставить только секцию `onSetMod`,
описывающую реакцию на установку модификаторов.

```js
    onSetMod : {

    }
```

https://gist.github.com/4195865

В данном случае нужно реагировать на установку и снятие модификатора `closed`:

```js
    onSetMod : {

        'closed': {
            'yes': function() {
                // some functionality here
            },
            '': function() {
                // some functionality here
            }
        }

    }
```

https://gist.github.com/4195879

## Создание новых страниц
Страницы — это тоже блоки, на своём уровне переопределения. Поэтому для их
создания тоже можно воспользоваться командой `bem create`:

```js
    $ bem create -l desktop.bundles -b contact
```

Флаг `-T` можно не указывать, потому что bem create благодаря настройкам уровня
`desktop.bundles` знает, что создаваемые на этом уровне блоки должны быть представлены
в технологии BEMJSON. Так, появляется файл `desktop.bundles/contact/contact.bemjson.js`
с минимальным содержимым для страницы.

Новую страницу можно посмотреть по адресу
http://localhost:8080/desktop.bundles/contact/contact.html <br/>
`bem server` соберёт её HTML, JS и CSS файлы в момент первого обращения.

## Выкатка
Всё время, пока мы разрабатывали проект, работал `bem server` и пересобирал те части проекта,
которые нуждаются в изменении при обновлении страниц.

Для выкатки в продакшен тоже нужна сборка проекта, но уже всего проекта целиком, вне зависимости
от того, изменилось что-то или нет. Для этого можно воспользоваться командой `bem make`.<br/>
Рекомендуется запускать локальную для данного проекта версию пакета:

```js
    $ ./node_modules/bem/bin/bem make
```

**Благодарность**<br/>
Автор статьи благодарит [tyv](https://github.com/tyv) и
[gela-d](https://github.com/gela-d) за подготовку разметки сайта.
