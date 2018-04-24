# Dist bem-components: быстрый старт и работа с блоками

Dist — это предварительно собранные файлы ([бандлы](https://ru.bem.info/methodology/build/#Введение)) библиотеки bem-components. Это самый быстрый способ попробовать [блоки](https://ru.bem.info/methodology/key-concepts/#Блок) библиотеки в действии.

Этот урок включает в себя:

* [Быстрый старт](#Быстрый-старт). Как подключить библиотеку и вставить блок на страницу
* [Руководство](#Руководство-Работа-с-блоками-библиотеки). Как работать с блоками библиотеки

## Быстрый старт

Чтобы попробовать блоки библиотеки bem-components без сборки и настройки проекта, выполните следующие шаги.

### Создайте .html-файл

Создайте локально HTML-файл `hello.html` с минимальным набором элементов: 

```html
<!DOCTYPE HTML>
<html>
 <head>
  <meta charset="utf-8">
  <title>Try Bem Components</title>
 </head>
 <body></body>
</html>
```

### Подключите библиотеку

Скопируйте ссылки на предсобранные файлы библиотеки в HTML-код страницы:

```diff
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Try Bem Components</title>
+         <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
    </head>
    <body>
+         <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script> 
    </body>
</html>
```

### Вставьте блок на страницу

* Откройте описание блока (напрмер, [input](https://ru.bem.info/platform/libs/bem-components/6.0.0/touch-phone/input) на сайте [bem.info](https://ru.bem.info/platform/libs/bem-components/6.0.0).
* Выберите подходящий пример. Например, блок [input с модификатором type в значении search](https://ru.bem.info/platform/libs/bem-components/6.0.0/touch-phone/input/#Модификатор-type-10).
* Перейдите во вкладку HTML в примере этого блока и скопируйте код.  
  ![Вкладка HTML в примере блока input](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/platform/tutorials/dist-quick-start/dist-quick-start-html.png)
* Вставьте код блока в файл `hello.html`.

```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Try Bem Components</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body>
    <!-- HTML-код блока input -->
+    <span class="input input_theme_islands input_size_m i-bem" data-bem='{"input":{}}'>
+        <span class="input__box">
+            <input class="input__control" placeholder="User name" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
+    </span>
    </span>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script>
</body>
</html>
```

### Проверьте результат

Откройте файл `hello.html` в браузере. 

## Руководство. Работа с блоками библиотеки

В этой части урока мы создадим форму приветствия, подключим в нее блоки `input` и `button` и научим их взаимодействовать друг с другом: имя пользователя при нажатии на кнопку будет отображаться в приветствии.

### Создайте форму приветствия

* Откройте файл `hello.html`, который вы получили в [первой части](#Проверьте-результат) урока.
* Добавьте в него форму приветствия — блок `hello`.
 
```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Try Bem Components</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body>
    <!-- Блок hello для создания формы приветствия -->
+   <form class="hello i-bem" data-bem='{ "hello": {} }'>
+       <div class="hello__greeting">Hello, %user name%!</div>
+       <!-- HTML-код для блока input будет здесь -->
+         ...
+       <!-- HTML-код блока button будет здесь -->
+     </form>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script>
</body>
</html>
```

### Добавьте блок `button`

Вставьте HTML-код блока `button` в код файла `hello.html` по аналогии с блоком `input`:
* Откройте описание блока [button](https://ru.bem.info/platform/libs/bem-components/6.0.0/touch-phone/button/#Кнопка-отправки-формы-модификатор-type-в-значении-submit-1) на сайте [bem.info](https://ru.bem.info/platform/libs/bem-components/6.0.0).
* Перейдите во вкладку HTML в примере блока и скопируйте код.
* Вставьте код блока в файл `hello.html`. 

```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Try Bem Components</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body>
    <!-- Блок hello для создания формы приветствия -->
    <form class="hello i-bem" data-bem='{ "hello": {} }'>
        <div class="hello__greeting">Hello, %user name%!</div>
        <!-- HTML-код блока input -->
        <span class="input input_theme_islands input_size_m i-bem" data-bem='{"input":{}}'>
            <span class="input__box">
                <input class="input__control" placeholder="User name" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </span>
        </span>
        <!-- HTML-код блока button -->
+        <button class="button button_theme_islands button_size_m button_type_submit button__control i-bem" data-bem='{"button":{}}' role="button" type="submit">
+          <span class="button__text">Click</span>
+        </button>
    </form>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script>
</body>
</html>
```

Чтобы проверить, что блоки `input` и `button` отобразились на странице, откройте файл `hello.html` в браузере. 

### Добавьте блокам функциональность

> **Важно!** Чтобы изменять JavaScript-реализацию блоков библиотеки bem-components, необходимо [подключать](#Подключите-библиотеку) бандлы без [автоинициализации](https://ru.bem.info/platform/i-bem/init/) (`*.no-autoinit.js`).
>
> `https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js`

Чтобы имя из поля ввода появлялось в приветствии, опишите поведение блоков:

```diff hello.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Try Bem Components</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body>
    <!-- Блок hello для создания формы приветствия -->
    <form class="hello i-bem" data-bem='{ "hello": {} }'>
        <div class="hello__greeting">Hello, %user name%!</div>
        <!-- HTML-код для блока input будет здесь -->
        <span class="input input_theme_islands input_size_m i-bem" data-bem='{"input":{}}'>
            <span class="input__box">
                <input class="input__control" placeholder="User name" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </span>
        </span>
        <!-- HTML-код блока button -->
        <button class="button button_theme_islands button_size_m button_type_submit button__control i-bem" data-bem='{"button":{}}' role="button" type="submit">
          <span class="button__text">Click</span>
        </button>
    </form>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script>
+    <script>
+        modules.define('hello', ['i-bem-dom', 'input', 'button'],
+            function(provide, bemDom, Input, Button) {
+
+            provide(bemDom.declBlock('hello', {
+                onSetMod: {
+                    js: {
+                        inited: function() {
+                            this._input = this.findChildBlock(Input);
+                        }
+                    }
+                },
+
+                _onSubmit: function(e) {
+                    e.preventDefault();
+                    this._elem('greeting').domElem.text('Hello, ' + this._input.getVal() + '!');
+                }
+            }, {
+                lazyInit: true,
+                onInit: function() {
+                    this._domEvents().on('submit', this.prototype._onSubmit);
+                }
+            }));
+
+        });
+        // Вызов `init();`. Hеобходимо явно вызвать `init();`, чтобы инициализировать блоки, заранее присутствующие в HTML-разметке.
+        modules.require('i-bem-dom__init', function(init) { init(); });
+    </script>
</body>
</html>
```

Чтобы изменять поведение блоков, используется фреймворк [i-bem.js](https://ru.bem.info/platform/i-bem/), который является частью библиотеки [bem-core](https://ru.bem.info/platform/libs/bem-core/4.2.0/). Дополнительно подключать его на страницу не нужно, предсобранные бандлы библиотеки `bem-core` уже включены в сборку.

Проект в [JSFiddle](https://jsfiddle.net/inna__neige/0hLmLmzn/).

## Альтернативный способ подключения блоков 

До этого чтобы подключить блоки на страницу, мы использовали готовый HTML-код, теперь рассмотрим, как генерировать разметку блока в браузере. 

### Подключите бандлы с шаблонизатором

Чтобы генерировать HTML-разметку блока в браузере, необходимо использовать шаблонизатор [BEMHTML](https://ru.bem.info/platform/bem-xjst/8/), который преобразует [BEMJSON](https://ru.bem.info/platform/bemjson/) в HTML. Для этого [подключите](#Подключите-библиотеку) бандл с шаблонизатором (`*.js+bemhtml.js`) в файл `hello.html`:

```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>bem-components as a library</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
    <!-- Блок hello для создания формы приветствия -->
    <form class="hello i-bem" data-bem='{ "hello": {} }'>
        <div class="hello__greeting">Hello, %user name%!</div>
    </form>
-   <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script>
+   <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js+bemhtml.js"></script>
</body>
</html>
```

HTML-код блоков `input` и `button` больше не понадобится, удалите его:

```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Try Bem Components</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body>
    <!-- Блок hello для создания формы приветствия -->
    <form class="hello i-bem" data-bem='{ "hello": {} }'>
        <div class="hello__greeting">Hello, %user name%!</div>
        <!-- HTML-код блока input -->
-         <span class="input input_theme_islands input_size_m i-bem" data-bem='{"input":{}}'>
-             <span class="input__box">
-                 <input class="input__control" placeholder="User name" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
-             </span>
-         </span>
        <!-- HTML-код блока button -->
-        <button class="button button_theme_islands button_size_m button_type_submit button__control i-bem" data-bem='{"button":{}}' role="button" type="submit">
-          <span class="button__text">Click</span>
-        </button>
    </form>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script>
</body>
</html>
```

### Добавьте блоки на страницу

Вместо готового HTML-кода блоков `input` и `button` используйте `BEMJSON`-код. Для этого перейдите во вкладку `BEMJSON` в примерах блоков:

![Вкладка BEMJSON в примере блока input](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/platform/tutorials/dist-quick-start/dist-quick-start-bemjson.png)

Скопируйте код и вставьте его в скрипт с шаблоном на страницу:

```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>bem-components as a library</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
    <!-- Блок hello для создания формы приветствия -->
    <form class="hello i-bem" data-bem='{ "hello": {} }'>
        <div class="hello__greeting">Hello, %user name%!</div>
+         <script>
+             modules.define('hello', ['i-bem-dom', 'BEMHTML', 'input', 'button'],
+                 function(provide, bemDom, BEMHTML, Input, Button) {
+ 
+                provide(bemDom.declBlock('hello', {
+                     onSetMod: {
+                         js: {
+                             inited: function() {
+                                bemDom.append(this.domElem, BEMHTML.apply([ // Выполнение шаблона
+                                   {
+                                       block: 'input',
+                                       mods: {
+                                           theme: 'islands',
+                                           size: 'm'
+                                       },
+                                       placeholder: 'User name'
+                                   },
+                                   {
+                                       block: 'button',
+                                       mods: {
+                                           theme: 'islands',
+                                           size: 'm',
+                                           type: 'submit'
+                                       },
+                                       text: 'Click'
+                                   }
+                                 ]));
+
+                                 this._input = this.findChildBlock(Input);
+                            }
+                         }
+                     },
+ 
                     _onSubmit: function(e) {
                         e.preventDefault();
                        this._elem('greeting').domElem.text('Hello, ' + this._input.getVal() + '!');
                     }
                 }, {
                     onInit: function() {
                         this._domEvents().on('submit', this.prototype._onSubmit);
                     }
                 }));
             });
 
             // Вызов `init();`
             modules.require('i-bem-dom__init', function(init) { init(); });
        </script>
    </form>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js+bemhtml.js"></script>
</body>
</html>
```

Проект в [JSFiddle](https://jsfiddle.net/inna__neige/df6uuw7u/).

## Какой способ лучше?

* [Использование готового HTML](#Руководство-Работа-с-блоками-библиотеки)  
    Если в новой версии библиотеки изменится код шаблонов, которые изменят HTML-разметку блоков, потребуется исправлять разметку каждого блока на странице вручную.
* [Генерация HTML в браузере](#Альтернативный-способ-подключения-блоков)  
    Если в новой версии библиотеки обновленные шаблоны изменят разметку, исправлять шаблоны вручную не потребуется. Но генерируемая в браузере разметка хуже индексируется поисковыми системами.


## Что дальше

Библиотека bem-components в виде Dist не позволяет использовать все преимущества БЭМ-проекта: [уровни переопределения](../../../method/key-concepts/key-concepts.ru.md#Уровень-переопределения), [миксы](../../../method/key-concepts/key-concepts.ru.md#Микс) и возможность [точечной сборки проекта](../../../method/build/build.ru.md#Определение-списка-БЭМ-сущностей). Для максимально эффективного использования библиотеки, воспользуйтесь поставками [source или compiled](https://ru.bem.info/platform/libs/bem-components/6.0.0/#source-compiled).

**Не получилось?**

Если при создании формы возникли сложности, поищите решение на [форуме](https://ru.bem.info/forum/). Если готового ответа не нашлось, создайте пост со своим вопросом.
