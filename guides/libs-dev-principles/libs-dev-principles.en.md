# Principles of BEM library development

These principles are based on the combined experience of our team. We took all the best approaches from the past, in order to avoid repeating previous mistakes when developing new libraries. We encourage the community to follow these guidelines when using and developing BEM libraries.

#### Open source code

The libraries are developed on GitHub, where all the tasks, plans, and deadlines are available. Any developer can participate in working on a library: create a task with requests for the team, or send a pull request.

#### Simplicity

The library must be as simple as possible. Give up anything that could be understood or used in more than one way.

#### Minimalism

When designing needed functionality, strive for intersecting needs, rather than combined features. When you have to make a choice, prefer the option that solves the problem with less code and fewer BEM entities, or the one that will be easier to support.

#### Test coverage

The library code must be 100% covered by tests. This guarantees fewer errors and saves time on support in the future. Code is not considered finished and stable until it is covered by tests. Pull requests are not accepted if they do not add or change tests.

#### Uniformity

All the names for fields and methods should be standardized with one or more compatible libraries. If the methods, modifiers, or fields in a block are named in a certain way, the same naming logic must be used in a similar task. The consistency and coherency of all entities must be perfected and brought to the forefront. The naming logic must be clear to other developers who will be using the library or modifying its code.

#### Division into private and public APIs

A block private API shouldn't be used outside of this block.

Make the public API minimal, without anything extra. Document the possible ways to use it: in BEMJSON, JavaScript, or both. To guarantee the stability of the public API, follow the rules of [semantic versioning](http://semver.org).

#### Fine tuning by the user

During development, plan ahead to make fine tuning possible on the user side.

#### Support for multiple themes

The library must support multiple themes. This makes it possible to create formatting rules for each style, as well as avoid conflicts with new themes.
The main theme of the BEM libraries right now is the ”islands“ theme, which implements the new design for Yandex services. The implementation of multiple themes within a single library is demonstrated in bem-components, where the ”islands“ theme is supplemented with the ”simple“ theme.

#### Explicit over implicit (in the JavaScript API)

A method name must reflect the method purpose as exactly as possible and make it immediately clear what it implements. This approach can shorten the learning curve and make the API more intuitive.

#### Shortcuts in the BEMJSON API

Explicit is better than implicit, but in some cases, shortcuts can be used in the API. Custom BEMJSON chunks may be passed only where this is truly necessary — for example, if the entity is semantically a wrapper or container. For complex blocks where content generation is the internal API, you need to create shortcuts, omitting the ”content“ field. This reduces the volume of the BEMJSON input and makes it painless to change the internal structure of complex blocks.

#### Explicit defaults

Defaults must be declared explicitly, as this is an external API. Any changes to defaults interfere with backward compatibility. Defaults that are implicit and not documented anywhere create problems for supporting the library.

#### Error handling

Check input data before using it. In case of an error, generate an exception that can be handled in the code being called.
Error handling must be consistent across the entire library. Do not add complicated data validation to a block if it doesn't occur in a similar situation.

#### The scope of BEM

Everything that can be expressed using a BEM entity must be expressed through one.

#### BEM events vs. modifier change events

Do not create a BEM event or subscribe to one if it is possible to work with an event for changes to modifiers.

#### Modifiers vs. special fields

A modifier is a predefined set of conditions or states. A special field is a set of variable values that are not known in advance.
Everything that can be expressed as a finalized set of values should be implemented as a modifier. When this is not possible, use special fields.

#### Composition vs. inheritance vs. delegation

Use object oriented programming only where it is justified. In all other cases, use a mix of delegation and composition.

#### Hierarchy of blocks

The interaction between blocks should be built from the bottom up. A block can only interact with mixed and nested blocks, not with external or nearby blocks.

#### Optimization at the block level

Optimization decisions must be implemented during the development of each specific block. Think through the possible ways to optimize in advance, so that later it is easier to use them in code that has already been written.

#### Automation of routine processes

Automate all repeated processes, such as inserting images, arranging prefixes, or copying styles. The developer shouldn't spend time on routines when there are robots to do that.

#### Mobile platforms without adaptive layout

The library must support mobile platforms. We do not recommend using an adaptive layout. The library must work on all browsers that you declare supported: the only degradation allowed is in the formatting style of components, but not in functionality. Code at the ”common“ and ”desktop“ levels must work on touch devices. For an example, review the [list of supported browsers](https://en.bem.info/libs/bem-components/current/#supported-browsers) for the [bem-components](https://en.bem.info/libs/bem-components/) library.

#### Accessibility

The library components must be accessible for screen reader programs, but you shouldn't expand the public API for this purpose. All the required ARIA attributes are set using templates and scripts.

#### Bleeding edge

The library is in development with a focus on the future. Always use the latest versions of browsers and tools, to keep the library relevant for development as long as possible.
