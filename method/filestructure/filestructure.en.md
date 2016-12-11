# File structure organization

A component-based approach used in the BEM methodology also determines the way that BEM projects are organized in a file structure. In BEM, it's not just the interface that is divided into independent components, i.e. blocks, but the implementation of blocks is also divided into independent parts, namely files.

Below on this page you will find:

* [Principles of file structure organization](#principles-of-file-structure-organization-for-bem-projects)
* [Examples of file structures for a BEM project](#examples-of-file-structures-for-a-bem-project)
* [Examples of using redefinition levels](#examples-of-using-redefinition-levels)

## Principles of file structure organization for BEM projects

In a BEM project, the code is broken down into small independent parts, to make working with individual blocks easier. Before they are sent to the browser, the files are assembled and optimized. That way we separate the human-manipulated code from the code that is sent to the browser.

In the file structure, the codebase of BEM project is organized according to the following principles:

* [A block implementation is divided into separate parts](#a-block-implementation-is-divided-into-separate-files)
* [Optional elements and modifiers are stored in separate files](#optional-elements-and-modifiers-are-stored-in-separate-files)
* [Files are grouped by meaning and not by type](#files-are-grouped-by-meaning-and-not-by-type)
* [A project is divided into redefinition levels](#a-project-is-divided-into-redefinition-levels)

### A block implementation is divided into separate files

A file set for a block (e.g., `input.css`, `input.js`) is determined by the [technologies](../key-concepts/key-concepts.en.md#implementation-technology) that make up the implementation of the block.

*Why?*

* **Enhanced project navigation.**
  The project structure is built on a single principle, and the block names are unique. This enables developers to easily identify different parts of the project and to find necessary files quicker.
* **Easier moving of blocks between projects.**
  The implementation of blocks is divided into separate files. To move a block from one project to another, you only need to copy the relevant files or directories.

### Optional elements and modifiers are stored in separate files

*Why?*

* **Only relevant block implementation is included**

Only files that are essential to a given block implementation are included in the build.

### Files are grouped by meaning and not by type

Block files are grouped together based on common [naming rules](../naming-convention/naming-convention.en.md). For convenience, they can be grouped into a block directory.

*Why?*

* **Only necessary blocks are included in the project**

Blocks are implemented as independent entities. This enables us to configure a build in a way that ensures that only relevant blocks are included in the project.

### A project is divided into redefinition levels

The final implementation of a block can be split into [redefinition levels](#examples-of-using-redefinition-levels).

*Why?*

* **No code duplication.**
  Storing implementation common to all platforms on a separate level helps avoid code duplication and reduce debugging time.
* **Redefinition and extension of ready-made library blocks.**
  To modify a library block, you don't need to copy it to the project level. You just need to create the necessary file with the changes or new code at another redefinition level and include it in the build.
* **Updating libraries linked to the project.**
  Dividing a project into distinct levels lets us modify blocks without affecting the library source code. If the library gets updated, the block modification is stored at a different level of the project.

## Examples of file structures for a BEM project

### Nested

* For every block, there's a directory in the file structure.
* The directory is named after the block.

```files
blocks/
    input/     # input block directory
    button/    # button block directory
```

* A block implementation is divided into separate files known as technology files.
* The files all have the same name as the block.
* The extension of each file corresponds to its technology.

```files
blocks/
    input/
        input.css       # `input` block implementation in CSS
        input.js        # `input` block implementation in JavaScript
    button/
        button.css
        button.js
        button.png
```

Names of files and directories for [BEM entities](../key-concepts/key-concepts.en.md#bem-entity) are based on the [naming convention](../naming-convention/naming-convention.en.md):

* Element — `block__elem.extension` (`input__box.css`).
* Block modifier — `block_mod_val.extension` (`input_type_search.css`) or `block_mod.extension` (`input_disabled.css`). Values of boolean modifiers are not included.
* Element modifier — `block__elem_mod_val.extension` (`input__clear_size_large.css`) or `block__elem_mod.extension` (`input__clear_visible.css`).

Modifiers and elements are stored in separate files and are grouped into accordingly named block subdirectories.

```files
blocks/
    input/
        _type/                                 # `type` modifier directory
            input_type_search.css              # Implementation of modifier `type`
                                               # with value `search` in CSS technology
        __box/                                 # `box` element directory
            input__box.css
        __clear/                               # `clear` element directory
            _visible/                          # `visible` modifier directory
                input__clear_visible.css       # Implementation of boolean modifier `visible`
                                               # with value `true` in CSS technology
            _size/                             # `size` modifier directory
                input__clear_size_large.css    # Implementation of modifier `size`
                                               # with value `large` in CSS technology
            input__clear.css
            input__clear.js
        input.css
        input.js
    button/
        button.css
        button.js
        button.png
```

If there are modifiers that differ in value (e.g., `popup_target_anchor.extension` and `popup_target_position.extension`), the shared code can be stored in a separate file (`popup_target.extension`) with no modifier value included in the name.

```files
blocks/
    popup/
        _target/
            popup_target.css            # Common code of  modifier `target`
            popup_target_anchor.css     # Modifier `target` with value `anchor`
            popup_target_position.css   # Modifier `target` with value `position`
        _visible/
            popup_visible.css           # Boolean modifier `visible`
    popup.css
    popup.js
```

#### Real-life examples

* [bem-core](https://github.com/bem/bem-core/tree/v2/common.blocks/page)
* [bem-components](https://github.com/bem/bem-components/tree/v2/common.blocks/button)

### Flat

* Blocks don't have their own directories.
* Optional elements and modifiers are implemented in separate files.

```files
blocks/
    input_type_search.js
    input_type_search.bemhtml.js
    input__box.bemhtml.js
    input.css
    input.js
    input.bemhtml.js
    button.css
    button.js
    button.bemhtml.js
    button.png
```

### Flex

The Flex scheme is very flexible in relation to the file structure organization for BEM projects:

* One block per directory.
* Elements and modifiers are implemented in separate files.

```files
blocks/
    input/
        input_layout_horiz.css
        input_layout_vertical.css
        input__elem.css
        input.css
        input.js
    button/
```
* One block per directory.
* Elements and modifiers are implemented inside block files.

```files
blocks/
    input/
        input.css
        input.js
    button/
```

* Blocks don't have their own directories.
* Elements and modifiers are implemented inside block files.

```files
blocks/
    input.css
    input.js
    button.css
    button.js
```

* Blocks don't have their own directories.
* Optional elements and modifiers are implemented in separate files.

```files
blocks/
    input_type_search.js
    input_type_search.bemhtml.js
    input__box.bemhtml.js
    input.css
    input.js
    input.bemhtml.js
    button.css
    button.js
    button.bemhtml.js
    button.png
```

Modifiers and elements are stored in separate files and are grouped into accordingly named block subdirectories.

```files
blocks/
    input/
        _type/                                 # `type` modifier directory
            input_type_search.css              # Implementation of modifier `type`
                                               # with value `search` in CSS technology
        __box/                                 # `box` element directory
            input__box.css
        input.css
        input.js
    button/
        button.css
        button.js
        button.png
```

## Examples of using redefinition levels

The implementation of a block can be divided into [redefinition levels](../key-concepts/key-concepts.en.md#redefinition-level).

Let's take a few examples:

* [Linking a library](#linking-a-library)
* [Dividing a project into platforms](#dividing-a-project-into-platforms)

### Linking a library

A library can be linked to a project as a separate level. Blocks can be modified (extended or redefined) at another project level. During the build process the original block implementation will be linked from the library level and the redefined one from the project level.

Such an arrangement allows us to preserve changes made to the blocks if the library gets updated — the library source code will be updated while the specific implementation of the project blocks will remain the same because it is stored at a different level.

```files
library.blocks/
    button/
        button.css    # CSS implementation in the linked library (height 20px)
project.blocks/
    button/
        button.css    # Redefinition of CSS implementation (height 24px)
```

### Dividing a project into platforms

A project is divided into platforms (`mobile` and `desktop`) and into respective redefinition levels in the file structure. The `common` level contains the implementation of blocks that is common to both platforms. The `desktop` and `mobile` levels contain platform-specific block implementations.

Let's look at an example:

```files
common.blocks/
    button/
        button.css    # Generic CSS implementation of the button
desktop.blocks/
    button/
        button.css    # Desktop platform-specific button features
mobile.blocks/
    button/
        button.css    # Mobile platform-specific button features
```

During the build process, all the generic CSS rules for the button will be included in the `desktop.css` file from the `common` level, and the redefined rules from the `desktop` level.

```css
@import(common.blocks/button/button.css);    /* Generic CSS rules */
@import(desktop.blocks/button/button.css);   /* Desktop platform-specific */
```

The `mobile.css` file will include the generic CSS rules for the button from the `common` level and the redefined rules from the `mobile` level.

```css
@import(common.blocks/button/button.css);    /* Generic CSS rules */
@import(mobile.blocks/button/button.css);    /* Mobile platform-specific */
```
