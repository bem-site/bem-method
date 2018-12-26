# Быстрый старт. Собираем статическую страницу

## Описание урока

Создание простой статической страницы помогает понять, как устроен БЭМ-проект. В документе показаны основы работы с [БЭМ-технологиями](../../method/key-concepts/key-concepts.ru.md#Технология-реализации), [уровнями переопределения](../../method/key-concepts/key-concepts.ru.md#Уровень-переопределения) и [библиотеками БЭМ](https://ru.bem.info/platform/libs/).

**Вы научитесь:**

* [Клонировать БЭМ-проект](#Клонируем-БЭМ-проект)
* [Создавать новые страницы в проекте](#Создаем-страницу)
* [Подключать готовые блоки сторонней библиотеки](#Описываем-страницу-в-bemjson-файле)
* [Создавать новые блоки в проекте](#Создаем-блоки)

В результате выполнения всех шагов вы получите страницу с полем ввода, кнопкой и фразой приветствия пользователя, как показано на рисунке ниже. Имя, введенное в поле, при нажатии на кнопку, будет отображаться в приветствии.

![Страница приветствия](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/platform/tutorials/quick-start-static/quick-start-static__hello-user.svg)

Для работы с примерами, описанными в документе, необходимы базовые навыки:

* HTML
* CSS
* JavaScript
* БЭМ

> **Важно!** В документе не рассматриваются вопросы [сборки](../../method/build/build.ru.md) БЭМ-проекта.

### Минимальные требования

Чтобы начать работу, необходимо установить:

* [Node.js 4+](https://nodejs.org)
* [Git](https://git-scm.com)

> **Важно!** Пользователям операционной системы Windows необходимо установить [Git Bash](https://git-for-windows.github.io).

### Что используем

* Шаблонный репозиторий [project-stub](https://github.com/bem/project-stub)
* Технологии:
  * [BEMJSON](https://ru.bem.info/platform/bemjson/)
  * [i-bem.js](https://ru.bem.info/platform/i-bem/)
  * [BEMHTML](https://ru.bem.info/platform/bem-xjst/)

## Клонируем БЭМ-проект

Чтобы быстро развернуть БЭМ-проект, воспользуемся локальной копией шаблонного репозитория [project-stub](https://github.com/bem/project-stub), который содержит необходимый минимум конфигурационных файлов. В project-stub по умолчанию подключены основные [БЭМ-библиотеки](https://ru.bem.info/platform/libs/):

* [bem-core](https://ru.bem.info/platform/libs/bem-core/)
* [bem-components](https://ru.bem.info/platform/libs/bem-components/)

Копию project-stub можно сделать с помощью Git.

> **Примечание.** В операционных системах OS X или Linux все команды выполняются в терминале. Пользователям Windows необходимо выполнять команды в Git Bash. Убедитесь, что Git Bash запущен от имени администратора.

Чтобы создать локальную копию project-stub, выполните следующие действия:

1. Склонируйте project-stub в директорию `start-project`:

    ```bash
    git clone https://github.com/bem/project-stub.git --depth 1 start-project
    ```

2. Перейдите в директорию проекта:

    ```bash
    cd start-project
    ```

3. Установите зависимости:

    ```bash
    npm install
    ```

    > **Примечание.** Не используйте права суперпользователя `root` при установке npm-зависимостей.

4. Запустите сервер с помощью [ENB](https://ru.bem.info/toolbox/enb/):

    ```bash
    npm start
    ```

    По умолчанию сервер запустится на порте 8080.

    > **Примечание.** Если порт `8080` используется другой программой, его можно переназначить:
    >
    > ```bash
    > npm start -- -p 8081
    > ```

5.  Откройте браузер и введите адрес [http://localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html). Должна открыться страница с примерами блоков библиотеки [bem-components](https://github.com/bem/bem-components).

После сборки и установки всех зависимостей файловая структура проекта будет иметь следующий вид:

```files
start-project/
    .bem
    .enb/                 # Конфигурационные файлы для сборщика ENB
    common.blocks/        # Базовые реализации блоков
    desktop.blocks/       # Директория блоков проекта
    desktop.bundles/      # Директории бандлов проекта
    node_modules/         # Установленные модули Node (пакеты)
    .bemrc                #
    .editorconfig         # Конфигурация EditorConfig для поддержки разных редакторов и IDE
    .gitignore            # Исключение файлов и директорий в Git
    .travis.yml           # Автоматический запуск линтеров в Continuous Integration
    favicon.ico           #
    gulpfile.js           # Конфигурационный файл для сборщика Gulp
    package.json          # Описание проекта для npm
    README.md             # Текстовое описание проекта
```

## Создаем страницу

Директория `desktop.bundles` в проекте содержит файлы, полученные в результате сборки. Такие файлы в БЭМ-методологии называются [бандлами](../../method/build/build.ru.md#Введение). В простейшем случае бандлы собираются для каждой страницы: одной директории бандла соответствует одна страница проекта. По умолчанию в проекте присутствует страница `index`.

Чтобы добавить новую страницу:

1. Создайте директорию с именем страницы (например, `hello`) в `desktop.bundles`.
2. Создайте файл `hello.bemjson.js` в директории `desktop.bundles/hello/`.

    В результате корневая директория проекта будет выглядеть так:

    ```files
    start-project/
        .bem
        .enb/
        common.blocks/
        desktop.blocks/
        desktop.bundles/
            index/               # Директория бандлов страницы index
            hello/               # Директория бандлов страницы hello
                hello.bemjson.js # Описание страницы hello
    ```

    > Имена файлов и директорий соответствуют [соглашению по именованию](../../method/naming-convention/naming-convention.ru.md).

### Описываем страницу в BEMJSON-файле

Чтобы создать описание страницы, необходимо представлять ее структуру. Создадим блок-контейнер `hello`, в котором разместим поле ввода, кнопку и текст приветствия. Блоки [input](https://ru.bem.info/platform/libs/bem-components/current/desktop/input/) (поле ввода) и [button](https://ru.bem.info/platform/libs/bem-components/current/desktop/button/) (кнопка) возьмем из готовой библиотеки [bem-components](https://ru.bem.info/platform/libs/bem-components), а текст приветствия реализуем как элемент `greeting` блока `hello`.

> Подробнее о [BEMJSON](https://ru.bem.info/platform/bemjson/)-формате входных данных.

Чтобы описать структуру страницы, отредактируйте файл `desktop.bundles/hello/hello.bemjson.js`:

1.  Добавьте блок `hello`.

    ```js
    ({
        block : 'page',
        title : 'hello',
        head : [
            { elem : 'css', url : 'hello.min.css' }
        ],
        scripts : [{ elem : 'js', url : 'hello.min.js' }],
        mods : { theme : 'islands' },
        content : [
            {
                block : 'hello'
            }
        ]
    })
    ```

2.  Поместите элемент `greeting` с текстом приветствия пользователя (поле `content`) в блок `hello`.

    ```js
    ({
        block : 'page',
        title : 'hello',
        head : [
            { elem : 'css', url : 'hello.min.css' }
        ],
        scripts : [{ elem : 'js', url : 'hello.min.js' }],
        mods : { theme : 'islands' },
        content : [
            {
                block : 'hello',
                content : [
                    {
                        elem : 'greeting',
                        content : 'Hello %user%!'
                    }
                ]
            }
        ]
    })
    ```

3.  Добавьте блоки `input` и `button` в блок `hello`.

    ```js
    ({
        block : 'page',
        title : 'hello',
        head : [
            { elem : 'css', url : 'hello.min.css' }
        ],
        scripts : [{ elem : 'js', url : 'hello.min.js' }],
        mods : { theme : 'islands' },
        content : [
            {
                block : 'hello',
                content : [
                    {
                        elem : 'greeting',
                        content : 'Hello %user%!'
                    },
                    {
                        block : 'input',
                        mods : {theme : 'islands', size : 'm'},
                        name : 'name',
                        placeholder : 'User name'
                    },
                    {
                        block : 'button',
                        mods : {theme : 'islands', size : 'm', type : 'submit'},
                        text : 'Click'
                    }
                ]
            }
        ]
    })
    ```

Чтобы убедиться, что на странице появились все описанные блоки и элементы, откройте страницу `hello` в браузере: [http://localhost:8080/desktop.bundles/hello/hello.html](http://localhost:8080/desktop.bundles/hello/hello.html).

## Создаем блоки

Блоки из готовой библиотеки появились на странице, но они не взаимодействуют. Теперь создадим блок `hello`, который будет брать данные из поля ввода и подставлять их в приветствие. Для этого:

1. Создайте директорию с именем `hello` в `desktop.blocks`.
2. Разместите в ней [файлы реализации блока](../../method/key-concepts/key-concepts.ru.md#Технология-реализации):
    * `hello.js` — описывает поведение блока;
    * `hello.bemhtml.js` — содержаит шаблоны для генерации HTML-разметки блока;
    * `hello.css` — содержит стили блока.

### Описываем поведение блока

1. Откройте файл `desktop.blocks/hello/hello.js`.
2. Вставьте код, который описывает реакцию блока на действие пользователя. При нажатии кнопки в текст приветствия будет подставляться имя пользователя, введенное в поле `input`.

    > JavaScript-код написан с использованием декларативного JavaScript-фреймворка — [i-bem.js](https://ru.bem.info/platform/i-bem/).

    ```js
    // конструктор для описания реакции на события
    onSetMod: {
        js: {
            inited: function() {
                this._input = this.findChildBlock(Input);
            }
        }
    },
    _onSubmit: function(e) {
        // предотвращение срабатывания события по умолчанию:
        // отправка формы на сервер с перезагрузкой страницы
        e.preventDefault();
        this._elem('greeting').domElem.text('Hello ' + this._input.getVal() + '!');
    },
    {
        lazyInit: true,
        onInit: function() {
            // DOM-событие, на которое будет реакция
            this._domEvents().on('submit', this.prototype._onSubmit);
        }
    }
    ```

2.  Используйте модульную систему [YModules](https://github.com/ymaps/modules/blob/master/README.ru.md), чтобы представить данный JavaScript-код:

    ```js
    // подключение зависимости от i-bem-dom, input и button
    modules.define('hello', ['i-bem-dom', 'input', 'button'],
        // функция, в которую передаются имена используемых модулей
        function(provide, bemDom, Input, Button) {

        // декларация блока hello
        provide(bemDom.declBlock('hello', {
            onSetMod: {
                js: {
                    inited: function() {
                        this._input = this.findChildBlock(Input);
                    }
                }
            },
            _onSubmit: function(e) {
                e.preventDefault();
                this._elem('greeting').domElem.text('Hello ' + this._input.getVal() + '!');
            }
        }, {
            lazyInit: true,
            onInit: function() {
                this._domEvents().on('submit', this.prototype._onSubmit);
            }
        }));
    });
    ```

#### Создаем шаблон блока

[BEMHTML](https://ru.bem.info/platform/bem-xjst/) — технология, которая преобразует входные данные из BEMJSON-файла в HTML.

Чтобы создать шаблон:

1. Откройте файл `desktop.blocks/hello/hello.bemhtml.js`.
2. Напишите [BEMHTML-шаблон](https://ru.bem.info/platform/bem-xjst/templates-syntax/), в котором укажите, что блок `hello` имеет JavaScript-реализацию.
3. Оберните блок `hello` в форму с помощью стандартного режима [tag](https://ru.bem.info/platform/bem-xjst/8/templates-syntax/#tag).

    ```js
    block('hello')(
        js()(true),
        tag()('form')
    );
    ```

#### Добавляем стили блоку

1. Отредактируйте файл `desktop.blocks/hello/hello.css`:

    ```css
    .hello
    {
        color: green;
        padding: 10%;
    }

    .hello__greeting
    {
        margin-bottom: 12px;
    }
    ```

2. Создайте дополнительные правила для элемента `input` блока `hello`. Они понадобятся, чтобы изменить стили блока `input` из библиотеки bem-components.

    ```css
    .hello__input
    {
        margin-right: 12px;
    }
    ```

3. Добавьте блоку `input` дополнительные CSS-правила с помощью поля [mix](https://ru.bem.info/platform/bemjson/#mix) в файле `desktop.bundles/hello/hello.bemjson.js`.

    ```js
    {
        block : 'input',
        mods : { theme : 'islands', size : 'm' },

        // подмешиваем элемент для добавления CSS-правил
        mix : { block : 'hello', elem : 'input' },

        name : 'name',
        placeholder : 'User name'
    }
    ```

    > Подробнее про [миксы](../../method/key-concepts/key-concepts.ru.md#Микс) в разделе [Методология](https://ru.bem.info/methodology/quick-start/#Микс).

[Полный код](https://gist.github.com/innabelaya/045ddfb063af3b262182) файла `desktop.bundles/hello/hello.bemjson.js`.

## Результат

Чтобы проверить результат, просто обновите [страницу](http://localhost:8080/desktop.bundles/hello/hello.html). Полная пересборка проекта не нужна, так как во время разработки проекта был запущен режим сервера, который автоматически пересобирает только измененные части проекта, необходимые при обновлении страницы в браузере.

> О том, как создать более сложный статический проект, читайте в статье [Создаем статический проект на БЭМ](https://ru.bem.info/platform/tutorials/start-with-project-stub/).
