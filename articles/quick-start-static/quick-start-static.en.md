## Quick start for static page creation with BEM

This article describes step-by-step implementation of a static page using [BEM methodology](https://bem.info/method/).

## Expected outcome

A page that contains an input field, a button, and a greeting text. The value from the input field will be added to the greeting text when the user clicks the button.

![The greeting page](https://img-fotki.yandex.ru/get/16156/289488726.0/0_21888e_4908d18d_orig)

## Preliminary steps

### Minimal requirements

* [Node.js 0.10+](http://nodejs.org/) or [io.js](https://iojs.org/en/index.html).
* [Git Bash](http://msysgit.github.io/) if you use Windows OS.

### A local copy and environment setting

A [template repository](https://github.com/bem/project-stub) is the quickest and easiest way to start your BEM project. It contains the minimal configuration files and folders.

**NB** If your operating system is Windows, you must run the following commands in Git Bash with administrator rights.

1.  Make a local copy of `project-stub`.

    **NB** Do not use root rights to install npm and bower dependencies. bower dependencies are installed in the `libs` directory by npm postinstall.

    ```bash
    git clone https://github.com/bem/project-stub.git --depth 1 --branch v1.0.0 start-project
    cd start-project
    npm install
    ```

2.  Run the server using [ENB](https://ru.bem.info/tools/bem/enb-bem-techs/) (this article is available only in Russian).

    ```bash
    npm start
    ```

3.  Check the result on [http://localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html).

    A page with library blocks examples should open:

    ![A main page](https://img-fotki.yandex.ru/get/15493/289488726.0/0_218be7_cbbd5b69_orig)

## Steps for creating the project

1.  [Create a page](#page-creation) <br>
  1.1 [Describe the page in a BEMJSON file](#BEMJSON-declaration)
2.  [Create a block](#block-creation)
3.  [Implement the hello block](#block-hello-modification) <br>
  3.1 [Use JavaScript technology](#JS-modification) <br>
  3.2 [Use BEMHTML technology](#BEMHTML-modification) <br>
  3.3 [Use CSS technology](#CSS-modification)

When all steps have been completed you can watch the [result](#result).

<a name="page-creation"></a>

### 1.  Create a page

Source code of pages is stored in the `start-project/desktop.bundles` directory. The main page `index` contains implementations of blocks for the [bem-components](https://bem.info/libs/bem-components/) library.

Create a new page to start your own project.

1. Create the `hello` directory in the `desktop.bundles`.
2. Add the `hello.bemjson.js` file to the `hello` directory.

<a name="BEMJSON-declaration"></a>

#### 1.1 Describe the page in a BEMJSON file

A [BEMJSON file](https://bem.info/technology/bemjson/) describes a page structure in BEM terms: blocks, elements and modifiers.

1. Add a description of the `hello` block in the `desktop.bundles/hello/hello.bemjson.js` file. <br>
  **hello** block is an entity that will contain all necessary elements for the project.

    ```js
    {
        block: 'page',
        title: 'hello',
        head: [
            { elem: 'css', url: '_hello.css' }
        ],
        scripts: [{ elem: 'js', url: '_hello.js' }],
        mods: { theme: 'islands' }
        content: [
            {
                block: 'hello'
            }
         ]
    }
    ```

2. Place the `greeting` element with the greeting text (**content** field) into the `hello` block.

    ```js
    content: [
        {
            block: 'hello',
            content: [
                {
                    elem: 'greeting',
                    content: 'Hello, %user%!'
                }
            ]
        }
    ]
    ```

3. To create an input field and a button, use `input` and `button` blocks from the `bem-components` library. Add these blocks to the `greeting` element.

    ```js
    content: [
        {
            block: 'hello',
            content: [
                {
                    elem: 'greeting',
                    content: 'Hello, %user%!'
                },
                {
                        block: 'input',
                        mods: { theme: 'islands', size: 'm' },
                        name: 'name',
                        placeholder: 'User name'
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
[Code sample](https://gist.github.com/4exova/ffdd0dcaa40f14f13c5f) hello.bemjson.js.

To verify that the page shows all necessary objects, open [http://localhost:8080/desktop.bundles/hello/hello.html](http://localhost:8080/desktop.bundles/hello/hello.html).

You can make additional changes to existing blocks on your [redefinition level](https://bem.info/tools/bem/bem-tools/levels/).

<a name="block-creation"></a>

### 2. Create a block

In order for all objects on the page to work correctly, it is necessary to specify additional functionality of the `hello` block on your redefinition level.

1.  Create a directory of the `hello` block on the `desktop.blocks` level.
2.  Create the [implementation technology files](https://bem.info/method/filesystem/) (`CSS`, `JS`, `BEMHTML`) required by the block in the `hello` directory.
    The block directory name and its nested files must coincide with the block name specified in the BEMJSON file.

   *  `hello.js` – describes dynamic page functionality
   *  `hello.bemhtml` – a template for generation of the block HTML representation
   *  `hello.css` – changes the design on the page

<a name="block-hello-modification"></a>

### 3. Implement the `hello` block

To implement the block in BEM terms, use the created technology files.

<a name="JS-modification"></a>

#### 3.1 Implement the `hello` block in JavaScript technology

1. Describe the block reaction to a user's action using the `onSetMod` property in the `desktop.blocks/hello/hello.js` file. A click on the button adds the user name from the input field to the greeting phrase. <br>
JavaScript code is written using [i-bem.js](https://ru.bem.info/technology/i-bem/) (this article is available only in Russian) declarative JavaScript framework.

    ```js
    onSetMod: {
        'js': {
            'inited': function() {
                this._input = this.findBlockInside('input');

                this.bindTo('submit', function(e) {
                    e.preventDefault();
                    this.elem('greeting').text('Hello, ' + this._input.getVal() + '!');
                });
            }
        }
    }

    ```

2. To represent the current JavaScript code, use the [YModules](https://bem.info/tools/bem/modules/) modular system .

    ```js
    modules.define(
        'hello', // a block name
        ['i-bem__dom'], // dependence connection
        function(provide, BEMDOM) { // a function that received names of the used modules
            provide(BEMDOM.decl('hello', { // a block declaration
                onSetMod: { // a constructor that describes reaction on an event
                    'js': {
                        'inited': function() {
                            this._input = this.findBlockInside('input');

                            this.bindTo('submit', function(e) { // the event that causes reaction
                                e.preventDefault(); // prevention of event triggering by default (form data sending to the server with page reload)
                                this.elem('greeting').text('Hello, ' + this._input.getVal() + '!');
                            });
                        }
                    }
                }
            }));
        });
    ```

<a name="BEMHTML-modification"></a>

#### 3.2 Implement the `hello` block in BEMHTML technology

[BEMHTML](https://bem.info/technology/bemhtml/current/rationale/) is a technology that processes BEMJSON declarations to create HTML layout of a web page.

1. Write a [BEMHTML template](https://bem.info/technology/bemhtml/current/reference/) and specify that the `hello` block has JavaScript implementation.
2. Implement the `hello` block with form, adding `tag` mode.

```js
block('hello')(
    js()(true),
    tag()('form')
);
```

<a name="CSS-modification"></a>

#### 3.3 Implement the `hello` block in CSS technology

Create your own CSS rules for the `hello` block. For example:

```js
.hello
{
    color: green;
    padding: 10%;
}

.hello__greeting
{
    margin-bottom: 12px;
}

.hello__input
{
    margin-right: 12px;
}
```
To add to `input` element CSS rules that are already implemented in the `hello` block, mix element using the field `mix` in the input data (BEMJSON).

```js
{
    block: 'input',
    mods: { theme: 'islands', size: 'm' },
    mix: { block: 'hello', elem: 'input' }, // mix element to add CSS rules
    name: 'name',
    placeholder: 'User name'
}
```
[Code sample](https://gist.github.com/4exova/683b6da16aa7aa0399f3) hello.bemjson.js.

<a name="result"></a>

## The final result

To see the result of the project, please refresh the page:

    http://localhost:8080/desktop.bundles/hello/hello.html

Since the project consists only of one page, there is no need for a full build. Description of a more complex project is in [Starting your own project](https://bem.info/tutorials/start-with-project-stub/) article.
