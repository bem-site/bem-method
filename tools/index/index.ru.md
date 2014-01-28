## bem-tools
[bem-tools](/tools/bem/bem-tools) - это инструмент для работы с файлами, написанными по БЭМ-методу.

Он позволяет:
  * создавать БЭМ сущности;
  * собирать финальный runtime;
  * работать с декларациями для сборки: объединять, вычитать и пересекать их;
  * собирать БЭМ-проект командой ##bem make##;
  * поднимать над деревом исходных файлов проекта разработческий сервер командой ##bem server##.

## Оптимизаторы
### CSSO
[CSSO](/tools/optimizers/csso) (CSS Optimizer) является минимизатором CSS, выполняющим как минимизацию
без изменения структуры, так и структурную минимизацию с целью получить как можно меньший текст.

### SVGO
[SVGO](https://github.com/svg/svgo/#readme) (SVGO Optimizer) — это инструмент для оптимизации векторной графики в формате SVG, написанный на Node.js.

SVG файлы, особенно экспортированные из различных редакторов, содержат много избыточной и бесполезной информации,
комментариев, скрытых элементов и другой мусор, удаление которого безопасно и не влияет на конечный результат
рендеринга.

SVGO имеет архитектуру, в которой практически каждая оптимизация является отдельным плагином, и вы легко можете
добавить свой собственный.

## Работа с файлами
### borschik
Расширяемый сборщик файлов [borschik](/tools/optimizers/borschik) может использоваться для сборки текстовых
файлов из кусочков. Например, для сборки статических файлов веб-страниц (CSS, JS, etc).

### setochka (прототип)
[Сеточка](https://github.com/afelix/setochka) — инструмент для выделения CSS-свойств исходного CSS в отдельные файлы.
Также может использоваться для удаления этих свойств без записи.

## Парсеры / Языки
### OmetaJS
[OMetaJS](https://github.com/veged/ometa-js#ometajs-) is a JavaScript implementation of OMeta, an object-oriented
language for pattern matching.

This is a Node.js module for developing and using such pattern matching grammars.

### XJST
[XJST](https://github.com/veged/xjst#extensible-javascript-transformations-) is a DSL for universal data transformations
with compiler written on top of the node.js and ometajs and output code working in any browser or on server-side.

### Shmakowiki
[Shmakowiki](https://github.com/veged/shmakowiki) is yet another wiki dialect, inspired by WackoWiki and WikiCreole.

### Gonzales
[Gonzales](https://github.com/css/gonzales) — быстрый парсер CSS.

Быстрый парсер CSS, основанный на идеологии PEG. На данный момент производит AST, совместимый с CSSP, но в будущем будет расширен для поддержки других форматов.
