#bem-tools v0.6.4

The stable [bem-tools](https://bem.info/tools/bem/bem-tools/) v0.6.4 is available.

In this version
  * The new API for technologies was added;
  * The build speed for bem make / server was improved when using new API.

**IMPORTANT: for installation npm version 1.2.14 or higher is needed.**

Let us go into details.

## Improving the build speed of bem make / server

In the new bem-tools version 0.6.4 the speed of bem make / server was increased.

The speed gain depends on the project.
In tests the speed improvement varies from a few percent to dozens of times.

For example project-stub is using v2, see on [Github](https://bem.info/tutorials/project-stub).

To accelerate bem make, the modules of new technologies (v2) should be used for the project.

The API of new technologies is slightly different from the old one. When inheriting technologies all
modules in the chain should have the same version (the old modules shouldn't be mixed with the new ones).

For moving to the new technologies one needs to declare them in the bundles file `.bem/level.js`, for example:

```js
exports.getTechs = function() {

    return {
        'bemjson.js'     : '',
        'js'             : 'v2/js-i',
        'bemdecl.js'     : 'v2/bemdecl.js',
        'deps.js'        : 'v2/deps.js',
        'i18n'           : '../bem-bl/blocks-common/i-bem/bem/techs/v2/i18n.js',
        'i18n.js'        : '../bem-bl/blocks-common/i-bem/bem/techs/v2/i18n.js.js',
        'css'            : 'v2/css'
    };
};
```
The only difference in file paths for the old technology and the new one is the prefix `v2/` (see example above).

This applies to technologies that are already included in bem-tools, and those in [bem-bl](https://bem.info/libs/bem-bl/).
The old modules will work with the new version of bem-tools without any speed change.

[bem-bl 0.3](https://github.com/bem/bem-bl/tree/0.3) already has everything necessary for using v2.

There are some projects on which technologies by default aren't defined at the levels.
In this case the old version will be used.
To use version 2, one has to declare new technologies explicitly, as it was shown in the example above.

When using the new technologies, extra acceleration can be achieved by caching levels of definition with blocks.

If you're working on a project which uses bem-bl (or other blocks library), and you don't change
these blocks, but edit them at definition levels, then the building process can be set up so
bem-bl will be read only once, and for the next builds the cache will be used.

This can be done by using the following code in `.bem/make.js`

```js
MAKE.decl('Arch', {
    getLevelCachePolicy: function() {
        return {
                cache: false,
                except: ['bem-bl']
        }
    }

});
```

Here `cache:false` says that by default levels cache is off.

`except` is an array of levels paths (or directories containing levels) treated as exceptions,
e.g. in this case the cache is enabled.

The cache will be regenerated if the build was run with the option `--force`.

## The changes in API

### 1. Settings for your own technology to use the new API

To allow your technology to use the new API you need to export the property API_VER:

```js
exports.API_VER = 2;

exports.techMixin = {

...

};
```

### 2. File extension (suffix) settings for its working technology

In the old technologies to specify the suffix, which and from which the technology will
construct the result, the methods `getSuffixes()` and `getBuildSuffixes()` were used.
In the new version it's possible to use the same methods,
but for better flexibility and understanding it's preferable to use `getBuildSuffixesMap()`.

```js
{
    getBuildSuffixesMap: function() {
        return {
            'ie.css': ['ie.css', 'ie.hover.css'];
        }
    }
}
```
In this example we say that we built the file `ie.css` from the files `ie.css` and `ie.hover.css`.
The number of keys in the returned object may be greater than one if the technology builds multiple files.

### 3. Method signature changes in the base class of the technology

| v1        | v2           |
| ------------- |-------------|
|buildByDecl(decl, levels, output)|buildByDecl(decl, levels, output, opts)|
|getBuildResult(prefixes, suffix, outputDir, outputName)|getBuildResult(files, suffix, output, opts)|
|getBuildResults(prefixes, outputDir, outputName)|getBuildResults(decl, levels, output, opts)|
|getBuildPrefixes(decl, levels)|:x:|
|build(prefixes, outputDir, outputName)|:x:|
|filterPrefixes(prefixes, suffixes)|:x:|
|:x:|getBuildPaths(decl, levels)|
|:x:|saveLastUsedData(file, data)|
|:x:|getLastUsedData(file)|

  * In all methods argument `opts` is a hash of parameters which were passed to `bem build`. Custom auxiliary parameters can be also added to `opts`.
  * Only one argument `output` instead of two (`outputDir`, `outputName`) is passed. It contains the path to the file (without suffix) which will be created.
  * Instead of the argument `prefixes` (it contains the path to the potentially existing files at the levels, from which the build will be made) the argument %%files%% is passed. It's an array of files that exist on levels and have suffixes suitable for a build technology. An element of the array is an object with the following properties:
    * `file` - the file name.
    * `absPath` - the absolute path to the file.
    * `lastUpdated` - modification date of the file.
    * `suffix` - the suffix of the file.
  * `getBuildPaths()` using the passed declaration (decl) and a list of levels returns a list of existing files which fall under the declaration. The list is represented as a hash in which the files are grouped by the suffix of the technology. For example:

For example:

```js
{
    css: [{...}, {...}, {...}],
    js: [{...}, {...}],
    bemhtml: [{...}, {...}, {...}, {...}]
}
```
  * `saveLastUsedData(file, data)/getLastUsedData(file)` saves or loads a list of files from which the technology built the file last time. It is used for validation: a file has to be built or it's already exist and it was built from the same file from which can be built now.

The standard way of the v2 methods execution looks like this:

<img src="https://img-fotki.yandex.ru/get/15566/158800653.1/0_111ffa_4cae794c_orig"/>

`buildByDecl()` is the entry point, it calls `getBuildResults()`. The result is a hash, where the key is a file suffix and the value is an array of strings with the file content. For example for the technology `i18n.js` it can look like this:

```js
{
 'en.js': ['...', '...', ...],
 'ru.js': ['...', '...', '...', ...],
 'tr.js': ['...', '...', ...]
}
```

`storeBuildResults` receives the hash and saves content to files.

To build the hash `getBuildResults()` receives a list of files by calling `getBuildPaths()`.
The list contains all files that are contained at the levels of definition which are used, and that are appropriate for the build technology.
That is the suffixes which correspond to what is written in the technology `getBuildSuffixesMap()`.
Then for each suffix (in the case of i18n.js it is en.js, ru.js, etc) `storeBuildResults()` is called and
a list of files filtered by a specific suffix is passed to it.

Each file path is processed by `getBuildResultChunk`. The output is a string with the file content.

Depending on the technology it may be or obtained file path wrapped in connection directive or the file content read from the disk.
