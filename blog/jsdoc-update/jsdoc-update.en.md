# Updated JSDoc in BEM block libraries

Hello, 

Until recently we felt your pain dealing with JSDoc in our libraries. Therefore we decided to re-think  rendering of Javascript API inside documentation of our blocks.

Refactoring of the block responsible for rendering of JSDoc went through several iterations where we found few ways to improve it. 

Old version: all parameters and descriptions without indentations and titles were displayed as canvas/cloth on the page; it was hard visually to find one or another element of the block, method or parameters of the function.

What we improved:
- every block now has its content that links to needed anchors on the page;
- all entities of one block now displayed according to sections. For instance, now methods of `button` block and methods of its modifier `_type_link` are separated;
- all accessible information about every method such as description, what returns a method,  what parameters it accepts are now displayed;
- if a block returns a class, methods of that class will be available;
- parent block is displayed in the field of `augments` even if the block does not have its own public methods;
- tags are displayed in front of methods if they have `protected`, `override ` or `abstract` statuses;
- if the method is outdated it will have the corresponding field with a description;
- optional parameters are displayed in grey color and `[ ]`.

Currently the look of JSDoc we see as final, however we will be glad to hear out your feedback and know what we are missing.

Please, post your feedback to [our forum](https://en.bem.info/forum/?labels=asktheteam) labeled with `asktheteam`.

Updated JSDoc could be found in the latest versions of [bem-history](https://en.bem.info/libs/bem-history/), [bem-components](https://en.bem.info/libs/bem-components/) and [bem-core](https://en.bem.info/libs/bem-core/) libraries.

Major result of this work is [complete reference of all i-bem.js methods](https://en.bem.info/libs/bem-core/current/desktop/i-bem/jsdoc/)

Bon usage and **Stay BEMed!**
