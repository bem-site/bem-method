# BEM React Core [![Build Status](https://travis-ci.org/bem/bem-react-core.svg?branch=master)](https://travis-ci.org/bem/bem-react-core) [![GitHub Release](https://img.shields.io/github/release/bem/bem-react-core.svg)](https://github.com/bem/bem-react-core/releases) [![devDependency Status](https://david-dm.org/bem/bem-react-core/dev-status.svg)](https://david-dm.org/bem/bem-react-core#info=devDependencies)

Библиотека для работы с [React](https://reactjs.org/)-компонентами в виде деклараций [БЭМ-сущностей](https://ru.bem.info/methodology/key-concepts/#БЭМ-сущность). Позволяет совместить преимущества подходов [БЭМ](https://ru.bem.info/method) и React в одном проекте:

* Точечно управлять вариативностью компонентов, которая в обычных React-компонентах выражается через цепочку произвольных условий в коде в императивном стиле.
* Повторно использовать компоненты и переопределять их, не изменяя исходный код.
* Использовать уровни переопределения без применения фреймворка [i-bem.js](https://en.bem.info/platform/i-bem/) для решения разного рода задач: дифференцирования кода по платформам, проведения экспериментов, обновления подключенных в проект библиотек, управления процессом сборки.)

bem-react-core работает поверх обычных React-компонентов и предоставляет [API](./docs/ru/REFERENCE.ru.md) для описания деклараций [блоков](https://ru.bem.info/methodology/key-concepts/#Блок), [элементов](https://ru.bem.info/methodology/key-concepts/#Элемент) и [модификаторов](https://ru.bem.info/methodology/key-concepts/#Модификатор). Блоки и элементы, созданные с помощью bem-react-core, полностью совместимы с React-компонентами. Они могут использовать внутри себя готовые React-компоненты и могут сами быть вызываны в коде React-компонентов.

Библиотека предоставляет набор [дополнительных методов](./м#ссылка на раздел про методы и поля деклараций и переопределение стандартных методов react) для React-компонентов. Наравне с этим также работают стандартные методы React-компонентов.

> Подробнее о том, что [мотивировало](/docs/ru/Introduction/Motivation.md) нас создать bem-react-core.

## Пример генерации CSS-класса

Создание CSS-класса компонента `hello` с помощью декларации блока в bem-react-core:

```jsx
import {decl} from 'bem-react-core';

export default decl({
    block: 'hello',
    content() {
        return 'world';
    }
});
```

Создание CSS-класса компонента `hello` с помощью React-компонента без декларации:

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

Результат выполнения обоих скриптов будет одинаковый:

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

Читать подробнее:

* [Декларация блока](/docs/ru/Basics/Blocks.ru.md)
* [Декларация элемента](/docs/ru/Basics/Elements.ru.md)
* [Декларация модификатора](/docs/ru/Basics/Modifiers.ru.md)
* [Как перевести БЭМ-проект на bem-react-core]()

## Документация
Подробная документация на GitBook:

* Quick Start
* Базовые знания
* Расширенные руководства / Advanced guides
* Референс
* Пошаговые руководства и рецепты / Tutorials and recipes
* API Reference
* Contribution Guide
* FAQ

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
