
# bem-components v2.0.0 — релиз, которого ждали! 

Всем привет!

Рады сообщить вам, что свершилось то, чего мы так долго ждали! 

Релиз [bem-components v2.0.0](https://ru.bem.info/libs/bem-components/v2.0.0/) состоялся!

Готовили его долго, пересматривали, переделывали и перепроверяли все, чтобы получить продукт, которым мы могли бы гордиться, а пользователям бы нравилось пользоваться. 

Обо всем по порядку.

## Блоки

Библиотека содержит 22 готовых блока, которые покрывают большинство сценариев для построения интерфейса и работают [кроссплатформенно](https://ru.bem.info/libs/bem-components/v2.0.0/#Уровни) и [кроссбраузерно](https://ru.bem.info/libs/bem-components/v2.0.0/#Поддерживаемые-браузеры).

Блоки задокументированы на русском и английском языках и покрыты тестами. 

В список вошли:
* [attach](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/attach/)
* [button](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/button/)
* [checkbox](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/checkbox/)
* [checkbox-group](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/checkbox-group/)
* [control](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/control/)
* [control-group](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/control-group/)
* [dropdown](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/dropdown/)
* [icon](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/icon/)
* [image](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/image/)
* [input](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/input/)
* [link](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/link/)
* [menu](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/menu/)
* [menu-item](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/menu-item/)
* [modal](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/modal/)
* [popup](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/popup/)
* [progressbar](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/progressbar/)
* [radio](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/radio/)
* [radio-group](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/radio-group/)
* [select](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/select/)
* [spin](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/spin/)
* [textarea](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/textarea/)
* [z-index-group](https://ru.bem.info/libs/bem-components/v2.0.0/desktop/z-index-group/)

## Уровни

Разные уровни переопределения библиотеки позволяют ей работать в полную силу на [различных платформах](https://ru.bem.info/libs/bem-components/v2.0.0/#Уровни). 

Разрабатывая приложение, например, для планшетов, вы сможете не подключать в сборку файлы, нужные только десктопным браузерам.

Уровни обозначены следующим образом:
* `common.blocks` — общее для всех устройств и браузеров;
* `desktop.blocks` — реализация специфических особенностей для десктопных браузеров;
* `touch.blocks` — реализация специфических особенностей для touch-платформ.

## Кроссбраузерность

Библиотека одинаково хорошо работает во всех [актуальных браузерах](https://ru.bem.info/libs/bem-components/v2.0.0/#Поддерживаемые-браузеры), включая Firefox, Chrome, Safari, Opera и Internet Explorer.

## Варианты поставки

Мы приготовили три способа поставки библиотеки — как говорится, на любой вкус и размер :)

### Source
Библиотека поставляется в исходном виде — «source» – для технически идентичных сервисов и проектов, которые используют тот же препроцессор и шаблонизатор. 
Подробнее о технологиях и инструментах в bem-components читайте в [описании](https://ru.bem.info/libs/bem-components/v2.0.0/) библиотеки.

Мы рекомендуем именно этот способ использования. Проще всего воспользоваться заготовкой проекта [project-stub](https://github.com/bem/project-stub) или [генератором проектов](https://ru.bem.info/tools/bem/bem-stub/) на `yo`. Там bem-components уже обновлены до `2.0.0`.

### Compiled
Поставка скомпилированной версии библиотеки — «compiled» – подходит для сервисов и проектов, которые не используют препроцессор, либо используют отличный от поставляемого из коробки (Stylus).
Для получения compiled версии необходимо вызвать `npm run compiled` в корне библиотеки после установки npm-зависимостей.

### Library
По аналогии с jQuery и Bootstrap bem-components поставляется и в виде готовой библиотеки — «library» – с возможностью подключения всех компонентов в виде JS- и CSS-бандлов на страницу. 
Для выбора этого варианта поставки необходимо выполнить `npm run dist` в корне библиотеки после установки npm-зависимостей, в результате чего бандлы сгенерируются в папке `dist`.

## Совместимость и стабильная версия

Те, кто начал пользоваться библиотекой до релиза, знают, что код был готов к использованию уже давно. 
Однако, нам хотелось проверить его в реальных условиях, покрыть различные кейсы тестами и задокументировать все блоки подробной документацией на двух языках.

Версия v2.0.0 — стабильная. Библиотеку смело можно использовать для широкого спектра задач на проектах самого разного размера.

Еще одно важное сообщение для пользователей библиотеки: библиотека перешла на использование [семантического версионирования](http://semver.org/lang/ru/) (вместо привязки к определенному номеру коммита можно использовать соответствующие теги).

Все последующие обновления будут максимально прозрачными и понятными. Следование [семантическому версионированию](http://semver.org/lang/ru/) и подробное описание изменений всегда дадут полное представление о совместимости между версиями и новых возможностях.

Мы ждем ваших вопросов и рассказов про использование библиотеки [bem-components v2.0.0](https://ru.bem.info/libs/bem-components/v2.0.0/) в «дикой природе» как и раньше, на [форуме](https://ru.bem.info/forum/). Посты про библиотеку помечайте меткой [bem-components](https://ru.bem.info/forum/?labels=bem-components). 

Нам хочется вашего активного пользовательского фидбека и участия, ведь именно так мы сможем постоянно улучшать библиотеку и добавлять в нее блоки и фичи, нужные пользователям.

Приятного обновления и использования!
