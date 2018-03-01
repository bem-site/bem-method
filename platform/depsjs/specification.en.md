# DEPS specification

* [Introduction](#introduction)
* [Notation](#notation)
* [DEPS syntax](#deps-syntax)
* [DEPS entity fields](#fields-of-a-deps-entity)
* [Syntactic sugar](#syntactic-sugar)
* [Examples of declarations](#examples-of-declarations)

## Introduction

**DEPS** is a [technology for defining dependencies](depsjs.en.md) in BEM.

A **DEPS entity** is an entity that defines a dependency between [BEM entities](https://en.bem.info/methodology/key-concepts/#bem-entity).

Dependencies are defined as JavaScript objects in files with the `.deps.js` extension.

The full notation of a DEPS entity looks like this:

```js
/* DEPS entity */
({
    block: 'block-name',
    elem: 'elem-name',
    mod: 'modName',
    val: 'modValue',
    tech: 'techName',
    shouldDeps: [ /* BEM entity */ ],
    mustDeps: [ /* BEM entity */ ],
    noDeps: [ /* BEM entity */ ]
})
```

> **Note** All fields are optional.

## Notation

To abbreviate dependencies in comments, use the following notation:

* `/* b1 → b2 */` — block `b1`is dependent on block `b2` (`shouldDeps`)
* `/* b1 ⇒ b2 */` — block `b1` is dependent on block `b2` (`mustDeps`)
* `/* b1 → b1__e1 */` — block `b1` is dependent on its element `b1__e1`
* `/* b1 → b1_m1_v1 */` — block `b1` is dependent on its modifier `b1_m1_v1`
* `/* b1 → b1__e1_m1_v1 */` — block `b1` is dependent on the modifier of its element `b1__e1_m1_v1`
* `/* b1.js → b2.bemhtml */` — block `b1` in the JavaScript implementation is dependent on block `b2` in the BEMHTML implementation

## DEPS syntax

A DEPS entity can be represented in the `.deps.js` file using:

1. Parentheses `()`.

  ```js
  ({
      /* DEPS entity */
  })
  ```

2. An array literal `[]`.

  ```js
  [{
      /* DEPS entity */
    },
    {
      /* DEPS entity */
  }]
  ```

## Fields of a DEPS entity

They can be divided into the following groups:

* Defining the BEM entity:

  * [block](#block)
  * [elem](#elem)
  * [mod](#mod)
  * [val](#val)

* Defining the implementation of the BEM entity:

  * [tech](#field-that-defines-the-implementation-technology-for-the-bem-entity)

* Defining the dependency:

  * [mustDeps](#mustdeps)
  * [shouldDeps](#shoulddeps)
  * [noDeps](#nodeps)

> **Note** In addition to the fields described, you can use [syntactic sugar](#syntactic-sugar) to improve code readability.

### Fields that define the BEM entity

The fields specify which BEM entity needs the dependencies included. They are optional and can be restored from the context by the file name.

So the statements for the file `b1__e1_m1_v1.deps.js` are equivalent to:

```js
/* b1__e1_m1_v1 → b2 */
({
    block: 'b1',
    elem: 'e1',
    mod: 'm1',
    val: 'v1',
    shouldDeps: { block: 'b2' }
})
```

```js
/* b1__e1_m1_v1 → b2 */
({
    shouldDeps: { block: 'b2' }
})
```

#### block

The `block` field sets the name of the block.

Type: `String`.

```js
// Block b1
({
    block: 'b1'
})
```

#### elem

The `elem` field sets the name of the element.

Type: `String`.

```js
// Element b1__e1
({
    block: 'b1',
    elem: 'e1'
})
```

#### mod

The `mod` field sets the name of the modifier for the block or element.

Type: `String`.

```js
// Modifier of the block b1_m1 set to true
({
    block: 'b1',
    mod: 'm1'
})

// Modifier of the element b1__e1_m1 set to true
({
    block: 'b1',
    elem: 'e1',
    mod: 'm1'
})
```

#### val

The `val` field sets the modifier value. If `val` is omitted, the modifier is assumed to be set to `true`.

Type: `String`, `Boolean`.

The examples below specify the accepted data type:

* String (`String`).

  ```js
  // Modifier b1_m1_v1 set to v1
  ({
      block: 'b1',
      mod: 'm1',
      val: 'v1'
  })
  ```

* Boolean, Logical type (`Boolean`).

  ```js
  // Modifier b1_m1 set to true
  ({
      block: 'b1',
      mod: 'm1',
      val: true
  })
  ```

### Field that defines the implementation technology for the BEM entity

The `tech` field specifies which [implementation technology](https://en.bem.info/methodology/key-concepts/#implementation-technology) to include the dependency for. If `tech` is omitted, the dependency is considered general and applies to all technologies.

Including dependencies for a technology is used, for example, to create a client JavaScript bundle that only has templates for the blocks that will be used in the browser. In this case, part of the templating happens on the server side, so some of the templates are never used in the client.

Type: `String`.

```js
({
// Block b1 in JavaScript
    block: 'b1',
    tech: 'js'
})
```

### Fields that define the dependency

The `shouldDeps` and`mustDeps` fields define the dependency, and `noDeps` cancels it

#### shouldDeps

The `shouldDeps` field defines dependencies that can be included in any order.

Type: `Object[]`.

```js
/* b1 → BEM entity */
({
    block: 'b1',
    shouldDeps: [
        { /* BEM entity */ }
    ]
})
```

#### mustDeps

The `mustDeps` field specifies dependencies that are added to the build results before the code of the BEM entity where these dependencies are declared.

Type: `Object[]`.

```js
/* b1 ⇒ BEM entity */
({
    block: 'b1',
    mustDeps: [
        { /* BEM entity */ }
    ]
})
```

#### noDeps

The `noDeps` field cancels existing dependencies declared on other [redefinition levels](https://en.bem.info/methodology/key-concepts/#redefinition-level).

Type: `Object[]`.

```js
/* common.blocks
   b1 → BEM entity */
({
    block: 'b1',
    shouldDeps: [
        { /* BEM entity */ }
    ]
})

/* desktop.blocks */
({
    block: 'b1',
    noDeps: [
        { /* BEM entity */ }
    ]
})
```

In this example, dependencies on the `common.blocks` level include a BEM entity that is necessary for implementing the `b1` block. On the `desktop.blocks` level, this dependency is canceled.

## Syntactic sugar

* [elem](#elem-1)
* [elems](#elems)
* [mods](#mods)
* [shouldDeps, mustDeps, noDeps](#shoulddeps-mustdeps-nodeps)

### elem

The `elem` field can accept an array of strings as a value (`String[]`):

```js
// Elements b1__e1 and b1__e2
({
    block: 'b1',
    elem: [
        'e1',
        'e2'
    ]
})
```

### elems

The `elems` field sets the element name and expands into `shouldDeps`. So the statements for the file `b1.deps.js` are equivalent to:

```js
({
    /* b1 → b1__e1; b1 → b1__e2 */
    block: 'b1',
    elems: [
      'e1',
      'e2'
    ]
})
```

```js
({
    /* b1 → b1__e1; b1 → b1__e2 */
    block: 'b1',
    shouldDeps: [
      {
        elem: [
            'e1',
            'e2'
        ]
      }
    ]
})
```

Type: `String`, `Object`, `String[]`, `Object[]`.

The examples below specify the accepted data type:

* `String`.

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',
      elems: 'e1'
  })
  ```

* Object (`Object`).

  ```js
  /* b1 → { ElemDepsEntity } */
  ({
      block: 'b1',
      elems: { /* { ElemDepsEntity } */ }
  })
  ```

* Array of strings (`String[]`).

  ```js
  /* b1 → b1__e1; b1 → b1__e2 */
  ({
      block: 'b1',
      elems: [
        'e1',
        'e2'
      ]
  })
  ```

* Array of objects (`Object[]`).

  ```js
  /* b1 → { ElemDepsEntity }; b1 → { ElemDepsEntity } */
  ({
      block: 'b1',
      elems: [
        { /* { ElemDepsEntity } */ },
        { /* { ElemDepsEntity } */ }
      ]
  })
  ```

**ElemDepsEntity** is a JavaScript object with the following fields:

```js
/* elemDepsEntity */
({
    elem: 'elem-name',
    mod: 'modName',
    val: 'modValue',
    tech: 'techName',
    shouldDeps: [ /* BEM entity */ ],
    mustDeps: [ /* BEM entity */ ],
    noDeps: [ /* BEM entity */ ]
})
```

> **Note** The `elem` field is required.

### mods

The `mods` field sets the modifier name and value and expands into `shouldDeps`. So the statements for the file `b1.deps.js` are equivalent to:

```js
({
    /* b1 → b1_m1_v1; b1 → b1_m1_v2 */
    block: 'b1',
    mods: { m1: [
        'v1',
        'v2'
      ]
    }
})
```

```js
({
    /* b1 → b1_m1_v1; b1 → b1_m1_v2 */
    block: 'b1',
    shouldDeps: [
      {
        block: 'b1',
        mod: 'm1',
        val: 'v1'
      },
      {
        block: 'b1',
        mod: 'm1',
        val: 'v1'
      }
    ]
})
```

Type: `String[]`, `Object`.

The examples below specify the accepted data type:

* Array of strings (`String[]`).

  ```js
  /* b1 → b1_m1; b1 → b1_m2 */
  ({
      block: 'b1',
      mods: [
        'm1',
        'm2'
      ]
  })
  ```

* The object where the property value might be:

  * String (`String`).

    ```js
    /* b1 → b1_m1_v1 */
    ({
        block: 'b1',
        mods: { m1: 'v1' }
    })
    ```

  * Boolean, Logical type (`Boolean`).

    ```js
    /* b1 → b1_m1 */
    ({
        block: 'b1',
        mods: { m1: true }
    })
    ```

  * Array of strings (`String[]`).

    ```js
    /* b1 → b1_m1_v1; b1 → b1_m1_v2 */
    ({
        block: 'b1',
        mods: { m1: [
            'v1',
            'v2'
          ]
        }
    })
    ```

### shouldDeps, mustDeps, noDeps

Type: `String`, `Object`, `String[]`.

The examples below specify the accepted data type:

* String (`String`).

  ```js
  /* b1 → b2 */
  ({
      block: 'b1',
      shouldDeps: 'b2'
  })
  ```

* Object (`Object`).

  ```js
  /* b1 → BEM entity */
  ({
      block: 'b1',
      shouldDeps: { /* BEM entity */ }
  })
  ```

* Array of strings (`String[]`).

  ```js
  /* b1 → b2; b1 → b3 */
  ({
      block: 'b1',
      shouldDeps: [
          'b2',
          'b3'
      ]
  })
  ```

## Examples of declarations

* [Including a block](#including-a-block)
* [Including an element](#including-an-element)
* [Including a boolean modifier](#including-a-boolean-modifier)
* [Including a key-value modifier](#including-a-key-value-modifier)
* [Including dependencies for a technology](#including-dependencies-for-technology)
* [elem & elems](#elem--elems)
* [mod & mods](#mod--mods)
* [elems & mods](#elems--mods)

### Including a block

`b1 → b2` — block `b1` is dependent on block `b2`.

The dependency can be declared as:

* An object array (`Object[]`).

  ```js
  /* b1 → b2 */
  ({
      block: 'b1',
      shouldDeps: [
          { block: 'b2' }
      ]
  })
  ```

  **Syntactic sugar**

* A string (`String`).

  ```js
  /* b1 → b2 */
  ({
      block: 'b1',
      shouldDeps: 'b2'
  })
  ```

* An object (`Object`).

  ```js
  /* b1 → b2 */
  ({
      block: 'b1',
      shouldDeps: { block: 'b2' }
  })
  ```

* An array of strings (`String[]`).

  ```js
  /* b1 → b2 */
  ({
      block: 'b1',
      shouldDeps: [
          'b2'
      ]
  })
  ```

### Including an element

`b1 → b1__e1` — block `b1` is dependent on its element `b1__e1`.

The dependency can be declared as:

* An array of objects (`Object[]`).

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',
      shouldDeps: [
          { block: 'b1', elem: 'e1' }
      ]
  })
  ```

  **Syntactic sugar**

* A string (`String`).

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',
      elems: 'e1'
  })
  ```

* An object (`Object`).

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',
      shouldDeps: { elem: 'e1' }
  })
  ```

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',
      elems: { elem: 'e1' }
  })
  ```

* An array of strings (`String[]`).

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',  
      elems: [
        'e1'
      ]
  })
  ```

* An array of objects (`Object[]`).

  ```js
  /* b1 → b1__e1 */
  ({
      block: 'b1',
      elems: [
        { elem: 'e1' }
      ]
  })
  ```

### Including a boolean modifier

`b1 → b1_m1` — block `b1` is dependent on its boolean modifier `b1_m1`.

The dependency can be declared as:

* An array of objects (`Object[]`).

  ```js
  /* b1 → b1_m1 */
  ({
      block: 'b1',
      shouldDeps: [
          { block: 'b1', mod: 'm1', val: true }
      ]
  })
  ```

  **Syntactic sugar**

* An object (`Object`).

  ```js
  /* b1 → b1_m1 */
  ({
      block: 'b1',
      shouldDeps: { block: 'b1', mod: 'm1', val: true  }
  })
  ```

  ```js
  /* b1 → b1_m1 */
  ({
      block: 'b1',
      shouldDeps: { mod: 'm1', val: true }
  })
  ```

  ```js
  /* b1 → b1_m1 */
  ({
      block: 'b1',
      mods: { m1: true }
  })
  ```

* An array of strings (`String[]`).

  ```js
  /* b1 → b1_m1 */
  ({
      block: 'b1',
      mods: [
        'm1'
      ]
  })
  ```

### Including a key-value modifier

`b1 → b1_m1_v1` — block `b1` is dependent on its key-value modifier `b1_m1_v1`.

The dependency can be declared as:

* An array of objects (`Object[]`).

  ```js
  /* b1 → b1_m1_v1 */
  ({
      block: 'b1',
      shouldDeps: [
          { block: 'b1', mod: 'm1', val: 'v1' }
      ]
  })
  ```

  **Syntactic sugar**

* An object (`Object`).

  ```js
  /* b1 → b1_m1_v1 */
  ({
      block: 'b1',
      shouldDeps: { mod: 'm1', val: 'v1' }
  })
  ```

  ```js
  /* b1 → b1_m1_v1 */
  ({
      block: 'b1',
      mods: { m1: 'v1' }
  })
  ```

  ```js
  /* b1 → b1_m1_v1 */
  ({
      block: 'b1',
      mods: { m1: [
          'v1'
        ]
      }
  })
  ```

### Including dependencies for technology

`b1.js → b2.bemhtml` — block `b1` in the JavaScript implementation is dependent on block `b2` in the BEMHTML implementation

The dependency can be declared as:

* An array of objects (`Object[]`).

  ```js
  /* b1.js → b2.bemhtml */
  ({
      block: 'b1',
      tech: 'js',
      shouldDeps: [
          { block: 'b2', tech: 'bemhtml' }
      ]
  })
  ```

  **Syntactic sugar**

* An object (`Object`).

  ```js
  /* b1.js → b2.bemhtml */
  ({
      block: 'b1',
      tech: 'js',
      shouldDeps: { block: 'b2', tech: 'bemhtml' }
  })
  ```

### elem & elems

Using the `elem` and `elems` fields together.

```js
/* b1__e1 → b1__e2 */
({
    block: 'b1',
    elem: 'e1',  
    elems: [
      'e1',
      'e2'
    ]
})
```

> **Note** Self-dependencies `/* b1__e1 → b1__e1 */` don't have a purpose, so they are ignored.

### mod & mods

Using the `mod` and `mods` fields together.

```js
/* b1_m1_v1 → b1_m1_v2 */
({
    block: 'b1',   
    mod: 'm1',
    val: 'v1',
    mods: { m1: [
        'v1',
        'v2'
      ]
    }
})
```

> **Note** Self-dependencies `/* b1_m1_v1 → b1_m1_v1 */` don't have a purpose, so they are ignored.

### elems & mods

Using the `elems` and `mods` fields together.

```js
/* b1 → b1__e1; b1 → b1_m1_v1 */
({
    block: 'b1',
    elems: 'e1',
    mods: { m1: 'v1' }
})
```
