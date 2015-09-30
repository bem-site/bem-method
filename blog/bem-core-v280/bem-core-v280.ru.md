# Релиз: bem-core 2.8.0

Привет!

Мы рады сообщить вам о выпуске очередного минорного релиза bem-core 2.8.0, в который вошли важные и долгожданные изменения.

## Крупные изменения

Самое крупное и важное изменение — это появление [блока i18n](https://ru.bem.info/libs/bem-core/v2.8.0/desktop/i18n/) для 
интернационализации (перевода) интерфейсов ([#1074](https://github.com/bem/bem-core/issues/1074)). Блок предоставляет 
собой универсальный API для работы в JS и шаблонах и может быть использован как в браузере, так и в node.js-окружении.

Документацию на сборку проекта с интернационализацией ищите в пакете для сборки [enb-bem-i18n](https://ru.bem.info/tools/bem/enb-bem-i18n/readme/).

Кроме того, jQuery теперь по умолчанию подключается через https ([#1202](https://github.com/bem/bem-core/issues/1202)), 
а зависимости от bemhtml-compat ([#1186](https://github.com/bem/bem-core/issues/1186)) больше нет — мы ее удалили. 

Пользователям bem-tools необходимо выполнить `npm i bemhtml-compat --save` для установки пакета на уровне проекта.

## Исправления ошибок и другие изменения

Также в релиз вошли следующие исправления ошибок и изменения: 
* Исправлена ошибка в `loader_type_js`, допускающая вызовы неопределенного обработчика ([#1159](https://github.com/bem/bem-core/pull/1159)).
* BH-бандлы в dist теперь мимикрируют под BEMHTML ([#1210](https://github.com/bem/bem-core/issues/1210)).
* Улучшены шаблоны bem create для bemhtml, bemtree, vanilla.js и browser.js ([#1183](https://github.com/bem/bem-core/issues/1183)).
* vow обновлена до 0.4.10 ([#1056](https://github.com/bem/bem-core/issues/1056)).

Об истории остальных изменений всех релизов библиотеки bem-core можно узнать из [Истории изменений](https://ru.bem.info/libs/bem-core/v2.8.0/changelog/#280).

Прятного обновления и **Stay BEMed**!
