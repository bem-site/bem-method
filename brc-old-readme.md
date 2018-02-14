Старый вариант ридми


# BEM React Core [![Build Status](https://travis-ci.org/bem/bem-react-core.svg?branch=master)](https://travis-ci.org/bem/bem-react-core) [![GitHub Release](https://img.shields.io/github/release/bem/bem-react-core.svg)](https://github.com/bem/bem-react-core/releases) [![devDependency Status](https://david-dm.org/bem/bem-react-core/dev-status.svg)](https://david-dm.org/bem/bem-react-core#info=devDependencies)

Библиотека для работы с [React](https://reactjs.org/)-компонентами в виде деклараций [БЭМ-сущностей](https://ru.bem.info/methodology/key-concepts/#БЭМ-сущность).

> Подробнее про [БЭМ](https://ru.bem.info/method).

bem-react-core работает поверх обычных React-компонентов и предоставляет API для описания деклараций [блоков](https://ru.bem.info/methodology/key-concepts/#Блок), [элементов](https://ru.bem.info/methodology/key-concepts/#Элемент) и [модификаторов](https://ru.bem.info/methodology/key-concepts/#Модификатор). Блоки и элементы, созданные с помощью bem-react-core, полностью совместимы с React-компонентами: могут использовать внутри себя готовые React-компоненты и могут быть вызываны сами в коде React-компонентов.

Библиотека предоставляет набор [дополнительных методов](./м#ссылка на раздел про методы и поля деклараций и переопределение стандартных методов react) для React-компонентов. Наравне с этим также работают стандартные методы React-компонентов.

Разработка библиотеки ведется в [Open Source](https://github.com/bem/bem-react-core).

## Для кого?

Библиотека предназначена для тех, кто хочет совместить преимущества подходов БЭМ и React в одном проекте.

Почему мы выбрали React? — React быстрый, модульный, декларативный и модный.

bem-react-core дает возможность в вашем проекте на React:

* Точечно управлять вариативностью компонентов, которая в обычных React-компонентах выражается через цепочку произвольных условий в коде в императивном стиле.
* Повторно использовать компоненты и переопределять их, не изменяя базовый код.
* Получить все, что предоставляет мощный инструмент уровни переопределения без применения фреймворка [i-bem.js](https://en.bem.info/platform/i-bem/). (Дифференцировать код для разных платформ. Одновременно проводить неограниченное количество экспериментов, сохраняя рабочую версию проекта.)

> Подробнее о том, почему стоит использовать bem-react-core в [Motivation](/docs/ru/Introduction/Motivation.md).

## Пример синтаксиса

Пример декларации блока:

```jsx
import {decl} from 'bem-react-core';

export default decl({
    block: 'hello',
    content() {
        return 'world';
    }
});
```

Код React-компонента без декларации:

```jsx
import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return (
            <div className='hello'>world</div>
        );
    }
}
```

Результат одинаковый:

```html
<div class='hello'>world</div>
```

Как вариант, показать так:

```diff Button.jsx
- import React, {Component} from 'react';
+ import {decl} from 'bem-react-core';

- export default class Hello extends Component {
+ export default decl({
-     render() {
+     block: 'hello',
+     content() {
-         return (
-             <div className='hello'>world</div>
+         return 'world';
-         );
-     }
- }
+     }
+ });
```

* [Декларация блока](/docs/ru/Basics/Blocks.ru.md)
* [Декларация элемента](/docs/ru/Basics/Elements.ru.md)
* [Декларация модификатора](/docs/ru/Basics/Modifiers.ru.md)


## Как использовать

### Установка

```
npm i -S bem-react-core

yarn add bem-react-core
```
> Подробнее о менеджере пакетов [Yarn](https://yarnpkg.com/en/).

Здесь будут ссылки на:
* Быстрый старт
* Создание своего проекта на bem-react-core
* Перевод БЭМ-проекта на React с помощью bem-react-core

### Сборка

#### webpack

Используйте специальный [загрузчик](https://github.com/bem/webpack-bem-loader) для webpack.

> npm i -D webpack-bem-loader babel-core

__webpack.config.js__
``` js
// ...
module : {
    loaders : [
        {
            test : /\.js$/,
            exclude : /node_modules/,
            loaders : ['webpack-bem', 'babel']
        },
        // ...
    ],
    // ...
},
bemLoader : {
    techs : ['js', 'css'],
    levels : [
        `${__dirname}/common.blocks`,
        `${__dirname}/desktop.blocks`,
        // ...
    ]
}
// ...
```

#### Babel

Используйте [плагин](https://github.com/bem/babel-plugin-bem-import) для Babel.

> npm i -D babel-plugin-bem-import

__.babelrc__
``` json
{
  "plugins" : [
    ["bem-import", {
      "levels" : [
        "./common.blocks",
        "./desktop.blocks"
      ],
      "techs" : ["js", "css"]
    }]
  ]
}
```

## Документация
Подробная документация на gitbook или на bem.info разделена на отдельные секции:

* Quick Start
* Базовые знания
* Расширенные руководства / Advanced guides
* Референс
* Пошаговые руководства и рецепты / Tutorials and recipes
* API Reference
* Contribution Guide
* FAQ

Вы всегда можете улучшить документацию, прислав свой pull request или создав задачу на Github.

## Разработка

Получите исходные файлы:

```
git clone git://github.com/bem/bem-react-core.git
cd bem-react-core
```

Установите зависимости:

```
npm i
```

Установите линтер:

```
npm run lint
```

Запустите тесты:

```
npm test
```

## Команда разработки

[@veged](https://github.com/veged)
[@awinogradov ](https://github.com/awinogradov)
[@Yeti-or](https://github.com/Yeti-or)

## Лицензия

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
