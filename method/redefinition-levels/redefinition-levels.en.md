# Redefinition levels

* [What is a redefinition level?](#what-is-a-redefinition-level)
* [What are redefinition levels used for?](#what-are-redefinition-levels-used-for)
* [How to use redefinition levels](#how-to-use-redefinition-levels)
* [Examples](#examples-using-redefinition-levels)

## What is a redefinition level?

A **redefinition level** is a directory in a BEM project that contains files for implementing [blocks](../key-concepts/key-concepts.en.md#block), [elements](../key-concepts/key-concepts.en.md#element), and [modifiers](../key-concepts/key-concepts.en.md#modifier).

Any BEM project consists of redefinition levels. Every project must have at least one level, but the maximum number of levels is unlimited.

Example of the file system for a BEM project with one redefinition level:

```files
project/ 
    common.blocks/ # redefinition level with project blocks 
        header/ 
        footer/
```

Redefinition rules allow you to:

* [Divide a project into platforms](#dividing-a-project-into-platforms)
* [Easily update libraries of blocks that are integrated into the project](#updating-connected-libraries-of-blocks)
* [Use common blocks for developing different projects](#developing-projects-with-common-blocks)
* [Change the design theme without affecting the project logic](#creating-design-themes)
* [Perform experiments on a live project](#running-experiments-on-a-live-project)

## What are redefinition levels used for?

Redefinition levels are used for the following purposes:

* [To add new blocks to a project](#adding-blocks-to-a-project)
* [To change existing blocks](#changing-the-block-implementation)

### Adding blocks to a project

You can use blocks from any level in a project without making changes.

The example below shows how to use a button from a third-party library in a project. To do this, you just need to connect the library with the `button` block on a separate level. You don't need to copy the code for the `button` block to the level with the project blocks.

The project's file system with the connected library level:

```files
project/ 
    common.blocks/  # redefinition level with project blocks 
        header/ 
        logo/ 
    library.blocks/ # redefinition level with library blocks 
        button/     # button block 
```

As the result of [building the project](../build/build.en.md), the `button` block will be included in the project: 

```css
@import "common.blocks/header/header.css";  /* header from the common project block level */
@import "common.blocks/logo/logo.css";      /* logo from the common project block level */
@import "library.blocks/button/button.css"; /* button from the library level */
```

> More about [building BEM projects and integrating BEM entities into a project](../build/build.en.md).

### Changing the block implementation

You can change blocks from any level to meet the needs of a project on a different redefinition level: 

<a name="redefine"></a>
* **Extend** – add new properties to a block.
* **Redefine** – change the existing properties of a block.

> **Important** In a BEM project, any block implementation technology can be extended or redefined. For more information, see [Platform](https://en.bem.info/platform/bem-xjst/runtime/).

You can use any number of levels in any order for assembling the final block implementation. The original block implementation is extended or redefined by implementations on the subsequent levels. This is why it's important for the original implementation to be included in the build first, and then changes can be applied from all the redefinition levels.

> **Important** The original implementation of the block does not change when it is extended or redefined.

The diagram shows how to add BEM entities from different redefinition levels to the build:

![how redefinition levels work](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/redefinition-levels/redefinition-levels__levels.svg)

The example below shows how to change the `button` block from a third-party library that is connected to the project on a separate level (`library.blocks`): 

```files
project/ 
    common.blocks/  # redefinition level with project blocks 
        header/ 
        logo/ 
    library.blocks/ # redefinition level with library blocks 
        button/     # button block 
```

Original CSS implementation of the `button` block:

CSS implementation:

```css
/* The button block in CSS on the library.blocks level*/ 

.button { 
    position: absolute; 
    border: 1px solid rgba(0,0,0,.2); 
    border-radius: 3px; 
    background-color: #fff;
}
```

Rendered result:

![button-default](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/redefinition-levels/redefinition-levels__button-default.svg)

To make changes, you need to:

* Redefine the block – change the color of the button.
* Extend the block – add a shadow and set the size of the button.

To do this, create the `button` block on the `common.blocks` project level and place the `button.css` file in it with the new button styles.

The project's file system with the `button` block on the `common.blocks` level:

```files
project/ 
    common.blocks/     # redefinition level with project blocks 
        header/ 
        logo/ 
        button/ 
            button.css # new rules for the button block 
    library.blocks/    # redefinition level with library blocks 
        button/        # the button block 
            button.css 
            button.js
```

New CSS rules:

```css
/* The button block in CSS on the common.blocks level */

.button {
    background-color: #ffdf3a;            /* New button color */
    width: 150px;                         /* Button width */
    box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Shadow parameters */
}
```

After the build, the implementation of the `button` block will consist of the original CSS rules from the `library.blocks` level and the additional rules from the `common.blocks` level:

```css
@import "library.blocks/button/button.css";  /* Original CSS rules from the library level */
@import "common.blocks/button/button.css";   /* Properties from the common.blocks level*/
```

The duplicated property (`background-color`) is redefined (the background color changes to yellow), and the new properties (`width` and `box-shadow`) are added. The following set of properties is applied to the `button` block:

```css
.button {
    position: absolute;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 3px;
    background-color: #ffdf3a;             /* New button color */
    width: 150px;                          /* Button width */
    box-shadow: 0 0 10px rgba(0,0,0,0.5);  /* Shadow parameters */
}
```

New button appearance:

![Redefined button](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/redefinition-levels/redefinition-levels__button-redefined.svg)

Result:

* The original implementation of the `button` block doesn't change.
* The project-level changes for the `button` block are applied to all the buttons in the project.
* If you update the library to the latest version, the changes that you made to blocks for the project will be saved on a different redefinition level. If the new version of the library has a different button background or size, the redefined rules will still be applied to the `button` block in the project. 

## How to use redefinition levels

You can configure different builds in the same project: define the order and number of levels for each separate case. For example, you can individually configure the set of levels to use for each page in the project. 

The example shows how to [divide up a project by platform using redefinition levels](#dividing-a-project-into-platforms). 

The image shows the project build for different platforms, depending on the [user agent](https://en.wikipedia.org/wiki/User_Agent):

![Redefinition levels](https://cdn.rawgit.com/bem-site/bem-method/bem-info-data/method/build/build__levels.svg)

## Examples using redefinition levels

Common ways to use redefinition levels:
* [Divide a project by platform](#dividing-a-project-into-platforms)
* [Update libraries of blocks in a project](#updating-connected-libraries-of-blocks)
* [Develop projects using common blocks](#developing-projects-with-common-blocks)
* [Create different design themes for a project](#creating-design-themes)
* [Run experiments on a live project](#running-experiments-on-a-live-project)

### Dividing a project into platforms

In a project that supports multiple platforms (for instance, `mobile` and `desktop`, part of the code defines the overall functionality, and part of it is specific to each platform. To avoid copying the shared code for each of the platform implementations, you can use redefinition levels. 

The general implementations of blocks that are used for all platforms are located on the same level, such as `common.blocks`, while the device-specific implementations are on other levels: 

* `common.blocks` – Block implementations shared by all platforms.
* `desktop.blocks` — Block implementations specific to desktop devices.
* `mobile.blocks` — Block implementations specific to mobile devices.

Example of the file system for a project with different platforms:

```files
project/ 
    common.blocks/ 
        button/ 
            button.css   # basic CSS button implementation 
    desktop.blocks/ 
        button/ 
            button.css   # custom button for desktop 
    mobile.blocks/ 
        button/ 
            button.css   # custom button for mobile
```

As a result of the build, the `desktop.bundles/bundle/bundle.css` file gets all the basic CSS rules for the button from the `common.blocks` level and the redefinition rules from the `desktop.blocks` level.

```css
@import "common.blocks/button/button.css";   /* Basic CSS rules */
@import "desktop.blocks/button/button.css";  /* Desktop version */
```

The `mobile.bundles/bundle/bundle.css` file gets all the basic CSS rules for the button from the `common.blocks` level and the redefinition rules from the `mobile.blocks` level.

```css
@import "common.blocks/button/button.css";   /* Basic CSS rules */
@import "mobile.blocks/button/button.css";   /* Mobile version */
```

Dividing the code into separate redefinition levels lets you have different builds of the same project at the same time, so you can offer the correct version based on the user agent. 

### Updating connected libraries of blocks

[Redefining](#redefine) or [extending](#redefine) blocks from a library on a separate level allows you to keep the changes you make for a project, even when the library is updated.

In the example, a library is integrated into the project as the `library.blocks` redefinition level:

```files
project/ 
    common.blocks/   # redefinition level with project blocks 
        header/ 
        logo/ 
    library.blocks/  # redefinition level with library blocks 
        button/                          
```

To use a button from the library (the `button` block) in the project, you need to change the button height from 18 px to 24 px. To do this, redefine the `button` block on the project level:

```files
project/ 
    common.blocks/      # redefinition level with project blocks 
        button/ 
            button.css  # redefined rules for the button 
        header/ 
        logo/ 
    library.blocks/     # redefinition level with library blocks 
        button/         # button implementation in the library
```

When the library is updated, the redefined rule for the `button` block (height 24 px) is saved, since the [redefined property doesn't affect the original block implementation](#changing-the-block-implementation) and is located on a different redefinition level.

### Developing projects with common blocks

Blocks that are used in multiple projects can be moved to a separate level and added during the build.

The example below shows the file system for a project where blocks that are shared between two projects are isolated on the separate `common.blocks` level:

```files
projects/ 
    common.blocks/    # shared blocks for multiple projects 
        button/ 
        input/ 
    project-1/        # project 1 
        button/       # redefined button block for project 1 
        logo/ 
        modal/ 
    project-2/        # project 2 
        button/       # redefined b1 block for project 2 
        search/ 
        spin/         
```

### Creating design themes

A project's logic and layout can be separated into separate redefinition levels. This allows you to create different versions of the design, switch between themes in the project, and combine styles, without affecting the project's behavior.

In the example, different design themes are implemented on separate levels. To change the project's visual appearance, you just need to add the desired level to the build.

```files
project/ 
    common.blocks/    # shared blocks for describing the project's business logic 
        button/ 
        input/ 
        ... 
    alpha/            # alpha design theme 
        button/ 
        input/ 
    beta/             # beta design theme 
        button/ 
        input/
```

### Running experiments on a live project

Redefinition levels allow you to perform [A/B testing](https://en.wikipedia.org/wiki/A/B_testing) directly in a live project. The code of the live project doesn't change during the experiments, since each experiment is on a separate redefinition level.

You can run experiments by changing a block's style, behavior, or page markup. For example, to ensure site accessibility ([a11y](https://en.wikipedia.org/wiki/Computer_accessibility)), you need to perform experiments with adding new tags to a page. To do this, redefine the templates and the JavaScript code on the experiment level.

To remove an unsuccessful experiment from the project, just delete the directory that contains this redefinition level.

The example below shows how to add multiple experiments to the file system in a live project: 
* Changing the user's profile picture (the `user-pic` block).
* Changing the header offset (the `header` block).
* Changing the font for the user's name (the `user-name` block).

```files
project/ 
    common.blocks/    # project blocks 
        header/ 
        user-name/ 
        user-pic/ 
        ... 
exps/ 
    exp-1/            # level for experiment 1 
        header/       # new offsets in the header 
        user-name/    # new font for the user name 
        user-pic/     # new type of profile picture 
    exp-2/            # level for experiment 2 
        header/       # new offsets in the header 
        user-name/    # new font for the user name 
        user-pic/     # new type of profile picture 
    exp-n/            # level for any new experiment 
        header/       # new offsets in the header 
        user-name/    # new font for the user name 
        user-pic/     # new type of profile picture       
```

To see the changes, just add the experiment level to the build.
