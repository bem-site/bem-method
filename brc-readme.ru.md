# BEM React Core [![Build Status](https://travis-ci.org/bem/bem-react-core.svg?branch=master)](https://travis-ci.org/bem/bem-react-core) [![GitHub Release](https://img.shields.io/github/release/bem/bem-react-core.svg)](https://github.com/bem/bem-react-core/releases) [![devDependency Status](https://david-dm.org/bem/bem-react-core/dev-status.svg)](https://david-dm.org/bem/bem-react-core#info=devDependencies)

Библиотека для работы с [React](https://reactjs.org/)-компонентами в виде деклараций [БЭМ-сущностей](https://ru.bem.info/methodology/key-concepts/#БЭМ-сущность).

> Подробнее про [БЭМ](https://ru.bem.info/method).

bem-react-core работает поверх обычных React-компонентов и предоставляет API для описания деклараций [блоков](https://ru.bem.info/methodology/key-concepts/#Блок), [элементов](https://ru.bem.info/methodology/key-concepts/#Элемент) и [модификаторов](https://ru.bem.info/methodology/key-concepts/#Модификатор). Блоки и элементы, созданные с помощью bem-react-core, полностью совместимы с React-компонентами: могут использовать внутри себя готовые React-компоненты и могут быть вызываны сами в коде React-компонентов.

Библиотека предоставляет набор [дополнительных методов](#ссылка на раздел про методы и поля деклараций и переопределение стандартных методов react) для React-компонентов. Наравне с этим также работают стандартные методы React-компонентов.

Разработка библиотеки ведется в [Open Source](https://github.com/bem/bem-react-core).

## Для кого?

Библиотека предназначена для тех, кто хочет совместить преимущества БЭМ и React.js в одном проекте.

Почему мы выбрали React? — Он быстрый, модульный, декларативный и модный. Компонентный подход БЭМ и React схож.

Почему вы захотите выбрать bem-react-core, если используете React?
Чтобы:

* Точечно управлять вариативностью компонентов, которая в обычных React-компонентах выражается через цепочку произвольных условий в коде в императивном стиле.
* Повторно использовать компоненты и переопределять их, не изменяя базовый код.
* Получить все, что предоставляет мощный инструмент уровни переопределения без применения фреймворка i-bem.js. (Одновременно разрабатывать одну версию проекта для разных платформ. Проводить неограниченное количество экспериментов, сохраняя рабочую версию проекта.)

> Подробнее о том, почему стоит использовать bem-react-core в [Motivation](/docs/ru/Basics/Introduction/Motivation.md).

## Пример синтаксиса декларации блока

Простой пример:

```jsx
import {decl} from 'bem-react-core';

export default decl({
    block: 'hello',
    content() {
        return 'world';
    }
});
```

Код React-компонента Тот же код без декларации:

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

Используйте БЭМ [плагин](https://github.com/bem/babel-plugin-bem-import) для Babel.

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
* Базовый уровень/Базовые знания
* Advanced Guides
* Reference
* Tutorials and recipes
* Where to Get Support
* Contribution Guide

Вы всегда можете улучшить документацию, прислав свой пулл реквест или создав ишью.

## Разработка

получите исходные файлы:

> git clone git://github.com/bem/bem-react-core.git
> cd bem-react-core

Установите зависимости:

> npm i

Установите линтер для кода:

> npm run lint

Запустите тесты:

> npm test

## Команда разработки


## Лицензия

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).



Декларации

Описание деклараций работает в совокупности с [особенным синтаксисом импортов](https://github.yandex-team.ru/lego/islands/blob/dev/guidelines/bem-react-import.md) нового стандарта.

