# Building a BEM project

* [Introduction](#introduction)
* [Build stages](#build-stages)
* [Build result](#build-result)
* [Build tools](#build-tools)

## Introduction

In a BEM project, the code is divided into [separate files](../filestructure/filestructure.en.md#file-structure-of-bem-project) (the source files). To combine the source files into a single file (for example, to put all CSS files in `project.css`, all JS files in `project.js`, and so on), we use the build process. The resulting files are called **bundles** in the BEM methodology.

**Example**

![Building a BEM project](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__bem-project.svg)

The build performs the following tasks:

* Combines source files that are spread out across the project's file system.
*  Includes only the necessary blocks, elements, and modifiers in the project ([BEM entities](../key-concepts/key-concepts.en.md#bem-entity)).
* Follows the order for including entities.
* Processes the source code during the build process (for example, compiles [LESS code](https://en.wikipedia.org/wiki/Less_(stylesheet_language)) into CSS code).

## Build stages

To receive bundles as the result of the build, define the following:

1. [The list of BEM entities](#the-list-of-bem-entities)
2. [Dependencies between them](#defining-dependencies)
3. [Order for including them](#the-order-for-including-bem-entities-in-the-build)

### The list of BEM entities

To include only the necessary BEM entities in the build, you need to create a list of blocks, elements, and modifiers used on the pages. This list is called a [declaration](../declarations/declarations.en.md). It allows you to get rid of unnecessary code that increases the bundle size.

The build tool bundles only the BEM entities that are included in the list. The example below shows bundling based on the declaration.

**Example**

![Building a BEM project](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__declaration.svg)

> For more information on how to create a declaration, see [Ways to get declarations](../declarations/declarations.en.md#ways-of-obtaining-a-declaration).

### Defining dependencies

You can create BEM blocks based on other blocks. To do this, you need to define dependencies on them. Dependencies allow you to avoid unnecessary copying and pasting.

The build tool gets information about dependencies and adds all the BEM entities needed to implement a block. The example below shows a composite block.

**Example**

![An example of a composite block](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__search-form.svg)

> For more information on how to declare dependencies on other BEM entities and technologies, see [Technology for declaring dependencies](https://en.bem.info/platform/deps/).

### The order for including BEM entities in the build

The order for including BEM entities in the build depends on:

* Dependencies.
* Redefinition levels.

#### Dependencies and the order for including BEM entities in the build

In BEM, dependencies can affect the order of including BEM entities in the build. The mechanism of including the BEM entities depends on the [DEPS entities](https://en.bem.info/platform/deps/) that influence the inclusion priority in various ways.

> For more information on how to determine the order of including BEM entities in the build, see the [DEPS syntax](https://en.bem.info/platform/deps/) section.

#### Redefinition levels and the order of including BEM entities in the build

In BEM, the final block implementation might be distributed across different [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level). They allow you to change the representation and behavior of the blocks for different platforms.  Each subsequent level extends or overrides the original block implementation. Therefore the original implementation has to be included in the build first, and then changes can be applied from all the redefinition levels. The example below shows a project with redefinition levels: `common.blocks`, `desktop.blocks` and `touch.blocks`. The build order is marked with numbers.

**Example**

![Redefinition levels](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__levels.svg)

> For more information about using redefinition levels, see the [Redefinition levels](../redefinition-levels/redefinition-levels.en.md) section.

## Build result

The build result can output files for:

* A page fragment (for example, `header.css` or `footer.css`).
* A separate page (for example, `hello.css`  and `hello.js`).
* The entire project (for example, `project.css`  and `project.js`).

When building a single page or project, the resulting code can include:

* All BEM entities from the project's file structure (this significantly increases the code volume).
* Only the necessary BEM entities.

The example shows a `hello` page build.

**Example**

File system of a BEM project before the build:

```files
blocks/                 # Directory containing blocks

bundles/                # Directory containing build results (optional)
    hello/              # Directory of the hello page (created manually)
        hello.decl.js   # List of BEM entities requires for the hello page
```

File system of a BEM project after the build:

```files
blocks/

bundles/
    hello/
        hello.decl.js
        hello.css       # Compiled CSS file for the hello page (the hello bundle in CSS)
        hello.js        # Compiled JS file for the hello page (the hello bundle in JS)
```

## Build tools

The BEM methodology doesn't limit your choice of build tools.

The BEM platform uses the following assemblers:

* [ENB](https://en.bem.info/toolbox/enb/)

   > For more information on building a BEM project with ENB, see the [Starting your own BEM project](https://en.bem.info/platform/tutorials/start-with-project-stub/) section.

* [Gulp](http://gulpjs.com/)
