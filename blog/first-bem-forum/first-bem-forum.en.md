# BEM Hackathon: BEM Forum

Hi,

My name is [Kolya Ilchenko](https://en.bem.info/authors/ilchenko-nikolay/) and I, together with my colleague [Andrey Kuznecov](https://en.bem.info/authors/kuznetsov-andrey/), represented the BEM Forum team at the hackathon.

Here we want to share our impressions of the BEM hackathon and tell you about the results our team was able to achieve.

![](https://img-fotki.yandex.ru/get/15564/44214498.bb/0_9bbca_d03d24dc_XL.jpg)

## The team

A few words about the team members:

* [Kolya Ilchenko](https://en.bem.info/authors/ilchenko-nikolay/) — the mentor. I have been with Yandex since 2013, working as an interfaces developer (or front end developer, in common parlance). I'm currently developing the bem.info site and BEM forum, I have knowledge of the full BEM stack and four years of experience in web development. My twitter name is [@tavriaforever](https://twitter.com/tavriaforever).
- [Andrey Kuznecov](https://en.bem.info/authors/kuznetsov-andrey/) — my teammate at Yandex, interfaces developer, mostly on the server side which is developed with node.js. Has experience in server-side development using Java and Ruby. The times when Andrey first started to code already feature in history books. His twitter name is [@kuznetsov48](https://twitter.com/kuznetsov48).
- [Mikhail Shukshin](https://twitter.com/mikeshukshin), when he took part in the hackathon, was working as a front end developer in ”Sapato.ru“. As the mentor, I enjoyed working with Misha. He did really well. Without any hands-on experience of BEM stack development, he got stuck into the work right away and had no difficulty coding. A big thanks to him for the help, all the tasks that he planned were completed.
- [Ivan Voischev](https://twitter.com/voischev) — one of the most active BEM community members, came to the hackathon from Voronezh. Works in the web studio Manufactura. As the BEM evangelist of the company, Ivan managed to persuade his co-workers to switch to using the full BEM stack in website development. As far as I'm aware, the studio benefited substantially from switching to the full BEM stack in terms of timelines and parallelizing tasks between server-side and client-side developement. Vanya got a difficult task at the hackathon. And he kept at it until the very end, passing through all the ”circles of hell“, which otherwise we would have had to face ourselves. So a big thanks to him for the help, our working together was just as fun as it was productive. Vanya's code will be used as the basis when the feature he worked on is brought up to production level.
- [Anton Vinogradov](http://ru.bem.info/authors/vinogradov-anton/), interfaces developer in Alfa Lab's Moscow office. Works on the integration and development of the BEM methodology, having even adopted the BEM folder-naming conventions. Anton is an active member of the BEM community, a regular speaker at BEM events, and is developing a number of open-source BEM block libraries. With a lot of BEM stack development experience under his belt, he got down to working on the tasks at once, suggesting a number of improvements along the way. Together we discussed a lot of interesting aspects of BEM development. As the mentor, I'm satisfied with the result. It's nice to know there are people like Anton and Vanya in the BEM community. Anton's twitter name is [@AWinogradov](https://twitter.com/AWinogradov).
- [Yuri Malakhov](https://twitter.com/yuri_malakhov), when he took part in the hackathon, was working in OOO Aitarget in Saint Petersburg. Experienced in both server-side and client-side development. Accomplished the set tasks at the hackathon. Yuri is a nice guy and good company, I enjoyed working with him.
- [Andrei Melikhov](https://twitter.com/amel_true), works in the Yandex.Money department. He uses the full BEM stack in working on his service and is a confident coder with node.js. Together with Andrey Kuznecov, he developed the server solution for the forum. Andrei gave his 200 percent to the task, working tirelessly even through the night — a mighty big thanks to him for that, he's a real Yandexoid!

![](https://img-fotki.yandex.ru/get/16142/44214498.bd/0_9bc1b_87f75ece_XL.jpg)

## Getting ready

The BEM forum is a live, actively developing project on the bem.info site.

We had no problem coming up with tasks. Typically, we have a lot of ideas and not enough resources to implement them. The only challenge was to organize the ”crowd coding process“.

Andrey and I opted for the following arrangement: divide the tasklist into two categories — client-side-oriented and server-side-oriented tasks. After which we quizzed the team members on their individual strengths to find out who wanted to implement which feature.

Tasks were then matched to people, and we got down to work.

## The tasks

In the course of discussion we identified a number of separate tasks for every team member.

**GitHub-like post sorting**

Ever since the forum went live, the missing sorting functionality had been an issue. At the time GitHub already had its neatly implemented sorting function. We decided not to reinvent the wheel and follow GitHub's lead. So we used the block `select` from [bem-components](https://en.bem.info/libs/bem-components/v2/desktop/select/) and filled it with some JS magic to enable sorting by six different parameters.

**Preview of .md code for posts and comments**

The forum uses GitHub issues as a data source, where the content is written in markdown format, so we had it the same way. However, the preview feature was unavailable as the user wrote text and presented it in markdown blocks, which was rather inconvenient. We decided to implement markdown code preview during the hackathon and completed the task successfully. To do that, we used the BEM library [bem-content](https://github.com/verybigman/bem-content), which is a good library for content formatting. The library is maintained by [Anton Vinogradov](http://ru.bem.info/authors/vinogradov-anton/), who was one of our team members.

**Comment pagination**

The number of users is growing by the day, and so is the number of posts and comments.  Pagination for comments had to be introduced, unless we wanted to see the user's page turn into a "white skyscraper". That task was finished on time.

![](https://img-fotki.yandex.ru/get/15553/44214498.bc/0_9bbe6_58b11c4d_XL.jpg)

**Implementing dynamic headers for posts**

We were so engrossed with interface features that we completely forgot about one essential component — a unique page header for posts opened on separate pages.  We decided to implement that as well, even though we hadn't anticipated that we'd be able to do that many tasks.

**Post rating**

[Vladimir Grinenko](https://en.bem.info/authors/grinenko-vladimir/) once suggested an idea for the rating of posts on the forum based on GitHub's emoji ”:+1“. It's a cool idea in that it'll help support post authors in different situations. We started to implement it at the hackathon but failed to estimate the task accurately. The work was already in progress when we realized how many possible conditions and exceptions must be taken into account when calculating a rating.
Unfortunately, we failed to finish the task within the time constraints of the hackathon, but the massive amount of work we put in the task laid the groundwork for bringing it up to production level. We're looking to roll out the feature January — February 2015.

![](https://img-fotki.yandex.ru/get/15582/44214498.bc/0_9bbe8_d59e3acb_XL.jpg)

**Authorization**

While pondering over the forum database task, we struck upon the idea of adding another authorization option to the existing authorization through GitHub. To implement that functionality, we decided to use passport.js. It supports 140 providers. In addition to the server part, we had to work with the BEM stack as well as implement the user's panel for displaying information and the login/logout form. The task was successfully completed and handed over to Andrey and Yuri for subsequent use in the database task.

**Database support using ORM as a data source**

Andrey Kuznecov and Yuri Malakhov undertook the task concerned with an alternative data source for the forum, a database. For flexibility purposes, they decided not to tie their solution to a specific database but to use one of the node.js modules for interacting with different databases using ORM. To implement such as solution, they had to thoroughly revise the forum engine, perform code refactoring, allow for all the relevant data structure-related aspects and do a number of sub-tasks. The guys worked all day and all through the night sticking with their solution until the very end.

![](https://img-fotki.yandex.ru/get/15486/44214498.bc/0_9bbe5_bd4434f0_XL.jpg)

## The team at work

As soon as the tasks were assigned, everyone started typing away at their laptops. Luckily, every team member had a MacBook, so no time was wasted on environment setup. Time was spent writing code, feeding off each other's good mood, discussing IT news, wishing Evgeniy Konstantinov [@sipayrt](https://twitter.com/sipayrt) a Happy Birthday, talking about BEM, putting up sticky notes for completed tasks on the board, preparing for the presentation, then everyone presenting the results and receiving prizes.

## Results

Both Andrey and I were really pleased with the results of this first BEM hackathon. We'd hardly expected to produce so many lines of useful code.

At the time of writing (January 2015), we have been able to release some of the solutions to production, onto the bem.info site. The time constraints of the hackathon didn't permit us to complete some of the more complicated and time-consuming tasks though, such as authorization via passport.js or using a database instead of GitHub for data storage.

The guys had hardly slept, working on the code right up to the start of the project presentations. Their code will form a solid foundation for completing the task, and we will try to find the necessary resources to do this in 2015.

That said, we did manage to complete the bulk of the tasks and get them to a production-ready state. We are very pleased about that.

So what exactly did we finish and roll out?

As you will have noticed, **convenient post sorting** has been enabled for the forum, which uses a select from bem-components. There are six available sorting options that you can choose from.

![](https://img-fotki.yandex.ru/get/15537/127846884.248/0_f7689_7e3f6956_XL.jpg)

You can also see the **preview** of a post or comment that you are writing. This helps to ensure that the text is correct and is properly formatted.

![](https://img-fotki.yandex.ru/get/54/127846884.248/0_f7688_deed1eac_XL.jpg )

The finished feature for **inserting headers** for separate posts is already helping the forum make new friends via search engines. The home page can now be differentiated from specific post pages.

The rest of the tasks are being finished, with the respective features shortly to be released. The features in question are comment pagination and post rating. Both features are high priority, and we'll be definitely using the code written by our team during the hackathon.

## Summary

We found the BEM hackathon to be a great format. The venue and the general atmosphere surrounding the hackathon participants were excellent. We were impressed with the attendees' level, as well as the number of people full of enthusiasm for web development based on the BEM technical platform.

I want to say thanks to my team. Well done to all of you, your solutions have contributed greatly to the main platform for BEM-related communication on the Internet.

Exchange your thoughts and ideas, share solutions, and ask questions on the BEM forum. **Stay BEMed!**

![](https://img-fotki.yandex.ru/get/15489/44214498.bd/0_9bc25_81384ed_XL.jpg)
