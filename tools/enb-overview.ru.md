# ENB

[ENB](https://github.com/enb/enb) — сборщик проектов.

Для работы c проектами, построенными по [методологии БЭМ](https://ru.bem.info/methodology/), ENB использует модули, отвечающие за сборку отдельных технологий.

Для подключения модулей используйте пакеты, приведенные ниже.

## Пакеты

* [enb-bem-techs](https://ru.bem.info/toolbox/enb/enb-bem-techs/) — базовые технологии для сборки БЭМ-проектов.

### Скрипты

* [enb-js](https://github.com/enb/enb-js) — сборка JavaScript файлов.
* [enb-modules](https://github.com/enb/enb-modules) — поддержка [ym](https://ru.bem.info/tools/bem/modules/).

### Стили

* [enb-css](https://github.com/enb/enb-css) — сборка `css`-файлов.
* [enb-stylus](https://github.com/enb/enb-stylus) — сборка `stylus`-файлов.
* [enb-autoprefixer](https://github.com/enb/enb-autoprefixer) — поддержка `autoprefixer`.

### Шаблонизация

* [enb-bh](https://ru.bem.info/toolbox/enb/enb-bh/) — сборка BH-шаблонов.
* [enb-xjst](https://github.com/enb/enb-xjst/blob/master/README.md) — сборка BEMHTML и BEMTREE на основе XJST.
* [enb-bemxjst](https://ru.bem.info/toolbox/enb/enb-bemxjst/) — сборка BEMHTML и BEMTREE на основе `bem-xjst`.

### Инфраструктура

* [enb-bem-examples](https://ru.bem.info/toolbox/enb/enb-bem-examples/) — сборка БЭМ-примеров.
* [enb-bem-docs](https://ru.bem.info/toolbox/enb/enb-bem-docs/) — сборка БЭМ-документации.
* [enb-bem-specs](https://ru.bem.info/toolbox/enb/enb-bem-specs/) — сборка и запуск тестов для клиентского JavaScript.
* [enb-bem-tmpl-specs](https://ru.bem.info/toolbox/enb/enb-bem-tmpl-specs/) — сборка и запуск тестов для БЭМ-шаблонов.
* [enb-magic-platform](https://github.com/enb-bem/enb-magic-platform) — платформа и dev-сервер для сборки БЭМ-проектов.

### Остальное

* [enb-borschik](https://github.com/enb/enb-borschik) — поддержка [borschik](https://github.com/borschik/borschik/blob/master/docs/index/index.ru.md).
* [enb-bem-i18n](https://github.com/enb-bem/enb-bem-i18n) — поддержка `BEM.I18N`.

## С чего начать?

Воспользуйтесь [инструкцией по установке project-stub](https://ru.bem.info/platform/project-stub/), чтобы создать БЭМ-проект, настроенный для сборки с помощью [ENB](https://github.com/enb/enb).

Для создания проекта, подходящего под ваши задачи, ответьте на вопросы [генератора БЭМ-проектов](https://github.com/bem/generator-bem-stub/blob/master/README.ru.md), основанного на [Yeoman](http://yeoman.io/).

## Лицензия

© 2014 YANDEX LLC. Код лицензирован [Mozilla Public License 2.0](https://github.com/enb-bem/enb-bem-techs/blob/master/LICENSE.txt).
