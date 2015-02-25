# BEM Hackathon: BEM Build

Hi,

My name is [Andrey Abramov](https://bem.info/authors/abramov-andrey/). At Yandex, I work on the development of BEM tools, most of which are build tools for projects based on the BEM methodology.

It was my first hackathon, and already I was attending as a mentor. That, on the one hand, entailed a certain responsibility, but on the other hand, made for a special experience, which I'd like to tell you about.

My area of work at Yandex necessarily influenced my choice of project for the hackathon. As well as that, I was driven by a burning desire to make the world a better place. Read on to see how it all worked out.

![](https://img-fotki.yandex.ru/get/16138/44214498.bb/0_9bbc7_29c1a57a_XL.jpg)

## Background

Building projects is one of the tasks that just about every BEM developer has to deal with.

BEM has two build tools in its arsenal — good old bem-tools and ENB, complete with multiple packages and extensions. Both solutions are supported and are functional.

Yet they both have one drawback — they lack simplicity.

Besides, every user project is unique in its own way, which inevitably means that standard solutions will never suffice. Users will have to customize existing solutions to meet their own specific needs.

The conclusion that comes to mind then is that, firstly, build tools must be simple enough so that anyone can understand how to use them, and secondly, they must be flexible so that specific user tasks can be accomplished by creating dedicated plug-ins.

## Modular build

The above considerations lead to the idea of making the build process easier both in terms of understanding and in terms of development. That was the idea I brought to the hackathon as the mentor of the Build team.

To put this idea into practice, I thought we needed a set of principles for the development of tools, which must be followed to perform the tasks set. 

After the word ”pain“ came up three times in my presentation, as I spoke of my experience of using and developing the current solutions, I went on to list the principles that would prevent that word from being uttered again.

Here's what I came up with:

  1. One module per task.
  2. Simple API. 
	An API helps users accomplish specific tasks, so it should interact in terms of those tasks and not through a set of its own abstractions.
  3. Plug-ins.
	A module allows variation in the way the task is accomplished without having to rewrite the module.
  4. Specification.
	The module's architecture allows for full test coverage of the code.
  5. Abstracting the file system.
	If the module's job is not directly related to the file system, the module should be able to operate without it.
  6. Compatibility.
	The idea was to develop modules that could be used with a variety of tools: bem-tools, ENB, gulp, grunt, broccoli, etc.

## The team

I wasn't expecting many people to join my team after the presentation, given
the nature of the project. Fortunately, my concerns proved ill-founded, as I found myself in a team of four. Each team member made his own valuable contribution to the end result.

Our team:

  * [Sasha Belyanskii](https://events.yandex.ru/lib/people/610407/) (@belyanskii) works in the Yandex.Direct team in the Simferopol office; presented the [BEM IDE](https://bem.info/blog/first-bem-ide/) project at the hackathon, but ended up with us once the teams were formed. Sasha's bem.info profile can be found [here](https://bem.info/authors/belyanskii-alexandr/).
  * [Vsevolod Strukchinskii](https://events.yandex.ru/lib/people/9466/) (@floatdrop) works in the Yandex office in Yekaterinburg and is the author of [gulp-bem](http://github.com/floatdrop/gulp-bem) and maintainer of [getbem.com](https://getbem.com).
  * [Evgeniy Gavryushin](https://events.yandex.ru/lib/people/423628/) (@egavr) works on tools development in the Yandex office in Simferopol and is the author of `generator-bem-stub`. Evgeniy's bem.info profile can be seen [here](https://bem.info/authors/gavryushin-evgeny/).

## Planning

Unlike most other mentors' plans, my plan consisted of just two items:

  1. Come up with a plan.
  2. Proceed according to plan.

So the first thing we did was book a conference room and have a several-hour discussion about what tasks each of us considered to be main priority and how they should be done.

![](https://img-fotki.yandex.ru/get/16115/44214498.bc/0_9bbed_a19cf4db_XL.jpg)

I was pleased to find that every team member had his own experience of building projects.

For example, Sasha told us how modules could be used in his BEM IDE prototype, while Vsevolod offered many fine ideas already used in `gulp-bem`. As for myself and Evgeniy, we had a good understanding of how modules could be used in the ENB packages.

The discussion generated a list of tasks deemed to be the most important ones:

  1. Scanning block levels.
	To find out what BEM entities there are in the project, in which redefinition levels and technologies they are implemented.
  2. Identifying dependencies.
	The possibility to add missing dependencies to declarations of BEM entities in a required order.
  3. Reading fiels in the `deps.js` technology.

We jotted down a to-do list and decided that the best way to demonstrate how modules work was to create a build prototype using `gulp`.

![](https://img-fotki.yandex.ru/get/15517/44214498.bc/0_9bbf0_4f398d3a_XL.jpg)

## Development

We had set ourselves ambitious plans, but the schedule was quite tight. To minimize the risks of a debacle in such a non-standard situation, we had to act with determination.

We discussed the architecture of modules and the requirements list until everyone was in agreement as to what needed to be done in each specific case. Only then did we start pounding away at the keyboard.

That way code was written at the first attempt and only once. We didn't need to waste time rewriting modules because of misunderstood tasks or lack of coordination within the team.

### Test-driven development

Just agreeing on the modules' structure was not enough though, we also had to capture those decisions. So we decided we would write tests first and then code.

That helped us verify our decisions as to how each module should work in the trickiest of cases, as well as capturing what we were looking to achieve in the process.

The visibility of the progress was a pleasant bonus. The number of tests is known beforehand. You can see at any given moment how much work has been completed and how much still remains to be done. A growing number of ”green“ tests is an excellent motivating factor.

### Pair programming

As you will remember, we'd planned four tasks originally, and there were four of us in the team.

Time was tight, so it seemed reasonable to take on a task each and get on with the coding. But our experience told us that it was impossible to run in every direction and that quality might suffer in the end.

We decided to adopt the best traditions of extreme programming and split into pairs. Each subteam took on a task and worked on it until all the tests passed. The rest of the team then reviewed the result, made their own suggestions and corrections and considered how to link the modules.

The difficulty of staying focused while keeping up the same thinking mode during the day was another reason for adopting pair programming. That way if you were tired of thinking in terms of architecture of algorithms, you could take over the "pilot" role, write code, concentrate on the code syntax and more local solutions. And vice versa, if you got tired of tippety-tapping on the keyboard with your eyes glued to the screen, you assumed the role of navigator guiding "the pilot".

To prevent communication gaps, people switched subteams upon completing a task.

### Mistakes happen

Implementing a module for identifying BEM dependencies in the absence of a specification can be a tricky task. And even porting the ENB solution according to the modular build principles proved fairly difficult.

By the end of the second day it was clear that we didn't have time to develop the dependencies module into a viable working solution. So we decided to finish the prototype and write a small tool for handling BEM entity declarations.

## Results

After two days of hard work we had 4 modules ready.

In the end none of them was perfect or could be used in real-life projects. But from a conceptual perspective, they are all beautiful! :)

Here they are:

  * [bem-walk](https://github.com/bem/bem-walk)
  * [bem-decl](https://github.com/bem/bem-decl)
  * [tech-deps.js](https://github.com/floatdrop/tech-deps.js)
  * [deps-resolver](https://github.com/belyanskii/deps-resolver)

Currently the projects are in active development and are not very stable.

We'll be telling you about each of them separately as they are completed.

And [this here](https://github.com/belyanskii/gulp-bem-stub) is what our `gulp`-based build prototype looks like.

As always, your comments and suggestions for the projects are welcome on our [forum](https://ru.bem.info).

Build with ease and **Stay BEMed**!

![](https://img-fotki.yandex.ru/get/15493/44214498.bd/0_9bc1a_178d2a58_XL.jpg)
