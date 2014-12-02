#bem-forum to substitute BEM blog on Yandex’s blog platform Ya.ru

Hi everyone,

Have you already heard that [Yandex closes its blog platform](http://blog.yandex.ru/post/81530/) (text available only in Russian)? However we will not lack the place to talk!

Right now we are in the middle of v1 development of bem-forum that uses [github issues](https://developer.github.com/v3/issues/) as a backend and full BEM stack as a frontend.

Current status of the development already allows using bem-forum (for instance, creating topics, commenting them, using tag filtering), however it lacks few important features (such as server content generation support for search indexing), it’s code was not yet reviewed and there are few sharp corners (for example, we would very much like to get done with a pagenator, allow opening an exact topic via direct link, make sorting work) that we would like to “round” before launching it public. Despite we plan to transfer there all the posts we have now in [our BEM club at Ya.ru](http://clubs.ya.ru/bem).

Forum’s architecture is built the way that it can be used as well as a separate service and as one of the routes for [express](http://expressjs.com/). In our case we use exactly the second variant — our forum will become a part of [bem.info](https://bem.info/).

We develop it in opensource at github — [bem-forum](https://github.com/bem/bem-forum). Local copy installation instruction could be found in [readme](https://github.com/bem/bem-forum/blob/master/README.ru.md).

Before you find our forum working on site, we would like to ask you to become our beta-testers and try our bem-forum out and report us your feelings via [Issues](https://github.com/bem/bem-forum/issues): what do you think is less useful, what do you lack while using, what do you want to add or remove and so on. This will allow us to make some corrections, deploy and start our moving in.

Waiting for you very much!
