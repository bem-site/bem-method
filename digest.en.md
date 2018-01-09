# BEM news digest. Results of 2017.

Brief news about the BEM world since the beginning of the year 2017:

* [Libraries](#libraries)
* [BEM & React](#bem-&-react)
* [Technologies](#technologies)
* [Toolbox](#toolbox)
* [Documents](#documents)
* [bem.info](#beminfo)
* [Events](#events)

## Libraries

### bem-core
Released bem-core [4.1.0](https://en.bem.info/platform/libs/bem-core/4.1.0/)-[4.2.1](https://github.com/bem/bem-core/tree/v4.2.1).

All changes of the releases are described in the [CHANGELOG](https://github.com/bem/bem-core/blob/v4.2.1/CHANGELOG.md).

### bem-core: turbo
jQuery has been removed from the bem-core library. There is not an official release yet, but you can try the [release candidate build](https://github.com/bem/bem-core/tree/turbo-rc.1) and send your feedback.

### bem-components
Released the following versions: [4.0.0](https://en.bem.info/platform/libs/bem-components/4.0.0/)-[6.0.1](https://github.com/bem/bem-components/tree/v6.0.1).

All changes of the releases are described in the [CHANGELOG](https://github.com/bem/bem-components/blob/v6.0.1/CHANGELOG.md).

### bem-history
Released the [4.0.0](https://en.bem.info/platform/libs/bem-history/4.0.0/) version.

All changes are described in the [CHANGELOG](https://en.bem.info/platform/libs/bem-history/4.0.0/changelog/).

### bem-calendar
Published a new mini-library — [bem-calendar](https://github.com/bem/bem-calendar/). It contains a calendar based on bem-components.

### bem-textarea-editor
Published a [bem-textarea-editor](https://github.com/tadatuta/bem-textarea-editor) library that has:
* An editor block that allows you to write text in Markdown
* A convenient toolbar (like Github)
* A preview function to check the post before sending it to the server.

Try the block [here](https://tadatuta.github.io/bem-textarea-editor/).

### bem-font-awesome
Published a [bem-font-awesome](https://github.com/tadatuta/bem-font-awesome) library, that uses [Font Awesome](http://fontawesome.io/) with BEM notation and leave all extra styles out of the project.

### bem-font-awesome-icons

Published the alternative version of the `bem-font-awesome` library — [bem-font-awesome-icons](https://github.com/tadatuta/bem-font-awesome-icons), where we split the font into separate SVG icons to sent to the client side the usefull parts only.

## BEM & React

### bem-react-core
Release candidate version — [1.0.0](https://github.com/bem/bem-react-core/tree/v1.0.0-rc.5). Lack of useful documentation blocks the official release of the library.

### bem-react-components
Actively worked on [bem-react-components](https://github.com/bem/bem-react-components/tree/v0.0.2) - the library of blocks for development with React and BEM-methodology. The official release has not yet been published, but most of the [blocks](https://github.com/bem/bem-react-components/tree/v0.0.2/blocks) have already been implemented.

### create-bem-react-app

Continue to create the React project stub [create-bem-react-app](https://github.com/bem/create-bem-react-app), which allows with one command to build a React/BEM application with installed dependencies and correct file structure

## Technologies

### bem-express

Published the major releases:

* Updated the libraries versions — bem-core [4.2.1](https://en.bem.info/platform/libs/bem-core/4.1.0/) and bem-components [6.0.1](https://github.com/bem/bem-components/tree/v6.0.1).
* Switched from Stylus to PostCSS. By default comes the same set of plug-ins like in the bem-components.
* Implemented an optional `livereload`. For details see [documentation](https://github.com/bem/bem-express/blob/master/development.blocks/livereload/livereload.md) and [README](https://github.com/bem/bem-express/blob/master/README.md) file.
* Achieved acceleration of the build procedure due to the `npm`-modules.
* Refused `bower` for the supply of libraries. Now all dependencies are set through `npm` in the `node_modules` folder.

Wrote step-by-step tutorial: [Dynamic projects with BEM](https://github.com/bem-site/bem-method/blob/bem-info-data/articles/start-with-bem-express/start-with-bem-express.en.md).

### project-stub
Updated bem-core library version to [4.2.1](https://en.bem.info/platform/libs/bem-core/4.1.0/), bem-components — to [6.0.1](https://github.com/bem/bem-components/tree/v6.0.1) and other dependencies.

As an experiment include [gulp-bem](https://github.com/gulp-bem) into the project-stub.

### bem-xjst
Released [v8.3.1](https://github.com/bem/bem-xjst/releases/tag/v8.3.1)-[v8.8.5](https://github.com/bem/bem-xjst/releases/tag/v8.8.5) versions.

All changes of the releases are described in the [CHANGELOG](https://github.com/bem/bem-xjst/blob/master/CHANGELOG.md).


## Toolbox

### bem-sdk
Moved bem-sdk into a [monorepo](https://github.com/bem/bem-sdk). We eliminated the loop dependencies between the modules and divided components for optimal use on the client side.

Published updated bem-sdk [packages](https://github.com/bem/bem-sdk/tree/master/packages). Updated [documentation](https://github.com/bem/bem-sdk/blob/master/README.ru.md).

Created the [@bem/sdk.file](https://www.npmjs.com/package/@bem/sdk.file) and [@bem/sdk.naming.file.stringify](https://www.npmjs.com/package/@bem/sdk.naming.file.stringify) packages, which allow you to create path to the file using BEM entity declaration, path to the level and file structure scheme.

### bem-tools
Released [bem-tools 2.0.0](https://github.com/bem-tools/bem-tools) with updated bem-tools-create [2.1.0](https://github.com/bem-tools/bem-tools-create/tree/v2.1.0).

For details see [Readme](https://github.com/bem-tools/bem-tools-create/blob/master/README.ru.md) file.

### ENB
Implemented bem-sdk modules into ENB.

#### enb-bem-techs

Rewrote enb-bem-techs on bem-sdk and released a `prestable` version [3.0.0-0](https://github.com/enb/enb-bem-techs/tree/v3.0.0-0).

#### enb-bemxjst
Updated [enb-bemxjst](https://github.com/enb/enb-bemxjst) to the newest [bem-xjst](#bem-xjst) version, which supports an export to the different modular systems.

### gather-reverse-deps
Released [gather-reverse-deps](https://www.npmjs.com/package/gather-reverse-deps) package, that allows to build inverse dependences.

### gulp-bem-src
Released [0.1.0](https://github.com/gulp-bem/gulp-bem-src) version with updated bem-sdk.

### bem-naming
Released [2.0.0-5](https://github.com/bem-sdk/bem-naming/tree/v2.0.0-5) and [2.0.0-6](https://github.com/bem-sdk/bem-naming/tree/v2.0.0-6) packages.

All changes of the releases are described in the [CHANGELOG](https://github.com/bem-sdk-archive/bem-naming/blob/v2.0.0-6/CHANGELOG.md).

### borschik
Released [1.7.0](https://github.com/borschik/borschik/tree/v1.7.0)-[2.0.0](https://github.com/borschik/borschik/tree/v2.0.0) versions.
Have stopped supporting node 0.8.0. and replaced [uglify-js](https://www.npmjs.com/package/uglify-js) with [uglify-es](https://www.npmjs.com/package/uglify-es) to support ES6.

For details see [CHANGELOG](https://github.com/borschik/borschik/blob/v2.0.0/CHANGELOG.md).

### bem-walk
Wrote new [README](https://github.com/bem-sdk/bem-walk/blob/master/README.md).

### bemhint
Released [0.10.0](https://github.com/bemhint/bemhint/tree/v0.10.0)-[0.10.1](https://github.com/bemhint/bemhint/tree/v0.10.1) versions with warnings support. Update supports full backward compatibility with the previous version.

#### bemhint-estree
Released missing dependencies linter — [bemhint-estree](https://github.com/bemhint/bemhint-estree). Added ES6 support and wrote [wrapper](https://github.com/bemhint/bemhint-bem-xjst) for the linter of [bem-xjst](#bem-xjst).

#### bemhint-deps-schema
Released a new version of bemhint plugin — [bemhint-deps-schema 2.1.0](https://www.npmjs.com/package/bemhint-deps-schema), that checks that the files `* .deps.js` match the specification. Now `bemhint-deps-schema` can process not only` .json`-, but `.js` files with `module.exports`.

## Documentation
* Wrote step-by-step tutorial for bem-express usage: [Dynamic projects with BEM](https://github.com/bem-site/bem-method/blob/bem-info-data/articles/start-with-bem-express/start-with-bem-express.en.md).
* Published a new document which shows [how to describe dependencies in BEM](https://en.bem.info/platform/deps/).
* Wrote [DEPS specification](https://en.bem.info/platform/deps-spec/).
* Added new documents in the [Methodology](https://en.bem.info/method/) section:
  * [Redefinition levels](https://en.bem.info/methodology/redefinition-levels/)
  * [Ways to modify a block](https://en.bem.info/methodology/block-modification/)
  * [BEM for HTML](https://en.bem.info/methodology/html/)
* Updated the [FAQ](https://en.bem.info/methodology/faq/): reviewed the old questions and added new ones.
* Updated methodological documents:
  * [Naming convention](https://en.bem.info/methodology/naming-convention/)
  * [File structure](https://en.bem.info/methodology/filestructure/)
  * [Building a BEM project](https://en.bem.info/methodology/build/)
* Updated tutorials section: added video compilation and links to the BEM projects:
  * [Projects](https://en.bem.info/platform/tutorials/projects) — step-by-step instructions.
  * [Themes](https://en.bem.info/platform/tutorials/themes) — detailed tutorials for definite technologies or tools.
* Updated a [list of BEM articles](https://github.com/bem-site/bem-method/blob/bem-info-data/articles/articles.en.md) wrote by BEM community.

## bem.info

* Released [BEM library](https://en.bem.info/platform/libs/) section in a new design:
  * [bem-components](https://en.bem.info/platform/libs/bem-components/6.0.0/)
  * [bem-core](https://en.bem.info/platform/libs/bem-core/4.2.0/)
  * [bem-history](https://en.bem.info/platform/libs/bem-history/4.0.0/)
* Updated BEM [forum](https://en.bem.info/forum/).

## Events

* FullStack Conference. Vladimir Grinenko and Sergey Berexhnoy had a talk [BEM — The unknown](http://bit.ly/2vLP5Tu).
* United Dev Conf in Minsk. Vladimir Grinenko made a presentation [Dependencies in component web done right](http://unitedconf.com/dokladchiki/dependencies-in-component-web-done-right/).
* Web Development Conference. Vladimir Grinenko made a presentation [Dependencies in component web done right](http://unitedconf.com/dokladchiki/dependencies-in-component-web-done-right/).
