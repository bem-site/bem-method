# Дайджест новостей по БЭМ. Итоги 2017 года. Выпуск №13

Итоги уходящего года. Коротко и только о самом главном:

* [Библиотеки](#Библиотеки)
* [БЭМ и React](#БЭМ-и-react)
* [Технологии](#Технологии)
* [Инструменты](#Инструменты)
* [Документация](#Документация)
* [Сайт bem.info](#Сайт-beminfo)
* [Мероприятия](#Мероприятия)

## Библиотеки

### bem-core
Выпустили версии bem-core [4.1.0](https://ru.bem.info/platform/libs/bem-core/4.1.0/)-[4.2.1](https://ru.bem.info/platform/libs/bem-core/4.2.1/).

Все изменения, вошедшие в релизы, описаны в [CHANGELOG](https://ru.bem.info/platform/libs/bem-core/4.2.1/changelog/).

### bem-core: turbo
Выпилили jQuery из bem-core. Официального релиза пока не было, но [релиз-кандидат](https://github.com/bem/bem-core/tree/turbo-rc.1) уже можно пробовать и писать нам отзывы!

### bem-components
Выпустили две версии [4.0.0](https://github.com/bem/bem-components/tree/v4.0.0)-[6.0.1](https://github.com/bem/bem-components/tree/v6.0.1).

Все изменения, вошедшие в релизы, описаны в [CHANGELOG](https://ru.bem.info/platform/libs/bem-core/6.0.1/changelog/).

### bem-history
Выпустили версию [4.0.0](https://ru.bem.info/platform/libs/bem-history/4.0.0/).

Подробное описание изменений в [CHANGELOG](https://ru.bem.info/platform/libs/bem-history/4.0.0/changelog/).

### bem-calendar
Опубликовали мини-библиотеку [bem-calendar](https://github.com/bem/bem-calendar/) на основе bem-components.

### bem-textarea-editor
Опубликовали библиотеку [bem-textarea-editor](https://github.com/tadatuta/bem-textarea-editor) с блоком `editor`, позволяющим писать текст в формате Markdown с удобной панелью инструментов (примерно как на Github) и получать превью до отправки поста на сервер.

Посмотреть на работу блока в действии можно [тут](https://tadatuta.github.io/bem-textarea-editor/).

### bem-font-awesome
Опубликовали библиотеку [bem-font-awesome](https://github.com/tadatuta/bem-font-awesome), которая позволяет использовать [Font Awesome](http://fontawesome.io/) с использованием БЭМ-нотации и не тянуть лишние стили в проект.

### bem-font-awesome-icons

Опубликовали альтернативный вариант библиотеки `bem-font-awesome` — [bem-font-awesome-icons](https://github.com/tadatuta/bem-font-awesome-icons), где распилили шрифт на отдельные SVG-иконки, так что теперь на клиент приедет только то, что действительно используется.

## БЭМ и React

### bem-react-core
Выпустили версию — [1.0.0](https://github.com/bem/bem-react-core/tree/v1.0.0-rc.5). До официального релиза библиотеку отделяет только подготовка документации.

Много и в разных форматах рассказывали о bem-react-core:
* Провели серию мастер-классов. Видео опубликовали на YouTube в канале [bem.info](https://www.youtube.com/channel/UCsHVzqjMO31I8qKHhWHsobg?view_as=subscriber).
* Сергей Бережной [рассказал](https://events.yandex.ru/lib/talks/4841/) на Я.Субботнике по фронтенду, что делать, если вы используете i-bem.js и хотите получить преимущества React-подхода без потери привычных БЭМ-терминов и декларативности. И как нужно поступать, если вы используете React и хотите получить преимущества БЭМ-методологии.
* Антон Виноградов [показал](https://youtu.be/2pKg-xGg1gI) предварительный релиз bem-react-core на митапе по БЭМ в декабре.

### bem-react-components
Активно работали над [bem-react-components](https://github.com/bem/bem-react-components/tree/v0.0.2) — библиотекой блоков для разработки с React по БЭМ-методологии. Официального релиза пока не выпустили, но большинство [блоков](https://github.com/bem/bem-react-components/tree/v0.0.2/blocks) уже реализованы.

### create-bem-react-app
Продолжаем создавать реактовый проджект стаб [create-bem-react-app](https://github.com/bem/create-bem-react-app), который позволяет одной командой собрать готовое React/БЭМ-приложение с установленными зависимостями и правильной файловой структурой.

## Технологии

### bem-express

Выпустили партию мажорных обновлений:

* Обновили версии библиотек bem-core [4.2.1](https://ru.bem.info/platform/libs/bem-core/4.1.0/) и bem-components [6.0.1](https://github.com/bem/bem-components/tree/v6.0.1).
* Перешли со Stylus к PostCSS. Из коробки поставляется тот же набор плагинов, что и в bem-components.
* Внедрили опциональный `livereload`. Подробнее смотри в [документации](https://github.com/bem/bem-express/blob/master/development.blocks/livereload/livereload.md) и в [README](https://github.com/bem/bem-express/blob/master/README.md) проекта.
* Добились ускорения сборки за счет `npm`-модулей, необходимых для сборки.
* Отказались от `bower` для поставки библиотек. Теперь все зависимости ставятся через `npm` в папку `node_modules`.

Написали большое и подробное пошаговое руководство: [Переходим на сторону сервера с bem-express](https://ru.bem.info/platform/tutorials/start-with-bem-express/).

### project-stub
Обновили версии библиотек bem-core [4.2.1](https://ru.bem.info/platform/libs/bem-core/4.1.0/), bem-components [6.0.1](https://github.com/bem/bem-components/tree/v6.0.1) и другие зависимости.

В качестве эксперимента включили [gulp-bem](https://github.com/gulp-bem) в project-stub.

### bem-xjst
Выпустили версии [v8.3.1](https://github.com/bem/bem-xjst/releases/tag/v8.3.1)-[v8.8.5](https://github.com/bem/bem-xjst/releases/tag/v8.8.5).

Все изменения, вошедшие в релизы, описаны в [CHANGELOG](https://github.com/bem/bem-xjst/blob/master/CHANGELOG.md).


## Инструменты

### bem-sdk
Перенесли bem-sdk в [монорепозиторий](https://github.com/bem/bem-sdk). В процессе избавились от циклических зависимостей между модулями и разделили все для оптимального использования на клиенте.

Выпустили обновленные [пакеты](https://github.com/bem/bem-sdk/tree/master/packages) bem-sdk. Обновили [документацию](https://github.com/bem/bem-sdk/blob/master/README.ru.md).

Алексей Ярошевич написал пакеты [@bem/sdk.file](https://www.npmjs.com/package/@bem/sdk.file) и [@bem/sdk.naming.file.stringify](https://www.npmjs.com/package/@bem/sdk.naming.file.stringify), которые позволяют взять описание БЭМ-сущности, путь до уровня, передать схему файловой структуры и получить путь до файла.

### bem-tools
Выпустили [bem-tools 2.0.0](https://github.com/bem-tools/bem-tools), где обновили bem-tools-create [2.1.0](https://github.com/bem-tools/bem-tools-create/tree/v2.1.0).

Подробности читайте в [документации](https://github.com/bem-tools/bem-tools-create/blob/master/README.ru.md).

### ENB
Внедрили модули из bem-sdk в ENB.

#### enb-bem-techs

Полностью переписали enb-bem-techs на bem-sdk и выпустили `prestable` версию [3.0.0-0](https://github.com/enb/enb-bem-techs/tree/v3.0.0-0).

#### enb-bemxjst
Обновили [enb-bemxjst](https://github.com/enb/enb-bemxjst) до актуальной версии [bem-xjst](#bem-xjst), где появилась поддержка экспортов в разные модульные системы.

### gather-reverse-deps
Выпустили пакет [gather-reverse-deps](https://www.npmjs.com/package/gather-reverse-deps), который позволяет собирать обратные зависимости.

### gulp-bem-src
Выпустили версию [0.1.0](https://github.com/gulp-bem/gulp-bem-src) с обновлением bem-sdk.

### bem-naming
Выпустили пакеты [2.0.0-5](https://github.com/bem-sdk/bem-naming/tree/v2.0.0-5) и [2.0.0-6](https://github.com/bem-sdk/bem-naming/tree/v2.0.0-6).

Основные изменения, вошедшие в релизы, описаны в [CHANGELOG](https://github.com/bem-sdk-archive/bem-naming/blob/v2.0.0-6/CHANGELOG.md).

### borschik
Выпустили версии [1.7.0](https://github.com/borschik/borschik/tree/v1.7.0)-[2.0.0](https://github.com/borschik/borschik/tree/v2.0.0).
Где прекратили поддержку node 0.8.0. и заменили [uglify-js](https://www.npmjs.com/package/uglify-js) на [uglify-es](https://www.npmjs.com/package/uglify-es) для поддержки ES6.

Подробности в [CHANGELOG](https://github.com/borschik/borschik/blob/v2.0.0/CHANGELOG.ru.md).

### bem-walk
Написали полный и понятный [README](https://github.com/bem-sdk/bem-walk/blob/master/README.md).

### bemhint
Выпустили версии [0.10.0](https://github.com/bemhint/bemhint/tree/v0.10.0)-[0.10.1](https://github.com/bemhint/bemhint/tree/v0.10.1), где появилась поддержка предупреждений. Обновление сохраняет полную обратную совместимость с предыдущей версией.

#### bemhint-estree
Выпустили линтер недостающих зависимостей [bemhint-estree](https://github.com/bemhint/bemhint-estree), где добавили поддержку ES6 и написали [обертку-раннер](https://github.com/bemhint/bemhint-bem-xjst) для линтера [bem-xjst](#bem-xjst). В каждом репозитории есть подробная документация.

#### bemhint-deps-schema
Выпустили новую версию плагина для bemhint — [bemhint-deps-schema 2.1.0](https://www.npmjs.com/package/bemhint-deps-schema), который проверяет, чтобы файлы `*.deps.js` соответствовали спецификации. Теперь `bemhint-deps-schema` умеет обрабатывать не только `.json`-, но и `.js`-файлы с `module.exports`.

## Документация
* Написали большое и полезное руководство по всему БЭМ-стеку: [Переходим на сторону сервера с bem-express](https://habrahabr.ru/company/yandex/blog/337166/).
* Опубликовали новый документ про то, [как описывать зависимости в БЭМ](https://ru.bem.info/platform/deps/).
* Написали [спецификацию для DEPS](https://ru.bem.info/platform/deps-spec/) в БЭМ.
* Добавили новые документы в разделе [Методология](https://ru.bem.info/method/):
  * [Уровни переопределения](https://ru.bem.info/methodology/redefinition-levels/)
  * [Способы изменения блока](https://ru.bem.info/methodology/block-modification/)
  * [HTML по БЭМ](https://ru.bem.info/methodology/html/)
* Переработали [FAQ](https://ru.bem.info/methodology/faq/): обновили старые вопросы и добавили новые.
* Обновили документы в [методологической части](https://ru.bem.info/methodology/) сайта.
  * [Соглашение по именованию](https://ru.bem.info/methodology/naming-convention/)
  * [Организация файловой структуры](https://ru.bem.info/methodology/filestructure/)
  * [Сборка БЭМ-проектов](https://ru.bem.info/methodology/build/)
* Обновили раздел с обучающими материалами: добавили подборки с видео и ссылки на БЭМ-проекты и разделили информацию на две группы:
  * [Проекты](https://ru.bem.info/platform/tutorials/projects) — пошаговые инструкции для получения конечного результата.
  * [Темы](https://ru.bem.info/platform/tutorials/themes) — подробные руководства по отдельным технологиям или инструментам.
* Систематически пополняем [список статей про БЭМ](https://github.com/bem-site/bem-method/blob/bem-info-data/articles/articles.ru.md) от внешних источников.


## Сайт bem.info

* Выкатили раздел [БЭМ-библиотек](https://ru.bem.info/platform/libs/) в новом дизайне:
  * [bem-components](https://ru.bem.info/platform/libs/bem-components/6.0.0/)
  * [bem-core](https://ru.bem.info/platform/libs/bem-core/4.2.0/)
  * [bem-history](https://ru.bem.info/platform/libs/bem-history/4.0.0/)
* Обновили [форум](https://ru.bem.info/forum/).

## Мероприятия

### Конференции

* FullStack Conference. Владимир Гриненко и Сергей Бережной выступили с докладом [BEM — The unknown](http://bit.ly/2vLP5Tu).
* HolyJSconf в Питере. Владимир Гриненко рассказал о зависимостях в компонентном вебе — [Зависимости в компонентном вебе, сделанные правильно](http://bit.ly/2rWWEDY).
* United Dev Conf в Минске. Владимир Гриненко выступил с докладом [Dependencies in component web done right](http://unitedconf.com/dokladchiki/dependencies-in-component-web-done-right/). [Слайды](https://yadi.sk/d/uaRNnF_v3Gim9K) к докладу в keynote.
* Я.Субботник по фронтенду. Сергей Бережной [рассказал](http://bit.ly/2xcIDlY), как совместить преимущества БЭМ и React.
* React Moscow Meetup #2. Сергей Бережной рассказал, [что нового в bem-react-core](https://events.yandex.ru/lib/talks/4484/).
* DevCon School: Технологии будущего. Дмитрий Андриянов и Антон Виноградов выступили с докладом «Разрабатываем ASP.NET MVC приложение с БЭМ-фронтендом».
* Web Development Conference. Владимир Гриненко выступил с докладом [Dependencies in component web done right](http://unitedconf.com/dokladchiki/dependencies-in-component-web-done-right/).

### Митапы по БЭМ

Провели целую серию BEMup'ов:
* [BEMup для новичков](https://events.yandex.ru/events/bemup/27-january-2017/) — встреча для тех, кто уже имеет представление о базовых понятиях методологии. Опубликовали [скринкаст](http://bit.ly/2raGrK2). [Видео](http://bit.ly/2slZlLV) с первого BEMup'а для новичков, для тех, кто пропустил начало.
* Рассказали про сборку БЭМ-проектов с `enb` и про все новости БЭМ из мира React на [BEMup'е в Москве](https://events.yandex.ru/events/bemup/24-march-2017/). Опубликовали [видео](https://ru.bem.info/forum/1320/).
* Провели [BEMup в Екатеринбурге](https://events.yandex.ru/events/bemup/13-april-2017/) для разработчиков, использующих БЭМ в своих проектах и желающих больше узнать про БЭМ-технологии.
* Провели [мастер-класс](https://events.yandex.ru/events/bemup/21-april-2017/), на котором написали проект на основе `project-stub`. На живых примерах показали, для чего нужны технологии BEMJSON, BEMTREE, BEMHTML, DEPS, и как использовать их вместе. Опубликовали [скринкаст](http://bit.ly/2p0sMEF).
* Сергей Бережной провел мастер-классы по использованию библиотеки [bem-react-core](https://github.com/bem/bem-react-core). Скринкасты с нескольких встреч опубликовали на [Youtube](https://www.youtube.com/channel/UCsHVzqjMO31I8qKHhWHsobg?view_as=subscriber). Также вы можете найти видео на форуме bem.info по тегу [BEMup + video](https://ru.bem.info/forum/?labels=BEMup%2Cvideo).
* Провели еще один BEMup для новичков в Москве, где Владимир Гриненко рассказал про методологию БЭМ и технологии с нуля, Антон Виноградов представил первый релиз кандидат библиотеки [bem-react-core](https://github.com/bem/bem-react-core), и состоялась секция вопросов и ответов с Сергеем Бережным, Виталием Харисовым и Владимиром Гриненко. [Скринкаст](https://www.youtube.com/watch?v=2pKg-xGg1gI&t) доклада Антона Виноградова про bem-react-core.

### Хакатоны
Провели два продуктивных хакатона по инструментам БЭМ. Большинство результатов уже включены в этот выпуск дайджеста. Следите за [новостями](https://ru.bem.info/forum/?labels=hackaton%2Cnews&state=all&page=1), если хотите принять участие в следующем хакатоне!

### Вебинары
Антон Виноградов провел вебинар [Немного БЭМ в вашем React](http://bit.ly/2nu7dd1), где рассказал, как начать использовать bem-react-core — декларативно описывать React-компоненты, гибко их доопределять и использовать уровни переопределения.

### Разное
* Рассказали на форуме об [опыте внедрения gulp-bem](https://ru.bem.info/forum/1186/).
* Антон Виноградов [ответил на вопросы](https://ru.bem.info/forum/1212/) про bem-xjst и React.
* Занялись портированием Animate.CSS на БЭМ. [Инструкция по подключению](https://github.com/bem-contrib/bem-animations).
* Возродили канал [bem.info](http://bit.ly/BEM-video) на Youtube. Теперь все новые видео с докладами и вебинарами вы сможете находить тут. Подписывайтесь!
