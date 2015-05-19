# Сайт с нуля на полном стеке БЭМ-технологий

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/0-intro.jpg)

За последний год было множество упоминаний БЭМ в самых разных изданиях. Почему так много людей стали говорить об этой методологии?

БЭМ упрощает разработку сайтов, которые нужно быстро создавать и долго 
поддерживать. Эту технологию используют во фронтенде почти всех сервисов 
Яндекса, и она уже успела обрасти множеством библиотек и инструментов, 
которыми мы хотим с вами поделиться. С обширным арсеналом БЭМ, со всей его 
модульностью и мощью, вам останется «всего-то» придумать идею и реализовать её.

В статье мы расскажем как создать сайт с нуля с использованием готовых библиотек блоков и инструментов для автоматизации сборки. Покажем, как разные инструменты — 
например, [autoprefixer](https://github.com/postcss/autoprefixer), css-препроцессор [Stylus](http://learnboost.github.io/stylus/) или модульная 
система [YModules](https://ru.bem.info/tools/bem/modules/) — упрощают жизнь 
разработчика и создают по-настоящему удобную платформу, если встроить их в 
процесс разработки по БЭМ.

На живом примере мы объясним, в чём польза декларативного подхода, когда одни и те же идеи можно использовать как для CSS, так и для JavaScript. Отдельно остановимся на декларативных шаблонах [BEMHTML](https://ru.bem.info/technology/bemhtml/) и [BEMTREE](https://ru.bem.info/technology/bemtree/), которые позволяют преобразовывать
данные в БЭМ-дерево, описанное в формате [BEMJSON](https://ru.bem.info/technology/bemjson/) и, затем в HTML. Рассмотрим в деталях, как написать серверную часть приложения по БЭМ-методологии.

Мы будем использовать API Twitter'а для создания нашего проекта. 
В результате получим работающий сайт на полном стеке БЭМ-технологий и пошаговое статью-руководство, как все это можно воспроизвести.

Специально для мастер-класса мы написали мини-сервис, который занимается поиском по различным социальным сетям и выводит результат в упорядоченном виде. Мы выложили его на github в репозитории [github.com/bem/sssr](https://github.com/bem/sssr/) — [смотрите](https://sssr.bem.yandex.net/), знакомьтесь.

Подробное описание методологии БЭМ можно найти на [нашем сайте](https://ru.bem.info/method/) и в статьях http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/ и http://www.smashingmagazine.com/2014/07/17/bem-methodology-for-small-projects/.

А мы пойдём по порядку.

### Создание заготовки проекта

Установим все необходимое для работы.

Для начала нам понадобится терминал и система контроля версий `git`. Установить ее можно с сайта [git-scm.com](http://git-scm.com/download/).
Почти все наши инструменты написаны на JavaScript, потому вам понадобится [node.js](https://nodejs.org/download/) или [io.js](https://iojs.org/ru/).

Для создания заготовки нашего проекта используем генератор [generator-bem-stub](https://ru.bem.info/tools/bem/bem-stub/).

```
> npm install -g generator-bem-stub
```

После чего запустим сам генератор:

```
> yo bem-stub
```

Отвечая на вопросы, касающиеся используемых технологий, получим собранную и сконфигурированную для сборки заготовку.

Пройдемся по вопросам:

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/1-sssr-yo-bem-stub.png)

На скриншоте результаты ответов на вопросы. Первые три вопроса очевидны, после начинается интересное:

* `Choose a toolkit to build the project`: (какой сборщик использовать) — мы используем инструмент [ENB](https://ru.bem.info/tools/bem/enb-bem-techs/). Это утилита, которая будет собирать наш проект — склеивать стили, скрипты, шаблоны, компилировать и оптимизировать в соответствии с декларацией страницы, зависимостями блоков и файлами конфигурации.
* `Specify additional libraries if needed`: (хотим ли мы использовать дополнительные библиотеки) – в нашем проекте мы будем использовать библиотеку блоков [bem-components](https://ru.bem.info/libs/bem-components/). В ней есть опциональные стилевые темы.

Пришло время рассмотреть, что такое `уровни переопределения`.

#### Уровень переопределения

Уровень переопределения — это набор реализаций блоков. Проект может иметь несколько уровней, на каждом из которых добавляется или изменяется реализация блоков. Конечная реализация блока собирается со всех уровней последовательно в заданном порядке.

Мы можем доопределять и переопределять стили, шаблоны, JavaScript-реализацию блоков на уровне переопределения своего проекта. При этом, мы ничего не меняем в исходных файлах библиотеки, позволяя сохранять наши изменения в случае её обновления.

Приведём пример, как это выглядит в файловой системе:

```
…
libs/
    bem-components/
        desktop.blocks/
            input/
                input.css
desktop.blocks/
    input/
        input.css
…
```

Создавая блок на уровне `desktop.blocks` нашего проекта, можно доопределить или переопределить нужные нам технологии.

В примере выше мы можем отредактировать стили блока `input`, добавив его реализацию в технологии `CSS`.

Итак, наша заготовка проекта готова. Перейдем в каталог проекта:

```
> cd sssr-tutorial
```

### Вёрстка

Для начала создадим статический прототип нашей страницы. Для описания её структуры воспользуемся технологией [BEMJSON](https://ru.bem.info/technology/bemjson/).

В BEMJSON описывается БЭМ-дерево: порядок и вложенность блоков, названия и состояния БЭМ-сущностей, дополнительные произвольные поля.

Cоберём сгенерированный проект и посмотрим, что получилось. Для удобной работы с локально установленым пакетом `ENB` нужно выполнить следующую команду:

```
> export PATH=./node_modules/.bin:$PATH
```

Или вручную запускать команду `enb` из поддиректории `./node_modules/.bin/`

Для сборки мы воспользуемся командой `enb server`:

```
> enb server
```

Теперь страницу можно открыть по адресу: `http://localhost:8080/desktop.bundles/index/index.html`.
Наш сборщик соберёт все необходимые зависимости, а по ним соберёт файлы нужных блоков и технологий.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/2-sssr-hello-world.png)

Откройте инспектор в браузере и посмотрите на DOM-дерево. Хоть мы ещё не написали ни строчки кода, но на этой странице уже есть сгенерированный HTML. Это потому, что используются шаблоны из наших библиотек. Например, шаблон блока `page` из библиотеки `bem-core` генерирует обвязку страницы (`doctype`, `html`, `head`, `body` и т.д.).

Наш проект содержит файл `index.bemjson.js` в папке `./desktop.bundles/index/`:

```js
({
    block: 'page',
    title: 'Hello, World!',
    styles: [
        { elem: 'css', url: 'index.min.css' }
    ],
    scripts: [
        { elem: 'js', url: 'index.min.js' }
    ],
    content: [
        'Hello, World!'
    ]
}
```

Этот файл представляет собой описание страницы в БЭМ-терминах. Корневой блок в нашем БЭМ-дереве — `page`. У него есть API — дополнительные ключевые слова — `title`, `favicon` и т.д. Шаблоны этого блока находятся в библиотеке [bem-core](https://ru.bem.info/libs/bem-core/v2.5.1/desktop/page/).

Наше приложение состоит из двух основных частей — шапки и содержимого. Добавим в содержимое страницы блок `sssr`, в котором в виде элементов будут описаны части интерфейса. Для этого отредактируем `./desktop.bundles/index/index.bemjson.js`:

```js
({
    block: 'page',
    //…
    content: [
        {
            block: 'sssr',
            content: [
                {
                    elem: 'header'
                },
                {
                    elem: 'content'
                }
            ]
        }
    ]
});
```

В шапке, в свою очередь, будет расположена поисковая форма и название сайта с логотипом:

```js
{
    block: 'sssr',
    content: [
        {
            elem: 'header',
            content: [
                {
                    elem: 'logo',
                    content: 'Social Services Search Robot:'
                },
                {
                    block: 'form',
                    content: [
                        {
                            elem: 'search'
                        },
                        {
                            elem: 'filter',
                            content: '[x] twitter'
                        }
                    ]
                }
            ]
        },
        {
            elem: 'content'
        }
    ]
}
```

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/3-sssr-header.png)

Используем блоки `input`, `button`, `spin` и `checkbox` из библиотеки `bem-components`. В нашем проекте эта библиотека лежит в папке `./libs/bem-components`. У каждого из этих блоков есть свой API, который можно посмотреть [в документации](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/input/)
.

Добавим необходимые блоки в BEMJSON:

```js
{
    block: 'sssr',
    content: [
        {
            elem: 'header',
            content: [
                {
                    elem: 'logo',
                    content: [
                        {
                            block: 'icon',
                            mods: { type: 'sssr' }
                        },
                        'Social Services Search Robot:'
                    ]
                },
                {
                    block: 'form',
                    content: [
                        {
                            elem: 'search',
                            content: [
                                {
                                    block: 'input',
                                    mods: { theme: 'islands', size: 'm', 'has-clear' : true },
                                    name: 'query',
                                    val: '#b_',
                                    placeholder: 'try me, baby!'
                                },
                                {
                                    block: 'button',
                                    mods: { theme: 'islands', size: 'm', type: 'submit' },
                                    text: 'Найти'
                                },
                                {
                                    block: 'spin',
                                    mods: { theme: 'islands', size : 's' }
                                }
                            ]
                        },
                        {
                            elem: 'filter',
                            content: '[] twitter [] instagram'
                        }
                    ]
                }
            ]
        }
    ]
}
```

В этом фрагменте BEMJSON встречается поле `mods`. Оно указывает на используемые модификаторы и их значения. Поле `mods` содержит `ключ: значение` — `mods: { type: 'sssr' }`.

В BEMJSON можно использовать произвольные JavaScript-выражения. Добавим в поле `content` элемента `filter` конструкцию `map` для повторяющихся блоков `checkbox`:

```js
//…
{
    elem: 'filter',
    content: ['twitter', 'instagram'].map(function(service) {
        return {
            block: 'checkbox',
            mods: {
                theme: 'islands',
                size: 'l',
                checked: service === 'twitter'
            },
            name: service,
            text: service
        };
    })
}
//…
```


Полный файл `index.bemjson.js`:

```js
({
    block: 'page',
    title: 'Social Services Search Robot',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'find them all' }},
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    content: {
        block: 'sssr',
        content: [
            {
                elem: 'header',
                content: [
                    {
                        elem: 'logo',
                        content: [
                            {
                                block: 'icon',
                                mods: { type: 'sssr' }
                            },
                            'Social Services Search Robot:'
                        ]
                    },
                    {
                        block: 'form',
                        content: [
                            {
                                elem: 'search',
                                content: [
                                    {
                                        block: 'input',
                                        mods: { theme: 'islands', size: 'm', 'has-clear' : true },
                                        name: 'query',
                                        val: '#b_',
                                        placeholder: 'try me, baby!'
                                    },
                                    {
                                        block: 'button',
                                        mods: { theme: 'islands', size: 'm', type: 'submit' },
                                        text: 'Найти'
                                    },
                                    {
                                        block: 'spin',
                                        mods: { theme: 'islands', size : 's' }
                                    }
                                ]
                            },
                            {
                                elem: 'filter',
                                content: ['twitter', 'instagram'].map(function(service) {
                                    return {
                                        block: 'checkbox',
                                        mods: {
                                            theme: 'islands',
                                            size: 'l',
                                            checked: service === 'twitter'
                                        },
                                        name: service,
                                        text: service
                                    };
                                })
                            }
                        ]
                    }
                ]
            },
            {
                elem: 'content'
            }
        ]
    }
})
```

После того, как мы описали структуру интерфейса, нужно написать и доопределить стили для наших блоков. Все основные стили приезжают к нам с библиотекой `bem-components`. Так что нам нужно дописать совсем немного.

Для написания стилей мы используем CSS-препроцессор [Stylus](https://github.com/LearnBoost/stylus/). Все файлы с расширением `*.styl` будут обработаны препроцессором и склеены в финальный CSS-файл. Также можно использовать расширение `*.css` для стилей, которые не нужно обрабатывать препроцессором.

Напишем стили для блока `form` в файле `./desktop.blocks/form/form.styl`:

```css
.form
{
    display: flex;

    &__search
    {
        margin-right: auto;
    }

    .input
    {
        width: 400px;
    }

    .checkbox
    {
        display: inline-block;

        margin-left: 15px;

        user-select: none;
        vertical-align: top;
    }
}
```

Для блока `page` в файле `./desktop.blocks/page/page.css`:

```css
.page
{
    font-family: Tahoma, sans-serif;

    min-height: 100%;
    margin: 0;
    padding-top: 100px;

    background: #000;
}
```

Для блока `sssr` в файле `./desktop.blocks/sssr/sssr.styl`:

```css
.sssr
{
    &__header
    {
        position: fixed;
        z-index: 1;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 10%;
        background: #f6f6f6;
        box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 10px 20px -5px rgba(0,0,0,.4);

        .button
        {
            margin-left: 10px;
        }
    }

    &__logo
    {
        font-size: 18px;
        margin: 0 0 10px;
    }

    &__content
    {
        padding: 10px 10%;
        column-count: 4;
        column-gap: 15px;
        transition: opacity .20s linear;
    }

    a[rel='nofollow'],
    a[xhref],
    [name][server]
    {
        text-decoration: none;
        color: #038543;
    }
}
```

И для блока `user` — `desktop.blocks/user/user.styl`:

```css
.user
{
    &__name
    {
        display: inline-block;

        margin-right: 10px;

        text-decoration: none;

        color: #000;

        &:hover
        {
            text-decoration: underline;

            color: #038543;
        }
    }

    &__post-time
    {
        font-size: 14px;

        display: inline-block;

        color: #8899a6;
    }

    &__icon
    {
        position: absolute;
        right: 5px;
        bottom: 5px;

        width: 30px;
        height: 30px;

        border-radius: 3px;
    }
}
```

Не будем останавливаться на вопросах CSS-вёрстки очень подробно, пойдём дальше.

Нам осталось добавить блоки с найденными сообщениями. Опишем их в `index.bemjson.js` и для прототипирования воспользуемся возможностями JavaScript.

```js
{
    elem: 'content',
    content: (function() {

        return 'BEM is extermly cool'.split('').map(function() {
            var service = ['twitter', 'instagram'][Math.floor(Math.random()*2)];

            return {
                service: service,
                user: [{
                    login: 'tadatuta',
                    name: 'Vladimir',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_batman.png'
                }, {
                    login: 'dmtry',
                    name: 'Dmitry',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_captain-america.png'
                },  {
                    login: 'sipayrt',
                    name: 'Jack Konstantinov',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_ironman.png'
                }, {
                    login: 'einstein',
                    name: 'Slava',
                    avatar: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_robin.png'
                }][Math.floor(Math.random()*4)],
                time: Math.floor((Math.random()*12)+1) + 'h',
                img: service === 'instagram' ? 'http://bla.jpg' : undefined,
                text: [
                    'Блок — это независимый интерфейсный компонент. Блок может быть простым или составным (содержать другие блоки).',
                    'Элемент — это составная часть блока.',
                    'У блока или элемента может быть несколько модификаторов одновременно.'][Math.floor(Math.random()*3)]
            };
        }).map(function(dataItem) {
            return {
                block: 'island',
                content: [
                    {
                        elem: 'header',
                        content: {
                            block: 'user',
                            content: [
                                {
                                    block: 'link',
                                    mix: { block: 'user', elem: 'name' },
                                    url: 'https://www.yandex.ru',
                                    target: '_blank',
                                    content: dataItem.user.name
                                },
                                {
                                    elem: 'post-time',
                                    content: dataItem.time
                                },
                                {
                                    block: 'image',
                                    mix: { block: 'user', elem: 'icon' },
                                    url: dataItem.user.avatar,
                                    alt: dataItem.user.name
                                }
                            ]
                        }
                    },
                    {
                        elem: 'text',
                        content: dataItem.text
                    },
                    {
                        elem: 'footer',
                        content: [
                            {
                                block: 'service',
                                mods: { type: dataItem.service }
                            }
                        ]
                    }
                ]
            };
        });
    })()
}
```

и добавим стили для блока `island` в файл `./desktop.blocks/island/island.styl`:

```css
.island
{
    font-size: 18px;
    line-height: 140%;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    padding: 15px 5px 5px 15px;
    border-radius: 3px;
    background: #fff;
    box-shadow: inset 0 0 1px rgba(0, 0, 0, .4);

    &__footer
    {
      margin-top: 10px;
    }
    &__image
    {
        display: block;
        width: 100%;
        border-radius: 3px;
    }
}
```

Давайте посмотрим на результат:

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/4-sssr-mock.png)

### Шаблонизатор BEMHTML

#### Декларативная шаблонизация

В Яндексе очень любят декларативность — не только в CSS, но в шаблонах и в JavaScript'е.

Как выглядит декларативность в CSS:

```css
.menu__item { display: inline-block; }
```

Для всех элементов `item` блока `menu` будет применен стиль `display: inline-block;`, т.е. мы декларируем, как должны быть обработаны
наши DOM-узлы, отобранные по условию:

```
условие { правила }
```

Мы отбираем все узлы DOM-дерева, соответствующие условию, и применяем к ним тело шаблона.

Для декларативной шаблонизации в Яндексе написали свой шаблонизатор BEMHTML. Подробнее о его архитектуре можно узнать из
статьи [Шаблонизация данных в bem-core](https://ru.bem.info/technology/bemhtml/current/templating/).

Пример декларативного шаблона на BEMHTML:

```js
block('menu').elem('item').tag()('span');
```

Отбираются все блоки БЭМ-дерева, соответствующие нашим условиям, потом к ним применяется тело шаблона:

```
(условия)(тело шаблона)
```

BEMHTML написан на JavaScript. Его синтаксис — это чистый JavaScript. Можно использовать JavaScript-функции в подпредикатах и теле шаблона.
Для production-режима шаблоны будут скомпилированы в оптимизированный JavaScript.

BEMHTML отвечает за то, как БЭМ-дерево преобразуется в HTML-строку. Входными данными является БЭМ-дерево или его фрагмент, описанный в технологии BEMJSON. На этот BEMJSON накладывается BEMHTML-шаблон. А выходные данные – это HTML-строка.

В общем виде шаблон выглядит следующим образом:

```
match(подпредикат1, подпредикат2, подпредикат3)(тело);
```

Подпредикаты - это условия, при выполнении которых применяется шаблон. Например:

```js
match(this.block === 'link', this._mode === 'tag', this.ctx.url)('a');
```

Этот шаблон проверяет, является ли текущий блок блоком `link`, есть ли в контексте `this.ctx` переменная `url`, и является ли текущая мода модой `tag`. При соблюдении всех этих условий, к блоку будет применен тег `a`.

#### Мода

Мода — это шаг генерации выходного HTML. Каждая мода отвечает за свой кусочек получающегося HTML-кода.
Мода `default` описывает набор и порядок прохождения остальных мод. На этой схеме видно, за что отвечает каждая мода:

![Схема мод при генерации HTML](https://raw.githubusercontent.com/bem/bem-core/v2/common.docs/reference/reference_mode_default.png)

Рекомендуем вдумчиво прочитать документацию по BEMHTML, описанную в [Cправочном руководстве по шаблонизатору BEMHTML](https://ru.bem.info/technology/bemhtml/current/reference/).

Вернемся к нашему проекту.
Нам нужен блок `form`. Он должен отображаться как тег `<form>` и иметь `JavaScript`-реализацию.

Если мы добавим еще один такой блок на страницу, нам придется редактировать эти параметры прямо в BEMJSON-файле.
Это похоже на использование инлайновых стилей в HTML. Давайте все сделаем правильно и вынесем параметры блока в его шаблон:

`./desktop.blocks/form/form.bemhtml`:
```js
block('form')(
    tag()('form'),
    js()(true)
);
```

Теперь мы можем редактировать шаблон блока в одном месте, переносить и реиспользовать этот блок с легкостью.

Посмотрим на DOM-дерево в инспекторе — наш блок `form` теперь выводится как тег `<form>` с классом `i-bem`. Этот класс говорит о том, что у блока есть реализация в JavaScript.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/5-sssr-form-js.png)

Мы описали то, как должны преобразовываться наши БЭМ-блоки в HTML. Теперь давайте рассмотрим, как будут получены и обработаны данные twitter'а

### Архитектура приложения

#### Двухэтапная шаблонизация

Наше приложение будет работать по следующей схеме:

 * На первом этапе собираем данные с сервисов и строим БЭМ-дерево на основе этих данных;
 * На втором — преобразуем БЭМ-дерево (view-ориентированные данные) в DOM-дерево и отдаем HTML на клиентскую сторону.

### BEMTREE

Мы говорили о том, как преобразовать БЭМ-дерево в HTML. Это задача frontend-сервера. А задачей построения БЭМ-дерева и насыщения его данными занимается шаблонизатор BEMTREE. Он совпадает по синтаксису с BEMHTML. Основное отличие — количество доступных стандартных мод. В BEMTREE есть только `default` и `content`.

Входными данными для BEMTREE выступают сырые данные, которыми насыщаются шаблоны блоков. На выходе мы получаем готовый фрагмент БЭМ-дерева, который передадим дальше на BEMHTML-шаблонизацию.

Сразу в бой. Напишем BEMTREE-шаблон для модификатора `{ type: 'twitter' }`, блока `island`:

`desktop.blocks/island/_type/island_type_twitter.bemtree`

```js
block('island').mod('type', 'twitter').content()(function() {
    var data = {
        postLink: '#',
        userName: 'user@name',
        userNick: 'user@nick',
        createdAt: '19 of July',
        avatar: '#avatar',
        text: 'message going here',
        type: 'twitter'
    };
    return [
        {
            elem: 'header',
            content: {
                block: 'user',
                content: [
                    {
                        block: 'link',
                        mods: { theme: 'islands' },
                        mix: { block: 'user', elem: 'name' },
                        url: data.postLink,
                        content: [data.userName, ' @', data.userNick]
                    },
                    {
                        elem: 'post-time',
                        content: data.createdAt.toString()
                    },
                    {
                        block: 'image',
                        mix: { block: 'user', elem: 'icon' },
                        url: data.avatar,
                        alt: data.userName
                    }
                ]
            }
        },
        {
            elem: 'text',
            content: data.text
        },
        {
            elem: 'footer',
            content: [
                {
                    block: 'service',
                    mods: { type: data.type }
                }
            ]
        }
    ];
});
```

В содержимое этого блока мы передаем блок `image` с необходимыми параметрами и примиксовываем элемент `image`
блока `island`.

В дальнейшем мы заменим статический объект на данные, передаваемые на шаблонизацию.
Но сначала посмотрим, каким образом будет организован серверный код, и как будут передаваться эти данные.

### На сервере

Наше приложение будет работать на фреймворке [express](http://expressjs.com) — отдавать HTML в ответ на поисковый
запрос.

Напишем блоки, отвечающие за сбор данных с сервисов. Серверный код мы будем писать в файлы с расширением `*.node.js`,
которые при сборке будут склеиваться в один файл. Его мы и будем запускать с помощью `node.js`.

#### Блок `service_type_twitter`

Для простоты работы с twitter'ом используем модуль [twit](https://github.com/ttezel/twit). Установим его с помощью `npm`:

```
> npm i twit --save
```

Авторизационные данные, необходимые для работы с twitter'ом, мы вынесли в [отдельный файл](https://github.com/bem/sssr/blob/master/desktop.blocks/service/_type/service_type_twitter.config.js). Скопируем его содержимое себе в одноименный файл.

Отредактируем `./desktop.blocks/service/_type/service_type_twitter.node.js`:

```js
var twitter = require('twit'),
    config = require('./service_type_twitter.config'),
    twit = new twitter(config);

var query = '#b_',
    results = [];

twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

    if (err) {
        console.error(err);
        return [];
    }

    results = res.statuses.map(function(status) {
        var user = status.user;
        return {
            avatar: user.profile_image_url,
            userName: user.name,
            userNick: user.screen_name,
            postLink: 'https://twitter.com/' + user.screen_name,
            createdAt:  status.created_at,
            text: status.text,
            type: 'twitter'
        };
    });
    console.log(results);
});
```

Это приложение выполняет поиск по ключевому слову `#b_` и выводит результат в консоль.

Пересоберем наш проект и запустим его с помощью `node.js`

```
> enb make
> node ./desktop.bundles/index/index.node.js
```

Результатом выполнения должен быть список твитов в консоли.

Теперь нам нужно как-то передать результаты выполнения для дальнейшей работы — шаблонизации и передачи на клиент.

Для асинхронной работы с помощью промисов мы используем библиотеку [vow](https://github.com/dfilatov/vow).
Для организации серверного и клиентского JS-кода — модульную систему [YModules](https://ru.bem.info/tools/bem/modules/).

### Модульная система

Библиотека `bem-core` использует модульную систему [ymodules](https://ru.bem.info/tools/bem/modules/).

Она позволяет обернуть код нашего блока в обертку-модуль и вызывать его при необходимости из других модулей.

Отредактируем файл `service_type_twitter.node.js` в соответствии с этими дополнениями:

```js
modules.define('twitter', function(provide) {

var vow = require('vow'),
    moment = require('moment'),
    twitter = require('twit'),
    twitterText = require('twitter-text'),
    config = require('./service_type_twitter.config'),
    twit = new twitter(config);

    provide({
        get: function(query) {
            var dfd = vow.defer();

            twit.get('search/tweets', { q: query, count: 20 }, function(err, res) {

                if(err || !res.statuses) {
                    console.error(err);
                    dfd.resolve([]);
                }

                dfd.resolve(res.statuses.map(function(status) {
                    return {
                        avatar: status.user.profile_image_url,
                        userName: status.user.name,
                        userNick: status.user.screen_name,
                        postLink: 'https://twitter.com/' + status.user.screen_name,
                        createdAt:  moment(status.created_at),
                        text: twitterText.autoLink(twitterText.htmlEscape(status.text)),
                        type: 'twitter'
                    };
                }));
            });

            return dfd.promise();

        }
    });


});
```

Как видите, мы обернули весь код в конструкцию `modules.define`. Это декларация модуля `twitter`, который в дальнейшем будет
доступен в нашем приложении через пространство имен `modules`.

Для асинхронной передачи результата мы возвращаем промис, в который, в зависимости от результатов выполнения запроса,
передаем либо пустой массив, если была ошибка, либо массив с результатами поиска.

Для работы с датами добавим модуль `moment.js`.

Twitter возвращает нам в сообщениях простой текст, поэтому для выделения хэш-тегов и ссылок используем библиотеку `twitter-text`.

Кроме того, как уже говорилось выше, нам понадобится `express`.

Давайте установим эти модули:

```
> npm i vow moment twitter-text express --save
```

#### Блок `server`

За работу серверной части нашего приложения будет отвечать блок `server`. Добавим папку `./desktop.blocks/server/` и
в ней создадим файл `server.node.js`.

Это будет `express`-приложение, которое слушает URL `/search` и отдает данные в соответствии с запросом.

```js
modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    Vow = require('vow');

app.get('/search', function(req, res) {

    var dataEntries = [],
        searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {
            res.end(JSON.stringify(results, null, 4));
        })
        .fail(function() {
            console.error(arguments);
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});
```

Создадим файл `./desktop.blocks/sssr/sssr.deps.js` со следующим содержанием:

```js
({
    shouldDeps: [
        { block: 'server' },
        { block: 'island', mods: { type: ['twitter'] }}
    ]
})
```

Здесь написано, что для работы блоку `sssr` нужны блоки `server` и `island` с модификатором `type: 'twitter'`.

Также добавим модификатор `service_type_twitter` в зависимости блока `server`. Для этого создадим файл `./desktop.blocks/server/server.deps.js`:

```js
({
    shouldDeps: [
        {
            block: 'service',
            mods: { type: ['twitter'] }
        },
        {
            block: 'sssr',
        }
    ]
})
```

Теперь все нужные нам блоки попадут в сборку. Пересоберем проект и запустим сервер:

```
> enb make && node ./desktop.bundles/index/index.node.js
```

По адресу `http://localhost:3000/search?query=%23b_&twitter=on` откроется
страница с JSON-объектом данных, которые отдает блок `service_type_twitter`.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/6-sssr-server-json.png)

Теперь добавим преобразование этих данных в BEMJSON с помощью BEMTREE. Отредактируем `server.node.js`:

```js
modules.require(['twitter'], function(twitter) {

var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    express = require('express'),
    app = express(),
    url = require('url'),
    querystring = require('querystring'),
    moment = require('moment'),
    Vow = require('vow'),
    pathToBundle = PATH.join('.', 'desktop.bundles', 'index');

app.use(express.static(pathToBundle));

var bemtreeTemplate = fs.readFileSync(PATH.join(pathToBundle, 'index.bemtree.js'), 'utf-8');

var context = VM.createContext({
    console: console,
    Vow: Vow
});

VM.runInContext(bemtreeTemplate, context);
var BEMTREE = context.BEMTREE;

app.get('/search', function(req, res) {

    var dataEntries = [],
        searchObj = url.parse(req.url, true).query,
        queryString = querystring.escape(searchObj.query),
        servicesEnabled = [];

    searchObj.twitter && servicesEnabled.push(twitter.get(queryString));

    Vow.all(servicesEnabled)
        .then(function(results) {

            // Склеиваем результаты поиска в один массив,
            // понадобится при добавлении сервисов
            Object.keys(results).map(function(idx) {
                dataEntries = dataEntries.concat(results[idx]);
            });

            // Сортируем ответы по дате
            dataEntries.sort(function(a, b) {
                return b.createdAt.valueOf() - a.createdAt.valueOf();
            });

            // Формируем BEMJSON из ответов с помощью BEMTREE шаблонов
            BEMTREE.apply(dataEntries.map(function(dataEntry) {
                dataEntry.createdAt = moment(dataEntry.createdAt).fromNow();
                return {
                    block: 'island',
                    data: dataEntry,
                    mods: { type: dataEntry.type }
                };
            }))
            .then(function(bemjson) {
                // Возвращаем отформатированный JSON
                res.end(JSON.stringify(bemjson, null, 4));
            });

        })
        .fail(function() {
            console.error(arguments);
        });
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });

});
```

Скомпилированный BEMTREE-шаблон запускается в отдельном пространстве имен, куда прокидывается модуль `vow`,
необходимый для работы шаблонизатора.

После того, как выполнятся все промисы, массив результатов склеивается в плоский список и сортируется по дате.

Затем в `BEMTREE.apply()` передается этот массив, каждый элемент которого преобразуется в объект с полями,
описывающими БЭМ-сущность и данные, которые мы теперь можем использовать в наших BEMTREE-шаблонах.

Отредактируем файл `./desktop.blocks/island/_type/island_type_twitter.bemtree`:

```js
block('island').mod('type', 'twitter').content()(function() {
    var data = this.ctx.data;
    return [
        // и дальше без изменений
    ];
});
```

В `this.ctx.data` лежат данные, которые мы передали в `BEMTREE.apply()`.

Пересоберем проект и снова откроем страницу `http://localhost:3000/search?query=%23b_&twitter=on`. В браузере должен отображаться BEMJSON, сформированный с помощью BEMTREE.

Осталось преобразовать BEMJSON в HTML с помощью `BEMHTML.apply()`. Для этого добавим в server.node.js следующий код:

```js
var BEMHTML = require(PATH.join('../../' + pathToBundle, 'index.bemhtml.js')).BEMHTML;
//…
BEMTREE.apply(dataEntries.map(function(dataEntry) {
    dataEntry.createdAt = moment(dataEntry.createdAt).fromNow();
    return {
        block: 'island',
        data: dataEntry,
        mods: { type: dataEntry.type }
    };
}))
.then(function(bemjson) {
    if (searchObj.json) {
        return res.end(JSON.stringify(bemjson, null, 4));
    }
    res.end(BEMHTML.apply(bemjson));
});
//…
```

Если заново пересобрать проект и обновить нашу страницу в браузере, мы получим HTML, который и будем в дальнейшем использовать на клиенте — подгружать с помощью AJAX.

Если использовать ключ `json=on` — откроется содержимое BEMJSON-файла — `http://localhost:3000/search?query=%23b_&twitter=on&json=on`.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/7-sssr-server-html.png)

### Клиентский JavaScript с `i-bem.js`

Для декларативной работы с JavaScript в Яндексе написали специализированный JavaScript-фреймворк для веб-разработки в рамках БЭМ-методологии – `i-bem.js`. Он является частью `bem-core`.
`i-bem.js` — это реализация блока `i-bem` в технологии `js`. Он позволяет делать другие блоки и использует `jQuery`
для нормализации API браузеров.

О том, что такое i-bem.js и как он работает можно прочитать в подробном [Руководстве пользователя](https://ru.bem.info/technology/i-bem/).

Что мы получаем от использования этого фреймворка:

 * хелперы для работы с предметной областью БЭМ;
 * декларативность;
 * возможность доопределения блоков.

#### Блоки с js-представлением

Блоки бывают как с js-представлением, так и без него. Для того, чтобы указать, что блок имеет js-представление, в BEMHTML используется мода `js`, а в BEMJSON — поле `js`:

```js
// bemhtml
block('form').js()(true);
```

```js
// bemjson
{
    block: 'form',
    js: true
}
```

```js
// bemjson with js params
{
    block: 'form',
    js: {
        p1: 'v1',
        p2: 'v2'
    }
}
```

Поле `js` позволяет использовать как булевы значения, так и объект параметров, которые можно будет использовать при написании js-реализации блока. Наш пример будет отрендерен в подобный HTML:

```html
<div class="form i-bem" data-bem="{form: {p1: 'v1', p2 : 'v2'}}"></div>
```

Класс `i-bem` говорит о том, что на этом узле DOM-дерева есть блок с js-представлением. А в дата-атрибуте `data-bem` передается объект, ключами которого являются имена блоков с js-представлением, а значениями — параметры, передаваемые этим блокам.

### Пишем клиентский `js`

#### Блок `form`

Создадим файл `./desktop.blocks/form/form.js` и опишем минимальную функциональность:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.bindTo('submit', this._onSubmit);
            }
        }
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.emit('submit');
    },

    getVal: function() {
        return this.domElem.serialize();
    }
}));

});
```

В `bem-core` все блоки объявляются как модули. `i-bem` - это ядро фреймворка. `i-bem__dom` - доопределение ядра, отвечающее за работу с DOM браузера.
Мы объявили модуль `form`, в зависимости которого добавили модуль `i-bem__dom`, поскольку блок будет иметь DOM-представление. Этот модуль будет передан в коллбэк как объект `BEMDOM`. С его помощью мы декларируем блок `form`. Своего рода конструктором нашего блока будет служить функция, вызываемая в момент установки модификатора `js` в значение `inited` — он будет установлен автоматически благодаря `i-bem.js`. Кроме того, у нашего блока есть приватный обработчик `_onSubmit`, отвечающий за реакцию на отправку формы, и публичный метод `getVal`, который возвращает результат сериализации формы.

В методе `_onSubmit()` мы вызываем `e.preventDefault()`, чтобы избежать перезагрузки страницы и после этого генерируем БЭМ-событие `submit`, которое в дальнейшем будет использоваться в коде других блоков. Таким образом мы только что создали публичное API блока `form`. Оно состоит из публичного метода и БЭМ-события.

#### Блок `sssr`

Теперь создадим блок, который будет загружать запрашиваемые данные и отображать их на странице.

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.findBlockInside('form').on('submit', this._sendRequest, this);
            }
        }
    },
    _sendRequest: function() {
        $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },
    _onSuccess: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }
}));

});
```

Пройдемся по коду блока. В начале мы объявили модуль `sssr` с зависимостями от `i-bem__dom`,
поскольку блок имеет DOM-представление, и `jquery` для работы с AJAX.

В момент инициализации блока мы подписываемся на событие `submit` блока `form`. При возникновении этого события выполняется приватный метод `_sendRequest`, отправляющий AJAX-запрос. Когда ответ от сервера будет получен, выполнится обработчик `_onSuccess`, который обновит содержимое элемента `sssr__content` полученными результатами.

Остается создать шаблон, который подскажет `i-bem.js`, что у блока `sssr` есть js-представление:

```js
// desktop.blocks/sssr/sssr.bemhtml

block('sssr').js()(true);
```

Итак, мы получили первую, пока очень примитивную и недоработанную версию нашего приложения. Для его запуска нужно собрать файлы с помощью нашего сборщика и запустить файл `index.node.js` из собранного бандла:

```
$ enb make && node ./desktop.bundles/index/index.node.js
```

Теперь мы можем протестировать его работу. Для этого перейдем на страницу `http://localhost:3000/`, введем что-нибудь в поле ввода, отметим нужные чекбоксы и попробуем отправить форму. Если все сделано верно, то под шапкой мы увидим результаты поиска по заданному запросу.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/8-sssr-server-ajax-no-static.png)

Как вы видите у нас не загрузилась статика, потому что для сервера пути до картинок неизвестны. Чтобы это исправить нам нужно зафризить картинки с помощью `borschik`. Для этого добавим файл конфигурации `.borschik` в корень нашего проекта:

```
{
    "freeze_paths": {
        "libs/**": ":base64:",
        "libs/**": ":encodeURIComponent:"
    }
}
```

И запустим сборку в режиме `production`:

```
> YENV=production enb make && node desktop.bundles/index/index.node.js
```

Отрыв страницу в браузере мы можем убедиться что картинки на странице заработали.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/8-sssr-server-ajax-static.png)

### Добавим интерактивности. Блок `spin`

После нажатия на кнопку отправки формы у нас происходит какое-то действие, однако оно незаметно. Создается ощущение, что сервис «завис».
Давайте исправим это и добавим блок `spin`, который будет служить индикатором процесса отправки запроса. Он уже есть в нашей
BEMJSON-декларации. Исходный код блока находится в библиотеке `bem-components` и имеет собственное API. Протестируем его работу из консоли браузера:

```js
modules.require(['jquery'], function($) {
    $('.spin').bem('spin').setMod('visible');
});
```

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/9-sssr-server-spinner-test.png)

Мы выставили булевый модификатор `spin_visible` в значение `true` и должны увидеть вращающийся спинер рядом с полем ввода.

Этот хак допустим для тестирования, но использовать его в `js`-коде блоков не стоит.

Добавим стили для этого блока в файл `./desktop.blocks/sssr/sssr.styl`:

```css
.sssr
{
    .spin
    {
        margin-left: 1em;
        vertical-align: middle;
    }
}
```

Сделаем так, чтобы индикатор загрузки показывался программно. Отредактируем `./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit', this._doRequest, this);
                }
            },
            loading: function(modName, modVal) {
                console.log('visible: ', modVal);
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

        // …

        _doRequest: function() {
            this.setMod('loading');
            this._sendRequest();
        },

        _onSuccess: function(html) {
            this.delMod('loading');
            BEMDOM.update(this.elem('content'), html);
        }
    }))
})
```

На одни и те же модификаторы можно повесить как JS-функциональность, так и CSS-правила стилевого оформления. Давайте сделаем так, чтобы содержимое
страницы затенялось, пока идет загрузка. Для этого отредактируем `./desktop.bundles/sssr/sssr.styl`:

```css
.sssr
{
    .spin
    {
        margin-left: 1em;
        vertical-align: middle;
    }

    &_loading &__content
    {
        opacity: 0.5;
    }
}
```

Протестируем наше приложение: `http://localhost:3000/`. Во время отправки запроса и загрузки данных
должен показываться блок `spin`, а содержимое страницы — затеняться.

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/10-sssr-server-spinner-mod.png)

#### Проверка полей формы

Сейчас, если оставить пустое поле ввода и убрать чекбоксы сервисов, форма все равно отправится. Давайте изменим это поведение и добавим метод `isEmpty()`:

`./desktop.blocks/form/form.js`:

```js
isEmpty: function() {
    return !this.findBlockInside('input').getVal().trim() ||
        this.findBlocksInside('checkbox').every(function(checkbox) {
            return !checkbox.hasMod('checked');
        });
}
```

Мы проверяем значение поля `input` и модификатор `checkbox_checked` и возвращяем результат проверки.

Теперь нужно добавить проверку, которую мы только что написали, в блок `sssr` перед отправкой запроса:

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit', this._doRequest, this);
                }
            },
            loading: function(modName, modVal) {
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

    _doRequest: function() {
        if (this.findBlockInside('form').isEmpty()) {
            return;
        }
        this.setMod('loading');
        this._sendRequest();
    },

    _sendRequest: function() {
        //…

})
```

Мы добавили в `_doRequest()` дополнительную проверку формы на заполненность полей ввода.

Сделаем так, чтобы форма не отправлялась повторно, если запрос уже идет. Для этого перепишем метод `_sendRequest()` и добавим методы `clear()` и `_updateContent()`.

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit', this._doRequest, this);
                }
            },
            loading: function(modName, modVal) {
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

    _doRequest: function() {
        if (this.findBlockInside('form').isEmpty()) {
            return;
        }
        this.setMod('loading');
        this._sendRequest();
    },

    clear: function() {
        this._xhr && this._xhr.abort();
        this._updateContent('');
        this.delMod('loading');
    },

    _sendRequest: function() {
        this._xhr && this._xhr.abort();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }
}));
})
```

#### Автообновление при изменении полей ввода

Давайте сделаем так, чтобы при изменении поискового запроса или чекбоксов, наш сервис сам отправлял запрос и
обновлял содержимое. Для этого отредактируем блок `form` и добавим обработчик события `change` на блоке `input`:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.bindTo('submit', this._onSubmit);
                    this.findBlockInside('input').on('change', this._onChange, this);
                }
            }
        },

        _onChange: function() {
            this.emit('change');
        },

        // …
})
```

Это событие `change` мы будем слушать в блоке `sssr`, для этого отредактируем файл `./desktop.blocks/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit change', this._doRequest, this);
                }
            },
    // …
}));
})
```

Добавим подобный обработчик на изменения чекбоксов, для этого отредактируем файл `./desktop.blocks/form.js`:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.bindTo('submit', this._onSubmit);
                    this.findBlockInside('input').on('change', this._onChange, this);
                    BEMDOM.blocks.checkbox.on(this.domElem, 'change', this._onChange, this);
                }
            }
        },

        // …
})
```

Можно проверить отправку запросов при изменении формы с помощью консоли браузера:

![](https://github.com/bem/bem-method/raw/bem-info-data/articles/bem-full-stack/11-sssr-server-onchange-network.png)

Сейчас при вводе слова мы можем отправить множество лишних запросов после ввода каждого нового символа. Давайте сделаем задержку на отправку запроса. Для этого воспользуемся модулем `debounce` из пакета `bem-core`. Добавим его в зависимости к блоку `sssr` в файле `sssr.deps.js`:

```js
({
    shouldDeps: [
        { block: 'server' },
        { block: 'island', mods: { type: ['twitter'] }},
        {
            block: 'functions',
            elem: 'debounce'
        }
    ]
})
```

И добавим метод-обертку для задержанной отправки запроса. Обратите внимание, что мы добавили `functions__debounce` в зависимости модульной системы и получаем его в виде `debounce`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this.findBlockInside('form').on('submit change', this._doRequest, this);
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },
        loading: function(modName, modVal) {
            this.findBlockInside('spin').setMod('visible', modVal);
        }
    },

    _doRequest: function(e) {
        this.setMod('loading');
        if (this.findBlockInside('form').isEmpty()) {
            this._clear();
            return;
        }
        e.type === 'change' ? this._debounceRequest(): this._sendRequest();
    },

    _clear: function() {
        this._xhr && this._xhr.abort();
        this._updateContent('');
        this.delMod('loading');
    },

    _sendRequest: function() {
        this._xhr && this._xhr.abort();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }

}));

});
```

Открыв страницу приложения в браузере мы можем убедиться, что запросы уходят с задержкой. Это хорошо — мы оптимизировали
код и уменьшили количество запросов к серверу.

### Автообновление

Добавим в наше приложение возможность автообновления по заданному временному интервалу. Будем включать автообновление
с помощью модификатора блока `sssr` и передавать параметры в объекте `params`.

`index.bemjson.js`:

```js
{
    block: 'sssr',
    mods: { autorefresh: true },
    js: {
        url: '/search/',
        refreshInterval: 10000
    },
    // ...
}
```

Добавим необходимые файлы для модификатора блока: `./desktop.blocks/sssr/_autorefresh/sssr_autorefresh.js`:

```js
modules.define('sssr', ['tick'], function(provide, tick, Sssr) {
    provide(Sssr.decl({ modName: 'autorefresh' }, {
        onSetMod: {
            loading: function(modName, modVal) {
                // призовем методы блока
                this.__base.apply(this, arguments);
                // если происходит загрузка — обнуляем,
                // когда загрузка закончится — стартуем таймер
                modVal ? this._clearTimer(): this._setTimer();
            }
        },
        _setTimer: function() {
            this._counter = 0;
            tick.on('tick', this._onTick, this);
        },
        _onTick: function() {
            // проверяем время и отсылаем вовремя запрос
            (++this._counter * 50) % this.params.refreshInterval || this._sendRequest();
        },
        _clearTimer: function() {
            tick.un('tick', this._onTick, this);
        },
        getDefaultParams: function() {
            return {
                refreshInterval: 10000
            };
        }
    }));
});
```

Мы воспользовались `this.__base` для доопределения модификатора `sssr_loading`. Модуль `tick` позволяет нам выполнять нужные действия с заданным интервалом. Один цикл `tick` составляет 50 мс. Проверяя значение модификатора `sssr_loading`, мы либо очищаем таймер, либо устанавливаем его.

Значение `refreshInterval` берется из параметров блока `sssr`, если они указаны. Мы можем указать значения по умолчанию в методе `getDefaultParams`. При отстутствии значения в параметрах блока оно будет браться из объекта, возвращаемого этим методом.

Осталось дописать файл с зависимостями блока `sssr`. Отредактируем `desktop.blocks/sssr/sssr.deps.js`:

```
({
    shouldDeps: [
        'server',
        {
            block: 'functions',
            elem: 'debounce'
        },
        {
            block: 'island',
            mods: { type: ['twitter'] }
        }
    ]
})
```

Давайте протестируем наше приложение. Оно должно обновляться каждые 10 секунд.

### Оптимизация и рефакторинг

### Кэширование поиска блоков

Если наши блоки не заменяются динамически в ходе работы, мы можем закэшировать их в памяти, чтобы не запускать поиск по
блокам каждый раз.

Результат выполнения выражения `this.findBlockInside('form')` можно сохранить в переменную `this._form` и обращаться к ней. Тоже самое можно
сделать и для блока `spin`.

То есть мы закешировали все необходимые блоки момент инициализации блока `sssr` и можем ими пользоваться в дельнейшей работе,
не запуская каждый раз лишние операции поиска.

```js
modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._spin = this.findBlockInside('spin');
                this._form = this.findBlockInside('form')
                    .on('submit change', this._doRequest, this);
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },
        loading: function(modName, modVal) {
            this._spin.setMod('visible', modVal);
        }
    },

    _doRequest: function(e) {
        this.setMod('loading');
        if (this._form.isEmpty()) {
            this._clear();
            return;
        }
        e.type === 'change' ? this._debounceRequest(): this._sendRequest();
    },

    _clear: function() {
        this._abortRequest();
        this._updateContent('');
        this.delMod('loading');
    },

    _abortRequest: function() {
        this._xhr && this._xhr.abort();
    },

    _sendRequest: function() {
        this._abortRequest();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: this.params.url,
            data: this._form.getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(result) {
        BEMDOM.update(this.elem('content'), result);
    }

}));

});
```

Кроме того, мы вынесли повторяющийся код, совершающий отмену запроса, в отдельный метод `_abortRequest()`.

#### Отложенная инициализация

Если на странице находится много блоков, автоматическая их инициализация может привести к увеличению времени загрузки
и объема памяти, которую потребляет браузер.

Вместо этого мы можем воспользоваться инициализацией блоков по событию. Такая инициализация
называется `ленивой` или `live`-инициализацией. Подробное описание ленивой инициализации в [документации по i-bem.js](https://ru.bem.info/libs/bem-core/current/i-bem-js/i-bem-js/#init-live).

В нашем случае нет небоходимости инициализировать блоки `sssr` и `form` сразу, они могут быть проинициализированы по требованию. Давайте выразим это в коде:

`./desktop.blocks/sssr/sssr.js`:

```js
modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                this._form = this.findBlockInside('form');
                this._spin = this.findBlockInside('spin');
                this._debounceRequest = debounce(this._sendRequest, 500, this);
            }
        },

        loading: function(modName, modVal) {
            this._spin.setMod('visible', modVal);
        }
    },

    _clear: function() {
        this._abortRequest();
        this._updateContent('');
        this.delMod('loading');
    },

    _doRequest: function(needDebounce) {
        if (this._form.isEmpty()) {
            this._clear();
            return;
        }
        this.setMod('loading');
        needDebounce? this._debounceRequest() : this._sendRequest();
    },

    _sendRequest: function() {
        this._abortRequest();

        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            url: this.params.url,
            data: this._form.getVal(),
            cache: false,
            success: this._onSuccess.bind(this)
        });
    },

    _abortRequest: function() {
        this._xhr && this._xhr.abort();
    },

    _onSuccess: function(result) {
        this._updateContent(result);
        this.delMod('loading');
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }

}, {

    live: function() {
        this.liveInitOnBlockInsideEvent('submit change', 'form', function(e) {
            this._doRequest(e.type === 'change');
        });
    }

}));

});
```

Добавим `live`-инициализацию к блоку `form`:

`./desktop.blocks/form/form.js`:

```js
modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {

        js: {
            inited: function() {
                this._input = this.findBlockInside('input');
                this._checkboxes = this.findBlocksInside('checkbox');
            }
        }

    },

    // …

    isEmpty: function() {
        return !this._input.getVal().trim() ||
            this._checkboxes.every(function(checkbox) {
                return !checkbox.hasMod('checked');
            });
    }

}, {

    live: function() {
        var ptp = this.prototype;

        this
            .liveBindTo('submit', ptp._onSubmit)
            .liveInitOnBlockInsideEvent('change', 'input', ptp._onChange)
            .liveInitOnBlockInsideEvent('change', 'checkbox', ptp._onChange);
    }

}));

});
```

Закэшировав результаты поиска блоков
`input` и `checkbox`, мы улучшили быстродействие, избавившись от лишних операций `findBlockInside`.


### В результате

Мы собрали поисковый агрегатор по социальным сервисам, используя полный стек БЭМ-технологий. Мы попробовали разобраться
в технологиях от двухэтапной шаблонизации на сервере до клиентского фреймворка `i-bem.js`, познакомились с
шаблонизаторами BEMTREE для построения БЭМ-дерева и BEMHTML для преобразования БЭМ-дерева в HTML.
В репозитории [sssr](https://github.com/bem/sssr/tree/master/desktop.blocks/service/_type) есть примеры реализации блоков service_type_* с использованием API Instagram и Яндекс.Фото.
Надеемся, что эта статья будет для вас полезной и поможет по шагам пройти весь путь написания проекта. Мы постарались сделать ее простой и понятной, чтобы читателю было легче самому разобраться с нашими технологиями и попробовать их в проекте.

Мы с радостью выслушаем ваше мнение о материале и готовы помочь вам там, где вы все еще испытываете трудности.
Комментарии и предложения ждем по электронной почте [info@bem.info](mailto:info@bem.info).
