# Dist bem-components: быстрый старт и работа с блоками

Предварительно собранные файлы ([бандлы](https://ru.bem.info/methodology/build/#Введение)) библиотеки [bem-components](https://ru.bem.info/platform/libs/bem-components/) — это самый быстрый способ попробовать блоки библиотеки в действии.

Руководство содержит пошаговую инструкцию по созданию формы приветствия пользователя и включает следующие разделы:

* [Быстрый старт](#Быстрый-старт). Как подключить библиотеку и вставить блок на страницу.
* [Руководство](#Работа-с-блоками-библиотеки). Как работать с блоками библиотеки.

## Быстрый старт

Чтобы попробовать блоки библиотеки bem-components без сборки и настройки проекта, выполните следующие шаги.

1. Создайте `.html`-файл  
  Создайте локально HTML-файл с минимальным набором элементов (например, `hello.html`): 
  
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

2. Подключите библиотеку

  Скопируйте ссылки на предсобранные файлы библиотеки с [CDN Яндекса](https://tech.yandex.ru/jslibs/) в HTML-код страницы:

  ```diff
  <!DOCTYPE HTML>
  <html>
      <head>
          <meta charset="utf-8">
          <title>Try Bem Components</title>
      </head>
      <body>
  +         <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js"></script> 
      </body>
  </html>
  ```

3. Вставьте блок на страницу  
  3.1 Откройте документацию блока (например, [input](https://ru.bem.info/platform/libs/bem-components/current/touch-phone/input)).  
  3.2 Выберите подходящий вариант использования блока (например, блок [input с модификатором type в значении search](https://ru.bem.info/platform/libs/bem-components/6.0.0/touch-phone/input/#Модификатор-type-10)).  
  3.3 Перейдите во вкладку HTML и скопируйте код.    
  ![Вкладка HTML в примере блока input](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/platform/tutorials/dist-quick-start/dist-quick-start-html.png)  
  3.4 Вставьте код блока в файл `hello.html`.  

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

4. Проверьте результат  
  Откройте файл `hello.html` в браузере. 

## Работа с блоками библиотеки

Не всегда достаточно увидеть, как выглядит блок на странице, часто нужно понять, как блоки могут взаимодействовать друг с другом. 

Чтобы научиться работать с блоками bem-components, создадим форму приветствия пользователя. Форма будет состоять из поля ввода, кнопки и фразы с приветствием. Если в поле ввода указать имя и нажать на кнопку, это имя отобразится в приветствии. 

### Создание формы приветствия

* Откройте файл `hello.html`, который вы получили в результате [быстрого старта](#Быстрый-старт).
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
1. Откройте описание блока [button](https://ru.bem.info/platform/libs/bem-components/6.0.0/touch-phone/button/#Кнопка-отправки-формы-модификатор-type-в-значении-submit-1).
2. Перейдите во вкладку HTML в примере блока и скопируйте код.
3. Вставьте код блока в файл `hello.html`. 

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

### Добавление JavaScript-реализации блокам

> **Важно!** Чтобы изменять JavaScript-реализацию блоков библиотеки bem-components, необходимо [подключать](#Подключите-библиотеку) бандлы без [автоинициализации](https://ru.bem.info/platform/i-bem/init/) (`*.no-autoinit.js`).
>
> `https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js`

Добавьте скрипт с описанием поведения блоков, чтобы имя из поля ввода появлялось в приветствии:

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

Чтобы описывать поведение блоков, используется фреймворк [i-bem.js](https://ru.bem.info/platform/i-bem/), который является частью библиотеки [bem-core](https://ru.bem.info/platform/libs/bem-core/4.2.0/). Дополнительно подключать bem-core на страницу не нужно, библиотека уже включена в предсобранные бандлы `bem-components.

Проект в [JSFiddle](https://jsfiddle.net/inna__neige/0hLmLmzn/).

## Что дальше?

Использовать готовый HTML-код — это не единственный способ получить готовый блок на странице. HTML блоков можно не копировать из примера, а генерировать в браузере.

Оба способа имеют свои ограничения:

* [Использование готового HTML](#Работа-с-блоками-библиотеки)  
    Если в новой версии библиотеки изменится код шаблонов, которые изменят HTML-разметку блоков, потребуется исправлять разметку каждого блока на странице вручную.
* [Генерация HTML в браузере](./dist-html-generation.ru.md)  
    Если в новой версии библиотеки обновленные шаблоны изменят разметку, исправлять шаблоны вручную не потребуется. Но генерируемая в браузере разметка хуже индексируется поисковыми системами.


Библиотека bem-components в виде Dist не позволяет использовать все преимущества БЭМ-проекта: [уровни переопределения](../../../method/key-concepts/key-concepts.ru.md#Уровень-переопределения), [миксы](../../../method/key-concepts/key-concepts.ru.md#Микс) и возможность [точечной сборки проекта](../../../method/build/build.ru.md#Определение-списка-БЭМ-сущностей). Для максимально эффективного использования библиотеки, воспользуйтесь поставками [source или compiled](https://ru.bem.info/platform/libs/bem-components/6.0.0/#source-compiled).

**Не получилось?**

Если при создании формы возникли сложности, поищите решение на [форуме](https://ru.bem.info/forum/). Если готового ответа не нашлось, создайте пост со своим вопросом.
