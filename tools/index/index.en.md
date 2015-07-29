# Tools overview

## bem-tools
[bem-tools](/tools/bem/bem-tools) is a toolkit to work with files
based on BEM methodology.

It allows you:
  * creating entities;
  * building final runtime;
  * working with build declarations: merge, subtract and intersect them;
  * building the whole project using ##bem make## command;
  * launching development server on the projects source tree using ##bem server## command.

## Optimizers
### CSSO
[CSSO](https://github.com/css/csso/) (CSS Optimizer) is a CSS minimizer unlike others.

In addition to usual minification techniques it can perform structural optimization of CSS files,
resulting in smaller file size compared to other minifiers.

### SVGO
[SVGO](https://github.com/svg/svgo/) (SVG Optimizer) is a NodeJS-based tool for optimizing SVG vector graphics files.

SVG files, especially exported from various editors, usually contain a lot of redundant and useless information
such as editor metadata, comments, hidden elements and other stuff that can be safely removed without affecting
SVG rendering result.

SVGO has a plugin-based architecture, so almost every optimization is a separate plugin, and you can easily
add your own.

## Work with files
### borschik
[borschik](/tools/optimizers/borschik) is a extendable builder for text-based file formats.
It's main purpose is the assembly of static files for web projects (CSS, JS, etc.).

## Languages / Parsers
### XJST
[XJST](http://en.bem.info/tools/templating-engines/xjst/) is a DSL for universal data transformations
with compiler written on top of the node.js and ometajs and output code working in any browser or on server-side.
