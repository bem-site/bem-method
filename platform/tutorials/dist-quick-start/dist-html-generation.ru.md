# Dist bem-components: генерация HTML-разметки блока в браузере

Руководство показывает, как генерировать HTML-разметку блока в браузере с помощью [предсобранных бандлов](https://tech.yandex.ru/jslibs/) библиотеки [bem-components](https://ru.bem.info/platform/libs/bem-components/). 

* [Начало работы](#Начало-работы)
* [Подключение библиотеки](#Подключение-библиотеки)
* [Добавление блока на страницу](#Добавление-блока-на-страницу)
* [Что дальше?](#Что-дальше)

## Начало работы

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

## Подключение библиотеки

Предсобранные бандлы библиотеки bem-components можно скопировать с [CDN Яндекса](https://tech.yandex.ru/jslibs/).

Чтобы генерировать HTML-разметку блока в браузере, необходимо подключить бандл с шаблонизатором (`*.js+bemhtml.js`): 

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
+   <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js+bemhtml.js"></script>
</body>
</html>
```

В бандлы с расширением `*.js+bemhtml.js` включен шаблонизатор [BEMHTML](https://ru.bem.info/platform/bem-xjst/8/), который преобразует [BEMJSON](https://ru.bem.info/platform/bemjson/) в HTML.

## Добавление блока на страницу

Чтобы добавить блоки на страницу, выполните следующие действия:
  1. Откройте документацию блока (например, [input](https://ru.bem.info/platform/libs/bem-components/current/touch-phone/input)).
  2. Выберите подходящий вариант использования блока (например, блок [input с модификатором type в значении search](https://ru.bem.info/platform/libs/bem-components/6.0.0/touch-phone/input/#Модификатор-type-10)).
  3. Перейдите во вкладку BEMJSON.  
  ![Вкладка BEMJSON в примере блока input](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/platform/tutorials/dist-quick-start/dist-quick-start-bemjson.png)
  4. Скопируйте код и вставьте его в скрипт с шаблоном на страницу:

```diff
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>bem-components as a library</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
+         <script>
+             modules.define('hello', ['i-bem-dom', 'BEMHTML', 'input'],
+                 function(provide, bemDom, BEMHTML, Input) {
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
+                                   }
+                                 ]));
+
+                                 this._input = this.findChildBlock(Input);
+                            }
+                         }
+                     },
        </script>
    </form>
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.no-autoinit.js+bemhtml.js"></script>
</body>
</html>
```

Чтобы проверить результат, откройте файл `hello.html` в браузере.

> Проект в [JSFiddle](https://jsfiddle.net/inna__neige/df6uuw7u/). Содержит реализацию [формы приветствия](./dist-quick-start.ru.md#) с помощью генерации HTML-разметки блока в браузере. 

## Что дальше?

Библиотека bem-components в виде Dist не позволяет использовать все преимущества БЭМ-проекта: [уровни переопределения](../../../method/key-concepts/key-concepts.ru.md#Уровень-переопределения), [миксы](../../../method/key-concepts/key-concepts.ru.md#Микс) и возможность [точечной сборки проекта](../../../method/build/build.ru.md#Определение-списка-БЭМ-сущностей). Для максимально эффективного использования библиотеки, воспользуйтесь поставками [source или compiled](https://ru.bem.info/platform/libs/bem-components/6.0.0/#source-compiled).

**Не получилось?**

Если при создании формы возникли сложности, поищите решение на [форуме](https://ru.bem.info/forum/). Если готового ответа не нашлось, создайте пост со своим вопросом.
