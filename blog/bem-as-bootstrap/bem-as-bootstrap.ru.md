# dist-поставка bem-core и bem-components, или Использование в стиле «как Бутстрап»

Привет!

Если вам интересно, как можно подключать наши bem-библиотеки на свой проект, этот пост для вас.

Существует несколько способов подключения bem-библиотек на свой проект.

Здесь я рассмотрю варианты подключения заранее собранных версий.

Их 4:

1. Подключить напрямую с CDN Яндекса
2. Установить собранные библиотеки через bower
3. Самостоятельно собрать из исходников
4. Воспользоваться альфа-версией кастомного билдера

Каждый вариант отличается только первым шагом, дальнейшее использование совпадает.

## Подключить напрямую с CDN Яндекса

Это самый простой способ. Достаточно подключить необходимые файлы (см. раздел «Состав») в HTML, и готово:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>bem-components dist</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
    <!-- write your code here -->
    <script src="https://yastatic.net/bem-components/latest/desktop/bem-components.js+bh.js"></script>
</body>
</html>
```

Более полный вариант базовой HTML-разметки, включающий поддержку IE8 и определение наличия JS в браузере ищите в конце поста.

## Установить собранные библиотеки через bower

При условии, что `bower` у вас уже установлен, достаточно выполнить
`bower i bem/bem-components-dist#v2` (либо `bower i bem/bem-core-dist#v2`).

Далее просто прописать путь к необходимым файлам в HTML:
```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>bem-components dist</title>
    <link rel="stylesheet" href="bower_components/bem-components-dist/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
    <!-- write your code here -->
    <script src="bower_components/bem-components-dist/desktop/bem-components.js+bh.js"></script>
</body>
</html>
```

## Самостоятельно собрать из исходников

Этот вариант подойдет тем, кто хочет собрать еще не выпущенную версию.

Для этого потребуется:
```sh
git clone https://github.com/bem/bem-components.git
cd bem-components
npm i
npm run dist
```

В результате в корне `bem-components` появится папка `dist` со всеми необходимыми файлами.

Подключение не отличается от предыдущего варианта.

## Воспользоваться альфа-версией кастомного билдера

**Важно**: На данный момент билдер не поддерживает многих необходимых возможностей, не тестируется, и в целом работоспособность сервиса никак не гарантируется. 
Вы можете использовать его, но на собственный страх и риск.

В качестве эксперимента поднята [веб-морда](http://188.226.152.208:9000/), позволяющая собрать код только для необходимых на проекте блоков.

Чтобы получить CSS и JS бандлы (остальное пока не поддерживается), нужно отметить нужные блоки. В ответ будут сгенерированы ссылки на скачивание.

## Как работать с подключенными библиотеками

Здесь снова возникает несколько вариантов.

Общая часть состоит в том, чтобы найти нужные блоки на [bem.info](https://ru.bem.info/).

Допустим, нужен блок `select`. Среди примеров нужно найти тот, [который больше всего подходит](https://ru.bem.info/libs/bem-components/current/desktop/select/#Список-с-одиночным-обязательным-выбором-модификатор-mode-в-значении-radio).

Далее 3 варианта:

1. Просто скопировать нужный HTML из примера и поправить его под свои нужды (для этого нужно нажать на HTML в шапке примера).
Этот вариант максимально простой, но очевидно, что при обновлении шаблонов в последующих версиях библиотеки апдейт потребует ручного внесения изменений в каждый обновленный блок.

2. Воспользоваться шаблонизацией на клиенте (dist включает предсобранные шаблоны BEMHTML и BH на выбор).

Для этого вместо готового HTML-кода следует брать из документации с примерами BEMJSON (кнопка рядом). Получится что-то типа:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>bem-components as a library</title>
    <link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css">
</head>
<body class="page page_theme_islands">
<script src="https://yastatic.net/bem-components/latest/desktop/bem-components.js+bemhtml.js"></script>
<script>
modules.require(['i-bem__dom', 'BEMHTML', 'jquery'], function(BEMDOM, BEMHTML, $) {
    var html = BEMHTML.apply({
        block : 'select',
        mods : { mode : 'check', theme : 'islands', size : 'm' },
        name : 'select1',
        val : [2, 3],
        text : 'Программа конференции',
        options : [
            { val : 1, text : 'Доклад' },
            { val : 2, text : 'Мастер-класс' },
            { val : 3, text : 'Круглый стол' }
        ]
    });

    BEMDOM.append($('.page'), html);
});
</script>
</body>
</html>
```

Такой код гораздо удобнее обновлять, но он не будет индексироваться, поэтому подойдет скорее для веб-приложений и прочих админок.

3. Выполнять `{BEMHTML,BH}.apply()` на ноде и отдавать браузеру уже готовый HTML:

    
```js
var BEMHTML = require('./dist/desktop/bem-components.bemhtml.js').BEMHTML;

BEMHTML.apply({
    block : 'select',
    mods : { mode : 'check', theme : 'islands', size : 'm' },
    name : 'select1',
    val : [2, 3],
    text : 'Программа конференции',
    options : [
        { val : 1, text : 'Доклад' },
        { val : 2, text : 'Мастер-класс' },
        { val : 3, text : 'Круглый стол' }
    ]
}); // вернется HTML-строка
```

Разумеется, все три варианта можно произвольно комбинировать.

## Как еще можно пользоваться dist-ом

Так как файлы теперь доступны с CDN, можно использовать их на разнообраных песочницах вроде jsfiddle: https://jsfiddle.net/bmu7bkne/4/ или http://jsfiddle.net/bmu7bkne/

## Состав

### bem-core

Доступны отдельные наборы файлов для двух платформ:
* desktop
* touch

Каждый набор включает в себя:
* bem-core.css # стили
* bem-core.js # JS
* bem-core.bemhtml.js # [BEMHTML-шаблоны](https://ru.bem.info/technology/bemhtml/)
* bem-core.bh.js # [BH-шаблоны](https://ru.bem.info/technology/bh/)
* bem-core.js+bemhtml.js # JS + BEMHTML
* bem-core.js+bh.js # JS + BH

И аналогичные dev-версии (с сохранием форматирования и комментариев):
* bem-core.dev.css
* bem-core.dev.js
* bem-core.dev.bemhtml.js
* bem-core.dev.bh.js
* bem-core.dev.js+bemhtml.js
* bem-core.dev.js+bh.js

### bem-components

На данный момент доступны отдельные наборы файлов для трех платформ:
* desktop
* touch-pad
* touch-phone

Однако каких-либо отличий в коде между `touch-pad` и `touch-phone` нет, поэтому планируется их объединение.

Каждый набор включает в себя:
* bem-components.css # стили
* bem-components.ie.css # стили для IE8 ([подробнее](https://ru.bem.info/libs/bem-components/v2.2.1/#%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0-internet-explorer-8))
* bem-components.js # JS
* bem-components.bemhtml.js # BEMHTML-шаблоны
* bem-components.bh.js # BH-шаблоны
* bem-components.js+bemhtml.js
* bem-components.js+bh.js

И аналогичные dev-версии (с сохранием форматирования и комментариев):
* bem-components.dev.css
* bem-components.dev.ie.css
* bem-components.dev.js
* bem-components.dev.bemhtml.js
* bem-components.dev.bh.js
* bem-components.dev.js+bemhtml.js
* bem-components.dev.js+bh.js

Схема подключения с CDN: `//yastatic.net/название-библиотеки/версия/платформа/имя-файла`

Например, `//yastatic.net/bem-components/latest/desktop/bem-components.dev.js+bh.js`

## Полный вариант базовой HTML-разметки

```html
<!DOCTYPE html>
<html class="ua_js_no">
<head>
    <!--[if lt IE 9]><script src="https://yastatic.net/es5-shims/0.0.1/es5-shims.min.js"></script><![endif]-->
    <meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>bem-components dist</title>
    <script>(function(e,c){e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");})(document.documentElement,"className");(function(d,n){d.documentElement.className+=" ua_svg_"+(d[n]&&d[n]("http://www.w3.org/2000/svg","svg").createSVGRect?"yes":"no");})(document,"createElementNS");</script>
    <!--[if gt IE 8]><!--><link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.css"/>
    <!--<![endif]--><!--[if lte IE 8]><link rel="stylesheet" href="https://yastatic.net/bem-components/latest/desktop/bem-components.ie.css"/><![endif]-->
</head>
<body class="page page_theme_islands">
<!-- write your code here -->
<script src="https://yastatic.net/bem-components/latest/desktop/bem-components.js+bh.js"></script>
</body>
</html>
```
Обсуждение топика ведется на [форуме](https://ru.bem.info/forum/469/).

**Stay BEMed!**
