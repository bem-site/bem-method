# BEM React Core

Библиотека для описания React-компонентов в виде деклараций БЭМ-сущностей. Библиотека работает поверх обычных React-компонентов и предоставляет набор функций для описания деклараций блоков, элементов и модификаторов, а также набор дополнительных методов для React-компонентов, синтаксис которых схож с модами `BEMHTML`. Наравне с этим также работают нативные методы React-компонентов. Разработка библиотеки ведётся в [Open Source](https://github.com/bem/bem-react-core). Описание деклараций работает в совокупности с [особенным синтаксисом импортов](https://github.yandex-team.ru/lego/islands/blob/dev/guidelines/bem-react-import.md) нового стандарта.




* что это?
* как работает(общее описание)?
* зачем?/что полезного дает пользователю?
* примеры деклараций блока/эелемента/модификатора
* Стандартные методы и поля деклараций
* Доопределение стандартных методов React



Библиотека с открытым исходным кодом для работы с [React]()-компонентами в виде деклараций [БЭМ-сущностей]().

bem-react-core работает поверх обычных React-компонентов и предоставляет API для описания деклараций [блоков](), [элементов]() и [модификаторов](). Блоки и элементы, созданные с помощью bem-react-core, полностью совместимы с любыми React-компонентами: могут использовать готовые React-компоненты и сами использоваться в коде React-компонентов.

bem-react-core позволяет:

* Декомпозиция и оптимизация. Разделить сложные компоненты на отдельные части, разложить каждую вариацию компонента в отдельный модификатор и декларировать поведение компонента в зависимости от подключенного модификатора. Это дает возможность сочетать любые модификтаоры в рантайме в производльной комбинации на одном инстансе, избавиться от конструкций `if` или `switch`.

* Уровни переопределния. Переопределять компонент (дописать, не изменяя базовый код). Переиспользовать код. Проводить эксперименты. Подключать только нужный код по декларации с нужных уровней переопределения.

* Миксины.

* Единый механизм подключения технологий компонента.
* Возможность подключать декларации блоков, элементов и модификаторов с разных уровней переопределения без указания пути. Реализуется за счет особенного импорта React-компонентов.

Пример декларации компонента

| bem-react-core | React.Components |
|-----|-----|
| ``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'hello',
    content() {
        return 'world';
    }
});
``` | ``` js
import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return (
            <div className='hello'>world</div>
        );
    }
}
```
 |
| Результат | Результат |
| ``` html
<div class='hello'>world</div>
``` | ``` html
<div class='hello'>world</div>
``` |








``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'hello',
    content() {
        return 'world';
    }
});
```

Результат:
``` html
<div class='hello'>world</div>
```

Тот же код без декларации:
``` js
import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return (
            <div className='hello'>world</div>
        );
    }
}
```

## Декларации

#### Блок

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    content() {
        return 'content goes here';
    }
});
```
Результат:
``` html
<div class='my-block'>content goes here</div>
```

#### Элемент

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    elem: 'my-elem',
    content() {
        return 'elem content goes here';
    }
});
```
Результат:
``` html
<div class='my-block__my-elem'>elem content goes here</div>
```

#### Модификатор

Декларация модификатора принимает первым аргументом функцию-матчер, которая возвращает значение булева типа. Функция-матчер в качестве аргумента принимает объект пропсов и может содержать любые условия. Если функция-матчер возвращает положительное значение, декларация применяется к сущности.

``` js
import {declMod} from 'bem-react-core';

export default declMod(({theme}) => theme === 'normal', {
    block: 'my-block',
    mods({theme}) {
        return {theme};
    },
    content() {
        return 'content with theme normal goes here';
    }
});

// <MyBlock theme='normal' />
```
Результат:
``` html
<div class='my-block my-block_theme_normal'>content with theme normal goes here</div>
```

#### Булевые модификаторы

``` js
import {declMod} from 'bem-react-core';

export default declMod(({simple}) => simple, {
    block: 'my-block',
    mods({simple}) {
        return {simple};
    },
    content() {
        return 'content with simple goes here';
    }
});

// <MyBlock simple />
```
Результат:
``` html
<div class='my-block my-block_simple'>content with simple goes here</div>
```

#### Несколько модификаторов

``` js
export default declMod(({theme}) => theme === 'normal', {
    // ...
    mods({theme}) {
        return {...this.__base.apply(this, arguments), theme};
    },
    // ...
});

export default declMod(({simple}) => simple, {
    // ...
    mods({simple}) {
        return {...this.__base.apply(this, arguments), simple};
    },
    // ...
});

// <MyBlock theme='normal' simple />
```
Результат:
``` html
<div class='my-block my-block_theme_normal my-block_simple'>content with simple goes here</div>
```

## Стандартные методы и поля деклараций

Все методы деклараций принимают в качестве аргумента объект пропсов. Исключение составляют метод `wrap`, который принимает в качестве аргумента сам компонент, и метод `content`, который кроме пропсов в качестве первого аргумента принимает поле пропсов `children` в качестве второго. Второй аргумент был добавлен для удобства, так как это поле используется чаще остальных.

#### block

Имя блока. Будет транслировано в соответствующий класс узла.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    // ...
});
// <MyBlock />
```
Результат:
``` html
<div class='my-block'></div>
```

#### elem

Имя элемента блока. Транслируется в соответствующий класс узла.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    elem: 'my-elem',
    // ...
});
// <MyBlockElem />
```
Результат:
``` html
<div class='my-block__my-elem'></div>
```

#### tag

HTML-тэг узла. По умолчанию `div`.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    tag: 'span',
    // ...
});

// <MyBlock />
```
Результат:
``` html
<span class='my-block'></span>
```

#### attrs

HTML-атрибуты узла.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    attrs({id}) {
        return {id, tabIndex: -1}
    },
    // ...
});

// <MyBlock id='the-id' />
```
Результат:
``` html
<div class='my-block' id='the-id' tabindex='-1'></div>
```

#### mods

Модификаторы сущности. Весь список будет транслирован в соответствующие классы узла.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    mods({disabled}) {
        return {disabled, forever: 'together'}
    },
    // ...
});

// <MyBlock disabled />
```
Результат:
``` html
<div class='my-block my-block_forever_together my-block_disabled'></div>
```

#### content

Контент узла.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    content({greeting}, children) {
        return `${greeting}, ${children}`;
    },
    // ...
});

// <MyBlock greeting='Mr'>grape</MyBlock>
```
Результат:
``` html
<div class='my-block'>Mr, grape</div>
```

#### wrap

Специальный метод, позволяющий обернуть компонент в дополнительный узел.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    wrap(component) {
        return (
            <section>{component}</section>
        );
    },
    // ...
});

// <MyBlock />
```
Результат:
``` html
<section><div class='my-block'></div></section>
```

## Стандартные методы React

#### Lifecycle hooks

Доопределение методов React заключалось в переименовании ‒ имена теперь не содержат слова `component`. Это позволяет работать в терминах БЭМ, кроме того, эти методы могут быть доопределены на других уровнях. Официальная документация [тут](https://facebook.github.io/react/docs/react-component.html).

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    willMount() {
        // оригинальное имя: componentWillMount
    },
    didMount() {
        // оригинальное имя: componentDidMount
    },
    willReceiveProps() {
        // оригинальное имя: componentWillReceiveProps
    },
    shouldUpdate() {
        // оригинальное имя: shouldComponentUpdate
    },
    willUpdate() {
        // оригинальное имя: componentWillUpdate
    },
    didUpdate() {
        // оригинальное имя: componentDidUpdate
    },
    willUnmount() {
        // оригинальное имя: componentWillUnmount
    }
    // ...
});
```

#### Конструктор

Базовый конструктор также был доопределен, чтобы обеспечить гибкое доопределение на других уровнях.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    willInit() {
        // оригинальное имя: constructor
    },
    // ...
});
```

Остальные методы остались без изменений.

__NB:__ метод `render` перезаписывает весь узел целиком, при его использовании игнорируется генерация классов, стандартные поля и методы декларации (иногда это действительно необходимо).

## Механизм доопределений

Любое поле или метод декларации могут быть доопределены на других уровнях. Это возможно благодаря особенному наследованию, которое реализуется с помощью модуля [inherit](https://github.com/dfilatov/inherit). Доопределяться могут как стандартные методы и поля декларации, так и доопределенные методы React.

Например, описываем блок на уровне 1:
``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    attrs({id}) {
        return {id};
    },
    content({greeting}, children) {
        return `${greeting}, ${children}.`;
    }
});
```
И доопределяем его на уровне 2:
``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    attrs() {
        return {...this.__base.apply(this, arguments), tabIndex: -1};
    },
    content({message}) {
        return `${this.__base.apply(this, arguments)} ${message}.`;
    }
});

// <MyBlock id='the-id' greeting='Mr' message='I love you!'>grape</MyBlock>
```

Результат:
``` html
<div class='my-block' id='the-id' tabindex='-1'>Mr, grape. I love you!</div>
```

## Биндинги

Стандартные биндинги передаются через метод `attrs` наравне с атрибутами узла. Как и в оригинальном классе, они декларируются в виде метода класса.

``` js
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    willInit() {
        this.onClick = this.onClick.bind(this);
    },
    attrs() {
        return {onClick: this.onClick};
    },
    onClick(e) {
        console.log('Wow! You can click!');
    }
});
```

## Статические методы

Декларируются вторым аргументом функции декларации `decl` или `declMod`.

``` js
import {PropTypes} from 'prop-types';
import {decl} from 'bem-react-core';

export default decl({
    block: 'my-block',
    content() {
        return this.__self.customMethod();
    }
}, {
    propsTypes: {
        theme: PropTypes.string.isRequired,
        size: PropTypes.oneOf(['s', 'm', 'l'])
    },
    defaultProps: {
        theme: 'normal'
    },
    customMethod() {
        console.log('static method call');
        return 'default content';
    }
});
```

## Наследование

В отличие от `i-bem` реализации, элементы в `bem-react-core` обладают абсолютно теми же свойствами и возможностями, что и блоки. Благодаря этому мы можем наследовать не только блоки от других блоков, но и элементы от блоков и блоки от элементов.

``` js
export default decl(Entity, {
    block: 'my-block'
});

export default decl(Entity, {
    block: 'my-block',
    elem: 'my-elem'
});
```

Также допустимо наследование от нескольких сущностей.

``` js
export default decl([Entity1, Entity2, ...], {
    block: 'my-block'
});

export default decl([Entity1, Entity2, ...], {
    block: 'my-block',
    elem: 'my-elem'
});
```













# bem-react-core













В БЭМ и в react каждый блок рассматривается и разрабатывается изолировано

БЭМ делит UI на независимые повторно используемые части.


что это

зачем

что внутри

как это работает




* Introduction
  * Motivation
  * Core Concepts

Библиотека, которая работает поверх реакт компонентов
Декларации позволяют вариативность компонентов раздложить по разным модификаторам и подключать в нужный момент.

декомпозиция - компонненты сложные и не всегда все нужно
декларативность

интуитивная композиция - миксины
единый механизм подключения технологий компонента
уровни переопределения
Переопределять — дописать, не изменяя базовый код.

дефолтный рендер


Множество одинаковых вариаций рождает спагетти код из jf или switch. Если такая кнопка, то примени этот код, если другая, примени тот.
Такой подход не позволит вам создать нужную комбинацию классов, которые должны сочетаться в рантайме.
БЭМ позволяет декларировать поведение, HTML в зависимости от модификаторов, и главное — сочетать эти модификтаоры в рантайме в производльной комбинации на одном инстансе.

Размер собранного
в реакте получаете все виды компонента, даже если они вам не нужны
в БЭМ подключается только нужный код

Реиспользование кода — урони переопределения

A/B тестирование



* Basics
  * Blocks
  * Elements
  * Modifiers
  * BEM Component
  * Build configuration

* Advanced
  * Mixes
  * Redefinition levels
  * Import notation
  * Inheritance
  * HOC
  * Not only React

* Recipes
  * Migrating existing project
  * Server rendering
  * Writing Tests
  * Redux connection
  * BEM Config
  * Production build

* API Reference

* FAQ

## Реакт итак модульный. Каждый компонент итак изолирован. Зачем БЭМ?
возможность отказаться от цепочки с if/when и не думать, что будет "если")

В чем принципиальная разница:
А вообще разница i-bem и React во взаимодействии с dom
В i-bem — dom настоящий и взаимодействие событийное, а в React dom виртуальный и взаимодействие потоковое

### как работает React
Вся структура веб-страницы может быть представлена с помощью DOM (Document Object Model)- организация элементов html, которыми мы можем манипулировать, изменять, удалять или добавлять новые. Для взаимодействия с DOM применяется язык JavaScript. Однако когда мы пытаемся манипулировать html-элементами с помощью JavaScript, то мы можем столкнуться со снижением производительности, особенно при изменении большого количества элементов. А операции над элементами могут занять некоторое время, что неизбежно скажется на пользовательском опыте. Однако если бы мы работали из кода js с объектами JavaScript, то операции производились бы быстрее.

Для решения проблемы производительности как раз и появилась концепция виртуального DOM.

Виртуальный DOM представляет легковесную копию обычного DOM. И отличительной особенностью React является то, что данная библиотека работает именно с виртуальным DOM, а не обычным.

Если приложению нужно узнать информацию о состоянии элементов, то происходит обращение к виртуальному DOM.

Если необходимо изменить элементы веб-страницы, то изменения вначале вносятся в виртуальный DOM. Потом новое состояние виртуального DOM сравнивается с текущим состоянием. И если эти состояния различаются, то React находит минимальное количество манипуляций, которые необходимы до обновления реального DOM до нового состояния и производит их.

В итоге такая схема взаимодействия с элементами веб-страницы работает гораздо быстрее и эффективнее, чем если бы мы работали из JavaScript с DOM напрямую.

### Как работает i-bem

итак благодаря декларации точечно пересобирает только нужно и только то, что изменилось.




* Troubleshooting

* Change Log

* Feedback


### Motivation

Here are just a few of the reasons why people choose to program with React:

React is fast. Apps made in React can handle complex updates and still feel quick and responsive. React is modular. Instead of writing large, dense files of code, you can write many smaller, reusable files. React's modularity can be a beautiful solution to JavaScript's maintainability problems. React is scalable. Large programs that display a lot of changing data are where React performs best. React is flexible. You can use React for interesting projects that have nothing to do with making a web app. People are still figuring out React's potential. There's room to explore. React is popular. While this reason has admittedly little to do with React's quality, the truth is that understanding React will make you more employable.
























# bem-react-core

* что это?
* как работает(общее описание)?
* зачем?/что полезного дает пользователю?
* примеры деклараций блока/эелемента/модификатора
* Стандартные методы и поля деклараций
* Доопределение стандартных методов React



bem-react-core — это библиотека для работы с React-компонентами в виде деклараций БЭМ-сущностей.

Библиотека работает поверх обычных React-компонентов и предоставляет API для описания деклараций блоков, элементов и модификаторов. Блоки и элементы, созданные с помощью bem-react-core, полностью совместимы с любыми React-компонентами: могут использовать внутри себя готовые React-компоненты и использоваться сами в коде React-компонентов.

Зачем реакту декларативный стиль БЭМ?

Благодаря декларативному подходу bem-react-core позволяет:

* точечно задавать/управлять вариативностью компонентов: разделить сложные компоненты на отдельные части, разложить каждую вариацию по модификаторам и подключать только нужные. Это позволит сочетать любые модификтаоры в рантайме в производльной комбинации на одном инстансе, избавиться от длинных конструкций if или switch.

* продолжать использовать миксины, хотя React от них отказался.
* переопределять компонент — дописать, не изменяя базовый код.
* использовать уровни переопределния

Оптимизация кода:
**React**
Спагетти код из if или switch. Всегда получим все вариации компонента, даже если они узко специфичны и не нужны в проекте.

**БЭМ**
Декларируем поведение в зависимости от подключенного модификатора. Можно сочетать любые модификтаоры в рантайме в производльной комбинации на одном инстансе.

Миксины:
**React**
Не использует миксины.

**БЭМ**
Облегчили код, продолжаем использовтаь миксины.

Работа с кодом:
**React**
Чтобы изменить компонент, пишем новый на основе импорта или добавляем очередной if.

**БЭМ**
Возможность переопределять компонент — дописать, не изменяя базовый код.

**React**


**БЭМ**
Переиспользование кода благодаря уровням переопределения.

Размер собранного:
**React**
Получаем все виды комопонента, даже если они не используются в проекте.

**БЭМ**
Подключение только нужного кода по декларации.


















React-компоненты, записанные в виде деклараций БЭМ-сущностей позволяют:



вариативность компонентов раздложить по разным модификаторам и подключать в нужный момент.

декомпозиция - компонненты сложные и не всегда все нужно
декларативность

интуитивная композиция - миксины
единый механизм подключения технологий компонента
уровни переопределения
Переопределять — дописать, не изменяя базовый код.

дефолтный рендер


Множество одинаковых вариаций рождает спагетти код из jf или switch. Если такая кнопка, то примени этот код, если другая, примени тот.
Такой подход не позволит вам создать нужную комбинацию классов, которые должны сочетаться в рантайме.
БЭМ позволяет декларировать поведение, HTML в зависимости от модификаторов, и главное — сочетать эти модификтаоры в рантайме в производльной комбинации на одном инстансе.

Размер собранного
в реакте получаете все виды компонента, даже если они вам не нужны
в БЭМ подключается только нужный код

Реиспользование кода — урони переопределения

A/B тестирование














В БЭМ и в react каждый блок рассматривается и разрабатывается изолировано

БЭМ делит UI на независимые повторно используемые части.


что это

зачем

что внутри

как это работает




* Introduction
  * Motivation
  * Core Concepts

Библиотека, которая работает поверх реакт компонентов
Декларации позволяют вариативность компонентов раздложить по разным модификаторам и подключать в нужный момент.

декомпозиция - компонненты сложные и не всегда все нужно
декларативность

интуитивная композиция - миксины
единый механизм подключения технологий компонента
уровни переопределения
Переопределять — дописать, не изменяя базовый код.

дефолтный рендер


Множество одинаковых вариаций рождает спагетти код из jf или switch. Если такая кнопка, то примени этот код, если другая, примени тот.
Такой подход не позволит вам создать нужную комбинацию классов, которые должны сочетаться в рантайме.
БЭМ позволяет декларировать поведение, HTML в зависимости от модификаторов, и главное — сочетать эти модификтаоры в рантайме в производльной комбинации на одном инстансе.

Размер собранного
в реакте получаете все виды компонента, даже если они вам не нужны
в БЭМ подключается только нужный код

Реиспользование кода — урони переопределения

A/B тестирование



* Basics
  * Blocks
  * Elements
  * Modifiers
  * BEM Component
  * Build configuration

* Advanced
  * Mixes
  * Redefinition levels
  * Import notation
  * Inheritance
  * HOC
  * Not only React

* Recipes
  * Migrating existing project
  * Server rendering
  * Writing Tests
  * Redux connection
  * BEM Config
  * Production build

* API Reference

* FAQ

## Реакт итак модульный. Каждый компонент итак изолирован. Зачем БЭМ?
возможность отказаться от цепочки с if/when и не думать, что будет "если")

В чем принципиальная разница:
А вообще разница i-bem и React во взаимодействии с dom
В i-bem — dom настоящий и взаимодействие событийное, а в React dom виртуальный и взаимодействие потоковое

### как работает React
Вся структура веб-страницы может быть представлена с помощью DOM (Document Object Model)- организация элементов html, которыми мы можем манипулировать, изменять, удалять или добавлять новые. Для взаимодействия с DOM применяется язык JavaScript. Однако когда мы пытаемся манипулировать html-элементами с помощью JavaScript, то мы можем столкнуться со снижением производительности, особенно при изменении большого количества элементов. А операции над элементами могут занять некоторое время, что неизбежно скажется на пользовательском опыте. Однако если бы мы работали из кода js с объектами JavaScript, то операции производились бы быстрее.

Для решения проблемы производительности как раз и появилась концепция виртуального DOM.

Виртуальный DOM представляет легковесную копию обычного DOM. И отличительной особенностью React является то, что данная библиотека работает именно с виртуальным DOM, а не обычным.

Если приложению нужно узнать информацию о состоянии элементов, то происходит обращение к виртуальному DOM.

Если необходимо изменить элементы веб-страницы, то изменения вначале вносятся в виртуальный DOM. Потом новое состояние виртуального DOM сравнивается с текущим состоянием. И если эти состояния различаются, то React находит минимальное количество манипуляций, которые необходимы до обновления реального DOM до нового состояния и производит их.

В итоге такая схема взаимодействия с элементами веб-страницы работает гораздо быстрее и эффективнее, чем если бы мы работали из JavaScript с DOM напрямую.

### Как работает i-bem

итак благодаря декларации точечно пересобирает только нужно и только то, что изменилось.




* Troubleshooting

* Change Log

* Feedback


### Motivation

Here are just a few of the reasons why people choose to program with React:

React is fast. Apps made in React can handle complex updates and still feel quick and responsive. React is modular. Instead of writing large, dense files of code, you can write many smaller, reusable files. React's modularity can be a beautiful solution to JavaScript's maintainability problems. React is scalable. Large programs that display a lot of changing data are where React performs best. React is flexible. You can use React for interesting projects that have nothing to do with making a web app. People are still figuring out React's potential. There's room to explore. React is popular. While this reason has admittedly little to do with React's quality, the truth is that understanding React will make you more employable.
