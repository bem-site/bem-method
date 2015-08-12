# Дайджест новостей БЭМ. Выпуск шестой.

Привет,

спешим поделиться с вами новостями БЭМ, произошло много разного, полезного и интересного.

Приятного прочтения!

## Новости библиотек

Выпустили новые релизы главных библиотек:
* Релиз bem-core [2.7.0](https://ru.bem.info/libs/bem-core/v2.7.0/changelog/#270).
* Релиз bem-components [2.3.0](https://ru.bem.info/libs/bem-components/v2.3.0/changelog/#230).

Кроме того, библиотеки уже обновлены в [project-stub](https://ru.bem.info/tutorials/project-stub/).

Последние версии библиотек также доступны для использования с CDN и через bower:
* [dist для bem-core](https://github.com/bem/bem-core-dist)
* [dist для bem-components](https://github.com/bem/bem-components-dist)

Подробнее о том, как подключать не требующие сборки dist-версии а-ля Bootstrap читайте [в нашем блоге](https://ru.bem.info/blog/bem-as-bootstrap/) или [в описании](https://ru.bem.info/libs/bem-components/current/#Подключение-предсобранных-файлов-библиотеки-dist) библиотек.

## Новости инструментов

### borschik

Выпустили релиз `borschik` [v1.4.0](https://ru.bem.info/tools/optimizers/borschik/changelog/), в котором поддержали фриз для `.woff2`, `.js`, `.css` и `.cur`.

### bem-tools

Выпустили версию bem-tools [v0.10.0](https://github.com/bem/bem-tools/releases/tag/v0.10.0). Главное изменение — поддержка сборки с помощью ENB, которая теперь является рекомендуемой. Подробности описали в [блоге](https://ru.bem.info/blog/bem-tools-v010).

### ENB

Выпустили какое-то невероятное количество полезных версий пакетов, о чем подробно рассказываем вам в нашем дайджесте.

Итак:

Выпустили версии `enb` [v0.16.0](https://github.com/enb-make/enb/releases/tag/v0.16.0) и [v0.17.0](https://github.com/enb-make/enb/releases/tag/v0.17.0). В них:
* Появился пул дочерних процессов для выполнения «тяжелых» задач в технологиях. Использование этого пула позволит значительно ускорить сборку шаблонов и работу с `borschik`'ом.
* Технология `file-merge` стала поддерживать карты кода (source maps).
* При помощи переменной окружения COLOR теперь можно включать цветной вывод в логах.

Выпустили версию `enb-bem-i18n` [v0.4.0](https://github.com/enb-bem/enb-bem-i18n/releases/tag/v0.4.0), где улучшили поддержку параметризованных склоняемых ключей. Подробности в [описании к релизу](https://github.com/enb-bem/enb-bem-i18n/releases/tag/v0.4.0).

Выпустили версии `enb-bem-tmpl-specs` [v0.11.2](https://github.com/enb-bem/enb-bem-tmpl-specs/releases/tag/v0.11.2), [v0.12.0](https://github.com/enb-bem/enb-bem-tmpl-specs/releases/tag/v0.12.0) и [v0.12.1](https://github.com/enb-bem/enb-bem-tmpl-specs/releases/tag/v0.12.1), где
* Добавили поддержку отчётов для `mocha` и исправили подключение дополнительных уровней для тестов.
* Исправили критичные ошибки, связанные с завершением работы модуля, подсчётом покрытия шаблонов тестами и использованием `BH@4.x` и `BEM.I18N`.

Выпустили версию `enb-bem-specs` [v0.5.7](https://github.com/enb-bem/enb-bem-specs/releases/tag/v0.5.7) с исправлением ошибок, связанных с подсчётом покрытия кода блоков тестами.

Выпустили версию `enb-borschik` [v1.5.1](https://github.com/enb-make/enb-borschik/releases/tag/v1.5.1) с исправлением ошибки, из-за которой не учитывались опции технологии для случаев, когда технология не была явно указана.

Выпустили версии `enb-priv-js` [v2.2.0](https://github.com/enb-make/enb-priv-js/releases/tag/v2.2.0), [v2.3.0](https://github.com/enb-make/enb-priv-js/releases/tag/v2.3.0) и [v2.3.1](https://github.com/enb-make/enb-priv-js/releases/tag/v2.3.1), в которых:
* Добавили технологию [pub-js-only-i18n](https://github.com/enb-make/enb-priv-js/blob/master/techs/pub-js-only-i18n.js).
* Для технологий [priv-client](https://github.com/enb-make/enb-priv-js/blob/master/techs/priv-client.js) и [priv-server](https://github.com/enb-make/enb-priv-js/blob/master/techs/priv-server.js) добавили опцию `keepRequires`, которая отключает вырезание require, что позволяет ускорить сборку.
* Вместо модуля `enb-borschik` теперь используется `borschik`. В результате в проект ставится на одну зависимость меньше.

Выпустили версии `enb-bembundle` [v1.2.0](https://github.com/enb-make/enb-bembundle/releases/tag/v1.2.0) и [v1.2.1](https://github.com/enb-make/enb-bembundle/releases/tag/v1.2.1), в которых:
* Добавили технологию [css-borschik-chunks](https://github.com/enb-make/enb-bembundle/blob/master/techs/css-borschik-chunks.js).
* Вместо модуля `enb-borschik` теперь используется `borschik`. В результате в проект ставится на одну зависимость меньше.

Выпустили версии [enb-bem-examples@0.5.10](https://github.com/enb-bem/enb-bem-examples/releases/tag/v0.5.10) и [enb-bem-docs@0.8.1](https://github.com/enb-bem/enb-bem-docs/releases/tag/v0.8.1) с исправлением ошибки для случаев, когда целевая папка `destPath` находится не на первом уровне относительно корня проекта.

В версии `enb-source-map` [v1.6.0](https://github.com/enb-make/enb-source-map/releases/tag/v1.6.0) теперь есть метод `joinContentAndSourceMap` и исправлены незначительные ошибки.

Код для имитации ядра ENB переехал в отдельный пакет `mock-enb`. В него вошли:
* `MockNode` — модуль для имитации `Node`.
* `MockLogger` — модуль для имитации `Logger`.

Так же было исправлено несколько ошибок в версиях `mock-enb` [v0.0.1](https://github.com/enb-make/mock-enb/releases/tag/v0.0.1), [v0.0.2](https://github.com/enb-make/mock-enb/releases/tag/v0.0.2) и [v0.1.0](https://github.com/enb-make/mock-enb/releases/tag/v0.1.0).

## Новости документации

Начали большой проект по улучшению БЭМ-документации. Обновили **методологическую часть**, куда добавили новые и переработали старые документы, а также попытались рассказать про методологию более полно и по-другому.

Обновились следующие документы:

* [Основные понятия](https://ru.bem.info/method/definitions/), где мы окончательно определились с формулировками. Документ уже [переведен](https://en.bem.info/method/definitions/) на английский язык.
* [Организация файловой системы](https://ru.bem.info/method/filesystem/) — переработали существующий документ, убрали лишнее и добавили недостающее, а также рассказали о принципах и причинах организации файловой системы по БЭМ.

Появились новые документы:

* [Соглашение по именованию](https://ru.bem.info/method/naming-convention/) — написали новый документ, в котором рассказали все о правилах именования БЭМ-сущностей. Документ уже [переведен](https://en.bem.info/method/naming-convention/) на английский язык.
* [Применение методологии для решения задач веб-разработки](https://ru.bem.info/method/solved-problems/) — здесь речь идет о том, как при помощи соглашения по именованию БЭМ решить проблемы, с которыми каждый день сталкиваются веб-разработчики.
* [БЭМ ЧаВо](https://ru.bem.info/faq/) — список основных вопросов по методологии, которые возникают у наших пользователей, с самыми подробными ответами на них и примерами. Кроме того, мы планируем расширять FAQ не только теорией, но и техническими ответами, поэтому продолжайте задавать нам на форуме технические вопросы.

В разделе **Технологии** полностью переработана документация к [i-bem.js](https://ru.bem.info/technology/i-bem/v2/i-bem-js/). Теперь вместо одного документа вашему вниманию предлагаются одиннадцать разных гайдов по работе с `i-bem.js`, разделенных по темам и «приправленных» актуальными примерами.

В разделе **Библиотеки** мы закончили работу над описанием всех блоков библиотеки [bem-core](https://ru.bem.info/libs/bem-core/) и обновили описание [bem-components](https://ru.bem.info/libs/bem-components/).

Приятной работы с документами, и ждем ваших комментариев по ним на нашем [форуме](https://ru.bem.info/forum/?labels=documentation).

## Разработка cообщества

Подготовили для вас небольшое собрание ссылок от разработчиков сообщества, возможно, что-то пригодится:
* [React BEM helper](https://github.com/marcohamersma/react-bem-helper) от Marco Hamersma (marcohamersma) из Берлина.
* [BEM classnames](https://github.com/pocotan001/bem-classnames) от Hayato Mizuno (pocotan001) из Токио.
* [React BEM](https://github.com/cuzzo/react-bem) от Cuzzo Yahn (cuzzo) из Лос-Анжелеса.
* [bem-cn](https://github.com/albburtsev/bem-cn) от Alexander Burtsev (albburtsev) из Москвы.
* [b_](https://github.com/azproduction/b_) от Миши Давыдова (azproduction) из Берлина.
* [Flexible Grid System BEM CSS](https://github.com/flexiblegs/flexiblegs-bem-css) от Doğukan Güven (dnomak) из Турции.
* [A PostCSS plugin to lint BEM-style CSS](https://github.com/postcss/postcss-bem-linter/) от Nicolas Gallagher (necolas) из San Francisco (Twitter) и David Clark из Турции.
* [BEM Constructor](https://github.com/danielguillan/bem-constructor) от Daniel Guillan (danielguillan) из Барселоны. Это Sass-библиотека, предоставляющая определённый синтаксический сахар для описания независимых объектов в БЭМ-стиле.
* [_bemify](http://franzheidl.github.io/bemify/) — Sass миксины, которые помогают писать .scss в БЭМ стиле, от Franz Heidl (franzheidl) из Берлина.
* [Front-end Elements Dictionary](http://vovanr.com/frontend-elements-dictionary/) или набор популярных именований классов в БЭМ-стиле от Владимира Родкина из Санкт-Петербурга.
* [GETFLAT](https://bitbucket.org/catindev/getflat-mobile) — демо-проект на стеке (Angular-BEM + LESS) и Gulp от Владимира Тицкого (catindev) из Караганды.
* [bnsf](https://github.com/apsavin/bnsf) фреймворк от Александра Савина (apsavin) перехал на сборку с помощью ENB.

## Новости «Событий» и «Выступлений»

 * 22 августа 2015 года в Одессе пройдет OdessaJS, ежегодная встреча фронтенд-разработчиков сообщества OdessaJS и не только. Мастер-класс по БЭМ на конференции расскажет [Сергей Бережной](https://ru.bem.info/authors/berezhnoy-sergey/). Подробности по [ссылке](https://ru.bem.info/events/odessajs-odessa-2015/). Видео будет доступно после окончания конференции.
 * Также 22 августа 2015 года в Санкт-Петербурге пройдет встреча Talks&Works Frontend. Встреча — это 6 часов лекций и воркшопов для frontend-специалистов в центре Санкт-Петербурга, мастер-класс на которой проведем и мы. Подробности можно прочесть по ссылке(https://ru.bem.info/events/talksworks-spb-2015/).
 * Как вы знаете, в марте 2015 года мы запустили серию вебинаров про БЭМ. С помощью них у вас есть возможность из любой точки планеты, где есть доступ в Интернет, послушать солидный кусок про БЭМ, увидеть, как вживую пишет код проекта один из разработчиков Яндекса, задать вопросы команде в режиме реального времени и попробовать самому написать проект. Мы провели уже три вебинара, видео которых доступно на сайте: [первый](https://ru.bem.info/talks/beminar-css-2015/) про CSS, [второй](https://ru.bem.info/talks/beminar-build-2015/) про сборку и оптимизацию проекта и [третий](https://ru.bem.info/talks/beminar-js-2015/) про JS.
 * 4 июля 2015 года в Одессе в рамках Odessa Innovation Week 2015 прошла VI профессиональная конференция специалистов в области веб и мобильных технологий WebCamp 2015, где на Front-end Developers Day с докладом про БЭМ выступил Team Lead компании iDeus Игорь Зенич. Видео доступно на нашем [сайте](https://ru.bem.info/talks/webcamp-odessa-2015/).

Напоминаем, что:
 * Раздел [События](https://ru.bem.info/events/) поможет вам узнать, какие мероприятия, конференции или вебинары про БЭМ пройдут в ближайшее время. Чтобы не пропустить регистрацию или быть в курсе онлайн-трансляции, держите в уме эту рубрику. Если же вам самим предстоит выступить с докладом про БЭМ, напишите нам про это на [info@bem.info](mailto:info@bem.info), и мы с радостью добавим анонс вашего доклада в список.
 * Раздел [Выступления](https://ru.bem.info/talks/) для тех, кто интересуется последними видео про БЭМ.

## Интересное в блоге

Написали несколько больших постов:
* Про [релиз: bem-tools v0.10.0](https://ru.bem.info/blog/bem-tools-v010/), в котором поддержали сборку с помощью ENB.
* Про [dist-поставку БЭМ-библиотек «как Бутстрап»](https://ru.bem.info/blog/bem-as-bootstrap/), где рассмотрели четыре варианта подключения заранее собранных версий.
* Про [обновленный JSDoc в библиотеках блоков](https://ru.bem.info/blog/jsdoc-update/), где рассказали, как и почему мы кардинально пересмотрели отображение вкладок Javascript API в наших блоках, и что из этого вышло.
* И про [мажорный релиз новой документации](https://ru.bem.info/blog/doc-release-1/), в который вошли важные документы, необходимые пользователям для работы.

## Интересное на форуме

Сегодня мы выбрали для вас очередную «пачку» отличных тем для обсуждения, пройти мимо которых без комментария или рассказа про свой опыт просто нельзя:
* Пишем BEMJSON в стиле emmet с помощью [bemmet](https://ru.bem.info/forum/542/).
* [Холивар](https://ru.bem.info/forum/520/) на тему рациональности использования БЭМ для небольших проектов.
* [Вопрос](https://ru.bem.info/forum/476/) про шаблонизацию с BEMHTML на клиенте.
* [enb server as API](https://ru.bem.info/forum/498/).
* [Варианты использования](https://ru.bem.info/forum/483/) БЭМ в django.
* Как [подключать сторонние библиотеки](https://ru.bem.info/forum/491/) в проект на БЭМ.
* [Много вопросов](https://ru.bem.info/forum/?page=1&labels=gemini) по использованию gemini.

Присоединяйтесь к БЭМ-разработчикам, высказывайтесь, делитесь опытом и заводите свои темы!

### Инкубатор БЭМ-проектов

Наша новая рубрика «Инкубатор БЭМ-проектов», в которой мы будем делиться проектами из организации [bem-incubator](https://github.com/bem-incubator/). В него вступает все больше и больше разработчиков сообщества БЭМ, которые делают проекты с помощью технологии и хотят развивать и поддерживать их вместе.

Последние проекты Инкубатора:
* [ng-bem-components](https://github.com/bem-incubator/ng-bem-components) от Алексея Гурьянова (Guria) — это обертка, которая помогает использовать `bem-components` в проекте на Angular. Посмотреть на результат в деле можно [здесь](http://embed.plnkr.co/jnd1e2VQ6SoOWsCztubX/preview).
* [enb-ng-techs](https://github.com/bem-incubator/enb-ng-techs) от него же предоставляет технологии `ng-annotate` и `ng-templates` для сборки Angular-проектов на ENB.
* [bem-flux](https://github.com/bem-incubator/bem-flux) от Романа Парадеева (sameoldmadness) — это реализация FLUX-парадигмы для `bem-core`.
* [html2bemjson](https://github.com/bem-incubator/html2bemjson) от Владимира Гриненко (tadatuta), как и следует из названия, позволяет превратить любой HTML-код в [BEMJSON](https://ru.bem.info/technology/bemjson/). Недавно вышла новая версия пакета.
* Антон Виноградов (verybigman) выпустил мажорный релиз [bem-grid](https://github.com/bem-incubator/bem-grid) [2.0.0](https://github.com/bem-incubator/bem-grid/releases/tag/2.0.0), в рамках которого сетка перешла на использование [lost](https://github.com/corysimmons/lost).
* [bem-scrollspy](https://github.com/bem-incubator/bem-scrollspy) от Евгения Баранова (kompolom) — это реализациея scrollspy на `i-bem.js`.

Если у вас есть полезные инструменты или библиотеки на БЭМ, присоединяйтесь к нашему БЭМ-инкубатору, и мы обязательно расскажем о них в следующих выпусках!

## В мире БЭМ

В этом разделе мы собрали интересные ссылки на статьи, репозитории и просто твиты про БЭМ, найденные в поиске или социальных сетях:
 * Для своей новой библиотеки блоков [Material Design Lite](http://www.getmdl.io/) Google [выбрал БЭМ](https://github.com/google/material-design-lite/wiki/Understanding-BEM) в качестве методологии. Библиотека содержит набор готовых блоков для разработки в стиле материального дизайна.
 * Пара реально крутых сниппетов для тех кто делает БЭМ в Sublime Text от [@voischev](https://twitter.com/voischev/status/626129020225200128).
 * Мини-демка о том, как БЭМ используется для проектов на AngularJS от [@vladimore](https://twitter.com/vladimore/status/622389329894117378).
 * [Making BEM easier in Sass](http://ianmcnally.me/blog/2015/5/26/making-bem-easier-in-sass) — статья от разработчика Ian McNally.
 * [Front-End Stack for EveryDollar](http://www.developwithpurpose.com/front-end-stack-for-everydollar/) — статья от разработчика Elijah Manor.
 * [BEM Guidelines for component focused development](http://www.joelambert.co.uk/articles/bem-guidelines) — статья от разработчика Joe Lambert.
 * [Ros Ivanov](https://www.youtube.com/channel/UC-_16EgYOzinLxegLrTMkTA) записал и выложил два скринкаста БЭМ (BEM): Для Начинающих [Часть 1](https://youtu.be/5Gp_2kN5Bv4) и [Часть 2 Организация Файлов](https://youtu.be/9sEEc2qsfh4).
 * Ребята из uWebDesign записали первый видеоподкаст [Разговоры у экрана #1 — знакомство с технологиями](https://uwebdesign.ru/screen-talks-1-meet-the-technology/). Большая часть обсуждений была уделена БЭМ, где обсуждались вопросы от/для начинающих.
 * Опубликовано видео доклада [Кодовая база CSS: избавляемся от головной боли](https://youtu.be/_bpSL71qknY) от Андрея Михайлова с MoscowJS 22, где он рассказал про БЭМ-путь и симантические HTML-классы.

На этом все на сегодня, приятного вам чтения, использования и **Stay BEMed**!

Всегда ваша,
Команда БЭМ

P.S. Напоминаем, что любой из вас может поучаствовать в формировании дайджеста. Для этого нужно сделать немного — прислать свои новости или ссылки на найденные материалы на электронную почту [info@bem.info](mailto:info@bem.info). Мы обязательно включим их в следующий обзор и таким образом все вместе сделаем дайджест полноценнее и интереснее!
