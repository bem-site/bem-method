# Dynamic projects with BEM

* [Introduction](#introduction)
* [Notation](#notation)
* [Technologies](#technologies)
* [Hello World application](#hello-world-application)
  * [Template repository](#template-repository)
  * [Quick start](#quick-start)
  * [File system](#file-system)
* [Social Services Search Robot application](#social-services-search-robot-application)
  * [Application flow](#application-flow)
  * [Node modules used](#node-modules-used)
  * [Preparing the project structure](#preparing-the-project-structure)
  * [Obtaining OAuth tokens](#obtaining-oauth-tokens)
  * [Application configuration](#application-configuration)
  * [Working with the Twitter Search API](#working-with-the-twitter-search-api)
  * [Working with the YouTube Data API](#working-with-the-youtube-data-api)
  * [Layout](#layout)

## Introduction

Many of today's applications require dynamic capabilities, such as data exchange in real time followed by complete or partial reloading of the current page.

The purpose of this document is to show how to develop dynamic BEM projects using [full stack development](#technologies).

We'll look at the process of creating a dynamic app called **Social Services Search Robot** (**SSSR**). This is an app for searching for recent tweets and videos by keyword.

The project development uses:

* The [i-bem.js](https://en.bem.info/platform/i-bem/) framework.
* The [bem-xjst](https://en.bem.info/platform/bem-xjst/) template engine.
* The [DEPS](https://en.bem.info/platform/deps/) technology for describing dependencies.
* [Express.js](http://expressjs.com).
* The [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list).
* The [Twitter Search API](https://dev.twitter.com/rest/public/search).

After reading this, you will be able to develop your own BEM projects for use with dynamic data.

Note: To be able to use the examples given here, you need basic skills in:

* HTML
* CSS
* JavaScript
* BEM

> **Important:** This document doesn't cover issues with layout and the client JavaScript.

You will need to install:

* [Node.js 4+](https://nodejs.org)
* [Git](https://git-scm.com)

> **Important:** Windows users must additionally install [Git Bash](https://git-for-windows.github.io).

All the code samples provided in this document were tested in the following versions:

* Node.js — 4.7.0.
* npm — 4.5.0.

> **Note:** [npm](https://www.npmjs.com) is the package manager that is included in Node.js.

## Notation

This document uses the following notation:

* ![folder](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__folder.svg) — directory
* ![file](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__file.svg) — file
* ![add folder](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__add-folder.svg) — create a directory
* ![add file](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__add-file.svg) — create a file
* ![edit file](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__edit-file.svg) — edit a file

## Technologies

The full BEM technology stack includes:

* [BEMDECL](#bemdecl) — Technology for describing declarations in BEM.
* [DEPS](#deps) — Technology for describing dependencies in BEM.
* [BEMTREE](#bemtree) — Template engine that transforms data to BEMJSON.
* [BEMHTML](#bemhtml) — Template engine that transforms BEMJSON to HTML.
* [i-bem.js](#i-bemjs) — JavaScript framework for BEM.

> More information about the [BEMJSON format](https://en.bem.info/platform/bemjson/) for input data.

### BEMDECL

Forms a list of [BEM entities](https://en.bem.info/methodology/key-concepts/#bem-entity) that are used on the page.

In BEM, this list is called a [declaration](https://en.bem.info/methodology/declarations/). The purpose of the declaration is to define what to include in the build and in what order.

Declarations are defined in files with the `.bemdecl.js` extension.

Example of a declaration from the [Hello World application](#hello-world-application):

```js
// `desktop.bundles/index/index.bemdecl.js`
exports.blocks = [
    { name: 'root' }
];  
```

As the example shows, the `index.bemdecl.js` file only defines the `root` block.

When using [DEPS](#deps), the declaration defines the BEM entity to start the [project build](https://en.bem.info/methodology/build/) on.

You should treat the `root` block as the central "entry point" when working with a project. All the other BEM entities are included in the build by dependencies.

Example of a project build from dependencies:

```files
root(DECL)
|
└──> root(DEPS)
     |
     └──> page(DEPS)
          |
          ├──> header(DEPS)
          |    |
          |    └──> ...
          |
          ├──> body(DEPS)
          |    |
          |    └──> ...
          |
          └──> footer(DEPS)
               |
               └──> ...
```

> More information about the [BEMDECL](https://en.bem.info/methodology/declarations/) technology.

### DEPS

Defines the dependencies between BEM entities that are spread out across the project's file system and not listed in the [declaration](#bemdecl).

Dependencies are defined as JavaScript objects in files with the `.deps.js` extension.

Example of dependencies for the `root` block from the [Hello World application](#hello-world-application):

```js
// `common.blocks/root/root.deps.js`
({
    shouldDeps: 'page'
})
```

> More information about [DEPS](https://en.bem.info/platform/deps/).

### BEMTREE

Part of the [bem-xjst](https://en.bem.info/platform/bem-xjst/) template engine that transforms data to BEMJSON.

Templates are defined in BEMJSON format in files with the `.bemtree.js` extension.

Input and output of the template engine:

![BEMTREE](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__bemtree.svg)

> More information about [BEMTREE](https://en.bem.info/platform/bem-xjst/).

### BEMHTML

Part of the [bem-xjst](https://en.bem.info/platform/bem-xjst/) template engine that transforms BEMJSON to HTML.

Templates are defined in files with the `.bemhtml.js` extension.

Input and output of the template engine:

![BEMHTML](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__bemhtml.svg)

> More information about [BEMHTML](https://en.bem.info/platform/bem-xjst/).

### i-bem.js

Client JavaScript framework for web development using the BEM methodology.

The JavaScript code is described in files with the `.js` extension.

It allows you to:

* Develop a web interface in terms of blocks, elements, modifiers.
* Describe the block's logic in declarative style as a set of states.
* Easily integrate the JavaScript code with BEMHTML templates and CSS.
* Flexibly redefine the behavior of library blocks.

> More information about [i-bem.js](https://en.bem.info/platform/i-bem/).

## Hello World application

Programmers have a tradition of starting out programming in a new language or framework with the **Hello, World!** program. The program usually prints the words "Hello, World!" to the output stream to show that it runs and can perform input/output operations.

You cancreate this application and then extend it to the desired **SSSR**.

To do this, you'll need a local copy of the [bem-express template repository](#template-repository). You can use Git to make a copy.

> **Note:** For OS X or Linux users, all commands are run in the terminal. Windows users need Git Bash. Make sure that you run Git Bash as the administrator.

### Template repository

The [bem-express](https://github.com/bem/bem-express) template repository was created for tasks involving the development of dynamic applications using BEM. It contains the essential config files and solves an entire set of problems such as building a project, configuring linters, connecting libraries, and others.

The main BEM libraries are integrated in `bem-express` by default:

* [bem-core](https://en.bem.info/platform/libs/bem-core/)
* [bem-components](https://en.bem.info/platform/libs/bem-components/).

### Quick start

To create the **Hello World** application, follow these steps:

1. Clone bem-express:

    ```bash
    git clone https://github.com/bem/bem-express.git sssr-project
    ```

    > **Note:** This example uses `bem-express` version 2.00.

2. Go to the project directory:

    ```bash
    cd sssr-project
    ```

3. Delete the versioning history for the source repository:

    ```bash
    rm -rf .git
    ```

4. Initialize your own Git repository:

    ```bash
    git init
    ```

5. Set dependencies:

    ```bash
    npm install
    ```

    > **Note:** Don't use `root` superuser permissions when setting npm dependencies.

6. Build the project and start the server:

    ```bash
    npm run dev
    ```

    > **Note:** [ENB](https://en.bem.info/toolbox/enb/) is responsible for the project build.

    When the application starts, the terminal shows a message that the server is running on port 3000:

    `Server is listening on 3000`.

    > **Note:** If port `3000` is being used by another program, you can reassign the port. For example, set it to `8000`:
    >
    > Method 1. Change the value at application launch.
    >
    > ```bash
    > PORT=8000 npm run dev
    > ```
    >
    > Method 2. Change the default value in the `server/config.js` file.
    >
    > ```text
    > defaultPort: 8000
    > ```

    The following starts on the computer:

    * Server — Responsible for processing dynamic data.
    * [nodemon](https://github.com/remy/nodemon/) — Monitors changes in the [file system](https://en.bem.info/methodology/filestructure/) and restarts the server.
    * [chokidar](https://github.com/paulmillr/chokidar) — Monitors changes in files in the `*.blocks/` directories and rebuilds the project structure.
    * [livereload](https://github.com/napcs/node-livereload) — Refreshes the page in the browser.

7. Open the browser and enter the address [localhost:3000](http://localhost:3000).

    It should open a page with the following content:

    ```text
    Index page content
    footer content
    ```

    > **Note:** If you run the application in Windows and you get a Firewall notification:
    >
    > 1. Disable the *Public Network* option.
    > 2. Enable the *Private Network* option.
    > 3. Allow access.

8. Open the `server/index.js` file and make the following changes to the code that starts with the line `app.get('/', function(req, res)` (see the comments):

    ```js
    /**
     * The function handles all GET requests from the application's main page
     * @function
     * @param {object} req - Request.
     * @param {object} res - Response.
     */
    app.get('/', function(req, res) {
        var hello = 'Hello';                  // Initialize the `hello` variable
        var world = 'World';                  // Initialize the `world` variable
        render(req, res, {
            view: 'page-index',
            title: 'Main page',
            meta: {
                description: 'Page description',
                og: {
                    url: 'https://site.com',
                    siteName: 'Site name'
                }
            },
            hello: hello,                     // Pass the `hello` variable to `this.data.hello`
            world: world                      // Pass the `world` variable to `this.data.world`
        })
    });
    ```

9. Open the `common.blocks/page-index/page-index.bemtree.js` file and replace the contents with the following:

    ```js
    block('page-index').content()(function() {
        // Receive data from the `this` global object
        var data = this.data;
        // Return the received data: `data.hello: 'Hello'`, `data.world: 'World'`
        return data.hello + ', ' + data.world;
    });
    ```

    After saving, the server automatically restarts and the page content changes to:

    ```text
    Hello, World
    footer content
    ```

The **Hello, World** application is ready.

**Did something go wrong?**

If you had trouble creating the application, look for a solution in the [forum](https://en.bem.info/forum/). If you can't find an answer there, submit a question to the forum experts.

### File system

After setting all the dependencies, the file system of the **Hello World** application should look like this:

```files
sssr-project/
    .enb/                 # Config files for the ENB compiler
    common.blocks/        # Basic implementations of blocks
    desktop.bundles/      # Directories of project bundles
    development.blocks/   # Blocks that are integrated during development
    node_modules/         # Installed Node modules (packages)
    server/               # Directory with server code
    static/               # Root directory for distribution of static files
    .bemhint.js           # Bemhint linter configuration
    .borschik             # Borschik compiler configuration
    .eslintignore         # Excluding files and directories in ESLint
    .eslintrc             # ESLint configuration
    .gitignore            # Excluding files and directories in Git
    .stylelintrc          # Stylelint configuration
    .travis.yml           # Automatically starting linters in Continuous Integration
    nodemon.json          # Nodemon package configuration
    package.json          # Describing a project for npm
    README.md             # Text description of the project
```

Let's look at some of the main directories in more detail:

* [.enb](#enb)
* [common.blocks](#commonblocks)
* [desktop.bundles](#desktopbundles)
* [server](#server)
* [static](#static)

#### .enb

Contains the configuration of the [ENB](https://en.bem.info/toolbox/enb/) compiler.

The build performs the following tasks:

* Combines source files that are spread out across the project's file structure.
* Includes just the necessary blocks, elements, and modifiers in the project.
* Follows the order for including entities.
* Processes the source code during the build process (for example, transforms LESS code into CSS code).

The build algorithm is described in the `.enb/make.js` file.

> More information about [building BEM projects](https://en.bem.info/methodology/build/).

#### common.blocks

Contains implementations of all the project's [BEM entities](https://en.bem.info/methodology/key-concepts/#bem-entity).

The names of files and directories follow the [naming convention](https://en.bem.info/methodology/naming-convention/). The code is divided into independent parts for ease of working with individual blocks.

```files
common.blocks/
    body/                 # Directory for the `body` block
    footer/               # Directory for the `footer` block
    header/               # Directory for the `header` block
    page/                 # Directory for the `page` block
        _view/            # Subdirectory for the `page_view` modifier
        page.bemtree.js   # BEMTREE implementation of the `page` block
        page.deps.js      # DEPS implementation of the `page` block
    page-index/           # Directory for the `page-index` block
    root/                 # Directory for the `root` block
```

Before being sent to the browser, the files are [compiled](#enb) and optimized.

#### desktop.bundles

Contains the files received as the result of the build. These files are called [bundles](https://en.bem.info/methodology/build/) in the BEM methodology.

Each bundle directory corresponds to a single page of the project:

```files
desktop.bundles/
    index/                # Bundles for the `index` page
        index.bemdecl.js  # Declaration for the `index` page
        index.bemhtml.js  # BEMHTML bundle for the `index` page
        index.bemtree.js  # BEMTREE bundle for the `index` page
        index.css         # CSS bundle for the `index` page
        index.deps.js     # DEPS bundle for the `index` page
        index.js          # JS bundle for the `index` page
        ...
```

> **Note:** The only file in the `index` directory that isn't generated automatically is the `index.bemdecl.js` file. More information about the BEMDECL technology [is provided below](#bemdecl).

#### server

Contains the [Node modules](#node-modules) that listen for web requests and generate the page.

File system for the directory:

```files
server/
    config.js             # Application configuration
    index.js              # Application entry point
    rebuild.js            # Rebuilding the application
    render.js             # HTML rendering
```

Modules and their functions:

* `index.js` — Module for initializing and launching the application. It connects [Express.js](#express) and various modules that provide [middleware](http://expressjs.com/en/resources/middleware.html) support.
* `config.js` — Module with the application's configuration data. It detects the application's default configuration (the port, the directory for storing static files, and the session's secret key).
* `rebuild.js` — Module for automatically rebuilding the project. It monitors changes in files and directories (in the `*.blocks` and `static` directories), and rebuilds and restarts the project.
* `render.js` — Module for HTML rendering. It receives BEMJSON as input, completes it with the necessary data, and generates HTML.

#### static

Contains static files that can be accessed externally:

```files
static/
    favicon.ico           # Favicon
    index.min.css         # Symbolic link to `desktop.bundles/index/index.min.css`
    index.min.js          # Symbolic link to `desktop.bundles/index/index.min.js`
```

> More information about [symbolic links](https://en.wikipedia.org/wiki/Symbolic_link).

## Social Services Search Robot application

![Demo](start-with-bem-express__demo.png)

**SSSR** is a service for searching for tweets and videos that match a specified set of parameters. The search parameters are transmitted to the [Twitter Search API](https://dev.twitter.com/rest/public/search) and the [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list) in the form of an HTTP GET request. The APIs form a response as a [JSON document](http://www.json.org).

The purpose of developing this application is to show you:

* How to tie the data and the interface together.
* Which [technologies](#technologies) are used and what they do.

You can use this infrastructure (the **SSSR** application) as the basis of a wide variety of dynamic BEM projects for solving specific tasks.

> **Note.** To develop the application, you need to install some [specific Node modules](#node-modules-used).

### Application flow

The application flow can be visualized as follows:

![Chart of Social Services Search Robot](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__chart.svg)

#### Step 1. Submitting a query

The user sends a query to the server.

#### Step 2. Receiving data

The application sends a request for data to the [Twitter Search API](https://dev.twitter.com/rest/public/search) and the [YouTube Data API](https://developers.google.com/youtube/v3/docs/search/list) according to the query received from the user.

> **Note:** Generating the request and preparing the received data for templating are covered in detail in the section [Working with APIs](#working-with-apis).

#### Step 3. BEMTREE templating

The application passes the received data to the [BEMTREE template engine](#bemtree), which transforms the data to BEMJSON.

#### Step 4. BEMHTML templating

The application passes the BEMJSON to the [BEMHTML template engine](#bemhtml), which transforms the BEMJSON to HTML.

#### Step 5. Sending results to the user

The application returns the results (the HTML page) to the user.

> **Note:** Either the entire page can be updated, or just the content of a specific block.

### Node modules used

Let's take a closer look at the concept of a Node module and the main modules that the application needs.

> **Important:** This section doesn't cover all the modules that are used. For more information about a specific module, see the [npm](https://www.npmjs.com) site. It includes a list of all the Node modules and a search feature.

The basic Node implementation is kept as simple as possible. Rather than directly embedding all the possible components in Node, the develpers provide additional functionality as separate modules (packages).

The modular system for Node is modeled after the [CommonJS](https://en.wikipedia.org/wiki/CommonJS) system, which is a solution for creating interactive modules. The system relies on a contract that must be fulfilled by developers in order for their modules to interact correctly with each other.

All packages that are installed using the npm package manager are located in the `node_modules` directory.

Use the `require` command to enable modules. If a package is installed using npm, you don't need to specify the path. Just specify the name:

```js
var express = require('express');
```

If you are enabling a custom local module, specify the path:

```js
var someModule = require('./somefolder/somemodule');
```

Any module that you enable must be designed for Node interaction. To meet this requirement, the module must be exported using `module.exports`:

```js
module.exports = {
    // some module
};
```

The application requires the following modules:

* [express](#express)
* [passport](#passport)
* [passport-youtube-v3](#passport-youtube-v3)
* [twitter](#twitter)
* [googleapis](#googleapis)
* [moment](#moment)

> **Note:** You can install the required modules using a single command:
>
> ```bash
> npm install express passport passport-youtube-v3 twitter googleapis moment --save
> ```

#### express

Provides most of the functionality that the developer needs for building a web application.

Install:

```bash
npm install express --save
```

The Express documentation provides a basic application called [Hello World Express](http://expressjs.com/en/starter/hello-world.html). It demonstrates the basic steps:

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

#### passport

Provides [various authentication strategies](http://passportjs.org) for Node.js applications.

Install:

```bash
npm install passport --save
```

Example of OAuth 2.0 authorization:

```js
var passport = require('passport'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * This function integrates the appropriate authorization strategy
 * @function
 * @param {string} provider — For example, Facebook, Twitter, Google, or others
 * @param {object} strategy — Authorization strategy
 */
passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: SERVICE_APP_ID,
    clientSecret: SERVICE_APP_SECRET,
    callbackURL: 'https://www.example.com/auth/provider/callback'
}));
```

> **Note:** [OAuth 2.0](https://oauth.net/2/) is an open authorization protocol that makes it possible to grant a third party limited access to a user's protected resources, without sharing the user's credentials.

#### passport-youtube-v3

Provides a [mechanism](https://github.com/yanatan16/passport-youtube-v3) for authentication on YouTube via the YouTube account and [OAuth 2.0](https://oauth.net/2/) tokens.

Install:

```bash
npm install passport-youtube-v3 --save
```

**Example**

```js
var passport = require('passport'),
    YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
/**
 * This function integrates the YoutubeV3Strategy
 * @function
 * @param {object} strategy — Strategy
 */
passport.use(new YoutubeV3Strategy({
    clientID: YOUTUBE_APP_ID,
    clientSecret: YOUTUBE_APP_SECRET,
    callbackURL: '/auth/youtube/callback',
    scope: ['https://www.googleapis.com/auth/youtube.readonly']
}, verify));
```

> More information about [how to get OAuth tokens](#obtaining-oauth-tokens).

#### twitter

Client [library](https://www.npmjs.com/package/twitter) for working with the [Twitter REST API](https://dev.twitter.com/rest/public).

Install:

```bash
npm install twitter --save
```

**Example**

```js
var Twitter = require('twitter');
// Creating an instance of the Twitter object
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  bearer_token: ''
});

var params = {q: 'bem'};
/**
 * Search function. Searches for tweets that match the specified parameters.
 * @function
 * @param {object} params - Search parameters.
 * @param {function} callback - Receives the tweet results.
 */
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
```

#### googleapis

Client [library](http://google.github.io/google-api-nodejs-client/) for working with the [Google REST API](https://developers.google.com/apis-explorer/#p/).

Install:

```bash
npm install googleapis --save
```

**Example**

```js
var google = require('googleapis'),
    OAuth2 = google.auth.OAuth2;
// Creating an instance of the OAuth2 object
var oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);
// Setting credentials for outgoing calls
oauth2Client.setCredentials({
  access_token: 'ACCESS TOKEN HERE',
  refresh_token: 'REFRESH TOKEN HERE'
});
// Logging in
var youtube = google.youtube({
    version: 'v3',
    auth: this.oauth2Client
});

var params = {q: 'bem'};
/**
 * Search function. Searches for videos that match the specified parameters.
 * @function
 * @param {object} params - Search parameters.
 * @param {function} callback - Receives the video results.
 */
youtube.search.list(params, function(error, video, response) {
  if (!error) {
    console.log(video);
  }
});
```

#### moment

JavaScript [library](http://momentjs.com) for parsing, validating, and formatting dates.

Install:

```bash
npm install moment --save
```

**Example**

```js
var moment = require('moment');

moment().startOf('day').fromNow();             // 17 hours ago
```

### Preparing the project structure

Before you begin writing code, you need to make a few changes to the structure that you got from the **Hello World** application.

Changes for:

* [static files](#changes-for-static-files)
* [server code](#changes-for-server-code)

#### Changes for static files

![static](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__static-changes.svg)

**`static` directory**

* Create the `images` subdirectory.

* Move the favicon to the `images` subdirectory.

**`common.blocks` directory**

* Edit `root/root.bemtree.js`.

  Change:

  ```text
  favicon: '/favicon.ico'
  ```

  To:

  ```text
  favicon: '/images/favicon.ico'
  ```

  [Complete code for root.bemtree.js](https://gist.github.com/godfreyd/fba71361207a95134982579c13b0050d).

**`server` directory**

* Edit `index.js`.

  Change:

  ```text
  .use(favicon(path.join(staticFolder, 'favicon.ico')))
  ```

  To:

  ```text
  .use(favicon(path.join(staticFolder, '/images/favicon.ico')))
  ```

  [Complete code for index.js](https://gist.github.com/godfreyd/fdc6e2d7f1f42deac4dcfc0dde36bd11).

When all these steps have been completed, the file structure in the `static` directory should look like this:

```files
static/
    images/
        favicon.ico
index.min.css
index.min.js
```

#### Changes for server code

![server-changes](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__server-changes.svg)

**`server` directory**

* Create these subdirectories:

  * `controllers`
  * `helpers`
  * `middleware`

* Create empty `JS` files for the future modules:

  * `app.js` — Module for integrating middleware (makes it accessible in the application).
  * `auth.js` — Module for authentication on YouTube.
  * `routes.js` — Module for routing web requests.

* Add [this code](https://gist.github.com/godfreyd/a584cee1191833afae70fc059ba1f200) to the `app.js` file.

* Add [this code](https://gist.github.com/godfreyd/f6de1c33a83dda708a0e3ba9312f0c78) to the `routes.js` file.

* Change the extension of the `config` file:

  `config.js` —> `config.json`

* Edit the `config.json` file

  Change:

  ```js
  module.exports = {
      staticFolder: 'static',
      defaultPort: 3000,
      cacheTTL: 30000,
      sessionSecret: 'REPLACE_ME_WITH_RANDOM_STRING'
  };
  ```

  To:

  ```json
  {
    "staticFolder": "static",
    "defaultPort": 3000,
    "cacheTTL": 30000,
    "sessionSecret": "REPLACE_ME_WITH_RANDOM_STRING"
  }
  ```

* Change the current content of the `index.js` file to [this](https://gist.github.com/godfreyd/37d903c73f863619e2e1be1cd946d4c3).

  > **Note:** The `index.js` file will only contain the functionality for starting the application and listening for requests on the port.

**`controllers` directory**

* Create an empty `JS` file:

  * `index.js` — Controller for processing requests and rendering HTML.

* Add [this code](https://gist.github.com/godfreyd/4bda7da3db029890378e15bcc38f32de) to the `index.js` file.

**`helpers` directory**

* Create empty `JS` files:

  * `index.js` — Entry point for helpers.
  * `twitter.js` — Helper module for working with the Twitter Search API.
  * `youtube.js` — Helper module for working with the YouTube Data API.

**`middleware` directory**

* Create an empty `JS` file:

  * `auth.js` — Module for checking authentication on YouTube.

When all these steps have been completed, the file structure in the `server` directory should look like this:

```files
server/
    controllers/
        index.js          # Controller for processing requests and rendering HTML
    helpers/
        index.js          # Entry point for helper modules (empty)
        twitter.js        # Helper module for working with the Twitter Search API (empty)
        youtube.js        # Helper module for working with the YouTube Data API (empty)
    middleware/
        auth.js           # Module for checking authentication on YouTube (empty)
    app.js                # Module for middleware integration
    auth.js               # Module for YouTube authentication (empty)
    config.json           # Application configuration
    index.js              # Starting the application and listening for requests on the port
    rebuild.js            # Module for tracking changes and retstarting the server
    render.js             # HTML rendering
    routes.js             # Router
```

### Obtaining OAuth tokens

Twitter and Google store various user data such as tweets, YouTube videos, email messages, photos, and so on. To make it easy to access this data from other apps or third-party services, they use the [OAuth 2.0](https://oauth.net) open authorization protocol.

The protocol requires the developer to register the application on the OAuth server and request access to specific data. The authorized user either grants or denies access.

#### Obtaining an OAuth token for Twitter

Twitter allows applications to make authenticated requests on behalf of the application itself.

**How to get started**

1. Read the [documentation](https://dev.twitter.com/oauth).
2. Register your [application](https://apps.twitter.com) and get the keys (Consumer Key and Consumer Secret).
3. Install [Postman](https://www.getpostman.com) using any convenient method.
4. [Encode the ](#codestring) `Consumer Key:Consumer Secret` string using [Base64](https://en.wikipedia.org/wiki/Base64).
5. [Receive the OAuth token](#gettoken) in exchange for the code.
6. Use the token and keys that you received in requests that you send to the Twitter Search API.

  > **Note:** You need Postman in order to make the POST request to receive the OAuth token in exchange for the code obtained using the Base64 method.

<a name="codestring"></a>
**How do I encode a string?**

To encode a string using Base64:

1. Create a string in the format `Consumer Key:Consumer Secret`.

    **Example**

    `xvz1evFS4wEEPTGEFPHBog:L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg`

    > **Note:** To get the Consumer Key and Consumer Secret, go to the **Keys and Access Tokens** tab in [your application](https://apps.twitter.com).

2. Start the terminal or Git Bash.
4. Run the command `echo -n "xvz1evFS4wEEPTGEFPHBog:L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg" | base64`.
5. Copy the code you receive.

    **Example**

    `eHZ6MWV2RlM0d0VFUFRHRUZQSEdFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==`

> **Note:** If you run into problems, consult the online resource [base64encode.org](https://www.base64encode.org).

<a name="gettoken"></a>
**How do I exchange the code for an OAuth token?**

To receive a token in exchange for the code:

1. Start Postman.

    > **Note:** By default, a tab opens where you need to form a POST request to the Twitter OAuth server.

2. Choose **POST** for the request type.
3. Enter the server address `https://api.twitter.com/oauth2/token`.
4. Go to the **Headers** tab.
5. In the **Key** field, enter the `Authorization` header with **Value** set to `Basic <encoded Consumer Key:Consumer Secret string>`.

    **Example**

    `Authorization: Basic eHZ6MWV2RlM0d0VFUFRHRUZQSEdFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==`

    > **Note:** Basic indicates the basic authorization method.

6. Enter a second `Content-Type` header with the value `application/x-www-form-urlencoded;charset=UTF-8`.

    **Example**

    `Content-Type: application/x-www-form-urlencoded;charset=UTF-8`

7. Go to the **Body** tab.
8. Choose the option `x-www-form-urlencoded`.
9. In the **Key** field, enter the `grant_type` request body with the value `client_credentials`.
10. Click **Send**.

    The OAuth server returns the token in JSON:

    ```json
    {
      "token_type": "bearer",
      "access_token": "AAAAAAAAAAAAAAAAAAAAAA%2FAAAAAAAAAA%3DAAAAAAAAAAAAAAAAAA"
    }
    ```

    > **Important:** Save the token and keys that you receive (Consumer Key and Consumer Secret). You need them for the application's [config file](#application-configuration).

#### Obtaining an OAuth token for Google

Google allows applications to make authenticated requests on behalf of the application itself.

> **Note:** The [passport-youtube-v3](#passport-youtube-v3) module is responsible for receiving and updating the OAuth token in exchange for the authorization code using a POST request.

**How to get started**

1. Read the [documentation](https://developers.google.com/youtube/v3/docs/search/list).
2. Register your [application](https://console.developers.google.com/) and receive the Client ID and Client Secret.
3. Set the callback URL (in our case, it is `http://localhost:3000`) in your application's account.
4. Use the Client ID and Client Secret that you received in requests that you send to the YouTube Data API.

> **Important:** Save the keys that you receive (Client ID and Client Secret). You need them for the application's [config file](#application-configuration).

### Application configuration

After you have received all the keys and tokens, you need to add them to the application's config file:

* Add them to the `server/config.json` file in the `services` field.

  ```json
  "services": {
    "twitter": {
      "consumer_key": "",
      "consumer_secret": "",
      "bearer_token": ""
    },
    "youtube": {
      "client_id": "",
      "client_secret": "",
      "redirect_url": "http://localhost:3000"
    }
  }
  ```

  [Complete code for config.json](https://gist.github.com/godfreyd/3697d1ba5fe5ac298a9b471fe943340f).

* Fill in the appropriate fields with the [received data](#obtaining-oauth-tokens).
* Hide the `server/config.json` file from the Git version control system so you don't accidentally add private keys to the file repository.

  ```bash
  # .gitignore file
  server/config.json
  ```

  [Complete code for .gitignore](https://gist.github.com/godfreyd/71a35fde50f54205fa395230bc97358f).

### Working with the Twitter Search API

The [Twitter Search API](https://dev.twitter.com/rest/public/search) lets you find recent or popular tweets that have been published on Twitter.com over the last 7 days.

More information:

* [API access](#api-access)
* [API calls](#api-calls)

#### API access

To successfully make calls to the API, you need:

* The appropriate URL for the request.
* An [OAuth token](#obtaining-an-oauth-token-for-twitter) issued to your application for accessing the API.
* The [twitter](#twitter) module.

#### API calls

Changes for working with the Twitter Search API:

![twitter-changes](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__twitter-changes.svg)

**`controllers` directory**

* Change the current content of the `index.js` file to [this](https://gist.github.com/godfreyd/3420597de46509b02c69707d596c8dc4).

**`helpers` directory**

* Add the following content to the `index.js` file:

  ```js
  module.exports = {
      twitter: require('./twitter')
  };
  ```

* Add [this code](https://gist.github.com/godfreyd/e48b6831d785e51ee6ce0892151e3395) to the `twitter.js` file.

### Working with the YouTube Data API

The [YouTube Data API](https://developers.google.com/youtube/v3/) allows you to find videos that are published on Youtube.com. By default, the search results include videos, channels, and playlists.

More information:

* [API access](#api-access-1)
* [API calls](#api-calls-1)

#### API access

To successfully make calls to the API, you need:

* The appropriate URL for the request.
* An [OAuth token](#obtaining-an-oauth-token-for-google) issued to your application for accessing the API.
* The [googleapis](#googleapis) module.

#### API calls

Changes for working with the YouTube Data API:

![youtube-changes](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/articles/start-with-bem-express/start-with-bem-express__youtube-changes.svg)

**`server` directory**

* Add [this code](https://gist.github.com/godfreyd/68af82df0bc171da54971990f442dddb) to the `auth.js` file.

* Edit `routes.js`.

  Change:

  ```js
  var router = require('express').Router(),
      controllers = require('./controllers');

  router
      .get('/ping/', function(req, res) {
          res.send('ok');
      })
      .get('/', controllers.getContent);

  module.exports = router;
  ```

  To:

  ```js
  var router = require('express').Router(),
      controllers = require('./controllers'),
      passportYouTube = require('./auth'),
      middleware = require('./middleware/auth'),
      isAuthenticated = middleware.isAuthenticated;

  router
      .get('/auth/youtube', passportYouTube.authenticate('youtube'))
      .get('/auth/youtube/callback', passportYouTube.authenticate('youtube', { failureRedirect: '/error', failureFlash: true }), (req, res) => {
          res.redirect('/');
      })
      .get('/', isAuthenticated, controllers.getContent);

  module.exports = router;
  ```

**`controllers` directory**

* Change the current content of the `index.js` file to [this](https://gist.github.com/godfreyd/60d5d123c45c067b3fb675688dc74835).

**`helpers` directory**

* Add the following content to the `index.js` file (see the note):

  ```js
  module.exports = {
      twitter: require('./twitter'),
      youtube: require('./youtube')        // Connecting the `youtube.js` module
  };
  ```

* Add [this code](https://gist.github.com/godfreyd/e103013e1fe480965cd84b3e7040d04b) to the `youtube.js` file.

**`middleware` directory**

* Add the following content to the `auth.js` file:

  ```js
  module.exports = {
      isAuthenticated: function(req, res, next) {
          if (req.isAuthenticated()) return next();

          return res.redirect('/auth/youtube');
      }
  };
  ```

### Layout

This document focuses primarily on interaction between [BEM technologies](https://en.bem.info/platform/), so it doesn't cover layout and the JavaScript client. Describing layout issues would make this document unreasonably large.

To prepare the layout, follow these steps:

1. Delete all the blocks from the `common.blocks` directory.
2. Clone [these blocks](https://github.com/godfreyd/bem-in-dynamic/tree/master/common.blocks) to the `common.blocks` directory.
3. Add [logo.svg](https://github.com/godfreyd/bem-in-dynamic/blob/master/static/images/logo.svg) to the `static/images` directory.
4. Restart the server: `npm run dev`.

The **Social Services Search Robot** application is ready.

**Did something go wrong?**

If you had trouble creating the application, look for a solution in the [forum](https://en.bem.info/forum/). If you can't find an answer there, submit a question to the forum experts.
