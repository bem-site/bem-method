# smartcd: how to launch tools locally

We recommend installing all the dependencies including [bem-tools](https://bem.info/tools/bem/bem-tools/) locally in each project. We describe them in `package.json` at the project root - install them with the command `npm install`.

We would like to use locally installed tools inside project directories (at any level) just by calling their names: `bem make`, `borschik path/to/file.css`, etc.

Some of us are using a trick of adding the value `./node_modules/.bin` to the environment variable PATH. But this method only works if the command was run from the project root, and sometimes it's not convenient.

There is a better way to do it!

The tool [smartcd](https://github.com/cxreg/smartcd) can configure any directory so that every time one enters it (or one of its subdirectories) certain commands will be executed or environment variables will be set. We will use it!

Set up everything as follows:

  - install `smartcd`:
    ```
    curl -L http://smartcd.org/install | bash
    ```

  - create config `~/.smartcd_config`, for this just answer to installer:

    ```
    Configure now? [Y/n] y
    Use all default settings? [Y/n] y
    Would you like to configure smartcd in /Users/%username%/.smartcd_config? (recommended) [Y/n] y
    Would you like to load your config file now? [Y/n] y
    ```

    Next, you will see `Congratulations, you have installed smartcd!`. Probably, if you use `zsh`, you should add `source ~/.smartcd_config` into
    your `.zshrc` file manually.


  - make template `npm-module` for `smartcd`
    ```
    smartcd template create npm-module
    ```

  - in the file @@ insert the line
    ```
    smartcd helper run path prepend __PATH__/node_modules/.bin
    ```
    after the comment: `# Enter any bash_enter commands below here: (leave this line!)`

  - set up the project:
    ```
    cd path/to/project
    echo 'smartcd template run npm-module' | smartcd edit enter
    ```

It's very useful to set an alias for the shell:

```
alias npm-smartcd="echo 'smartcd template run npm-module' | smartcd edit enter"
```

Enjoy!

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

If you are using `zsh` with the option `autocd` enabled, uncomment the line `smartcd setup prompt-hook` in `~/.smartcd_config`.

This article is based on: «[Using locally installed tools from the command line](http://clubs.ya.ru/bem/replies.xml?item_no=2231)» (Russian only) posted at Ya.ru.

