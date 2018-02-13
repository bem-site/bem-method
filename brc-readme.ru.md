# BEM React Core [![Build Status](https://travis-ci.org/bem/bem-react-core.svg?branch=master)](https://travis-ci.org/bem/bem-react-core) [![GitHub Release](https://img.shields.io/github/release/bem/bem-react-core.svg)](https://github.com/bem/bem-react-core/releases) [![devDependency Status](https://david-dm.org/bem/bem-react-core/dev-status.svg)](https://david-dm.org/bem/bem-react-core#info=devDependencies)

## Что это?
## Как работает?
## Для чего?
## Пример синтаксиса
## Установка / Как использовать
## Документация
## Команда разработки

## Что это?

bem-react-core — это библиотека для работы с React-компонентами в виде деклараций БЭМ-сущностей.

это легковесная библиотека с открытым исходным кодом

// ## Как работает?
Библиотека работает поверх обычных React-компонентов и предоставляет API для описания деклараций блоков, элементов и модификаторов. Блоки и элементы, созданные с помощью bem-react-core, полностью совместимы с любыми React-компонентами: могут использовать внутри себя готовые React-компоненты и использоваться сами в коде React-компонентов.

Библиотека предоставляет набор дополнительных методов для React-компонентов. Наравне с этим также работают нативные методы React-компонентов.

Разработка библиотеки ведется в [Open Source](https://github.com/bem/bem-react-core). Описание деклараций работает в совокупности с [особенным синтаксисом импортов](https://github.yandex-team.ru/lego/islands/blob/dev/guidelines/bem-react-import.md) нового стандарта.

## Зачем? // ## Для чего?

* Точечно управлять вариативностью компонентов, которая в обычных React-компонентах выражается через цепочку произвольных условий в коде в императивном стиле.
* Повторно использовать компоненты и переопределять их, не изменяя базовый код.
* Одновременно разрабатывать одну версию проекта для разных платформ.
* Одновременно проводить неограниченное количество экспериментов. При этом не затрагивать исходный код проекта.

> Подробнее в Motivation

## Пример синтаксиса

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

Результат:

```html
<div class='hello'>world</div>
```

Тот же код без декларации:

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


Обычный код React-компонента:

```jsx
import React from 'react';

export default class Button extends React.Component {
    render() {
        const { size, theme, children } = this.props;
        return (
            <button className={`Button Button_size_${size} Button_theme_${theme}`}>
                {children}
            </button>
        );
    }
};
```

Тот же компонент, записанный с помощью bem-react-core:

```jsx
import { decl } from 'bem-react-core';

export default decl({
    block : 'Button',
    tag: 'button',
    mods({ size, theme }) {
        return { size, theme };
    }
});
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
