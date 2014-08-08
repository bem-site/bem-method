A typical website development process is based on the assumption that the design and technical specification for a website do not change in the course of its development.

The designer, front-end developer and programmer each work in their respective areas, with little or no interaction between them:

1. The designer prepares a series of mock-ups visualizing the design of the website.
1. Based on the mock-ups, a static HTML/CSS layout is created.
1. The result is passed on to the programmer, who develops templates in a server-side language and brings the site alive using JavaScript.

This approach works wells only if the design of the website remains unchanged throughout its life, and any changes that occur are limited to content.

However that is rarely the case, as normally the website begins to take a life of its own and evolve. The design of the pages gradually changes, new pages or new page blocks are added.

A website whose source code has no structure to it, and whose development is not based on following specifically defined rules, becomes more and more difficult to maintain. The website code eventually becomes unmanageable.

The BEM approach ensures that everyone who participates in the development of a website works with a single codebase and speaks the same language.

1. You need to be prepared for the design of the website to change at any moment.
1. The HTML/CSS code is built to accommodate any changes in the design, so the layout gets updated along with the design. 
1. The programmer and the front-end developer collaborate on the website codebase, contributing to each other’s code.


### The origins of the BEM methodology
The BEM methodology was developed at [Yandex](http://company.yandex.com), to address the following challenges identified in the creation of numerous services.

- Standard projects should be developed fast and the results last long: a product created in a short time, built on an architecture that ensures its maintainability and longevity for years.
- A project involves many people. The ability to efficiently organize people’s work in a team is important, whether it’s a team of two or dozens of developers.  
- Scalable teams. Adding more people to a team should improve the team’s performance. A process must be in place that ensures that new developers are brought up to speed quickly and are duly allocated their specific areas of responsibility. Code must be carefully structured to ensure its maintainability over time and through team changes.
- Code reuse. Each new project or interface element should not be started from scratch. Code reuse between similar tasks should be maximized within the company. Code should not be context-dependent but be easily transferable to different contexts.

We were trying to find solutions to our problems. The solutions we found eventually became the `BEM methodology`.
