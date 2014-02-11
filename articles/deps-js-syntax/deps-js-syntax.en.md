<!--
{
    "title": "Syntax deps.js",
    "createDate": "12-06-2013",
    "editDate": "25-08-2013",
    "summary": "A brief guide to the syntax of deps.js.",
    "thumbnail": "",
    "authors": ["varankin-vladimir","bashinsky-pavel"],
    "tags": ["bem-tools","tools"],
    "translators": ["shirshin-maxim"],
    "type": "display:none"
}
#META_LABEL-->

# deps.js — a technology to declare dependencies in BEM

Building a page in different technologies is based on declaring BEM entities in a BEM tree.

There are two ways to prepare a page:

  * **static** — make a full page build and public the result;
  * **dynamic** — start with building all static files (e.g. CSS, JS, templates) and then create a dynamic BEM tree in runtime, and apply templates to it.

When building a static page, its BEM tree contains all BEM entities (except blocks without DOM representation and blocks which are expanded from within templates). If a block is defined in the BEM tree, the build process will build all the required technologies (such as CSS or JS) into common files, from all redefinition levels.

When forming a dynamic page, we have no BEM tree on the project build phase; that's why we have to declare all BEM entities which we might need.

In both cases, "deps.js" files are used to specify explicit dependencies on other blocks/elements/modifiers and technologies.

Let the `b1.bemhtml` template contain the following code:
```js
block b1, content: [
    {
        block: 'b2'
    },
    {
        block: 'b3'
    }
]
```

To include styles and scripts for b2 and b3 blocks into the project, we have to create a `b1.deps.js` with the following contents:
```js
({
    mustDeps: { block: 'b2' },
    shouldDeps: { block: 'b3' }
})
```

If elements and modifiers are standalone files on a file system and not mentioned in the incoming BEMJSON file, they must be declared in the same way.

## deps.js syntax

To present a deps-entity in a deps.js file, use this syntax:
```js
({
    /* deps-entity */
})
```

deps-entities in a file can be an array if there's a dependency on a specific technology:
```js
([{
    /* deps-entity 1 */
},{
    /* deps-entity 2 */
}])
```

Full declaration of a deps-entity looks like this:
```js
{
    block : 'bBlock',
    elem  : 'elem',
    mod   : 'modName',
    val   : 'modValue',
    tech  : 'techName',
    mustDeps   : [],
    shouldDeps : [],
    noDeps     : []
}
```

All of the deps-entity parameters are optional. The following parameters: `block`, `elem`, `mod`, `val`, and `tech` specify the entity to add a dependency for, while `mustDeps`, `shouldDeps`, and `noDeps` define the dependency itself:

  * `block` (string) — block name;
  * `elem` (string) — element name;
  * `mod` (string) — modifier name;
  * `val` (string) — block modifier value;
  * `tech` (string) — technology you include dependencies for (e.g., js);
  * `mustDeps` (array or object) — defines dependencies that are guaranteed to be included into the resulting build before the code of a block that originally defined those dependencies;
  * `shouldDeps` (array or object) — defines dependencies which can be includede in any order;
  * `noDeps` (array or object) — cancels a certain dependency (e.g. `i-bem__dom_init_auto`).

As all the fields for the current entity can be read from its file name, the following two dependency definitions for a `b1__e1_m1_v1.deps.js` file are equivalent:
```js
({
    block : 'b1',
    elem : 'e1',
    mod : 'm1',
    val : 'v1',
    mustDeps : { block : 'b2' }
})
```

```js
({
    mustDeps : { block : 'b2' }
})
```

`mustDeps`, `shouldDeps`, and `noDeps` parameters accept these BEM entities as values: `block`, `elem`, `mods`. Alternatively, you can use an extended syntax where elements and modifiers can accept an array:

  * `elems` (array) — allows to connect several block elements, as well as the block itself;
  * `mods` (object) — an object with arrays as key values.

To declare dependencies on BEM entities which were missing during a build process, use ``mustDeps`` or ``shouldDeps``. Build system will add these declarations to a deps.js bundle flat list which will be used as a basis to build all technologies on all redefinition levels.

``noDeps`` cancels dependencies on lower redefinition levels, preserving them only to the level the ``noDeps`` property is defined upon.
For example, if you use two different block libraries which have blocks with the same name, you can cancel a dependency from one block on the current level and add another dependency for the second block on the current and all subsequent levels.

## Build details

In BEM methodology, deps.js is a technology and, as such, it conforms to unified technology building rules. 

By default, dependency description file is located in the block folder; its name corresponds to a block name, with an extra ``.deps.js`` extension. 

deps.js allows for defining dependencies on any block, element or modifier, in any technology.

Let's assume we have 4 redefinition levels in our project: a ``bem-core`` library, common blocks, platform blocks and page blocks:
```
prj/
    libs/bem-core/common.blocks/
    common.blocks/
    desktop.blocks/
    desktop.bundles/page-name/blocks/
```

You should only point once to ``{ block: button }`` in a BEM tree for the build system to crawl all redefinition levels and include all the necessary files:

```css
@import url(../../libs/bem-core/common.blocks/button/button.css);
@import url(../../common.blocks/button/button.css);
@import url(../../desktop.blocks/button/button.css);
@import url(blocks/button/button.css);
```

Building process is the same for any other required technology (e.g. JS, templates, documentation etc.).

Let's assume that the BEM tree is changed in runtime, and in the user's browser, a `desktop.blocks/button` block includes an `e1` element from `common.blocks/button` block. 

Here is how we could define this dependency in `desktop.blocks/button/button.deps.js`:
```js
({
    shouldDeps : { block : 'button', elem : 'e1' }
})
```

After performing a build for the css technology, the following files will be included into the project:
```css
@import url(../../libs/bem-core/common.blocks/button/button.css);
@import url(../../common.blocks/button/button.css);
@import url(../../desktop.blocks/button/button.css);
@import url(blocks/button/button.css);
@import url(../../common.blocks/button/__e1/button__e1.css);
@import url(../../desktop.blocks/button/__e1/button__e1.css);
@import url(blocks/button/__e1/button__e1.css);
```
According to specified dependencies, all the declared BEM entities are included from both upper and lower redefinition levels.

## Examples of dependency declaration

### Include an element only

`elem` only an element, not the block itself.
```js
{
    block : 'b1',
    elem : 'e1'
}
```

Same applies to `mod` and `val`.

### Include several elements

The `elems` behavior is somewhat different from `elem`, as it includes the block itself along with the specified elements.
```js
{
    block : 'b1',
    elems : ['e1', 'e2']
}
```

The `elems` key may contain not only a name, but a full description of elements being included:
```js
{
    block : 'b1',
    elems : [
        { elem : 'e1' },
        { elem : 'e2', mods : { m1 : 'v1' } }
    ]
}
```

### Include dependencies for specific technologies

To include `b1` block templates with `_m1_v1` modifier as a part of a client-side js build, use the following syntax to specify dependencies in a deps-entity:
```js
{
    tech: 'js',
    mustDeps: [
        {
            block: 'b1',
            mods: { m1: 'v1' },
            tech: 'bemhtml'
        }
    ]
}
```
