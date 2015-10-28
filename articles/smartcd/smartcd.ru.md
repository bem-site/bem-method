# smartcd: локальный запуск инструментов

_Статья подготовлена на основе оригинальной статьи «[Использование локально установленных инструментов из командной строки](http://clubs.ya.ru/bem/replies.xml?item_no=2231)» в Я.ру._

Мы рекомендуем ставить зависимости, в том числе утилиту [bem-tools](https://ru.bem.info/tools/bem/bem-tools/), локально в проект. Описываем зависимости в `package.json` в корне проекта, устанавливаем их командой `npm install`.

Хочется, чтобы локально установленные инструменты можно было использовать в директории с проектом (на любом уровне!), просто вызывая их по имени: `bem make`, `borschik path/to/file.css` и т.д.

Некоторые из нас используют хак с добавлением в переменную окружения `PATH` значения `./node_modules/.bin`. Но этот способ работает только тогда, когда мы запускаем команды из корня проекта, что не всегда удобно.

Есть способ лучше!

Инструмент [smartcd](https://github.com/cxreg/smartcd) позволяет сконфигурировать любую директорию так, чтобы при входе в неё (или в одну из её поддиректорий) выполнялись определённые команды или устанавливались переменные окружения. Этим мы и воспользуемся!

Короткий способ всё настроить выглядит так:

- устанавливаем `smartcd`:

    ```
    curl -L http://smartcd.org/install | bash
    ```

- создаем конфиг `~/.smartcd_config`, для этого при установке необходимо отвечать так:

    ```
    Configure now? [Y/n] y
    Use all default settings? [Y/n] y
    Would you like to configure smartcd in /Users/%username%/.smartcd_config? (recommended) [Y/n] y
    Would you like to load your config file now? [Y/n] y
    ```

    После вы увидите `Congratulations, you have installed smartcd!`, установка прошла успешно. Если вы используете `zsh`,
    возможно, вам нужно будет вручную добавить строку `source ~/.smartcd_config` в ваш `.zshrc` файл для активации `smartcd` при загрузке.

- создаём шаблон `npm-module` для `smartcd`:

    ```
    smartcd template create npm-module
    ```

- в открывшийся редактор вставляем строку:

    ```
    smartcd helper run path prepend __PATH__/node_modules/.bin
    ```

    после такого комментария:
    `# Enter any bash_enter commands below here: (leave this line!)`

- настраиваем проект:

    ```
    cd path/to/project
    echo 'smartcd template run npm-module' | smartcd edit enter
    ```

Удобно настроить такой alias в shell и использовать его:

```
alias npm-smartcd="echo 'smartcd template run npm-module' | smartcd edit enter"
```

Наслаждаемся!

```
~/projects$ which bem
/usr/local/bin/bem

~/projects$ cd bem-www
smartcd: running /Users/arikon/.smartcd/scripts/Users/arikon/projects/bem-www/bash_enter

~/projects/bem-www$ which bem
/Users/arikon/projects/bem-www/node_modules/.bin/bem

~/projects/bem-www$ cd blocks-desktop/

~/projects/bem-www/blocks-desktop$ which bem
/Users/arikon/projects/bem-www/node_modules/.bin/bem

~/projects/bem-www/blocks-desktop$ cd ../..

~/projects$ which bem
/Users/arikon/n/bin/bem
```

Если вы используете `zsh` с включенной опцией `autocd`, раскомментируйте строку `smartcd setup prompt-hook` в `~/.smartcd_config`.
