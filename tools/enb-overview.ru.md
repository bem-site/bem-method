# ENB

[ENB](https://github.com/enb-make) — это сборщик проектов, построенных по [методологии БЭМ](https://ru.bem.info/method/).

Для работы ENB использует различные модули, отвечающие за сборку отдельных технологий.

Для подключения модулей используйте пакеты, приведенные ниже.

## Пакеты

* [enb-bem-techs](https://ru.bem.info/tools/bem/enb-bem-techs/readme/) — базовые технологии для сборки проектов, построенных по методологии БЭМ.

### Стили

* [enb-stylus](https://github.com/enb-make/enb-stylus) — сборка `stylus`-файлов.
* [enb-autoprefixer](https://github.com/enb-make/enb-autoprefixer) — поддержка `autoprefixer`.

### Шаблонизация

* [enb-bh](https://ru.bem.info/tools/bem/enb-bh/readme/) — сборка BH-шаблонов.
* [enb-xjst](https://ru.bem.info/tools/bem/enb-xjst/readme/) — сборка BEMHTML и BEMTREE на основе XJST.
* [enb-bemxjst](https://ru.bem.info/tools/bem/enb-bemxjst/readme/) — сборка BEMHTML и BEMTREE на основе `bem-xjst`.

### Инфраструктура

* [enb-bem-examples](https://ru.bem.info/tools/bem/enb-bem-examples/readme/) — сборка БЭМ-примеров.
* [enb-bem-docs](https://ru.bem.info/tools/bem/enb-bem-docs/readme/) — сборка БЭМ-документации.
* [enb-bem-specs](https://ru.bem.info/tools/bem/enb-bem-specs/readme/) — сборка и запуск тестов для клиентского JavaScript.
* [enb-bem-tmpl-specs](https://ru.bem.info/tools/bem/enb-bem-tmpl-specs/readme/) — сборка и запуск тестов для БЭМ-шаблонов.
* [enb-magic-platform](https://github.com/enb-bem/enb-magic-platform) — платформа и dev-сервер для сборки БЭМ-проектов.

### Остальное

* [enb-borschik](https://github.com/enb-make/enb-borschik) — поддержка [borschik](https://ru.bem.info/tools/optimizers/borschik/).
* [enb-modules](https://github.com/enb-make/enb-modules) — поддержка [ym](https://ru.bem.info/tools/bem/modules/).
* [enb-diverse-js](https://github.com/enb-make/enb-diverse-js) — поддержка паттерна `vanilla.js` + `node.js` + `browser.js`.
* [enb-bem-i18n](https://github.com/enb-bem/enb-bem-i18n) — поддержка `BEM.I18N`.

## С чего начать?

Воспользуйтесь [инструкцией по установке project-stub](https://ru.bem.info/tutorials/project-stub/), чтобы создать БЭМ-проект, настроенный для сборки с помощью [ENB](http://enb-make.info/).

Для создания проекта, подходящего под ваши задачи, ответьте на вопросы [генератора БЭМ-проектов](https://ru.bem.info/tools/bem/bem-stub/), основанного на [Yeoman](http://yeoman.io/).

## Лицензия

© 2014 YANDEX LLC. Код лицензирован [Mozilla Public License 2.0](https://github.com/enb-bem/enb-bem-techs/blob/master/LICENSE.txt).
