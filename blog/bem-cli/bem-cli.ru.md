#bem-cli: запусти bem-tools локально

Михаил Давыдов написал инструмент [bem-cli](https://github.com/bem/bem-cli),
который может запускать локально установленный [bem-tools](https://ru.bem.info/tools/bem/bem-tools/).

Иногда БЭМ-проекты имеют разные версии bem-tools, и нельзя выполнить команду `npm i -g bem`, чтобы bem-tools
был установлен глобально. Могут быть и другие причины, например, отсутствие прав root-пользователя.

Мы также рекомендуем [ставить bem-tools локально](https://ru.bem.info/tools/bem/bem-tools/installation/) командой
`npm i bem` во избежания конфликтов с другими БЭМ-проектами.

Локально установленный bem-tools не удобно использовать. Приходится запускать сборку из корня проекта,
выписывая полный путь до bin/bem `./node_modules/.bin/bem make` или создавать симлинку
`ln -s ./node_modules/.bin/bem` и запускать вот так `./bem` или же добавлять путь до локального
`./node_modules/.bin` в переменную окружения `PATH`.

Существует еще ряд решений, например, [smartcd](https://ru.bem.info/articles/smartcd/).

Вдохновившись проектом [Grunt.js](http://gruntjs.com/), Миша написал [bem-cli](https://github.com/bem/bem-cli/blob/master/bin/bem) -
инструмент, который находит локальный/глобальный bem-tools и запускает его, как если бы данная версия bem-tools была установлена глобально.

Достаточно один раз установить bem-cli командой `npm i -g bem-cli` и забыть про магию с длинными
путями и конфликтами версий.

Репозиторий bem-cli на [GitHub](https://github.com/bem/bem-cli).
Присылайте нам [отзывы об ошибках и пожеланиях](https://github.com/bem/bem-cli/issues).

**Михаил Давыдов**, JavaScript и Node.js разработчик. Занимается фронтенд-разработкой cервиса Яндекс.Такси,
мобильными веб-приложениями и промо-проектами. Пишет и переводит статьи по JavaScript
для [Хабрахабра](http://habrahabr.ru/) под ником [azproduction](http://habrahabr.ru/users/azproduction/).

[Twitter](https://twitter.com/azproduction), [GitHub](https://github.com/azproduction).
