<!--
{
    "title": "bem-cli: Launch bem-tools Locally",
    "createDate": "09-07-2013",
    "editDate": "",
    "summary": "Mikhail Davydov wrote a tool called bem-cli that launches locally installed bem-tools.",
    "thumbnail": "",
    "authors": ["jetpyspayeva-yelena"],
    "tags": ["news","tools","bem-tools"],
    "translators": [""],
    "type": "news"
}
#META_LABEL-->

#bem-cli: launch bem-tools locally

Mikhail Davydov wrote a tool called [bem-cli](https://github.com/bem/bem-cli) that launches locally 
installed [bem-tools](http://bem.info/tools/bem/).

Sometimes BEM-projects have different versions of bem-tools, and you can not simply run `npm i -g bem` 
to install bem-tools globally. Also there may be other reasons such as lack of root privileges.

We also recommend you [to install bem-tools locally](http://bem.info/tools/bem/installation/) with `npm i bem` to prevent conflicts with other BEM-projects.

Locally installed bem can seem inconvenient to use. You have to run bem from project root, typing the full path to the
bin/bem script `./node_modules/.bin/bem make`. You may also create a symbolic link `ln -s ./node_modules/.bin/bem` 
and run it like this `./bem` or add the path of your local `./node_modules/.bin` directory to the environment 
variable `PATH`. There are many ways to do that, for example, [smartcd](http://bem.info/articles/smartcd/).

Inspired by [Grunt.js](http://gruntjs.com/) project, Mikhail created [bem-cli](https://github.com/bem/bem-cli/blob/master/bin/bem) - 
a tool that finds local or global bem-tools and runs it as if it was installed globally.

Install bem-cli globally with  `npm i -g bem-cli`, and you will have access to the `bem` command anywhere on your system.

GitHub repository for [bem-cli](https://github.com/bem/bem-cli). 
[Issues](ttps://github.com/bem/bem-cli/issues).

**Mikhail Davydov** is a JavaScript and Node.js developer. Now he is working on the front end of Yandex.Taxi, mobile web-applications and promo-projects. He also writes and translates articles on JavaScript for the
Russian web-community [Habrahabr](http://habrahabr.ru/) under [azproduction](http://habrahabr.ru/users/azproduction/).

[Twitter](https://twitter.com/azproduction), [GitHub](http://github.com/azproduction).
