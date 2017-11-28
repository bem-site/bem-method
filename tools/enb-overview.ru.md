# ENB

[ENB](https://github.com/enb/enb) — инструмент для сборки веб-проектов, построенных по [методологии БЭМ](https://ru.bem.info/methodology/).

* [Общие сведения](#Общие-сведения)
* [Пакеты](#Пакеты)
* [Установка](#Установка)
* [С чего начать](#С-чего-начать)

## Общие сведения

ENB использует [пакеты](#Пакеты), отвечающие за сборку отдельных технологий.

> [Пакеты ENB-технологий](https://www.npmjs.com/search?q=enb) находятся в [NPM](https://www.npmjs.com).

**Основная задача ENB** — сборка исходных файлов в [бандлы](https://github.com/bem-site/bem-method/blob/bem-info-data/method/build/build.ru.md#Введение), обычно для дальнейшего их использования в браузере.

Сборка включает:
* Объединение и обработку исходных файлов.
* Преобразование кода.
* Подготовку или упаковку ресурсов (изображения, шрифты и т.д.).

> Подробнее о [сборке](https://ru.bem.info/methodology/build/) и [файловой структуре](https://ru.bem.info/methodology/filestructure/) БЭМ-проектов.

## Пакеты

* [enb-bem-techs](https://ru.bem.info/toolbox/enb/enb-bem-techs/) — базовые технологии для сборки БЭМ-проектов.

### Скрипты

* [enb-js](https://github.com/enb/enb-js) — сборка JavaScript-файлов.
* [enb-modules](https://github.com/enb/enb-modules) — поддержка [ym](https://ru.bem.info/tools/bem/modules/).

### Стили

* [enb-css](https://github.com/enb/enb-css) — сборка `css`-файлов.
* [enb-stylus](https://github.com/enb/enb-stylus) — сборка `stylus`-файлов.
* [enb-autoprefixer](https://github.com/enb/enb-autoprefixer) — поддержка `autoprefixer`.

### Шаблонизация

* [enb-bh](https://ru.bem.info/toolbox/enb/enb-bh/) — сборка [BH](https://github.com/bem/bh)-шаблонов.
* [enb-xjst](https://github.com/enb/enb-xjst/blob/master/README.md) — сборка [BEMHTML и BEMTREE](https://ru.bem.info/platform/bem-xjst/8/) на основе XJST.
* [enb-bemxjst](https://ru.bem.info/toolbox/enb/enb-bemxjst/) — сборка BEMHTML и BEMTREE на основе `bem-xjst`.

### Инфраструктура

* [enb-bem-examples](https://ru.bem.info/toolbox/enb/enb-bem-examples/) — сборка примеров.
* [enb-bem-docs](https://ru.bem.info/toolbox/enb/enb-bem-docs/) — сборка документации.
* [enb-bem-specs](https://ru.bem.info/toolbox/enb/enb-bem-specs/) — сборка и запуск тестов для клиентского JavaScript.
* [enb-bem-tmpl-specs](https://ru.bem.info/toolbox/enb/enb-bem-tmpl-specs/) — сборка и запуск тестов для шаблонов.
* [enb-magic-platform](https://github.com/enb-bem/enb-magic-platform) — платформа и dev-сервер для сборки БЭМ-проектов.

### Остальное

* [enb-borschik](https://github.com/enb/enb-borschik) — поддержка [borschik](https://github.com/borschik/borschik/blob/master/docs/index/index.ru.md).
* [enb-bem-i18n](https://github.com/enb-bem/enb-bem-i18n) — поддержка `BEM.I18N`.

## Установка

```shell
$ npm install --save-dev enb
```

## С чего начать

Чтобы создать БЭМ-проект, настроенный для сборки с помощью [ENB](https://ru.bem.info/toolbox/enb/), воспользуйтесь любым из предложенных вариантов:

1. Установите шаблонный проект [project-stub](https://ru.bem.info/platform/project-stub/), который поддерживает сборку с помощью [ENB](https://ru.bem.info/toolbox/enb/) по умолчанию.
1. Создайте проект, подходящий под ваши задачи. Для этого ответьте на вопросы [генератора БЭМ-проектов](https://github.com/bem/generator-bem-stub/blob/master/README.ru.md), основанного на [Yeoman](http://yeoman.io/).

## Лицензия

© 2014 YANDEX LLC. Код лицензирован [Mozilla Public License 2.0](https://github.com/enb-bem/enb-bem-techs/blob/master/LICENSE.txt).
