# BEM Forum goes live!

Hi everyone, 

We are ready to launch our [BEM forum](https://en.bem.info/forum/) — a place where developers working with BEM can get together, share their experiences and ask questions directly to the BEM team. 

## Little bit of history

We wanted to have our own communication platform for a long time. 

Before we launched BEM forum on [bem.info](https://ru.bem.info) for Russian language community in August 2014 we had to monitor a lot of social media platforms such as twitter, Yandex blog platform, facebook, in order not to miss your questions. 

At the same time Yandex was shutting down it's blog platform, and that decision forced us to launch the forum. 

We carefully planned it, have chosen github to host everything as well as to login through and we went live as well as moved in to github 5 years of blogging history that we wanted to keep. 

We were worried from the beginning that useful channels of communication will still prevail, and developers continue to ask questions everywhere and not here that is time consuming in terms of search and not usefull at all for archiving the history for the sake of future users. 

But forum proved us wrong: the number of posts grew up every month, and it is about 40 posts (issues) per month now.

## Inside the forum

As we do almost everything in open source, forum is an open sourced platform too. This means we encourage you to use it in your home projects and report bugs. 

The repository could be found [here](https://github.com/bem/bem-forum/). Local copy installation instruction is in it's [readme file](https://github.com/bem/bem-forum/blob/master/README.md). 

Forum's architecture allows using it well as a separate service and as a route for [express](http://expressjs.com/). We use it in a second capacity — it is a part of bem.info site.

We use github API as a source of data, node.js for backend and full stack of BEM ([BEMTREE](https://en.bem.info/technology/bemtree/v2/bemtree/), [BEMHTML](https://en.bem.info/technology/bemhtml/v2/intro/), i-bem.js) for frontend.

Right now it is possible on BEM forum to open a topic, comment it and filter posts using labels. We already made few necessary for you there. Attention: we ask you to use our forum via bem.info interface, because here you can have it labeled and found by others.

Every post is an issue on github that we browse on the site. This scheme allows communicating via forum having what developers already have — github login. For you it also means that you can open topics via bem.info site's interface or directly on github. 

All you need to start using BEM forum is to authorize via oAuth using your github login. 

Start writing your first post right now! We as a BEM team and guys from the community monitor user questions all the time and answer them right away. 

We also hope you open our eyes on the problems English language developers have with BEM (anything from documentation to demos, from installation to use cases). Just mark such posts with "bug" label. It will be a lot of a help!

Let's get started with BEM forum!

To keep in touch and **Stay BEMed!**
