# Изоморфный БЭМ

_Оригинал опубликован на [Хабрахабре](http://habrahabr.ru/post/249653/)._

Когда появился node.js, многие web-разработчики стали задумываться о возможности использовать один и тот же код как на клиенте, так и на сервере. Сейчас существует несколько фреймворков, ставящих подход «пишем код один раз, используем везде» во главу угла, время от времени появляются новые. Вот и я не смог пройти мимо, пишу подобный микро-фреймворк — [bnsf](https://github.com/apsavin/bnsf). Он предназначен для тех, кто предпочитает создавать front-end своих приложений по БЭМ-методологии, пользуясь соответствующим набором технологий и инструментов.

Давайте попробуем начать писать front-end для простого одностраничного web-приложения, используя bnsf. Чтобы не отвлекаться на создание back-end части, будем использовать в качестве back-end'a API vk.com. Наше приложение будет состоять всего из двух страниц, главной — с формой поиска пользователей по идентификатору — и вторичной, на ней будем выводить информацию о выбранном пользователе.

Для начала работы вам потребуется node.js, yeoman и gulp. Рекомендую использовать /*nix OS, так как под Windows код не тестировался, хотя, теоретически, работать должен. Я исхожу из предположения, что node.js у вас уже установлен. Если это не так, советую воспользоваться [nvm](https://github.com/creationix/nvm).

Устанавливаем gulp, yeoman и соответствующий генератор:

```
> npm install -g gulp yo generator-bnsf
```

Создаем наш проект:

```
> yo bnsf vk-test-app 
> cd vk-test-app
```

Можно посмотреть, какие файлы и папки сгенерировались:

```
> ls
```

Выведет примерно такой набор файлов (порядок может отличаться на разных операционных системах):

```
README.md   desktop.blocks  gulpfile.js node_modules
bower.json  desktop.bundles libs        package.json
```

Проект уже можно попробовать собрать:

```
> gulp
```

gulp не только соберет проект, но еще и запустит сервер, начнет следить за изменениями в проекте и при необходимости его пересобирать.

Проверим, что все работает. Пробуем открыть в браузере `http://localhost:3000` — мы должны увидеть страницу с текстом page-index и заголовком main page.

Одна страница у нас уже есть, давайте создадим вторую, для вывода записей со стены пользователя. Для этого нам снова понадобится генератор. Поскольку он работает из командной строки, вам понадобится еще одна терминальная сессия, чтобы не прерывать gulp. На этом этапе можно просто согласиться со всем, о чем будет спрашивать yeoman. Он будет предупреждать о конфликтах — это стандартная практика, когда файл не создается новый, а редактируется существующий, так что просто нажимайте «ввод» в ответ на все вопросы yo. Итак, выполним из корня проекта: 

```
> yo bnsf:page user
```

Еще раз напомню, на все вопросы отвечаем согласием — то есть жмем ввод.

gulp должен заметить появление новой страницы и пересобрать проект. Проверяем: запрос на `http://localhost:3000/user` должен отдать страницу с текстом page-user.

Давайте теперь разместим на главной странице форму поиска, отредактировав файл `desktop.blocks/page-index/page-index.bemtree` следующим образом:

```js
block('page-index')(
    content()(function () {
        return [
            {
                block: 'search-form',
                content: [
                    {
                        block: 'input',
                        mods: {
                            theme: 'simple'
                        }
                    },
                    {
                        block: 'button',
                        mods: {
                            type: 'submit',
                            theme: 'simple'
                        },
                        content: 'search'
                    }
                ]
            },
            {
                block: 'search-results'
            }
        ];
    })
);

block('page-index').elem('title').content()('main page');
```

И изменим соответственно зависимости в `page-index.deps.js:

```js
({
    mustDeps: ['i-page'],
    shouldDeps: [
        { elem: 'title' },
        'search-form',
        {
            block: 'input',
            mods: { theme: 'simple' }
        },
        {
            block: 'button',
            mods: { theme: 'simple' }
        },
        'search-results'
    ]
})
```

Сейчас форма уже выводится (можно проверить, снова зайдя на `http://localhost:3000`, только тэг не `form`, а `div`. Чтобы это исправить, создадим соответствующий файл шаблона, `desktop.blocks/search-form/search-form.bemhtml`:

```js
block('search-form').tag()('form');
```

Сейчас может показаться избыточным создавать отдельную директорию с файлом, хранящим всего одну строчку кода. Но в реальном проекте встретить такое практически невозможно: обязательно появляется или файл со стилями, или с JavaScript, или сам шаблон блока более сложен. Зачастую — все вышеперечисленное сразу.

Отлично, у нас есть форма, но она пока не умеет ничего искать. Пусть «искать» с точки зрения формы — это перенаправлять на текущую же страницу с параметром запроса. Чтобы форма начала это делать, понадобится следующий JS в файле `desktop.blocks/search-form/search-form.browser.js`:

```js
/**@module search-form*/
modules.define('search-form', ['i-bem__dom', 'app-navigation'], function (provide, BEMDOM, navigation) {
    "use strict";

    /**
     * @class SearchForm
     * @extends BEM.DOM
     * @exports
     */
    provide(BEMDOM.decl(this.name, /**@lends SearchForm#*/{

        onSetMod: {
            js: {
                /**
                 * @constructs
                 * @this SearchForm
                 */
                inited: function () {
                    this._input = this.findBlockInside('input');
                }
            }
        },

        /**
         * @param {Event} e
         * @private
         */
        _onSubmit: function (e) {
            e.preventDefault();
            var query = this._input.getVal(),
                params = query ? {query: query} : null;
            navigation.navigate('page-index', params);
        }

    }, /**@lends SearchForm*/{
        /**
         * @static
         */
        live: function () {
            var init = { modName: 'js', modVal: 'inited' };
            this
                .liveInitOnBlockInsideEvent(init, 'button')
                .liveInitOnBlockInsideEvent(init, 'input')
                .liveBindTo('submit', function (e) {
                    this._onSubmit(e)
                });
        }
    }));
});
```

Придется также немного усложнить шаблон, добавив в него информацию, что у блока есть логика, файл `desktop.blocks/search-form/search-form.bemhtml`:

```js
block('search-form')(
    tag()('form'),
    js()(true)
);
```

Итак, теперь у нас есть форма, способная менять get-параметр у страницы. В этом можно убедиться, введя, скажем, «1» в текстовый инпут и нажав ввод. Пришло время получать какие-то данные по этому параметру. Я не хочу использовать API, требующее аутентификации, поэтому воспользуюсь методом, доступным кому угодно по url `http://api.vk.com/method/users.get`. Пусть форма принимает идентификатор пользователя, а выводиться будет ссылка на его страницу (на страницу user, которую мы создали выше) и на страницы еще 4-х пользователей с идентификаторами, полученными простым инкрементом. В качестве текста ссылок будем использовать имена пользователей.

Первое, что нам нужно сделать — добавить маршрут в файл с конфигурацией маршрутов API. Это файл `desktop.bundles/index/index.api.routing.yml`, и вот каким должно получиться его содержимое:

```
- host: api.vk.com
  routes:
    - id: users
      path: /method/users.get
```

Второе — Создадим файл `desktop.blocks/search-results/search-results.bemtree`. Основная мысль такова: кому данные надо отображать, тот за ними и ходит. В нашем случае данные нужны блоку search-results, ему за данными и идти:

```js
block('search-results').content()(function () {
    if (!this.route.parameters.query) {
        return '';
    }
    var id = parseInt(this.route.parameters.query, 10);
    return id ? this.get('users', { // отправляем запрос на маршрут сервера API с идентификатором user
        user_ids: [id, id + 1, id + 2, id + 3, id + 4]
    }, function (data) { // в этой функции обрабатываем результаты запроса
        return data.body.response.map(function (dataItem) {
            return {
                block: 'search-results',
                elem: 'item',
                content: {
                    block: 'link',
                    url: path('page-user', { id: dataItem.uid }), // генерируем url по идентификатору маршрута приложения page-user
                    content: dataItem.first_name + ' ' + dataItem.last_name
                }
            };
        });
    }) : 'Something goes wrong';
});
```

В этом шаблоне данных мы смотрим, пришел ли нам id, если пришел — запрашиваем данные по маршруту API с идентификатором user и параметром user_ids, используя метод get. Если id не число — отдаем строку 'Something goes wrong'. Поскольку выводить нужно будет список, а мы любим семантику, создадим `desktop.blocks/search-results/search-results.bemhtml`:

```js
block('search-results')
    .tag()('ul')
    .elem('item').tag()('li');
```

Кроме того, нам понадобится файл для декларации зависимостей блока, `desktop.blocks/search-results/search-results.deps.js`:

```js
({
    shouldDeps: ['link']
})
```

Теперь страница уже умеет искать пользователей и выводить результаты. Попробуйте, только не забудьте обновить страницу. Если введете «1» — в выдаче результатов должны найти Павла Дурова. Только вот беда — перерисовывается каждый раз вся страница целиком. Это легко исправить, научив ее обновлять только необходимое. Дополним `page-index.bemtree`, чтобы он выглядел следующим образом:

```js
block('page-index')(
    content()(function () {
        return [
            {
                block: 'search-form',
                content: [
                    {
                        block: 'input',
                        mods: {
                            theme: 'simple'
                        }
                    },
                    {
                        block: 'button',
                        mods: {
                            type: 'submit',
                            theme: 'simple'
                        },
                        content: 'search'
                    }
                ]
            },
            {
                block: 'search-results'
            }
        ];
    }),
    js()({
        update: 'search-results' // мы добавили конфигурацию для клиентского JavaScript: имя блока, который следует обновлять
    })
);

block('page-index').elem('title').content()('main page');
```

Теперь, открыв инспектор в браузере, можно убедиться, что при новых запросах к API обновляется только блок search-results. 

Ну что же, пришла пора заняться второй страницей, не зря ведь мы ее создавали.

Начнем с `desktop.blocks/page-user/page-user.bemtree`:

```js
block('page-user').content()(function () {
    return [
        {
            block: 'menu',
            content: {
                block: 'link',
                url: path('page-index'),
                content: 'main page'
            }
        },
        {
            block: 'user-card'
        }
    ];
});

block('page-user').elem('title').content()('user');
```

Мы добавили фейковый блок меню — просто как обертку для ссылки на главную страницу, саму ссылку и блок user-card, который будет выводить информацию о пользователе.

Не забываем обновить зависимости в `desktop.blocks/page-user/page-user.deps.js`:

```js
({
    mustDeps: ['i-page'],
    shouldDeps: ['link', 'user-card']
})
```

Я не добавил в зависимости блок menu, потому что не собираюсь его реализовывать.

Чтобы вывести карточку пользователя, создадим файл `desktop.blocks/user-card/user-card.bemtree`:

```js
block('user-card').content()(function () {
    return this.get('users', {
        user_ids: this.route.parameters.id
    }, function (data) {
        return data.body.response.map(function (dataItem) {
            var output = [];
            for (var key in dataItem) {
                if (dataItem.hasOwnProperty(key)) {
                    output.push({
                        elem: 'row',
                        content: [
                            {
                                elem: 'key',
                                content: key
                            },
                            {
                                elem: 'value',
                                content: JSON.stringify(dataItem[key])
                            }
                        ]
                    });
                }
            }
            return output;
        });
    });
});
```

В таком виде уже будет работать. Можно попробовать кликнуть на ссылку в результатах поиска, только не забудьте перед этим обновить страницу, чтобы подтянуть новый код. Но давайте сделаем карточку пользователя таблицей, определив `desktop.blocks/user-card/user-card.bemhtml`:

```js
block('user-card')(
    tag()('table'),
    elem('row').tag()('tr'),
    elem('key').tag()('td'),
    elem('value').tag()('td')
);
```

Вот, так гораздо лучше. 

Думаю, на этом пора закончить, хотя можно было бы еще добавить как минимум валидацию пользовательского ввода, более аккуратные url, показ процесса загрузки, возврат к последнему поиску… Оставлю это на домашнее задание тем, кто заинтересовался. Ну или на следующую статью, если заинтересовавшиеся попросят о таковой.

Полезные ссылки:

[bnsf](https://github.com/apsavin/bnsf) — фреймворк, о котором речь в статье. На самом деле просто библиотека блоков в терминологии БЭМ.

[bem-core](https://github.com/bem/bem-core) — библиотека блоков, от которой зависит bnsf

[bem-components](https://github.com/bem/bem-components) — библиотека блоков, которая используется в проекте, созданном выше

[bem.info](http://bem.info) — сайт про bem с документацией, в частности, там можно почитать про:

[bemtree](http://ru.bem.info/technology/bemtree/v2/bemtree/) — технологию для построения входных данных для шаблонизатора по данным от API и 

[bemhtml](http://ru.bem.info/technology/bemhtml/v2/reference/) — декларативный шаблонизатор

[Статья](http://www.nczonline.net/blog/2013/10/07/node-js-and-the-new-web-front-end/) в тему by Nickolas Zackas. Есть [перевод](http://habrahabr.ru/post/197358/). 
