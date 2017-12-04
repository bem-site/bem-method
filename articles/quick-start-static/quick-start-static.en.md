# Getting Started Creating a static page

## Lesson description

Creating a simple static page will help you understand the structure of a BEM project. This document describes the basics of working with [BEM technology](../../method/key-concepts/key-concepts.en.md#implementation-technology), [redefinition levels](../../method/key-concepts/key-concepts.en.md#redefinition-level), and [BEM libraries](https://en.bem.info/platform/libs/).

**You will learn how to:**

* [Clone a BEM project](#cloning-a-bem-project)
* [Create new pages in the project](#creating-a-page)
* [Connect ready-made blocks from a third-party library](#describing-the-page-in-a-bemjson-file)
* [Create new blocks in a project](#creating-blocks)

Completing all the steps will result in a page with an input field, a button, and a user greeting, as shown in the figure below. The name entered in the field will be displayed in the greeting when the button is clicked.

![Welcome page](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/quick-start-static/quick-start-static__hello-user.en.svg)

Working with the examples laid out in this document requires basic skills in:

* HTML
* CSS
* JavaScript
* BEM

> **Important:** This document does not contain information about the [build procedure](../../method/build/build.en.md) for a BEM project.

### Minimum requirements

To begin, you will need to install:

* [Node.js 4 +](https://nodejs.org)
* [Git](https://git-scm.com)

> **Important:** Windows OS users must install [ Git Bash](https://git-for-windows.github.io).

### We will be using

* Template repository [ project-stub](https://github.com/bem/project-stub)
* Technologies:
   * [BEMJSON](https://en.bem.info/platform/bemjson/)
   * [i-bem.js](https://en.bem.info/platform/i-bem/)
   * [BEMHTML](https://en.bem.info/platform/bem-xjst/)

## Cloning a BEM project

To quickly deploy a BEM project, use a local copy of the [ project-stub](https://github.com/bem/project-stub) template repository, which contains the minimum configuration files you'll need to get started. The main [ Bem libraries](https://en.bem.info/platform/libs/) are connected to project-stub by default:

* [bem-core](https://en.bem.info/platform/libs/bem-core/)
* [bem-components](https://en.bem.info/platform/libs/bem-components/)

A copy of project-stub can be made using Git.

> **Please note:** In OS X or Linux, all commands are executed in the terminal. Windows users must run commands in Git Bash. Make sure that Git Bash is launched from an administrator login.

To create a local copy of project-stub, do the following:

1. Clone project-stub into the `start-project` directory:

   ```bash
   git clone https://github.com/bem/project-stub.git --depth 1 start-project
   ```

2. Go to the project directory:

   ```bash
   cd start-project
   ```

3. Set dependencies:

   ```bash
   npm install
   ```

   > **Please note:** Do not use `root` superuser rights when setting npm-dependencies.

4. Start the server using [ ENB](https://en.bem.info/toolbox/enb/):

   ```bash
   npm start
   ```

   By default, the server runs on port 8080.

   > **Please note:** If port `8080`  is already being used by another program, you can reassign it:
   >
   > ```bash
   > npm start -- -p 8081
   > ```

5. Open your browser and enter the following address: [http://localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html). A page with sample blocks from the [bem-components](https://github.com/bem/bem-components) library should open.

After building and setting all dependencies, the project file structure will look like this:

```files
start-project/
    .bem
    .enb/                 # Configuration files for ENB compiler
    common.blocks/        # Basic block implementations
    desktop.blocks/       # Project block directory
    desktop.bundles/      # Project bundle directories
    node_modules/         # Installed Node modules (packets)
    .bemrc                #
    .editorconfig         # EditorConfig configuration to support various editors and IDEs
    .gitignore            # Exclusion of files and directories in Git
    .travis.yml           # Automatic launch of linters in Continuous Integration
    favicon.ico           #
    gulpfile.js           # Configuration file for the Gulp compiler
    package.json          # Project description for npm
    README.md             # Text description of project
```

## Creating a page

The `desktop.bundles`  project directory contains files obtained as a result of the build procedure. These files are called [bundles](../../method/build/build.en.md#introduction) in BEM. In the simplest instance, bundles are compiled for each page. In this case, one project page will correspond to one bundle directory. By default, the project has an `index` page.

To add a new page:

1. Create a directory with the name of the page (for example, `hello`) in `desktop. bundles`.
2. Create the `hello.bemjson.js` file in the `desktop.bundles/hello/` directory.

    The root directory of the project will look like this:

    ```files
    start-project/
        .bem
        .enb/
        common.blocks/
        desktop.blocks/
        desktop.bundles/
            index/               # index page bundle directory
            hello/               # hello page bundle directory
                hello.bemjson.js # hello page description
    ```

    > File and directory names follow the [naming conventions](../../method/naming-convention/naming-convention.en.md).

3. Add a comment to file `hello.bemjson.js` in order to make sure that it isn't left empty:

    ```text
    // BEMJSON description of the page will be here
    ```

### Describing the page in a BEMJSON file

To create a page description, you'll need to define its structure. In this case, we're placing the `hello` block on the page. It will contain a greeting (`greeting` element of block `hello`), a text box (`input`  block) and a button (`button` block). The [input](https://en.bem.info/platform/libs/bem-components/current/desktop/input/) and [button](https://en.bem.info/platform/libs/bem-components/current/desktop/button/) blocks can be taken from the bem-components library.

> More info about the [BEMJSON](https://en.bem.info/platform/bemjson/) input data format.

To define the page scructure, edit `desktop.bundles/hello/hello.bemjson.js`:

1. Add the block `hello`.

    ```js
    ({
        block : 'page',
        title : 'hello',
        head : [
            { elem : 'css', url : 'hello.min.css' }
        ],
        scripts : [{ elem : 'js', url : 'hello.min.js' }],
        mods : { theme : 'islands' },
        content : [
            {
                block : 'hello'
            }
        ]
    })
    ```

2. Place the `greeting`  element with the user welcome text (`content` field) in the `hello` block.

    ```js
    content : [
        {
            block : 'hello',
            content : [
                {
                    elem : 'greeting',
                    content : 'Hello, %user%!'
                }
            ]
        }
    ]
    ```

3. Add the `input`  and `button`  blocks to the `hello` block.

    ```js
    content : [
        {
            block : 'hello',
            content : [
                {
                    elem : 'greeting',
                    content : 'Hello, %user%!'
                },
                {
                    block : 'input',
                    mods : { theme: 'islands', size : 'm' },
                    name : 'name',
                    placeholder : 'User name'
                },
                {
                    block : 'button',
                    mods : { theme : 'islands', size : 'm', type : 'submit' },
                    text : 'Click'
                }
            ]
        }
    ]
    ```

[Full code of the](https://gist.github.com/innabelaya/837a96299de6fd488223) BEMJSON file

To make sure that all the defined blocks and elements appear on the page, open the `hello` page in your browser: [http://localhost:8080/desktop.bundles/hello/hello.html](http://localhost:8080/desktop.bundles/hello/hello.html).

## Creating blocks

Blocks from the library have appeared on the page, but they do not interact with each other. We will now create the `hello` block, which will take data from the input field and insert them it into the greeting. To do this:

1. Create a directory named `hello`  in `desktop. blocks`.
2. Place the following [block implementation files](../../method/key-concepts/key-concepts.en.md#implementation-technology) in it:
    * `hello.js` — Defines the behavior of the block.
    * `hello.bemhtml.js` — Contains templates for generating the block's HTML markup.
    * `hello.css` — Contains the block styles.

### Describing the block behavior

1. Open the file `desktop.blocks/hello/hello.js`.
2. Insert the code that defines the block's reaction to user actions. When the button is clicked, the user name entered into the `input` field will be inserted into the greeting.

   > JavaScript code is written using the [i-bem.js](https://en.bem.info/platform/i-bem/) declarative JavaScript framework.

   ```js
   // constructor for defining the reaction to an event
    onSetMod: {
        js: {
            inited: function() {
                this._input = this.findChildBlock(Input);
            }
        }
    },
    _onSubmit: function(e) {
        // prevents triggering the default event:
        // sends the form to the server and refreshes the page
        e.preventDefault();
        this._elem('greeting').domElem.text('Hello, ' + this._input.getVal() + '!');
    },
    {
        lazyInit: true,
        onInit: function() {
            // DOM event to react to
            this._domEvents().on('submit', this.prototype._onSubmit);
        }
    }
    ```

2. Use the [YModules](https://github.com/ymaps/modules/blob/master/README.md) module system  to present the given JavaScript code:

    ```js
    // adding dependencies from i-bem-dom, input and button
    modules.define('hello', ['i-bem-dom', 'input', 'button'],
        // the function that names of used modules are passed to
        function(provide, bemDom, Input, Button) {

        // declaration of the hello block
        provide(bemDom.declBlock('hello', {
            onSetMod: {
                js: {
                    inited: function() {
                        this._input = this.findChildBlock(Input);
                    }
                }
            },
            _onSubmit: function(e) {
                e.preventDefault();
                this._elem('greeting').domElem.text('Hello, ' + this._input.getVal() + '!');
            }
        }, {
            lazyInit: true,
            onInit: function() {
                this._domEvents().on('submit', this.prototype._onSubmit);
            }
        }));
    });
    ```

#### Creating the block template

[BEMHTML](https://en.bem.info/platform/bem-xjst/)  is a technology that converts input data from a BEMJSON file into HTML.

To create a template:

1. Open the file `desktop.blocks/hello/hello.bemhtml.js`.
2. Write a [ BEMHTML-template](https://en.bem.info/platform/bem-xjst/8/templates-syntax/). In it, specify that the `hello` block uses a JavaScript implementation.
3. Use the standard [tag](https://en.bem.info/platform/bem-xjst/8/templates-syntax/#tag) mode to wrap the `hello`  block in a form.

    ```js
    block('hello')(
        js()(true),
        tag()('form')
    );
    ```

#### Adding block styles

1. Edit `desktop.blocks/hello/hello.css`:

    ```css
    .hello
    {
        color: green;
        padding: 10%;
    }

    .hello__greeting
    {
        margin-bottom: 12px;
    }
    ```

2. Create additional rules for the `input` element of the `hello` block. They are needed in order to change the `input` block styles from the bem-components library.

    ```css
    .hello__input
    {
        margin-right: 12px;
    }
    ```

3. Use the [mix](https://en.bem.info/platform/bemjson/#mix) field in `desktop.bundles/hello/hello.bemjson.js` to add additional CSS rules to the `input` block.

   ```js
   {
       block : 'input',
       mods : { theme : 'islands', size : 'm' },

       // mix in element to add CSS rules
       mix : { block : 'hello', elem : 'input' },

       name : 'name',
       placeholder : 'User name'
   }
   ```

    > See the [Methodology](https://en.bem.info/methodology/quick-start/#mix) section for more information about  [mixing](../../method/key-concepts/key-concepts.en.md#mix).

[Complete code](https://gist.github.com/innabelaya/045ddfb063af3b262182) of the `desktop.bundles/hello/hello.bemjson.js` file.

## Result

Refresh [the page](http://localhost:8080/desktop.bundles/hello/hello.html) to check the results. A full rebuild of the project isn't necessary. A server mode that automatically rebuilds only the modified parts of the project was launched while the project was being developed.

> Go to [Creating a static project in BEM](https://en.bem.info/platform/tutorials/start-with-project-stub/) to see how to create a more complex static project.
