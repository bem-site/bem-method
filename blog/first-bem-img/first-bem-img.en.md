#BEM Hackathon: Images (src2img)

<img style="float: right" src="https://dl.dropboxusercontent.com/u/1122837/src2img.png" alt="photo of the Yandex office in Saint Petersburg" width="200" title="BEMup in Saint Petersburg" />

Hi, my name is [Alexey Kondratov](https://bem.info/authors/kondratov-alexey/) and I presented the [src2img](http://src2img.com/) project at the hackathon.

## Background

Jumping ahead of the story, the result of our hackathon project was a service for saving highlighted code as an image. So how did we end up with this particular project?

In September 2014, while preparing the presentation for my talk at the [BEMup in St. Petersburg](https://ru.bem.info/talks/bemup-spb-2014/), I was going through  the routine of taking screenshots of my favourite text editor to insert images with highlighted code samples.

Then I found that my default dark-colour theme didn't go well with the slides. I had to re-take the screenshot, this time with a different colour scheme. Sometimes I'd get a GUI element inside the frame of the screenshot, and then I'd have to start over. Other times I'd spot an error, and... well, you get the idea :)

Clearly, that wasn't the best way to proceed, so I started looking for a ready-made solution. I needed something where I could just CTRL + C a snippet of code, then CTRL + V it into a form, choose a theme to go with it, then download the resulting pic sized to match the original code snippet.

When I learned about the hackathon, I invited Alex [@rndD](https://github.com/rndD) to take part, and he accepted. We knocked around a few ideas, and in the end opted for the image service one.

## Preparation

We were both 100 percent confident that together we'd be able to do everything and launch the service within the available timeframe.

To get all the boring stuff out of the way, we did some preliminary work ahead of the hackathon:

* registered the domain name [src2img.com](http://src2img.com);
* set up a virtual machine on DigitalOcean;
* created a repository called [team411/src2img](https://github.com/team411/src2img);
* configured DNS;
* put up a placeholder.

Initially we weren't sure whether we'd be needing a back end or not, so we were going to use phantom.js on the server for screenshot drawing.

Aside from that, we were planning to use the standard BEM stack: [enb](https://ru.bem.info/tools/bem/enb-bem-examples/), [bem-core](https://bem.info/libs/bem-core/v2.5.0/), [bem-components](https://en.bem.info/libs/bem-components/v2/).

![](https://img-fotki.yandex.ru/get/15583/44214498.bc/0_9bbd7_63e86f23_XL.jpg)

## Our hackathon tasks

There weren't that many tasks. We wanted to implement the basic functionality described above.

We decided that we might throw in some additional features and enhancements if someone else joined our team at the hackathon.

And hooray — we were indeed joined by two more people, namely Dima ([@corpix](https://github.com/corpix)) and Misha ([@restrry](https://github.com/restrry))!

![](https://img-fotki.yandex.ru/get/15595/44214498.bc/0_9bbf9_f5dae655_XL.jpg)

## Working on the project

We started by researching the subject and finding out that the basic functionality could be made to work without a back end (thanks to the [html2canvas](https://github.com/niklasvh/html2canvas) library!) To verify that conclusion, in just half an hour we created a working prototype in jsFiddle.

Since we now had four people in the team, we shared the tasks between us:

* Misha and I worked on the client blocks;
* Alex finished the build and deployed the end result to our server;
* Dima helped a lot with the build and the static resources freeze, and after that he went and made his own experimental back end in Python, which he used to render BEMHTML templates.

Along the way we encountered some serious problems with the project generator [generator-bem-stub](https://github.com/bem/generator-bem-stub), which, despite all the set options, generated an awful lot of errors in BH templates and didn't build the entire CSS or JS even for standard blocks from bem-components. We had to delete everything and download the ready-made project-stub. That set us back two or three hours.

![](https://img-fotki.yandex.ru/get/17918/44214498.bc/0_9bbf8_d81430b0_XL.jpg)

## Results

By the end of the hackathon we'd done everything we'd set out to do, plus some bonus functionality thanks to the new team members.

Here's what we had by the end:

* functional service — [src2img.com](http://src2img.com);
* source files — [src2img на github](https://github.com/team411/src2img);
* experimental Python-based back end  — [src2img-backend на github](https://github.com/team411/src2img-backend).

## Impressions

I am delighted to have been able to take part in the hackathon. I am even more delighted by the fact that I had such cool people join my team, and that together we were able to carry out all of our plans. I couldn't have managed without them.

I can't find any fault with anything related to the organization of the hackathon, so I'll just say thanks again to the organizers and my team.

**It was awesome! Let's hope this BEM hackathon was just the first of many!**

![](https://img-fotki.yandex.ru/get/15565/44214498.bd/0_9bc30_a0c39994_XL.jpg)