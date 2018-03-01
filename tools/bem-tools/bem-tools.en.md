# bem-tools

`bem-tools` is a CLI runner for its plugins.

Plugins are `npm` packages exporting [COA](https://www.npmjs.com/package/coa) command. By convention they should be named with `bem-tools-` prefix so `bem-tools` may find them among other packages.

## Plugins
Each plugin provides JS API and exports COA command via `cli.js` file to be used with `bem-tools`.

## Available plugins list
* [bem-tools-create](https://github.com/bem-contrib/bem-tools-create) — creates blocks, elements and modifiers on file system according to [FS scheme](https://en.bem.info/methodology/filesystem/).
* [bem-tools-find](https://github.com/bem-contrib/bem-tools-find) — finds BEM entities on FS according to [bem-config](https://github.com/bem-sdk/bem-config) settings.
* [bem-tools-make](https://github.com/bem-contrib/bem-tools-make) — at the moment it's a proxy to [ENB](https://github.com/enb/enb/) make.

## List of work-in-progress plugins
* [bem-tools-init](https://github.com/bem-contrib/bem-tools-init) — to create project stub.
* [bem-tools-cp](https://github.com/bem-contrib/bem-tools-cp) — to copy BEM entities.
* [bem-tools-rm](https://github.com/bem-contrib/bem-tools-rm) — to remove BEM entities.
* [bem-tools-mv](https://github.com/bem-contrib/bem-tools-mv) — to rename BEM entities.
* [bem-tools-hint](https://github.com/bem-contrib/bem-tools-hint) — wrapper for [bemhint](https://github.com/bemhint/bemhint).

## How to create your own plugin
1. Plugin should be named with `bem-tools-` prefix.
2. By convention each plugin should be available as JS API (so it may be used without `bem-tools`). You may export plugin functionality from `index.js` file in the root of your package.
3. Plugin should provide `COA` command via `cli.js` file (it ):
```js
module.exports = function() {
    this
        .title('Title of your plugin').helpful()
        .opt()
            .name('foo').short('f').long('foo')
            .title('Foo')
            .end()
        .arg()
            .name('bar').title('Bar')
            .arr()
            .end()
        .act(function(opts, args) {
            console.log(opts.foo, args.bar);
        })
        .end();
};
```
For more info about COA please refer to [https://www.npmjs.com/package/coa](https://www.npmjs.com/package/coa).

## See also
* [bem-config](https://github.com/bem-sdk/bem-config).
* [bem-fs-scheme](https://github.com/bem-sdk/bem-fs-scheme).
