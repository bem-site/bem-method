# Создаем динамический БЭМ-проект

* [Введение](#Введение)
* [Используемые обозначения](#Используемые-обозначения)
* [Используемые технологии](#Используемые-технологии)
* [Приложение Hello, World](#Приложение-hello-world)
  * [Шаблонный репозиторий](#Шаблонный-репозиторий)
  * [Быстрый старт](#Быстрый-старт)
  * [Файловая структура](#Файловая-структура)
* [Приложение Social Services Search Robot](#Приложение-social-services-search-robot)
  * [Схема работы приложения](#Схема-работы-приложения)
  * [Используемые модули Node](#Используемые-модули-node)
  * [Подготовка структуры проекта](#Подготовка-структуры-проекта)
  * [Получение OAuth-токенов](#Получение-oauth-токенов)
  * [Конфигурация приложения](#Конфигурация-приложения)
  * [Работа с Twitter Search API](#Работа-с-twitter-search-api)
  * [Работа с YouTube Data API](#Работа-с-youtube-data-api)
  * [Верстка](#Верстка)

## Введение

Многие современные приложения требуют динамических возможностей, таких как обмен данными в режиме реального времени с последующей частичной или полной перезагрузкой текущей страницы.

Цель документа — показать как разрабатывать динамические проекты по БЭМ, используя [полный стек технологий](#Используемые-технологии).

В документе рассмотрен процесс создания динамического приложения **Social Services Search Robot** (**SSSR**). Оно позволяет искать последние твиты и видео по ключевому слову.

При разработке проекта используется:

* фреймворк [i-bem.js](https://ru.bem.info/platform/i-bem/);
* шаблонизатор [bem-xjst](https://ru.bem.info/platform/bem-xjst/);
* технологию для описания зависимостей [DEPS](https://ru.bem.info/platform/deps/);
* [Express.js](http://expressjs.com);
* [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list);
* [Twitter Search API](https://dev.twitter.com/rest/public/search).

После прочтения вы сможете разрабатывать собственные БЭМ-проекты, ориентированные на динамические данные.

Обратите внимание, что для работы с примерами, описанными в документе, необходимо иметь базовые навыки:

* HTML
* CSS
* JavaScript
* БЭМ

> **Важно!** В документе не рассматриваются вопросы верстки и клиентского JS.

Для работы потребуется установить:

* [Node.js 4+](https://nodejs.org)
* [Git](https://git-scm.com)

> **Важно!** Пользователям операционной системы Windows необходимо дополнительно установить [Git Bash](https://git-for-windows.github.io).

Все примеры программного кода, описанные в документе, проверены в версиях:

* Node.js — 4.7.0.
* npm — 4.5.0.

> **Примечание.** [npm](https://www.npmjs.com) — менеджер пакетов, входящий в состав Node.js.

## Используемые обозначения

В документе приняты следующие условные обозначения:

* ![folder](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__folder.svg) — директория;
* ![file](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__file.svg) — файл;
* ![add folder](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__add-folder.svg) — создать директорию;
* ![add file](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__add-file.svg) — создать файл;
* ![edit file](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__edit-file.svg) — отредактировать файл.

## Используемые технологии

Полный стек технологий БЭМ состоит из:

* [BEMDECL](#bemdecl) — технология для описания деклараций в БЭМ.
* [DEPS](#deps) — технология для описания зависимостей в БЭМ.
* [BEMTREE](#bemtree) — шаблонизатор преобразующий данные в BEMJSON.
* [BEMHTML](#bemhtml) — шаблонизатор преобразующий BEMJSON в HTML.
* [i-bem.js](#i-bemjs) — JavaScript-фреймворк для БЭМ.

> Подробнее о [BEMJSON-формате](https://ru.bem.info/platform/bemjson/) входных данных.

### BEMDECL

Определяет список [БЭМ-сущностей](https://ru.bem.info/methodology/key-concepts/#БЭМ-сущность), используемых на странице.

Такой список в БЭМ называется [декларацией](https://ru.bem.info/methodology/declarations/). Задача декларации — определить, что и в каком порядке подключать в сборку.

Декларации описываются в файлах с расширением `.bemdecl.js`.

Пример декларации из [приложения Hello, World](#Приложение-hello-world):

```js
// Файл `desktop.bundles/index/index.bemdecl.js`
exports.blocks = [
    { name: 'root' }
];  
```

Как видно из примера, в файле `index.bemdecl.js` определен только блок `root`.

При использовании технологии [DEPS](#deps), в декларации определяют БЭМ-сущность, с которой будет начинаться [сборка проекта](https://ru.bem.info/methodology/build/).

Блок `root` следует рассматривать как центральную «точку входа» при работе над проектом. Все остальные БЭМ-сущности попадают в сборку по зависимостям.

Пример сборки проекта по зависимостям:

```files
root(DECL)
|
└──> root(DEPS)
     |
     └──> page(DEPS)
          |
          ├──> header(DEPS)
          |    |
          |    └──> ...
          |
          ├──> body(DEPS)
          |    |
          |    └──> ...
          |
          └──> footer(DEPS)
               |
               └──> ...
```

> Подробнее о [технологии BEMDECL](https://ru.bem.info/methodology/declarations/).

### DEPS

Определяет зависимости между БЭМ-сущностями, которые разнесены по файловой структуре проекта и не отражены в [декларации](#bemdecl).

Зависимости описываются в виде JavaScript-объекта в файлах с расширением `.deps.js`.

Пример зависимостей для блока `root` из [приложения Hello, World](#Приложение-hello-world):

```js
// Файл `common.blocks/root/root.deps.js`
({
    shouldDeps: 'page'
})
```

> Подробнее о [технологии DEPS](https://ru.bem.info/platform/deps/).

### BEMTREE

Является частью шаблонизатора [bem-xjst](https://ru.bem.info/platform/bem-xjst/) и преобразует данные в BEMJSON.

Шаблоны описываются в BEMJSON-формате в файлах с расширением `.bemtree.js`.

Вход и выход шаблонизатора:

![BEMTREE](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__bemtree.svg)

> Подробнее о [технологии BEMTREE](https://ru.bem.info/platform/bem-xjst/).

### BEMHTML

Является частью шаблонизатора [bem-xjst](https://ru.bem.info/platform/bem-xjst/) и преобразует BEMJSON-описание страницы в HTML.

Шаблоны описываются в файлах с расширением `.bemhtml.js`.

Вход и выход шаблонизатора:

![BEMHTML](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__bemhtml.svg)

> Подробнее о [технологии BEMHTML](https://ru.bem.info/platform/bem-xjst/).

### i-bem.js

Клиентский JavaScript-фреймворк для веб-разработки в рамках БЭМ-методологии.

JavaScript-код описывается в файлах с расширением `.js`.

Позволяет:

* разрабатывать веб-интерфейс в терминах блоков, элементов, модификаторов;
* описывать логику работы блока в декларативном стиле — как набор состояний;
* легко интегрировать код JavaScript с BEMHTML-шаблонами и CSS;
* гибко переопределять поведение библиотечных блоков.

> Подробнее о [технологии i-bem.js](https://ru.bem.info/platform/i-bem/).

## Приложение Hello, World

У программистов есть традиция: начинать программирование на новом языке или фреймворке с приложения **Hello, World**. Приложение обычно выводит слова «Hello, World» в выходной поток, демонстрируя тем самым, что оно запускается и может выполнять операции ввода/вывода.

Давайте создадим это приложение, а затем расширим его до желаемого **SSSR**.

Для этого понадобится локальная копия [шаблонного репозитория bem-express](#Шаблонный-репозиторий). Копию можно сделать с помощью Git.

> **Примечание.** Для пользователей OS X или Linux все команды выполняются в терминале. Пользователям Windows потребуется Git Bash. Убедитесь, что Git Bash запущен от имени администратора.

### Шаблонный репозиторий

При решении задач по разработке динамических приложений в рамках БЭМ создан шаблонный репозиторий [bem-express](https://github.com/bem/bem-express). Он содержит необходимый минимум конфигурационных файлов и решает целый класс задач, таких как сборка проекта, настройка линтеров, подключение библиотек и др.

В `bem-express` по умолчанию подключены основные БЭМ-библиотеки:

* [bem-core](https://ru.bem.info/platform/libs/bem-core/);
* [bem-components](https://ru.bem.info/platform/libs/bem-components/).

### Быстрый старт

Чтобы создать приложение **Hello, World**, выполните следующие действия:

1. Склонируйте bem-express:

    ```bash
    git clone https://github.com/bem/bem-express.git sssr-project
    ```

    > **Примечание.** В данном примере используется `bem-express` версии 2.00.

2. Перейдите в директорию проекта:

    ```bash
    cd sssr-project
    ```

3. Удалите историю версионирования исходного репозитория:

    ```bash
    rm -rf .git
    ```

4. Инициализируйте собственный Git-репозиторий:

    ```bash
    git init
    ```

5. Установите зависимости:

    ```bash
    npm install
    ```

    > **Примечание.** Не используйте права суперпользователя `root` при установке npm-зависимостей.

6. Соберите проект и запустите сервер:

    ```bash
    npm run dev
    ```

    > **Примечание.** За сборку проекта отвечает [ENB](https://ru.bem.info/toolbox/enb/).

    При запуске приложения в терминале выведится сообщение о том, что сервер выполняется на порте 3000:

    `Server is listening on 3000`.

    > **Примечание.** Если порт `3000` используется другой программой, его можно переназначить. Например, на `8000`:
    >
    > Способ 1. Изменение значения при запуске приложения.
    >
    > ```bash
    > PORT=8000 npm run dev
    > ```
    >
    > Способ 2. Изменение значения по умолчанию в файле `server/config.js`.
    >
    > ```text
    > defaultPort: 8000
    > ```

    На компьютере запустился:

    * сервер — отвечает за обработку динамических данных;
    * [nodemon](https://github.com/remy/nodemon/) — следит за изменениями в [файловой структуре](https://ru.bem.info/methodology/filestructure/) и перезапускает сервер;
    * [chokidar](https://github.com/paulmillr/chokidar) — следит за изменениями в файлах директорий `*.blocks/` и перестраивает структуру проекта;
    * [livereload](https://github.com/napcs/node-livereload) — обновляет страницу в браузере.

7. Откройте браузер и введите адрес [localhost:3000](http://localhost:3000).

    Должна открыться страница со следующим контентом:

    ```text
    Index page content
    footer content
    ```

    > **Примечание.** Если при запуске приложения в Windows, выводится уведомление от Брандмауэра:
    >
    > 1. Отключите опцию *Общественные сети* (Public Network).
    > 2. Установите опцию *Частные сети* (Private Network).
    > 3. Разрешите доступ.

8. Откройте файл `server/index.js` и внесите следующие изменения (см. комментарии) в код начинающегося строкой `app.get('/', function(req, res)`:

    ```js
    /**
     * Функция обрабатывает все GET-запросы с главной страницы приложения
     * @function
     * @param {object} req - Запрос.
     * @param {object} res - Ответ.
     */
    app.get('/', function(req, res) {
        var hello = 'Hello';                  // Инициализируем переменную `hello`
        var world = 'World';                  // Инициализируем переменную `world`
        render(req, res, {
            view: 'page-index',
            title: 'Main page',
            meta: {
                description: 'Page description',
                og: {
                    url: 'https://site.com',
                    siteName: 'Site name'
                }
            },
            hello: hello,                     // Передаем переменную `hello` в `this.data.hello`
            world: world                      // Передаем переменную `world` в `this.data.world`
        })
    });
    ```

9. Откройте файл `common.blocks/page-index/page-index.bemtree.js` и замените его содержимое на следующее:

    ```js
    block('page-index').content()(function() {
        // Получаем данные из глобального объекта `this`
        var data = this.data;
        // Возвращаем полученные данные: `data.hello: 'Hello'`, `data.world: 'World'`
        return data.hello + ', ' + data.world;
    });
    ```

    После сохранения сервер автоматически перезапустится и контент страницы изменится на:

    ```text
    Hello, World
    footer content
    ```

Приложение **Hello, World** готово.

**Не получилось?**

Если при создании приложения возникли сложности, поищите решение на [форуме](https://ru.bem.info/forum/). Если готового ответа не нашлось, задайте вопрос экспертам.

### Файловая структура

После установки всех зависимостей файловая структура приложения **Hello, World** должна иметь следующий вид:

```files
sssr-project/
    .enb/                 # Конфигурационные файлы для сборщика ENB
    common.blocks/        # Базовые реализации блоков
    desktop.bundles/      # Директории бандлов проекта
    development.blocks/   # Блоки, подключаемые в процессе разработки
    node_modules/         # Установленные модули Node (пакеты)
    server/               # Директория с серверным кодом
    static/               # Корневая директория для раздачи статических файлов
    .bemhint.js           # Конфигурация линтера Bemhint
    .borschik             # Конфигурация сборщика файлов Borschik
    .eslintignore         # Исключение файлов и директорий в ESLint
    .eslintrc             # Конфигурация ESLint
    .gitignore            # Исключение файлов и директорий в Git
    .stylelintrc          # Конфигурация Stylelint
    .travis.yml           # Автоматический запуск линтеров в Continuous Integration
    nodemon.json          # Конфигурация для пакета Nodemon
    package.json          # Описание проекта для npm
    README.md             # Текстовое описание проекта
```

Рассмотрим подробнее некоторые основные директории:

* [.enb](#enb)
* [common.blocks](#commonblocks)
* [desktop.bundles](#desktopbundles)
* [server](#server)
* [static](#static)

#### .enb

Содержит конфигурацию сборщика [ENB](https://ru.bem.info/toolbox/enb/).

Сборка решает следующие задачи:

* Объединяет исходные файлы, разложенные по файловой структуре проекта.
* Подключает в проект только необходимые блоки, элементы и модификаторы.
* Учитывает порядок подключения.
* Обрабатывает код исходных файлов в процессе сборки (например, преобразует LESS-код в CSS-код).

Алгоритм сборки описывается в файле `.enb/make.js`.

> Подробнее о [сборке БЭМ-проектов](https://ru.bem.info/methodology/build/).

#### common.blocks

Содержит реализации всех [БЭМ-сущностей](https://ru.bem.info/methodology/key-concepts/#БЭМ-сущность) проекта.

Имена файлов и директорий соответствуют [соглашению по именованию](https://ru.bem.info/methodology/naming-convention/). Код разделяется на независимые части для удобства работы с отдельными блоками.

```files
common.blocks/
    body/                 # Директория блока `body`
    footer/               # Директория блока `footer`
    header/               # Директория блока `header`
    page/                 # Директория блока `page`
        _view/            # Поддиректория модификатора `page_view`
        page.bemtree.js   # Реализация блока `page` в технологии BEMTREE  
        page.deps.js      # Реализация блока `page` в технологии DEPS
    page-index/           # Директория блока `page-index`
    root/                 # Директория блока `root`
```

Перед отправкой в браузер файлы [собираются](#enb) и оптимизируются.

#### desktop.bundles

Содержит файлы полученные в результате сборки. Такие файлы в БЭМ-методологии называются [бандлами](https://ru.bem.info/methodology/build/).

Одной директории бандла соответствует одна страница проекта:

```files
desktop.bundles/
    index/                # Бандлы для страницы `index`
        index.bemdecl.js  # Декларация для страницы `index`
        index.bemhtml.js  # Бандл страницы `index` в технологии реализации BEMHTML
        index.bemtree.js  # Бандл страницы `index` в технологии реализации BEMTREE
        index.css         # Бандл страницы `index` в технологии реализации CSS
        index.deps.js     # Бандл страницы `index` в технологии реализации DEPS
        index.js          # Бандл страницы `index` в технологии реализации JS
        ...
```

> **Примечание.** Единственным не автоматически сгенерированным файлом в директории `index` является файл `index.bemdecl.js`. Подробнее технология BEMDECL [рассматривается ниже](#bemdecl).

#### server

Содержит модули Node, которые прослушивают веб-запросы и генерируют страницу.

Файловая структрура директории:

```files
server/
    config.js             # Конфигурация приложения
    index.js              # Точка входа приложения
    rebuild.js            # Пересборка приложения
    render.js             # Рендеринг HTML
```

Модули и их назначение:

* `index.js` — модуль инициализации и запуска приложения. Подключает [Express.js](#express) и различные модули, осуществляющие поддержку [middleware](http://expressjs.com/en/resources/middleware.html).
* `config.js` — модуль с конфигурационными данными приложения. Определяет настройку приложения по умолчанию (порт, директория для хранения статических файлов, секретный ключ сессии).
* `rebuild.js` — модуль автоматической пересборки проекта. Следит за изменениями в файлах и директориях (директории: `*.blocks` и `static`), пересобирает и перезапускает проект.
* `render.js` — модуль рендеринга HTML. Получает на вход BEMJSON, достраивает его необходимыми данными и генерирует HTML.

#### static

Содержит статические файлы, предназначенные для внешнего доступа:

```files
static/
    favicon.ico           # Фавиконка
    index.min.css         # Символическая ссылка на `desktop.bundles/index/index.min.css`
    index.min.js          # Символическая ссылка на `desktop.bundles/index/index.min.js`
```

> Подробнее о [символических ссылках](https://ru.wikipedia.org/wiki/Символическая_ссылка).

## Приложение Social Services Search Robot

![Demo](start-with-bem-express__demo.png)

**SSSR** — это сервис для поиска твитов и видео, отвечающих заданному набору параметров. Параметры поиска передаются в [Twitter Search API](https://dev.twitter.com/rest/public/search) и [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list) в виде HTTP-запроса методом GET. Программные интерфейсы формируют ответ в виде [JSON-документа](http://www.json.org).

Цель разработки данного приложения — показать:

* как связать воедино данные и интерфейс;
* какие [технологии](#Технологии) используются и за что отвечают.

На базе этой инфраструктуры (приложения **SSSR**) можно реализовать множество динамических БЭМ-проектов для решения частных задач.

> **Примечание.** Для разработки приложения необходимо установить [некоторые модули Node](#Используемые-модули-node).

### Схема работы приложения

Схематично работу приложения можно представить следующим образом:

![Chart of Social Services Search Robot](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__chart.svg)

#### Шаг 1. Запрос

Пользователь отправляет запрос на сервер.

#### Шаг 2. Получение данных

Приложение обращается за данными к [Twitter Search API](https://dev.twitter.com/rest/public/search) и [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list) в соответствии с полученным от пользователя запросом.

> **Примечание.** Генерация запроса и подготовка полученных данных для дальнейшей шаблонизации подробно рассматриваются ниже.

#### Шаг 3. BEMTREE-шаблонизация

Приложение передает полученные данные [BEMTREE-шаблонизатору](#bemtree), который преобразует данные в BEMJSON.

#### Шаг 4. BEMHTML-шаблонизация

Приложение передает BEMJSON [BEMHTML-шаблонизатору](#bemhtml), который преобразует BEMJSON в HTML.

#### Шаг 5. Отправка результата пользователю

Приложение возвращает результат (HTML-страницу) пользователю.

> **Примечание.** Обновлять можно как всю страницу целиком, так и контент нужного блока.

### Используемые модули Node

Давайте ближе познакомимся с концепцией модуля Node и рассмотрим основные из них, необходимые для работы приложения.

> **Важно!** В разделе не рассматриваются все используемые модули. Подробно с необходимым модулем можно ознакомиться на сайте [npm](https://www.npmjs.com). Здесь можно найти каталог всех модулей Node с поддержкой поиска.

Базовая реализация Node остается настолько простой, насколько это возможно. Вместо того, чтобы встраивать все возможные компоненты прямо в Node, разработчики предоставляют дополнительную функциональность в виде отдельных модулей (пакетов).

Система модулей Node построена по образцу системы [CommonJS](https://en.wikipedia.org/wiki/CommonJS), механизма создания взаимодействующих модулей. Центральное место в системе занимает контракт, который должен выполняться разработчиками, чтобы их модули нормально взаимодействовали с другими.

Все пакеты установленные с помощью менеджера пакетов npm находятся в директории `node_modules`.

Подключение модулей происходит при помощи команды `require`. Если пакет установлен с использованием npm, указывать путь не нужно. Достаточно указать имя:

```js
var express = require('express');
```

При подключении собственного локального модуля, необходимо указать к нему путь:

```js
var someModule = require('./somefolder/somemodule');
```

Важной особенностью любого модуля является то, что он должен быть рассчитан на взаимодействие с Node. Для этого модуль нужно экспортировать с помощью `module.exports`:

```js
module.exports = {
    // some module
};
```

Для работы приложения потребуются следующие модули:

* [express](#express)
* [passport](#passport)
* [passport-youtube-v3](#passport-youtube-v3)
* [twitter](#twitter)
* [googleapis](#googleapis)
* [moment](#moment)

> **Примечание.** Установить необходимые модули можно одной командой:
>
> ```bash
> npm install express passport passport-youtube-v3 twitter googleapis moment --save
> ```

#### express

Предоставляет большую часть функциональности, необходимой разработчику для построения веб-приложения.

Установка:

```bash
npm install express --save
```

В документации Express представлено минимальное приложение «[Hello World Express](http://expressjs.com/en/starter/hello-world.html)». Оно демонстрирует основную последовательность действий:

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

#### passport

Предоставляет [различные стратегии](http://passportjs.org) аутентификации в приложениях на Node.js.

Установка:

```bash
npm install passport --save
```

Пример авторизации по протоколу OAuth 2.0:

```js
var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * Функция монтирует необходимую стратегию авторизации
 * @function
 * @param {string} provider — Например, facebook, twitter, google, ...
 * @param {object} strategy — Стратегия авторизации
 */
passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: SERVICE_APP_ID,
    clientSecret: SERVICE_APP_SECRET,
    callbackURL: 'https://www.example.com/auth/provider/callback'
}));
```

> **Примечание.** [OAuth 2.0](https://oauth.net/2/) — открытый протокол авторизации, который позволяет предоставить третьей стороне ограниченный доступ к защищенным ресурсам пользователя без необходимости передавать ей (третьей стороне) логин и пароль.

#### passport-youtube-v3

Предоставляет механизм аутентификации на Youtube посредством аккаунта Youtube и токенов [OAuth 2.0](https://oauth.net/2/).

Установка:

```bash
npm install passport-youtube-v3 --save
```

**Пример**

```js
var passport = require('passport'),
    YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
/**
 * Функция монтирует стратегию YoutubeV3Strategy
 * @function
 * @param {object} strategy — Стратегия
 */
passport.use(new YoutubeV3Strategy({
    clientID: YOUTUBE_APP_ID,
    clientSecret: YOUTUBE_APP_SECRET,
    callbackURL: '/auth/youtube/callback',
    scope: ['https://www.googleapis.com/auth/youtube.readonly']
}, verify));
```

> Подробнее о [том как получить OAuth-токены](#Получение-oauth-токенов).

#### twitter

Клиентская [библиотека](https://www.npmjs.com/package/twitter) для работы с [Twitter REST API](https://dev.twitter.com/rest/public).

Установка:

```bash
npm install twitter --save
```

**Пример**

```js
var Twitter = require('twitter');
// Создаем экземпляр объекта Twitter
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  bearer_token: ''
});

var params = {q: 'bem'};
/**
 * Функция поиска. Ищет твиты по заданным параметрам.
 * @function
 * @param {object} params - Параметры поиска.
 * @param {function} callback - Получает найденные твиты.
 */
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
```

#### googleapis

Клиентская [библиотека](http://google.github.io/google-api-nodejs-client/) для работы с [Google REST API](https://developers.google.com/apis-explorer/#p/).

Установка:

```bash
npm install googleapis --save
```

**Пример**

```js
var google = require('googleapis'),
    OAuth2 = google.auth.OAuth2;
// Создаем экземпляр объекта OAuth2
var oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);
// Устанавливаем учетные данные для исходящих вызовов
oauth2Client.setCredentials({
  access_token: 'ACCESS TOKEN HERE',
  refresh_token: 'REFRESH TOKEN HERE'
});
// Логинимся
var youtube = google.youtube({
    version: 'v3',
    auth: this.oauth2Client
});

var params = {q: 'bem'};
/**
 * Функция поиска. Ищет видео по заданным параметрам.
 * @function
 * @param {object} params - Параметры поиска.
 * @param {function} callback - Получает найденные видеоролики.
 */
youtube.search.list(params, function(error, video, response) {
  if (!error) {
    console.log(video);
  }
});
```

#### moment

JavaScript [библиотека](http://momentjs.com) для синтаксического анализа, валидации и форматирования дат.

Установка:

```bash
npm install moment --save
```

**Пример**

```js
var moment = require('moment');

moment().startOf('day').fromNow();             // 17 часов назад
```

### Подготовка структуры проекта

Прежде чем начать писать код, необходимо немного изменить структуру взятого за основу приложения **Hello, World**.

Изменения для:

* [статических файлов](#Изменения-для-статических-файлов);
* [серверного кода](#Изменения-для-серверного-кода).

#### Изменения для статических файлов

![static](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__static-changes.svg)

**Директория `static`**

* Создайте поддиректорию `images`.

* Перенесите фавиконку в поддиректорию `images`.

**Директория `common.blocks`**

* Отредактируйте файл `root/root.bemtree.js`.

  Измените:

  ```text
  favicon: '/favicon.ico'
  ```

  На:

  ```text
  favicon: '/images/favicon.ico'
  ```

  [Полный код root.bemtree.js](https://gist.github.com/godfreyd/fba71361207a95134982579c13b0050d).

**Директория `server`**

* Отредактируйте файл `index.js`.

  Измените:

  ```text
  .use(favicon(path.join(staticFolder, 'favicon.ico')))
  ```

  На:

  ```text
  .use(favicon(path.join(staticFolder, '/images/favicon.ico')))
  ```

  [Полный код index.js](https://gist.github.com/godfreyd/fdc6e2d7f1f42deac4dcfc0dde36bd11).

В результате выполненных действий файловая структура директории `static` должна иметь следующий вид:

```files
static/
    images/
        favicon.ico
index.min.css
index.min.js
```

#### Изменения для серверного кода

![server-changes](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__server-changes.svg)

**Директория `server`**

* Создайте поддиректории:

  * `controllers` — контроллеры;
  * `helpers` — хелперы;
  * `middleware` — модули промежуточного звена.

* Создайте пустые `JS`-файлы для будущих модулей:

  * `app.js` — модуль монтирования промежуточных модулей (делает их доступными в приложении);
  * `auth.js` — модуль аутентификации на YouTube;
  * `routes.js` — модуль маршрутизации веб-запросов.

* Добавьте [следующий код](https://gist.github.com/godfreyd/a584cee1191833afae70fc059ba1f200) в файл `app.js`.

* Добавьте [следующий код](https://gist.github.com/godfreyd/f6de1c33a83dda708a0e3ba9312f0c78) в файл `routes.js`.

* Измените расширение файла `config`:

  `config.js` —> `config.json`

* Отредактируйте файл `config.json`.

  Измените:

  ```js
  module.exports = {
      staticFolder: 'static',
      defaultPort: 3000,
      cacheTTL: 30000,
      sessionSecret: 'REPLACE_ME_WITH_RANDOM_STRING'
  };
  ```

  На:

  ```json
  {
    "staticFolder": "static",
    "defaultPort": 3000,
    "cacheTTL": 30000,
    "sessionSecret": "REPLACE_ME_WITH_RANDOM_STRING"
  }
  ```

* Измените весь текущий контент файла `index.js` на [следующий](https://gist.github.com/godfreyd/37d903c73f863619e2e1be1cd946d4c3).

  > **Примечание.** В `index.js` остается только функциональность, отвечающая за запуск приложения и прослушивание запросов на порте.

**Директория `controllers`**

* Создайте пустой `JS`-файл:

  * `index.js` — контроллер обработки запросов и рендеринга HTML.

* Добавьте [следующий код](https://gist.github.com/godfreyd/4bda7da3db029890378e15bcc38f32de) в файл `index.js`.

**Директория `helpers`**

* Создайте пустые `JS`-файлы:

  * `index.js` — входная точка для хелперов;
  * `twitter.js` — модуль-хелпер для работы с Twitter Search API;
  * `youtube.js` — модуль-хелпер для работы с YouTube Data API.

**Директория `middleware`**

* Создайте пустой `JS`-файл:

  * `auth.js` — модуль проверки прохождения аутентификации на YouTube.

В результате выполненных действий файловая структура директории `server` должна иметь следующий вид:

```files
server/
    controllers/
        index.js          # Контроллер обработки запросов и рендеринга HTML
    helpers/
        index.js          # Входная точка для модулей-хелперов (пустой)
        twitter.js        # Модуль-хелпер для работы с Twitter Search API (пустой)
        youtube.js        # Модуль-хелпер для работы с YouTube Data API (пустой)
    middleware/
        auth.js           # Модуль проверки прохождения аутентификации на YouTube (пустой)
    app.js                # Модуль монтирования промежуточных модулей
    auth.js               # Модуль аутентификации на YouTube (пустой)
    config.json           # Конфигурация приложения
    index.js              # Запуск приложения и прослушивание запросов на порте
    rebuild.js            # Модуль отслеживания изменений и перезапуска сервера
    render.js             # Рендеринг HTML
    routes.js             # Маршрутизатор
```

### Получение OAuth-токенов

Сервисы Twitter и Google хранят различные данные пользователей — твиты, видео на Youtube, письма в Почте, фотографии и так далее. Чтобы обеспечить удобный доступ к этим данным из других приложений или сторонних сервисов, они используют открытый протокол авторизации [OAuth 2.0](https://oauth.net).

Согласно протоколу, разработчик регистрирует приложение на OAuth-сервере и запрашивает доступ к определенным данным. Авторизованный пользователь разрешает или запрещает его.

#### Получение OAuth-токена для Twitter

Twitter предлагает приложениям возможность выдавать аутентифицированные запросы от имени самого приложения.

**С чего начать?**

1. Изучите [документацию](https://dev.twitter.com/oauth).
2. Зарегистрируйте [приложение](https://apps.twitter.com) и получите ключи (Consumer Key, Consumer Secret).
3. Установите [Postman](https://www.getpostman.com) любым удобным для вас способом.
4. [Закодируйте строку](#codestring) `Consumer Key:Consumer Secret` методом [Base64](https://en.wikipedia.org/wiki/Base64).
5. [Получите OAuth-токен](#gettoken) в обмен на код.
6. Используйте полученные токен и ключи в запросах к Twitter Search API.

  > **Примечание.** Postman необходим для получения OAuth-токена с помощью POST-запроса в обмен на код, полученный методом Base64.

<a name="codestring"></a>
**Как закодировать строку?**

Чтобы закодировать строку методом Base64:

1. Сформируйте строку вида: `Consumer Key:Consumer Secret`.

    **Пример**

    `xvz1evFS4wEEPTGEFPHBog:L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg`

    > **Примечание.** Получить ключи Consumer Key и Consumer Secret можно, перейдя на вкладку **Keys and Access Tokens** [вашего приложения](https://apps.twitter.com).

2. Запустите терминал или Git Bash.
4. Выполните команду `echo -n "xvz1evFS4wEEPTGEFPHBog:L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg" | base64`.
5. Скопируйте полученный код.

    **Пример**

    `eHZ6MWV2RlM0d0VFUFRHRUZQSEdFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==`

> **Примечание.** Если возникли сложности, воспользуйтесь онлайн-ресурсом [base64encode.org](https://www.base64encode.org).

<a name="gettoken"></a>
**Как получить OAuth-токен в обмен на код?**

Чтобы получить токен в обмен на код:

1. Запустите Postman.

    > **Примечание.** По умолчанию открывается вкладка, в которой необходимо сформировать POST-запрос к OAuth-серверу Twitter.

2. Выберите тип запроса **POST**.
3. Введите адрес сервера `https://api.twitter.com/oauth2/token`.
4. Перейдите на вкладку **Headers**.
5. Введите в поле **Key** заголовок `Authorization` со значением (поле **Value**) `Basic <закодированная строка Consumer Key:Consumer Secret>`.

    **Пример**

    `Authorization: Basic eHZ6MWV2RlM0d0VFUFRHRUZQSEdFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==`

    > **Примечание.** Basic указывает на базовый метод авторизации.

6. Введите второй заголовок `Content-Type` со значением `application/x-www-form-urlencoded;charset=UTF-8`.

    **Пример**

    `Content-Type: application/x-www-form-urlencoded;charset=UTF-8`

7. Перейдите на вкладку **Body**.
8. Выберите опцию `x-www-form-urlencoded`.
9. Введите в поле **Key** тело запроса `grant_type` со значением `client_credentials`.
10. Нажмите кнопку **Send**.

    OAuth-сервер вернет токен в JSON-формате:

    ```json
    {
      "token_type": "bearer",
      "access_token": "AAAAAAAAAAAAAAAAAAAAAA%2FAAAAAAAAAA%3DAAAAAAAAAAAAAAAAAA"
    }
    ```

    > **Важно!** Сохраните полученные токен и ключи (Consumer Key и Consumer Secret). Они необходимы для [конфигурационного файла](#Конфигурация-приложения) приложения.

#### Получение OAuth-токена для Google

Google предлагает приложениям возможность выдавать аутентифицированные запросы от имени самого приложения.

> **Примечание.** За получение и обновление OAuth-токена с помощью POST-запроса в обмен на код авторизации отвечает модуль [passport-youtube-v3](#passport-youtube-v3).

**С чего начать?**

1. Изучите [документацию](https://developers.google.com/youtube/v3/docs/search/list).
2. Зарегистрируйте [приложение](https://console.developers.google.com/) и получите Client ID и Client Secret.
3. Укажите callback URL (в нашем случае это `http://localhost:3000`) в учетной записи вашего приложения.
4. Используйте полученные Client ID и Client Secret в запросах к YouTube Data API.

> **Важно!** Сохраните полученные ключи (Client ID и Client Secret). Они необходимы для [конфигурационного файла](#Конфигурация-приложения) приложения.

### Конфигурация приложения

После того как все ключи и токены получены, их необходимо добавить в конфигурационный файл приложения:

* Добавьте в файл `server/config.json` поле `services`.

  ```json
  "services": {
    "twitter": {
      "consumer_key": "",
      "consumer_secret": "",
      "bearer_token": ""
    },
    "youtube": {
      "client_id": "",
      "client_secret": "",
      "redirect_url": "http://localhost:3000"
    }
  }
  ```

  [Полный код config.json](https://gist.github.com/godfreyd/3697d1ba5fe5ac298a9b471fe943340f).

* Заполните одноименные поля [полученными данными](#Получение-oauth-токенов).
* Скройте файл `server/config.json` от системы контроля версий Git, чтобы случайно не добавить личные ключи в репозиторий файлов.

  ```bash
  # файл .gitignore
  server/config.json
  ```

  [Полный код .gitignore](https://gist.github.com/godfreyd/71a35fde50f54205fa395230bc97358f).

### Работа с Twitter Search API

[Twitter Search API](https://dev.twitter.com/rest/public/search) позволяет найти последние или популярные твиты, опубликованные на сайте Twitter.com за последние 7 дней.

Подробнее:

* [Доступ к API](#Доступ-к-api)
* [Вызов API](#Вызов-api)

#### Доступ к API

Для успешного вызова API необходимы:

* URL, составленный согласно требованиям к нужному запросу.
* [OAuth-токен](#Получение-oauth-токена-для-twitter), выданный вашему приложению для доступа к API.
* Модуль [twitter](#twitter).

#### Вызов API

Изменения для работы с Twitter Search API:

![twitter-changes](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__twitter-changes.svg)

**Директория `controllers`**

* Измените весь текущий контент файла `index.js` на [следующий](https://gist.github.com/godfreyd/3420597de46509b02c69707d596c8dc4).

**Директория `helpers`**

* Добавьте в файл `index.js` следующий контент:

  ```js
  module.exports = {
      twitter: require('./twitter')
  };
  ```

* Добавьте [следующий код](https://gist.github.com/godfreyd/e48b6831d785e51ee6ce0892151e3395) в файл `twitter.js`.

### Работа с YouTube Data API

[YouTube Data API](https://developers.google.com/youtube/v3/) позволяет найти видеоролики, опубликованные на сайте Youtube.com. По умолчанию в набор результата поиска включены следующие ресурсы: видео, каналы, списки воспроизведения.

Подробнее:

* [Доступ к API](#Доступ-к-api-1)
* [Вызов API](#Вызов-api-1)

#### Доступ к API

Для успешного вызова API необходимы:

* URL, составленный согласно требованиям к нужному запросу.
* [OAuth-токен](#Получение-oauth-токена-для-google), выданный вашему приложению для доступа к API.
* Модуль [googleapis](#googleapis).

#### Вызов API

Изменения для работы с YouTube Data API:

![youtube-changes](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__youtube-changes.svg)

**Директория `server`**

* Добавьте [следующий код](https://gist.github.com/godfreyd/68af82df0bc171da54971990f442dddb) в файл `auth.js`.

* Отредактируйте файл `routes.js`.

  Измените:

  ```js
  var router = require('express').Router(),
      controllers = require('./controllers');

  router
      .get('/ping/', function(req, res) {
          res.send('ok');
      })
      .get('/', controllers.getContent);

  module.exports = router;
  ```

  На:

  ```js
  var router = require('express').Router(),
      controllers = require('./controllers'),
      passportYouTube = require('./auth'),
      middleware = require('./middleware/auth'),
      isAuthenticated = middleware.isAuthenticated;

  router
      .get('/auth/youtube', passportYouTube.authenticate('youtube'))
      .get('/auth/youtube/callback', passportYouTube.authenticate('youtube', { failureRedirect: '/error', failureFlash: true }), (req, res) => {
          res.redirect('/');
      })
      .get('/', isAuthenticated, controllers.getContent);

  module.exports = router;
  ```

**Директория `controllers`**

* Измените весь текущий контент файла `index.js` на [следующий](https://gist.github.com/godfreyd/60d5d123c45c067b3fb675688dc74835).

**Директория `helpers`**

* Добавьте в файл `index.js` следующий контент (см. комментарий):

  ```js
  module.exports = {
      twitter: require('./twitter'),
      youtube: require('./youtube')        // Подключаем модуль `youtube.js`
  };
  ```

* Добавьте [следующий код](https://gist.github.com/godfreyd/e103013e1fe480965cd84b3e7040d04b) в файл `youtube.js`.

**Директория `middleware`**

* Добавьте в файл `auth.js` следующий контент:

  ```js
  module.exports = {
      isAuthenticated: function(req, res, next) {
          if (req.isAuthenticated()) return next();

          return res.redirect('/auth/youtube');
      }
  };
  ```

### Верстка

В данном документе первоочередное внимание уделено вопросу взаимодействия [технологий БЭМ](https://ru.bem.info/platform/). Поэтому он не содержит описания верстки и клиентского JavaScript. Описание верстки привело бы к большему объему, а, значит, и к меньшей практической ценности этого документа.

Процесс верстки сведен к следующим шагам:

1. Удалите все блоки из директории `common.blocks`.
2. Склонируйте [следующие блоки](https://github.com/godfreyd/bem-in-dynamic/tree/master/common.blocks) в директорию `common.blocks`.
3. Добавьте [logo.svg](https://github.com/godfreyd/bem-in-dynamic/blob/master/static/images/logo.svg) в директорию `static/images`.
4. Перезапустите сервер: `npm run dev`.

Приложение **Social Services Search Robot** готово.

**Не получилось?**

Если при создании приложения возникли сложности, поищите решение на [форуме](https://ru.bem.info/forum/). Если готового ответа не нашлось, задайте вопрос экспертам.
