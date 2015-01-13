A typical website development process is based on the assumption that the design and technical specification for a website do not change in the course of its development.

The designer, front-end developer and programmer each work in their respective areas, with little or no interaction between them:

1. The designer prepares a series of mock-ups visualizing the design of the website.
1. Based on the mock-ups, a static HTML/CSS layout is created.
1. The result is passed on to the programmer, who develops templates in a server-side language and brings the site to life using JavaScript.

This approach works well only if the design of the website remains unchanged throughout its life, and any changes that occur are limited to content.

However that is rarely the case, as normally the website begins to evolve and take on a life of its own. The design of the pages gradually changes, new pages or sections are added.

If the website source code is poorly structured, and development does not follow an established set of rules, the site becomes more and more difficult to maintain.

The BEM approach ensures that everyone participating in the development of a website is working with the same codebase and using the same terminology:

1. The design of the website may be changed at any moment, as site requirements change.
1. The HTML/CSS code is built to accommodate any changes in the design, so the layout gets updated along with the design.
1. The programmer and the front-end developer collaborate on the website codebase.


### Origins of the BEM methodology
The BEM methodology was developed at [Yandex](https://company.yandex.com) with the following goals in mind:

* **Fast development and long-lasting results for standard projects**.
Projects must be created quickly using an architecture that ensures maintainability and longevity for further development.
* **A project involves many people**.
The ability to efficiently organize people’s work in a team is important, whether it’s a team of two or dozens of developers.
* **Scalable teams**.
Adding more people to a team should improve the team’s performance. A process must be in place that ensures that new developers are brought up to speed quickly and are duly allocated their specific areas of responsibility. Code must be carefully structured to ensure its maintainability over time and through team changes.
* **Code reuse**.
Each new project or interface element should not be started from scratch. Code reuse between similar tasks should be maximized within the company. Code should not be context-dependent but should be easy to transfer to other places.

As we searched for ways to solve the problems we faced, our solutions eventually became the `BEM methodology`.
