# Релиз: enb-bh v1.0.0

Привет,

Рад сообщить, что наконец-то вышел долгожданный релиз `enb-bh` версии `1.0.0`.

О том, что же важного и вкусного произошло, расскажу в этом посте.

## Поддержка BH 4.x

Пакет поддерживает версию [шаблонизатора BH](https://ru.bem.info/technology/bh/v4.1.1/about/) 4.1.0 и выше.

Для настройки шаблонизатора BH вместо специальных опций (`jsAttrName`, `jsAttrScheme` и `clsNobaseMods`) теперь одна — [bhOptions](https://ru.bem.info/tools/bem/enb-bh/api#bhoptions). Она принимает любые [возможные натройки](https://ru.bem.info/technology/bh/v4.1.1/about/#Настройка), реализованные в самом шаблонизаторе, включая новые [jsCls](https://ru.bem.info/technology/bh/v4.1.1/about/#jscls), [jsElem](https://ru.bem.info/technology/bh/v4.1.1/about/#jselem), [escapeContent](https://ru.bem.info/technology/bh/v4.1.1/about/#escapecontent), [delimElem](https://ru.bem.info/technology/bh/v4.1.1/about/#delimelem), [delimMod](https://ru.bem.info/technology/bh/v4.1.1/about/#delimmod), [shortTags](https://ru.bem.info/technology/bh/v4.1.1/about/#shorttags).

О том, как перейти на новую версию BH, читайте в [руководстве по миграции](https://ru.bem.info/tools/bem/enb-bh/migration-1#bh-40).

## Технологии

Технологии `bh-client`, `bh-client-module` и `bh-server-include` объединены в одну технологию [bh-bundle](https://ru.bem.info/tools/bem/enb-bh/api#bh-bundle). 

Она собирает шаблоны в один файл, предназначенный для работы как в браузере, так и в Node.js. 

Для работы только в Node.js осталась технология `bh-server`, которая была переименована в [bh-commonjs](https://ru.bem.info/tools/bem/enb-bh/api#bh-commonjs).

Если запутались в том, какую технологию выбрать, читайте об этом в [руководстве по миграции](https://ru.bem.info/tools/bem/enb-bh/migration-1#Как-выбрать-технологию).

## Подключение сторонних библиотек

Появилась возможность [подключать сторонние библиотеки](https://ru.bem.info/tools/bem/enb-bh/readme#Подключение-сторонних-библиотек). Это можно сделать с помощью опции [requires](https://ru.bem.info/tools/bem/enb-bh/api#requires).

**Пример подключения:**

Подключаем библиотеку `moment` с помощью модульной системы CommonJS:

```js
{
    requires: {
        moment: {
            commonJS: 'moment'
        }
    }
}
```

Применяем подключённую библиотеку в шаблоне блока:

```js
var moment = bh.lib.moment;   // Библиотека `moment`

bh.match('post__date', function (ctx) {
    // Время в миллисекундах, полученное с сервера
    var date = moment(ctx.param.date).format('YYYY-MM-DD HH:mm:ss');

    ctx.content(date);
});
```

Подробнее обо всех остальных изменениях читайте в [истории изменений](https://ru.bem.info/tools/bem/enb-bh/changelog/).

Перед обновлением рекомендуем ознакомиться с [руководством по миграции](https://ru.bem.info/tools/bem/enb-bh/migration-1/).

Вопросы про сборщик ENB традиционно ждем на нашем форуме с [меткой enb](https://ru.bem.info/forum/?labels=enb).

Приятного использования и **Stay BEMed**!
