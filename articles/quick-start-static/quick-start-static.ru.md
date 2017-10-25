# Быстрый старт. Собираем статическую страницу

## Описание урока

Создание простой статической страницы помогает понять, как устроен БЭМ-проект. В документе показаны основы работы с [БЭМ-технологиями](../../method/key-concepts/key-concepts.ru.md#Технология-реализации), [уровнями переопределения](../../method/key-concepts/key-concepts.ru.md#Уровень-переопределения) и [библиотеками БЭМ](https://ru.bem.info/platform/libs/).

**Вы научитесь:** 

* [Клонировать БЭМ-проект](#Клонируем-БЭМ-проект)
* [Создавать новые страницы в проекте](#Создаем-страницу)
* [Подключать блоки сторонней библиотеки](#Описываем-страницу-в-bemjson-файле)
* [Создавать новые блоки, добавлять им поведение и стили](#Создаем-блоки)

В результате выполнения всех шагов вы получите страницу с полем ввода, кнопкой и фразой приветствия пользователя, как показано на рисунке ниже. Имя, введенное в поле, при нажатии на кнопку, будет отображаться в приветствии.

![Страница приветствия](quick-start-static__hello-user.ru.png)

Для работы с примерами, описанными в документе, необходимы базовые навыки:

* HTML
* CSS
* JavaScript
* БЭМ
>
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
  * [BEMHTML](https://ru.bem.info/platform/bem-xjst/8/)  

## Клонируем БЭМ-проект

Чтобы быстро развернуть БЭМ-проект, воспользуемся локальной копией шаблонного репозитория [project-stub](https://github.com/bem/project-stub), который содержит необходимый минимум конфигурационных файлов для создания БЭМ-проекта с нуля. В project-stub по умолчанию подключены основные [БЭМ-библиотеки](https://ru.bem.info/platform/libs/):

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


5.  Откройте браузер и введите адрес [http://localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html).

    Должна открыться страница с примерами блоков библиотеки bem-components:

    ![Главная страница](quick-start-static__main-page.png)

После сборки и установки всех зависимостей файловая структура проекта будет иметь следующий вид: 

```
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

Директория `desktop.bundles` в проекте содержит файлы, полученные в результате сборки. Такие файлы в БЭМ-методологии называются [бандлами](../../method/build/build.ru.md#Введение). В простейшем случае бандлы собираются для каждой страницы, тогда одной директории бандла соответствует одна страница проекта. По умолчанию в проекте присутствует страница `index` с примерами блоков библиотеки [bem-components](https://ru.bem.info/libs/bem-components/).

Чтобы добавить новую страницу:

1. Создайте директорию с именем страницы (например, `hello`) в `desktop.bundles`.
2. Создайте файл `hello.bemjson.js` в директории `desktop.bundles/hello/`.

```
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

Файл `hello.bemjson.js` — это единственный файл в директории `desktop.bundles/hello/`, который пишется вручную. Он содержит входные данные в формате [BEMJSON](https://ru.bem.info/platform/bemjson/) и описывает структуру страницы в терминах [блоков](../../method/key-concepts/key-concepts.ru.md#Блок), [элементов](../../method/key-concepts/key-concepts.ru.md#Элемент) и [модификаторов](../../method/key-concepts/key-concepts.ru.md#Модификатор). Остальные файлы появятся в директории `desktop.bundles/hello/` после пересборки проекта.

### Описываем страницу в BEMJSON-файле

> Подробнее о [BEMJSON](https://ru.bem.info/platform/bemjson/)-формате входных данных.

Чтобы создать описание страницы, необходимо представлять ее структуру. В нашем случае, на странице разместим блок `hello`, в котором будет приветствие (элемент `greeting` блока `hello`), поле ввода (блок `input`) и кнопка (блок `button`). Блоки [input](https://ru.bem.info/platform/libs/bem-components/current/desktop/input/) и [button](https://ru.bem.info/platform/libs/bem-components/current/desktop/button/) можно взять из готовой библиотеки bem-components.

Чтобы описать структуру страницы, внесите следующие изменения в файл `desktop.bundles/hello/hello.bemjson.js`:

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
    content : [
        {
            block : 'hello',
            content : [
                {
                    elem : 'greeting',
                    content : 'Привет, %пользователь%!'
                }
            ]
        }
    ]
    ```

3.  Добавьте блоки `input` и `button` в блок `hello`.

    ```js
    content : [
        {
            block : 'hello',
            content : [
                {
                    elem : 'greeting',
                    content : 'Привет, %пользователь%!'
                },
                {
                    block : 'input',
                    mods : { theme: 'islands', size : 'm' },
                    name : 'name',
                    placeholder : 'Введите имя'
                },
                {
                    block : 'button',
                    mods : { theme : 'islands', size : 'm', type : 'submit' },
                    text : 'Поздороваться'
                }
            ]
        }
    ]
    ```

[Полный код](https://gist.github.com/innabelaya/837a96299de6fd488223) BEMJSON-файла.

Чтобы убедиться, что на странице появились все описанные блоки и элементы, откройте страницу `hello` в браузере: [http://localhost:8080/desktop.bundles/hello/hello.html](http://localhost:8080/desktop.bundles/hello/hello.html).

## Создаем блоки

Все блоки, описанные в BEMJSON-файле, появились на странице. Теперь необходимо описать взаимодействие этих блоков, добавить им стили. Сделаем это с помощью блока `hello`. Для этого:

1. Создайте директорию с именем `hello` на уровне `desktop.blocks`. 
2. Разместите в ней [файлы реализации блока](../../method/key-concepts/key-concepts.ru.md#Технология-реализации): 
    * `hello.js` — чтобы описать поведение блока;
    * `hello.bemhtml.js` — чтобы создать шаблоны для генерации HTML-разметки блока;
    * `hello.css` — чтобы добавить стили блока.

### Описываем поведение блока

1. Откройте файл `desktop.blocks/hello/hello.js`.  
2. Вставьте код, который описывает реакцию блока на действие пользователя. В коде используется специальное свойство `onSetMod`. При нажатии кнопки в текст приветствия будет подставляться имя пользователя, введенное в поле `input`.

> JavaScript-код написан с использованием декларативного JavaScript-фреймворка — [i-bem.js](https://ru.bem.info/platform/i-bem/).

    ```js
    onSetMod: {
        'js': {
            'inited': function() {
                this._input = this.findChildBlock(Input);
                
                this._domEvents().on('submit', function(e) {
                	e.preventDefault();
                    
                    this._elem('greeting').domElem.text('Привет, ' +
                    	this._input.getVal() + '!');
                });
            }
        }
    }
    ```

2.  Используйте модульную систему [YModules](https://github.com/ymaps/modules/blob/master/README.ru.md), чтобы представить данный JavaScript-код:

    ```js
    modules.define(
        'hello', // имя блока
        ['i-bem-dom', 'input'], // подключение зависимости

        // функция, в которую передаются имена используемых модулей
        function(provide, bemDom, Input) {
            provide(bemDom.declBlock('hello', { // декларация блока
                onSetMod: { // конструктор для описания реакции на события
                    'js': {
                        'inited': function() {
                            this._input = this.findChildBlock(Input);

                            // DOM-событие, на которое будет реакция
                            this._domEvents().on('submit', function(e) {
                                // предотвращение срабатывания события по умолчанию:
                                // отправка формы на сервер с перезагрузкой страницы
                                e.preventDefault();

                                this._elem('greeting').domElem.text('Привет, ' +
                                	this._input.getVal() + '!');
                            });
                        }
                    }
                }
            }));
        });
    ```

#### Создаем шаблон блока

[BEMHTML](https://ru.bem.info/platform/bem-xjst/) — технология, которая преобразует входные данные из BEMJSON-файла в HTML.

Чтобы создать шаблон: 
1. Откройте файл `desktop.blocks/hello/hello.bemhtml.js`.  
2. Напишите [BEMHTML-шаблон](https://ru.bem.info/platform/bem-xjst/templates-syntax/), в котором укажите, что блок `hello` имеет JavaScript-реализацию.
3. Оберните блок `hello` в форму с помощью моды `tag`.

    ```js
    block('hello')(
        js()(true),
        tag()('form')
    );
    ```

#### Добавляем стили блоку

1. Откройте файл `desktop.blocks/hello/hello.css`.  
2. Напишите CSS-правила для блока `hello`. Например:

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

3. Создайте дополнительные правила для элемента `input` блока `hello`. Они понадобятся, чтобы изменить стили блока `input` из библиотеки bem-components.  
     
    ```css
    .hello__input
    {
        margin-right: 12px;
    }
    ```

4. Добавьте блоку `input` новые CSS-правила с помощью поля `mix` в файле `desktop.bundles/hello/hello.bemjson.js`. Такой способ совмещения стилей в БЭМ называется [миксом](../../method/key-concepts/key-concepts.ru.md#Микс). 

    ```js
    {
        block : 'input',
        mods : { theme : 'islands', size : 'm' },

        // подмешиваем элемент для добавления CSS-правил
        mix : { block : 'hello', elem : 'input' },

        name : 'name',
        placeholder : 'Имя пользователя'
    }
    ```

[Полный код](https://gist.github.com/innabelaya/045ddfb063af3b262182) файла `desktop.bundles/hello/hello.bemjson.js`.

## Результат

Во время разработки проекта был запущен режим сервера, при котором автоматически пересобираются измененные части проекта, необходимые при обновлении страницы в браузере. Поэтому, чтобы проверить результат работы, достаточно [обновить страницу](http://localhost:8080/desktop.bundles/hello/hello.html). 

> О том, как создать статический проект, читайте в статье [Создаем статический проект на БЭМ](https://ru.bem.info/platform/tutorials/start-with-project-stub/).
