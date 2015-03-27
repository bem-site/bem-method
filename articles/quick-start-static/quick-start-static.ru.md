## Быстрый старт по созданию статической страницы с БЭМ

В этой статье рассмотрен пример реализации статической страницы по [БЭМ-методологии](https://ru.bem.info/method/).

## Что должно получиться

Страница приветствия пользователя, содержащая поле ввода, кнопку и текст. При нажатии на кнопку страница обновляется и текст дополняется значением, введенным в поле.

![страница приветствия](https://img-fotki.yandex.ru/get/15561/289488726.0/0_21856b_45166628_orig)

## С чего начать

### Минимальные требования

* [Node.js 0.10+](http://nodejs.org/) или [io.js](https://iojs.org/en/index.html);
* [Git Bash](http://msysgit.github.io/) – для пользователей операционной системы Windows.

### Локальная копия и настройка окружения

Для быстрого и простого создания БЭМ-проекта потребуется [шаблонный репозиторий](https://github.com/bem/project-stub), содержащий необходимый минимум конфигурационных файлов и папок.

**NB** Пользователям Windows необходимо выполнять все команды в Git Bash. Убедитесь, что Git Bash запущен от имени администратора.

1.  Сделайте локальную копию `project-stub`.

    **NB** Не используйте права суперпользователя (`root`) при установке npm- и bower-зависимостей. bower-зависимости ставятся при выполнении npm postinstall в папку `libs`.

    ```bash
    git clone https://github.com/bem/project-stub.git --depth 1 --branch v1.0.0 start-project
    cd start-project
    npm install
    ```

2.  Запустите сервер с помощью [ENB](https://ru.bem.info/tools/bem/enb-bem-techs/):

    ```bash
    npm start
    ```

3.  Проверьте результат по ссылке `http://localhost:8080/desktop.bundles/index/index.html`.

    Должна открыться страница с примерами блоков библиотеки:

    ![главная страница](https://img-fotki.yandex.ru/get/15493/289488726.0/0_218be7_cbbd5b69_orig)

## Пошаговая инструкция по созданию проекта

Процедура разработки страницы приветствия состоит из следующих этапов:

1.  [Создание страницы](#page-creation) <br>
   1.1 [Описание страницы в BEMJSON-файле](#BEMJSON-declaration)
2.  [Создание блока](#block-creation)
3.  [Реализация блока hello](#block-hello-modification) <br>
   3.1 [В технологии JavaScript](#JS-modification) <br>
   3.2 [В технологии BEMHTML](#BEMHTML-modification) <br>
   3.3 [В технологии CSS](#CSS-modification)

После выполнения всех шагов можно смотреть [результат](#result).

<a name="page-creation"></a>

### 1.  Создание страницы

Исходники страниц размещаются в каталоге `start-project/desktop.bundles`. Изначально в проекте присутствует главная страница `index` с примерами блоков библиотеки [bem-components](https://ru.bem.info/libs/bem-components/).

Для начала работы с собственным проектом создайте новую страницу. Разместите в `desktop.bundles` каталог с именем `hello` и добавьте в него файл `hello.bemjson.js`.


<a name="BEMJSON-declaration"></a>

#### 1.1 Описание страницы в BEMJSON-файле

[BEMJSON-файл](https://ru.bem.info/technology/bemjson/) – это структура страницы, описанная в терминах блоков, элементов и модификаторов.

1. Добавьте на своем проекте описание блока `hello` в файле `desktop.bundles/hello/hello.bemjson.js`. <br>
   Блок `hello` – это сущность, которая содержит в себе все необходимые для проекта элементы.

    ```js
    ({
        block : 'page',
        title : 'hello',
        head : [
            { elem : 'css', url : '_hello.css' }
        ],
        scripts : [{ elem : 'js', url : '_hello.js' }],
        mods : { theme : 'islands' },
        content : [
            {
                block : 'hello'
            }
        ]
    })
    ```

2. Поместите элемент `greeting` с текстом приветствия пользователя (поле `content`) в блок `hello`.

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

3. Чтобы создать поле ввода и кнопку, возьмите готовые реализации блоков `input` и `button` из библиотеки `bem-components` и добавьте их в блок `hello`.

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
                    placeholder : 'Имя пользователя'
                },
                {
                    block : 'button',
                    mods : { theme : 'islands', size : 'm', type : 'submit' },
                    text : 'Нажать'
                }
            ]
        }
    ]
    ```

[Полный код](https://gist.github.com/innabelaya/837a96299de6fd488223) BEMJSON-файла.

Чтобы убедиться, что страница отображает все необходимые объекты, откройте `http://localhost:8080/desktop.bundles/hello/hello.html`.

Если вы хотите внести какие-либо изменения в существующие блоки, это можно сделать на своем [уровне переопределения](https://ru.bem.info/tools/bem/bem-tools/levels/).

<a name="block-creation"></a>

### 2. Создание блока

Чтобы элементы на странице работали должным образом, необходимо прописать дополнительную функциональность блока `hello` на своем уровне переопределения.

1.  Создайте вручную каталог блока `hello` на уровне `desktop.blocks`.
2.  Разместите в нем необходимые для проекта [файлы технологий реализации блока](https://ru.bem.info/method/filesystem/) (`CSS`, `JS`, `BEMHTML`). Название каталога блока и вложенных в него файлов должны совпадать с именем блока, которое прописано в BEMJSON-файле.

    * `hello.js` – описывает динамическую функциональность страниц;
    * `hello.bemhtml` – шаблоны для генерации HTML-представления блока;
    * `hello.css` – изменяет внешний вид объектов на странице.

<a name="block-hello-modification"></a>

### 3. Реализация блока hello

Для представления блока в терминах БЭМ необходимо реализовать его в следующих технологиях.

<a name="JS-modification"></a>

#### 3.1 Реализация блока в технологии JavaScript

1. Опишите в файле `desktop.blocks/hello/hello.js` реакцию блока на действие пользователя с помощью специального свойства `onSetMod`. При нажатии кнопки в текст приветствия будет подставляться имя пользователя, введенное в поле `input`. <br>
   JavaScript-код написан с использованием декларативного JavaScript-фреймворка – [i-bem.js](https://ru.bem.info/technology/i-bem/).

    ```js
    onSetMod: {
        'js': {
            'inited': function() {
                this._input = this.findBlockInside('input');

                this.bindTo('submit', function(e) {
                    e.preventDefault();
                    this.elem('greeting').text('Привет, ' + this._input.getVal() + '!');
                });
            }
        }
    }

    ```

2. Используйте модульную систему [YModules](https://ru.bem.info/tools/bem/modules/), чтобы представить данный JavaScript-код:

    ```js
    modules.define(
        'hello', // имя блока
        ['i-bem__dom'], // подключение зависимости
        function(provide, BEMDOM) { // функция, в которую передаются имена используемых модулей
            provide(BEMDOM.decl('hello', { // декларация блока
                onSetMod: { // конструктор для описания реакции на события
                    'js': {
                        'inited': function() {
                            this._input = this.findBlockInside('input');

                            this.bindTo('submit', function(e) { // событие, на которое будет реакция
                                e.preventDefault(); // предотвращение срабатывания события по умолчанию (отправка данных формы на сервер с перезагрузкой страницы)
                                this.elem('greeting').text('Привет, ' + this._input.getVal() + '!');
                            });
                        }
                    }
                }
            }));
        });
    ```

<a name="BEMHTML-modification"></a>

#### 3.2 Реализация блока в технологии BEMHTML

[BEMHTML](https://ru.bem.info/technology/bemhtml/current/rationale/) – технология, которая преобразует входные данные из BEMJSON-файла в HTML.

1. Напишите [BEMHTML-шаблон](https://ru.bem.info/technology/bemhtml/current/reference/) и укажите в нем, что блок `hello` имеет JavaScript-реализацию.
2. Оберните блок `hello` в форму, добавив моду `tag`.

```js
block('hello')(
    js()(true),
    tag()('form')
);
```

<a name="CSS-modification"></a>

#### 3.3 Реализация блока в технологии CSS

Для блока `hello` создайте свои CSS-правила. Например, такие:

```js
.hello
{
    color: green;
    padding: 10%;
}

.hello__greeting
{
    margin-bottom: 12px;
}

.hello__input
{
    margin-right: 12px;
}
```

Для добавления к элементу `input` CSS правил, уже реализованных в блоке `hello`, подмешайте элемент с помощью поля `mix` во входных данных (BEMJSON).

```js
{
    block : 'input',
    mods : { theme : 'islands', size : 'm' },
    mix : { block : 'hello', elem : 'input' }, // подмешиваем элемент для добавления CSS-правил
    name : 'name',
    placeholder : 'Имя пользователя'
}
```
[Полный код](https://gist.github.com/innabelaya/045ddfb063af3b262182) BEMJSON-файла.

<a name="result"></a>

## Результат

Чтобы увидеть итог проделанной работы, обновите страницу:

    http://localhost:8080/desktop.bundles/hello/hello.html

Поскольку проект состоял всего из одной страницы, то необходимость в полной сборке отсутствует. О том, как написать более сложный проект, читайте в статье [Создаем свой проект на БЭМ](https://ru.bem.info/tutorials/start-with-project-stub/).
