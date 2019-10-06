# ENB

[ENB](https://github.com/enb/enb) — инструмент для сборки веб-проектов, построенных по [методологии БЭМ](https://ru.bem.info/methodology/).

* [Общие сведения](#общие-сведения)
* [Установка](#установка)
* [С чего начать](#с-чего-начать)
* [Лицензия](#лицензия)

## Общие сведения

ENB использует [пакеты](../enb-packages-index/enb-packages-index.ru.md), отвечающие за сборку отдельных технологий.

> [Пакеты ENB-технологий](https://www.npmjs.com/search?q=enb) находятся в [NPM](https://www.npmjs.com).

**Основная задача ENB** — сборка исходных файлов в [бандлы](https://github.com/bem-site/bem-method/blob/bem-info-data/method/build/build.ru.md#Введение), обычно для дальнейшего их использования в браузере.

Сборка включает:
* Объединение и обработку исходных файлов.
* Преобразование кода.
* Подготовку или упаковку ресурсов (изображения, шрифты и т.д.).

> Подробнее о [сборке](https://ru.bem.info/methodology/build/) и [файловой структуре](https://ru.bem.info/methodology/filestructure/) БЭМ-проектов.

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
