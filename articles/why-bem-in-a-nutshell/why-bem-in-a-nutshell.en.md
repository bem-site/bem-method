# ‘Why BEM?’ in a nutshell

_Permission to publish granted. Originally posted at Decaf company's [blog](http://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/)._

The two base concepts of CSS? Inheritance and specifity.

Apart from the benefits: what’s so bad about it? Well, CSS’ **inheritance** is infinite. There’s no function scope or closure 
like in programming. Styles you fill in on top will flow down and will never reach a bottom. When you write CSS, there is _always_ 
context and you’re about to touch it!

What’s so bad about **specifity**? You need to become _more_ specific to win over existent specifity. It’s `!important` to be clear 
on this feature.

## Modularity?

Today’s web development is driven by the purpose of modularity: chop projects into pieces to make it manageable. We build upon 
APIs, allow for separation of concerns and keep stuff simple and stupid.

Of course we are willing to write modular CSS, too. But its base features inheritance and specifity do not play nice with 
modular concepts. Think of modules containing modules containing modules… — Inheritance is hard to handle (at least for humans!) 
and we’re missing scope.

## Web components!

Web Components will hopefully provide some CSS scope (see [Shadow DOM](http://webcomponents.org/articles/introduction-to-shadow-dom/)). But while waiting for Web Components to get finished and 
implemented in common browsers, we’d better use some proper _workarounds_ like:

![BEM logo](http://blog.decaf.de/content/images/2015/06/bem.png)

## BEM

Why use [BEM](https://bem.info/)? Because it tries to get the best out of today’s CSS concerning modularity:

* Avoids inheritance and provides some sort of **scope** by using unique CSS classes per element (like `.my-component__list-item`).
* Reduces style conflicts by keeping CSS **specifity** to a minimum level.
 
That is what BEM is all about.

## — But wait!

> _My HTML looks all bloated and messy with BEM!_

_This seems to be the most frequently mentioned argument against BEM._

Remember, until CSS supports scope, **there is no way to get around inheritance** in modular environments other than sticking 
_unique_ CSS classes (or attributes) to any given element. Whenever you apply styles by element type selectors (like `p` or `li`) or 
generic classes (like `.title` or `.active`) you apply styles not only to the element itself but to a whole _cascading context_. Even 
if the context doesn’t exist yet, it may be expanded until someone adds another module or component to your HTML. 

— Think of modularity as _any_ module may contain further modules!

So, _bloated_ HTML with BEM? Y’d better call it functional! 

And it will be gzipped anyway.

> _Why not use element type selectors with child or sibling combinators (like `ul` > `li + li`) to avoid inheritance issues?_

Nested selectors raise CSS specifity. You need to become more specific to win over existent specifity. **Modular contexts 
require low specifity!**

(Furthermore, your CSS would be sort of tight coupled with the HTML. Better get loose coupled and apply styles by unique CSS classes not element structure.)

> _Nesting is such a brilliant feature of pre-processors! With BEM it sucks._

With BEM _any_ element (more precisely: any group of elements of the same type) can be selected by its _unique_ class. You don’t 
need selector nesting, even in pre-processors.

That said, [Sass 3.3 supports BEM-style nesting](http://mikefowler.me/2013/10/17/support-for-bem-modules-sass-3.3/)!
