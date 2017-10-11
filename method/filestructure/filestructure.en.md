# File structure organization

All BEM projects follow a similar structure in their file structure. When files are always in a familiar location, this makes it easier for developers to navigate a project and switch between projects.

In BEM, the [block](../key-concepts/key-concepts.en.md#block) is primary, and [technologies](../key-concepts/key-concepts.en.md#implementation-technology) are secondary.

The BEM methodology has several approaches to organizing the project's file system:

* [nested](#nested)
* [flat](#flat)
* [flex](#flex)

The choice is up to the developer.

## Guidelines for the file structure of a BEM project

* [Projects consist of redefinition levels](#projects-consist-of-redefinition-levels)
* [Block implementation consists of separate files](#block-implementation-consists-of-separate-files)
* [Files are grouped by meaning, not by type](#files-are-grouped-by-meaning-not-by-type)

### Projects consist of redefinition levels

A project always has at least one redefinition level. There is no limit on the maximum number of levels.

**Example**

```files
project/
    common.blocks/  # Redefinition level with the project blocks 
    library.blocks/ # Redefinition level with the library blocks
```

### Block implementation consists of separate files

There is a separate file for each implementation technology. The names of implementation files match the block names. 

For example, if the appearance of the `input` block is defined using CSS, the code is stored in the `input.css` file.

**Example**

```files
project 
    common.blocks/ 
        input.css   # CSS implementation of the input block 
        input.js    # JavaScript implementation of the input block
```

The code of modifiers and elements is also stored in separate files of the block. This approach allows you to [include](../build/build.en.md) just the modifiers and elements that are needed for this implementation of the block. 

**Example**

```files
project 
    common.blocks/ 
        input.css            # CSS implementation of the input block 
        input.js             # JavaScript implementation of the input block 
        input_theme_sun.css  # Implementation of the input_theme_sun modifier 
        input__clear.css     # CSS implementation of the input__clear element 
        input__clear.js      # JavaScript implementation of the input__clear element
``` 

### Files are grouped by meaning, not by type

Each block has a directory with the name of the block that contains the files for implementing the block.

In some approaches to file structure organization, block directories are not used. In this case, the block files are grouped using a namespace that is set as the block name. 

**Example**

```files
project 
    common.blocks/ 
        input/            # Directory for the input block 
            input.css     # CSS implementation of the input block 
            input.js      # JavaScript implementation of the input block 
        popup/            # Directory for the popup block 
            popup.css     # CSS implementation of the popup block 
            popup.js      # JavaScript implementation of the popup block
```

To improve navigation across the project, block modifiers with multiple values can also be combined in separate directories. 

**Example**

```files
project 
    common.blocks/                     # Redefinition level with blocks 
        input/                         # Directory for the input block 
            _type/                     # Directory for the input_type modifier 
                input_type_search.css  # CSS implementation of the input_type modifier 
                input_type_pass.css    # CSS implementation of the input_type modifier 
            input.css                  # CSS implementation of the input block 
            input.js                   # JavaScript implementation of the input block 
        popup/                         # Directory for the popup block
```


## Approaches 

### Nested

This is the classic file structure approach for BEM projects:

* Each block corresponds to a single directory.
* The code of modifiers and elements is stored in separate files.
* The files of modifiers and elements are stored in separate directories.
* The block directory is the root directory for the subdirectories of its elements and modifiers.
* Names of element directories begin with a double underscore (`__`).
* Names of modifier directories begin with a single underscore (`_`).

**Example**

```files
project 
    common.blocks/                            # Redefinition level with blocks 
        input/                                # Directory for the input block 
            _type/                            # Directory for the input_type modifier 
                input_type_search.css         # CSS implementation of the input_type modifier 
            __clear/                          # Directory for the input__clear element 
                _visible/                     # Directory for the input__clear_visible modifier 
                    input__clear_visible.css  # CSS implementation of the input__clear_visible modifier 
                input__clear.css              # CSS implementation of the input__clear element
                input__clear.js               # JavaScript implementation of the input__clear element 
        input.css                             # CSS implementation of the input block 
        input.js                              # JavaScript implementation of the input block
```

The `nested` approach is used in the file structure of BEM libraries:

* [bem-core](https://github.com/bem/bem-core/tree/v4.2.1/common.blocks/page)
* [bem-components](https://github.com/bem/bem-components/tree/v6.0.0/common.blocks/button)

### Flat

Simplified structure for the file structure:

* Directories aren't used for blocks.
* Optional elements and modifiers are implemented in separate files or in the main block file.

**Example**

```files
project 
    common.blocks/ 
        input_type_search.css     # The input_type_search modifier in CSS 
        input_type_search.js      # The input_type_search modifier in JavaScript 
        input__clear.js           # Optional element of the input block 
        input.css 
        input.js 
        popup.css 
        popup.js 
        popup.png
```

### Flex

The most flexible approach is a combination of `flat` and `nested`. Blocks with a branched file structure used the `nested` approach. Simple blocks use the `flat` approach. 

How it works:

* Each block corresponds to a separate directory.
* Elements and modifiers can be implemented in block files or in separate files.

**Example**

```files
project 
    common.blocks/
        input/                                # Directory for the input block 
            _type/                            # Directory for the input_type modifier 
                input_type_search.css         # CSS implementation of the input_type modifier 
            __clear/                          # Directory for the input__clear element 
                _visible/                     # Directory for the input__clear_visible modifier 
                    input__clear_visible.css  # CSS implementation of the input__clear_visible modifier 
                input__clear.css              # CSS implementation of the input__clear element 
                input__clear.js               # JavaScript implementation of the input__clear element 
            input.css                         # CSS implementation of the input block 
            input.js                          # JavaScript implementation of the input block 
        popup/                                # Directory for the popup block 
            popup.css 
            popup.js 
            popup.png
```
