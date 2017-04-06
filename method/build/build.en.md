# Building a BEM project

* [Introduction](#introduction)
* [Build tasks](#build-tasks)
* [Build stages](#build-stages)
* [Build result](#build-result)
* [Build tools](#build-tools)

## Introduction

In a BEM project, the code is divided into [separate files](../filestructure/filestructure.en.md#principles-of-file-structure-organization-for-bem-projects) (also called the source files).

To combine source files into a single file (for example, to put all CSS files in `project.css`, all JS files in `project.js`, and so on), we use a build process. The resulting files are called **bundles** in the BEM methodology.

**Example**

![Building a BEM project](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__bem-project.svg)

## Build tasks

The build performs the following tasks:

* Combines source files that are spread out across the project's file structure.
* Includes only the necessary blocks, elements, and modifiers ([BEM entities](../key-concepts/key-concepts.en.md#bem-entities)) in the project.
* Follows the order for including entities.
* Processes the source code during the build process (for example, compiles LESS code into CSS code).

## Build stages

In order to receive bundles as the result of the build, the following must be defined:

1. [The list of BEM entities](#defining-the-list-of-bem-entities).
2. [Dependencies between them](#defining-dependencies).
3. [Order for including them](#defining-the-order-for-connecting-bem-entities-to-the-build).

### Defining the list of BEM entities

To include only the necessary BEM entitities in the build, you need to create a list of blocks, elements, and modifiers that are used on the pages. This list is called a [declaration](../declarations/declarations.en.md).

The build tool follows the declaration and adds only the listed BEM entities to the bundle. The example below shows bundling based on a list of BEM entities (declaration).

**Example**

![Building a BEM project](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__declaration.svg)

The declaration allows you to control the content of bundles that are output by the build. This eliminates unnecessary code, which could significantly increase the volume of bundles.

> For more information about creating a declaration, see in [Ways to get declarations](../declarations/declarations.en.md#ways-of-obtaining-a-declaration).

### Defining dependencies

You can create BEM blocks based on other blocks. To do this, you need to define dependencies on them.

The build tool gets the dependencies and adds all the BEM entities that the block requires. The example below shows a composite block with dependencies.

**Example**

![Example of a composite block](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__search-form.svg)

Dependencies allow you to build new blocks from existing ones. This frees you from unneeded copying and pasting.

> For more information about how to declare dependencies on other BEM entities and technologies, see in [Technology for declaring dependencies](https://en.bem.info/technology/deps/).

### Defining the order for connecting BEM entities to the build

The order for connecting BEM entities to the build depends on:

* [Dependencies](#dependencies-and-the-order-of-connecting-bem-entities-to-the-build).
* [Redefinition levels](#redefinition-levels-and-the-order-of-connecting-bem-entities-to-the-build).

#### Dependencies and the order of connecting BEM entities to the build

In BEM, dependencies can affect how BEM entities are added to the build.

> For more information about how to determine the order of connecting BEM entities to the build, see in [DEPS syntax](https://en.bem.info/platform/deps/#depsjs-syntax).

#### Redefinition levels and the order of connecting BEM entities to the build

In BEM, the final block implementation might be distributed across different [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level). Each subsequent level extends or overrides the original block implementation. This is why it's important for the original implementation to be included in the build first, and then changes can be applied from all the redefinition levels. The example below shows a project with the redefinition levels: `common.blocks`, `desktop.blocks`, and `touch.blocks`.

**Example**

![Redefinition levels](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__levels.svg)

Redefinition levels allow you to change the block's appearance and behavior for different platforms.

For more information about using redefinition levels, see the examples:

* [Redefining library blocks](../filestructure/filestructure.en.md#linking-a-library).
* [Dividing a project into platforms](../filestructure/filestructure.en.md#dividing-a-project-into-platforms).

## Build result

The build result can output files for:

* A section of a page (for example, `header.css` or `footer.css`).
* A separate page (for example, `hello.css` and `hello.js`).
* The entire project (for example, `project.css` and `project.js`).

The following example shows a build of the `hello` page.

**Example**

File structure of a BEM project before the build:

```files
blocks/ # Directory containing blocks

bundles/                # Directory containing build results (optional)
    hello/              # Directory of the `hello` page (created manually)
        hello.decl.js   # List of BEM entities requires for the `hello` page
```

File structure of a BEM project after the build:

```files
blocks/

bundles/
    hello/
        hello.decl.js
        hello.css        # Compiled CSS file for the `hello` page (the `hello` bundle in CSS)
        hello.js         # Compiled JS file for the `hello` page (the `hello` bundle in JS)
```

During the build, the following can be included in the project:

* All BEM entities from the project's file structure (this significantly increases the volume of the resulting code).
* Only the BEM entities necessary for building the page.

## Build tools

The BEM methodology doesn't limit your choice of build tools in any way. You can use any assemblers that meet your project's needs.

We use the following build tools on the BEM platform:

* [ENB](https://en.bem.info/tools/bem/enb-bem/)
* [Gulp](http://gulpjs.com/)

> Example of building a BEM project using ENB: [Starting your own BEM project](https://en.bem.info/tutorials/start-with-project-stub/).
>
> Example of building a BEM project using Gulp: [Declarative JavaScript using BEM](https://ru.bem.info/forum/-696/).
