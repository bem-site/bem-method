# Ways we distribute bem-components

We are often asked how we distribute [bem-components](https://bem.info/libs/bem-components/). Here is the answer.

What do we mean by “distribution”?

## Source

Classic way. You need to check out the library from GitHub and use build tools in a way it is supported in the library itself, within the project-stub or project’s generator for the chosen library.

## Compiled

We assume that not every user will go for the full stack. For instance, one may not switch to using Stylus. For those users we plan on providing an option of getting ready-to-use CSS, however it will be compiled as blocks (or block-wise). Presumably there should be enough of a script that will call Stylus for every *.styl within design/*.blocks/*/ by now. The necessity of building remains, however requirements for the stack used are softened.

## Library

Here we include pre-compiled JS and CSS into the project, go to [bem.info](https://bem.info/), copy HTML from the examples, and everything works. To do so in the minimal variant we need to write a declaration that will list all the entities from the library. Then we can build resulting JS- and CSS-bundles.

**Ideally** we would prefer to have a form on bem.info, where you can check needed entities and as a result get your final custom bundle. However, it’s all in plans for now.

Email us at [info@bem.info](mailto:info@bem.info) with a subject "bem-components".
