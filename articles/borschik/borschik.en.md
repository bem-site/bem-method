# borschik

borschik is a simple but powerful builder for text-based file formats.

Its main purpose is the assembly of static files for web projects (CSS, JS, etc.).

borschik can perform the following operations with files:

* merge
* modify
* minify

borschik is based on a plugin system. Plugins are called "technologies".
There are technologies for CSS and JS included, and you can easily extend them or write you own.

borschik is based on two concepts — `include` and `link`.

* `include`: you have a link to file, which is replaced with the file content.
* `link`: you have a link to file, the link is transformed.

Each "technology" defines how to find and process `link` and `include`.

## Merging files
### CSS
borschik can find `@import` rules and replace them with the content of the imported files.

For example we have two CSS-files

 * `b-header/b-header.css`

```css
.b-header
{
    border: 1px solid #000;
}
```
 * `b-footer/b-footer.css`

```css
.b-footer
{
    border-top: 1px solid #000;
    background: url("bg.png");
}
```

And we want to merge them in a single file `page.css` which is located in the project root directory
```css
@import url("b-header/b-header.css");
@import url("b-footer/b-footer.css");
```

We run borschik
```sh
$ borschik --input=page.css --minimize=no
```

and get the result
```css
/* b-header/b-header.css begin */
.b-header
{
    border: 1px solid #000;
}

/* b-header/b-header.css end */


.b-title
{
    font-size: 120%
}

/* b-footer/b-footer.css begin */
.b-footer
{
    border-top: 1px solid #000;
    background: url("b-footer/bg.png");
}

/* b-footer/b-footer.css end */
```

Comments wrapping can be disabled with `--comments=no` option.

**Note**: as you see, image `bg.png` is located in `b-footer` directory and url was transformed relative to `page.css`.
Also all urls in `@import` rules will be processed appropriately.


###JS
borschik can merge JS files similarly to the way it does with CSS . But there is no standard method for this in Javascript so
borschik uses the following syntax `borschik:include:path/to/fie.js`.
This expression must be in a block comment `/*borschik:include:file.js*/` or string `"borschik:include:file.js"`.
Comment and string have several semantic.


If `include` is in a comment it will be replaced by the file content without any transformation.
`page.js`
```js
var prj = {};
/* borschik:include:components/cookie.js */
```

Run borschik
```sh
$ borschik --input=page.js --minimize=no
```

and get the result
```js
var prj = {};
/* components/cookie.js begin */
prj.cookie = {
    set: function(){},
    get: function(){}
};

/* components/cookie.js end */
```

If `include` is in a string it will be replaced with the result of applying `JSON.stringify` to the file content. `page.js`
```js
prj.STATIC_HOST = "borschik:include:components/host.txt";
```

`page.js` will be transformed to:
```js
prj.STATIC_HOST = "//yandex.st";
```

## CSS and JS minification

borschik minifies CSS with [CSSO](https://bem.info/tools/optimizers/csso/)
and JS with [UglifyJS](https://github.com/mishoo/UglifyJS) (v1.2).

You can disable minification with `--minimize=no` option. It's enabled by default.

## Relative links to resources

borschik can tranform urls in CSS (and other technologies) from relative to absolute, or relative to a different base, according to configuration.
(`.borschik` file in any directory). Configuration relates to the directory where it's located.
Configuration is more important as higher in file system hierarchy is located.

Example:
```json
    {
        "paths" : {
            "./": "/",
            "css/": "//yandex.st/my-prj/css/"
        }
    }
```

This transform all urls to be rooted at `/` and urls for files in the `css/` directory to be rooted at `//yandex.st/my-prj/css/`.

For example, we have the file `css/my.css` with the following rule: `background-image: url(../a/b.gif);` (a relative path to the image).
The URL will be transform to `background-image: url("/a/b.gif");` because of `.borschik` rule `"./": "/"`.

## Following symlinks

There is a `follow_symlinks` rule in configuration. You can indicate which files and directories must be followed by symlinks.

Example:

```js
    "follow_symlinks" : {
        "./a/b/c.css" : true,
        "./a" : true
    }
```

## Static resources «freeze»

### Why do we need to freeze static

Well-known techniques for static resource loading are:

* Setup HTTP-headers for better caching
```
Cache-Control:max-age=315360000
Expires:Thu, 31 Dec 2037 23:55:55 GMT
```

* Load static from another domain
* Add a version identifier to the url, so you can invalidate it in case of new version


For example, link to CSS
```xml
<link rel="stylesheet" href="//yandex.st/my-prj/1.0.0/css/page.css"/>
```
Assume we have the background image url:
```css
.b-page
{
    background-image: url('../i/bg.png')
}
```

So the url to the image is:
```
//yandex.st/my-prj/1.0.0/i/bg.png
```

The problem: when you change CSS you have to change the url to invalidate browser cache
```xml
<link rel="stylesheet" href="//yandex.st/my-prj/1.0.1/css/page.css"/>
```
And the url of the image is also changed
```
//yandex.st/my-prj/1.0.1/i/bg.png
```

Users then download not only the new CSS but also all images in it.
A similar analogy can be made with JS and HTML.

### How to solve the problem?

1. You can manually add a version to each resource. It's simple.
But uncomfortable, hard to mark all files and there a great risk of making a mistake
2. You add automatically add version info from a Version Control System or modification timestamp.
It's harder to realize, relieve from manually work but still hard to mark all files

borschik propose simple but complex solution -
download files by url not related to version but related to file content, sha1 checksum for example.

Transforming file url to url with hash we called "freeze".

And you can automatize this task with borschik.

### .borschik config

At first we need config. It's located in file `.borschik`.

File `.borschik` relates to its own directory and all subdirectories.
```json
{
    "freeze_paths": {
        "i/bg": "../../_",
        "i/ico": "../../_"
    }
}
```

`freeze_paths` — this key defines which files will be frozen, and where any transformations in the file path of the frozen result.

For example, when borschik processes CSS file and finds links to images in `i/bg` or `i/ico`,
borschik freezes these links, changing their path to `../../_` and creates image copy in this path.

Object key — directories whose files will be frozen.
Key value - directory for resulting frozen files, relative to their initial path.

Example:
```json
{
    "freeze_paths": {
        "i/bg": "_"
    }
}
```
borschik freezes files from directory `i/bg` to `i/bg/_`

**Important note:**
* borschik does not freeze all files in directories but only those linked by processed files.
* borschik creates a copy of original files in freeze dir whose filename is a checksum of the file content.

### Freeze links in a CSS file
For example, we have CSS `css/main.css`
```css
.b-page
{
    background-image: url('../i/bg/main.png')
}
```

Freeze it
```sh
$ borschik --input=css/main.css --freeze=yes
```

And get the result
```css
.b-page
{
    background-image: url('//yandex.st/my-prj/_/wFPs-e1B3wMRud8TzGw7YHjS08I.png')
}
```

From now you just need to deploy frozen files and CSS to your server.
There is no version in frozen URLs, all files are loaded by checksum.
All frozen files may be deployed to the same directory. There is no ploblem if several files refer to the same image - the duplicates with the same content will end up pointing to the same frozen file.
So if you change CSS version and do not change images, the URLs will not be changed and the browser will therefore load them from cache.

### JS
There isn't a problem to find links to images in CSS because it is a markup language.
But JS is not, links can be declared in infinitely many ways and may be dynamic.

#### Static URLs
Here is a regular way to load image in JS

```js
new Image().src = 'i/bg/main.png'
```

To help borschik find and freeze this image you should mark it with `borschik.link()`
```js
new Image().src = borschik.link('i/bg/main.png')
```

Then run the command
```
borschik --tech=js --freeze=yes --input=1.js
```

And get the result
```js
new Image().src = '//yandex.st/my-prj/_/wFPs-e1B3wMRud8TzGw7YHjS08I.png'
```

You can declare `borschik.link()` in a development environment as
```js
borschik.link = function(link) {
    return link;
}
```
so `borschik.link()` just returns the first argument

#### Dynamic URLs
There are some problems with resources with dynamic URLs because the URL depends on the value of a variable.
```js
var icoName = 'yandex';
new Image().src = 'i/ico/' + iconName + '.png'
```

You have to declare these links in a JSON file
```json
{
    "ico-yandex-png": "i/ico/yandex.png",
    "ico-github-png": "i/ico/github.png",
    "ico-nodejs-png": "i/ico/nodejs.png"
}
```

Object key - resource name, value - path to file.
Now we should rewrite our JS. Refer to the dynamic resources not by URL but by their JSON key
```js
var icoName = 'yandex';
new Image().src = borschik.link('@ico-' + iconName + '-png')
```
`@` means that this is dymanic image.
We must use it to differentiate names between JSON keys and real paths to files.
In this case the `borschik.link()` call won't be transformed after build process
and the frozen URL will be returned dynamically.

Pass the JSON file to the special function `borschik.addLinks()` as an include
```js
borschik.addLinks(/* borschik:include:_images.json */)
var icoName = 'yandex';
new Image().src = borschik.link('@ico-' + iconName + '-png')
```

```sh
# to freeze the content in our JSON object
$ borschik --tech=json-links --input=images.json > _images.json
# and then build our JS
$ borschik --tech=js --input=1.js
```

And get the result
```js
borschik.addLinks({
    "ico-yandex-png": "//yandex.st/my-prj/_/wFPs-e1B3wMRud8TzGw7YHjS08I.png",
    "ico-github-png": "//yandex.st/my-prj/_/8ge7HHM3UfpIESgvrpN3bi-Nz0.png",
    "ico-nodejs-png": "//yandex.st/my-prj/_/1z-l36qqomllvJek_InjAYnHrOE.png"
})
var icoName = 'yandex';
new Image().src = borschik.link('@ico-' + iconName + '-png')
```

`borschik.link()` and `borschik.addLinks()` looks like [this code](https://github.com/veged/borschik/blob/master/js/borschik.js):
```js
(function() {
    var borschik = window['borschik'] = {};

    var links = {};

    borschik.addLinks = function(json) {
        for (var link in json) {
            links[link] = json[link];
        }
    };

    borschik.link = function(link) {
        // link with "@" is dynamic
        if (link.charAt(0) === '@') {
            return links[link.substr(1)];
        }

        return link;
    };

})();
```

### HTML
borschik also can freeze static resources in HTML.

For example,
```xml
<html>
    <head>
        <link rel="stylesheet" href="1.css"/>
    </head>
    <body>
        <!-- <img src="1.png"> -->
        <img src="1.png">
        <script src="1.js"></script>
    </body>
</html>
```

Run borschik
```sh
$ borschik --tech=html --input=index.html
```

Result
```xml
<html>
    <head>
        <link rel="stylesheet" href="//yandex.st/prj/_/n8mJAmybm5i9sdsO92s6y0.css"/>
    </head>
    <body>
        <!-- <img src="1.png"> -->
        <img src="//yandex.st/prj/_/jUK5O9GsS2gPWOhRMeBxR0GThf0.png">
        <script src="//yandex.st/prj/_/1qHhHrD9m5i9sdDbCe590URPaBw.js"></script>
    </body>
</html>
```

### «Total freeze»
As you see below borschik can freeze only those files which are linked from the processed files.
But we may have cases when we have no links, for example dynamic JS modules loading with [RequireJS](http://www.requirejs.org/)
In this case it will be useful to freeze all files in directory.
borschik has a subcommand `borschik freeze` which freezes all files in the specified directory
according to the `.borschik` configuration
```sh
$ borschik freeze \
  --input=path/to/dir \ # directory to freeze
  --output=freeze-info.json # JSON wit path-mapping original file -> frozen file
```

Example:
```sh
$ borschik freeze --input=js > freeze-info.json
```

Result
```json
{
    "js/index.js": "//yandex.st/my-prj/_/434046cd5d1b54ae2374868a7363d7d8.js",
    "js/setup.js": "//yandex.st/my-prj/_/bcbf293578cfda2d4543d401d12e2e49.js"
}
```

Now you can use this JSON in your loader or pass it to RequireJS (with a little transformation).

### Freeze advantages
As you see borschik can freeze urls to static resources in files and processed files as well.
This is a simple and powerful solution.
So when you've deployed a new version of your site the browser downloads only modified resources.
Benefits:
* reduce static server workload
* reduce number of resources need to be downloaded by browser
* speed up page loading
