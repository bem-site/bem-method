# BEM Hackathon: BEM IDE

Greetings, dear reader!

My name is Sasha Belyanskii. I work in the Group of advertising technologies, in Simferopol. In addition to my regular job of developing interfaces for Yandex.Direct, I devote my time to nurturing and developing [Vitaly Harisov](https://bem.info/authors/harisov-vitaly/)'s ideas about how **source code editors' usability can be improved** by ”teaching“ them to work with BEM projects.

I want to share my impressions of the recently held BEM hackathon, tell you about my own idea, the team-that-never-was, my project plans, and why I decided not to waste my time and help other people.

## About me and my project

As mentioned above, I work in the Group of advertising technologies in Simferopol, developing interfaces for Yandex.Direct, doing front-end development and JavaScript programming.

The BEM community knows me as the developer who talks about the BEM IDE prototype idea. What idea is that then?

The BEM methodology is a powerful tool for the development of large-scale projects. Dividing an interface into separate entities helps identify the general and the specific, but, like everything else in this world, BEM is not perfect. It's easy to get confused while working on a big BEM project, as the logic for a single block can be described at different redefinition levels.

BEM IDE is about developing plug-ins for different source code editors that should make working with BEM projects easy and straightforward without changing your customary environment. To get a better idea of the whole concept, see this [video](https://events.yandex.ru/lib/talks/2197/) of the BEMup in Saint Petersburg.

When the chance came up for me to be a mentor at a BEM hackathon and tackle the BEM IDE project idea as a team effort by writing plug-ins for code editors, I jumped at it.

For the hackathon, I already had a completed BEM IDE prototype and a general understanding of the principle of working with a block's code at all levels at once. I chose Atom and Brackets as source code editors in which to implement the capabilities provided by the prototype, as they are both written in JavaScript and have an accessible API, which I began to study. As for the more popular WebStorm and Sublime Text, those were left to be dealt with during the hackathon.

![](https://img-fotki.yandex.ru/get/16110/44214498.bb/0_9bbbf_af7a297b_XL.jpg)

## In the field

The first day of the hackathon began with the project presentations, where the mentors had to pitch their ideas to the participants and try to recruit people into their teams.

How did I get on? I am not exactly a master of eloquence but that was only half the problem, it seems... Even before the presentation, I came to the important realization that coming to a hackathon — where everyone's looking forward to coding blocks — with a project that has nothing to do with block-coding is always a bit of a gamble. There's a great chance you'll fail to get a team together.

That's precisely what happened. After the presentations, the developers chose to join other, more practical projects, which, in one way or another, involved working with blocks, documentation or the bem.info site.

So my project had to be backburnered. I felt disappointed, but working on my own, I wouldn't be bringing much value to the hackathon. So I decided to continue working on BEM IDE after the hackathon and publish the results in a separate article on [bem.info](https://bem.info/articles/).

And in the meantime I could put my expertise and my time to good use as a team member on a different project — so I went and joined [Andrey](https://bem.info/authors/abramov-andrey/)'s "modular build" project.

![](https://img-fotki.yandex.ru/get/15498/44214498.bc/0_9bbee_6149623c_XL.jpg)

## Build?

Andrey's idea consisted in making the build process for BEM projects transparent by breaking it down into modules that could be used indepedently of the existing build systems such as [ENB](https://ru.bem.info/tools/bem/enb-bem-examples/) or [bem-tools](https://bem.info/tools/bem/bem-tools/). I was not that clued up on the inner workings of the build tools, so I was just trying to take in what my more knowledgeable team mates had to say on the matter.

Towards the first day's evening we'd gone through the plans for what's required to build a BEM project using Gulp and got down to work. We went on to develop a number of modules during the hackathon, with bem-walker becoming Andrey's own pride and joy.

However, an important part was still missing — we didn't have a module for building an accurate dependency list that the build tool was supposed to use. We were looking into how the deps-resolver module in the ENB build tool was implemented but it turned out to be rather complex, and we had no time for a re-write. Instead we did our best to upgrade it to meet our needs, so that we had at least a build prototype to show at the end of the hackathon.

![](https://img-fotki.yandex.ru/get/16115/44214498.bc/0_9bbed_a19cf4db_XL.jpg)

## Team results and overall impressions

The hackathon concluded with another series of project presentations, this time with the mentors reporting on their teams' results.

Andrey presented the finished modules, stressing their benefits, before proceeding to explain how the modular approach brings the future that much closer and mentioning the almost working gulp-based build.

But so much for spoilers. You'll soon be able to read Andrey's own detailed post and see the team results published.

Following the presentations, the participants were able to each vote for their favourite project, and after the votes were counted, the lovely event organizers awarded books and t-shirts to the top three winning teams.

For me personally, it was great getting to see the results delivered by all the teams after two days of shoulder-to-shoulder collaboration. It was an excellent experience and the first event of this kind in the BEM community!

The organizers did a tremendous job making sure we felt comfortable at all times. We enjoyed comfortable workspaces, great food and a wonderful atmosphere.

The highlights for me personally? Being an interfaces developer who finds himself writing blocks all the time, it was interesting for me to watch colleagues at work, those who routinely develop with node.js. I realized, for example, how programming modules could be made easier if you first write the tests and then the code :)

And, of course, events like this are not just about the coding but about the atmosphere, too!

A weekend spent in the company of like-minded people, topped off with an afterparty is the very sort of diversion that puts the wind in your sails and keeps you working with renewed vigour and in high spirits for a long time afterwards :)

Make no mistake, dear reader — events like this inflict beneficial results and cause severe enjoyment!

And all the  subsequent participant reviews only serve to make these events better and better :)

That's all, keep coding and **Stay BEMed**!

![](https://img-fotki.yandex.ru/get/15493/44214498.bd/0_9bc1a_178d2a58_XL.jpg)