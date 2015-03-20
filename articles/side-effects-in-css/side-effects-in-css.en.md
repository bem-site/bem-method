_Permission to publish granted. Originally posted in Philip's [blog](http://philipwalton.com/articles/side-effects-in-css/)._

It feels like every few days I read about some shiny new way people are writing CSS. Many of these “new” ways are not actually new, they’re variations on one or more well-known methodologies, but with a few changes sprinkled on top.

Now, I’m certainly not against change, nor trying to make improvements on current best practices, but if you’re going to make changes, they should be for the better. From what I’ve seen recently, many of these new methodologies have not been better, if anything, they’ve been a step backward.

I’ve been saying for a long time that I think [BEM](http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/) is the best methodology for writing CSS, and since many of these new methodologies are based on BEM, I’ve taken the time to check them out. What I find is that most of them make the same mistakes I made when I first started trying to write modular CSS. They take their favorite parts of all the popular methodologies and mix them together to form their own, personalized approach.

The problem with mixing non-BEM features in with BEM is they can often destroy the safety net BEM creates for you. BEM is effective not because it gives you a bunch of options, but because it limits what you’re allowed to do. It prevents you from shooting yourself in the foot. All of BEM’s rules exist for good reason, and if you’re going to suggest changing them, you’d better know what those reasons are.

Lots of frameworks provide structure and organization to your code, and consistency to your class names. If you think that’s all BEM does, you’re missing out on its single, most important feature.

BEM is different because it makes you a promise. If you follow all of the rules, you’ll avoid the single hardest problem in CSS:

_Getting your rules to match the elements you want, without them accidentally matching the elements you don’t._

## The hardest problem in CSS

There are two types of problems in CSS: cosmetic problems and architectural problems. Cosmetic problems—issues like vertical centering or equal-height columns—usually engender the most vocal complaints, but they’re almost never showstoppers. They’re annoying, sure, but they don’t break the build.

Architectural problems, on the other hand, can cripple development. I can remember distinct cases, at each of the companies I’ve worked for, where we postponed developing a new feature because we were too afraid to make _any_ changes to the CSS.

CSS is global, and every rule you write has the potential to affect entirely unrelated parts of the site.<sup>[[1]](#footnote-1)</sup> It’s this unpredictability that makes writing good CSS so hard.

If I had to choose between hiring an amazing designer who could replicate even the most complicated visual challenges easily in code and someone who understood the nuances of predictable and maintainable CSS, I’d choose the latter in a heartbeat.

Cosmetic problems pale in comparison to architectural problems, and the hardest architectural problem of all is how to prevent unexpected and unwanted style matches.

To put that in terms that may be more familiar to programmers, the hardest problem in CSS is eliminating side effects.

## Side effects in CSS

In computer science, you say a function has side effects if, in addition to returning a value, it also modifies some state of the outside world.

To put this more generally, side effects describe the phenomenon in which something that appears to only affect things in a very limited scope, actually affects a much broader range of things, and does so in a way that may not be obvious to the person performing the action.

Because all CSS rules live in the global scope,<sup>[[1]](#footnote-1)</sup> side effects are extremely common. And since your average stylesheet usually consist of an extremely fragile collection of highly-coupled rules, all intimately dependent on the presence, order, and specificity of other rules, even the most unassuming changes can have unforeseen consequences.

In CSS, side effects come in three main forms:

*   Base rule changes
*   Naming collisions
*   Subtree matches

### Base rule changes

Developers _have_ to use HTML tags to write HTML, and there are a finite number of tags to choose from.<sup>[[2]](#footnote-2)</sup> While it can be tempting to define a lot of base styles using tag selectors (technically they’re called [type selectors](http://www.w3.org/TR/CSS21/selector.html#type-selectors)) in order to avoid having to add classes to all your content elements, doing so necessarily creates an undeclared dependency between those rules and all of your components.

When first building a website, this doesn’t usually seem like a big deal, in fact it feels natural and DRY. You create some base, foundational styles (margins, font sizes, colors, etc.), and then your components build on top of them—so they don’t have to rewrite the shared rules.

The problem is this approach only saves you time if you never change your base rules. But in practice, site designs can and do change. You might decide to make the font size of your headings a little larger, or use different default margins on your paragraphs, or maybe you realize you prefer borders instead of underlines for links. If your `.article-title`, `.alert-content`, and `.footer-link` components depend on those base rules, you’ll quickly realize how fragile and coupled your code is.

If your components depend on base styles, then changes to those base styles will require checking your entire site to ensure everything still looks right.

### Naming collisions

CSS will not warn you if you use a class selector that already exists in your stylesheet. In fact, the ability to override rules is one of the features of the language. As a result, without a convention in place to avoid this, or a build-time check to protect yourself, there’s no good way to be sure the class you picked wasn’t already picked by someone else.

When multiple developers are committing to the same code base, the chances of two people choosing the same name and not knowing it is extremely high. This is especially true of common name choices like “button”, “content” or “title”.

And this isn’t just a problem with top level class names. As I’ll show in the next section, picking the same name in a subtree can be just as dangerous, if not more so.

### Subtree matches

Lots of developers are aware of the above two forms of CSS side effects, so you’ll often see people use a descendant combinator to limit the scope of the rules they’re writing (e.g. `#homepage .header` or `.some-widget .title`).

While this approach is slightly safer, it can still produce side effects. As I hinted at above, the appearance of safety can actually make this practice more risky.

Limiting the scope of a selector to a particular DOM subtree _does_ guarantee that it won’t affect elements outside of that subtree. The problem is it _doesn’t_ guarantee that it won’t unintentionally affect elements within the same subtree.

Consider the following example:

```css
/* in article.css */
.article .title {
  border-bottom: 1px solid;
  font-size: 1.5em;
}

/* in widget.css */
.widget .title {
  color: gray;
  text-transform: uppercase;
}
```

While it's true that `.title` elements not inside `.article` or `.widget` subtrees will not get either of these styles, there’s still the possibility that a `.title` element will be inside _both_ `.article` and `.widget` subtrees at the same time.

Given the CSS above, the widget title in this example is going to render with an unexpected bottom border:

```html
<!-- The .article module -->
<article class="article">
  <h2 class="title">Article Title</h2>
  <div class="content">
    <p>…</p>

    <!-- The .widget module -->
    <form class="widget">
      <h2 class="title">Widget Title</h2>
      <fieldset>…</fieldset>
    </form>

  </div>
</article>
```

In real-world development, HTML structures are complex and if everyone on your team is writing CSS this way, it’s only a matter of time before two of them pick the same name and put it in the same subtree.

I should also point out that using scoped type selectors makes this problem much worse. Writing rules like `.article h3` is just asking for trouble.

## How BEM eliminates side effects

I said above that all CSS rules are global and every rule has the potential to conflict with every other rule on the page. This means side effects cannot be prevented by the language; however, they _can_ be prevented via a disciplined and enforceable naming convention. And that’s exactly what BEM provides.

*   **Base rule changes:**
    Strict BEM conventions require the sole use of class selectors. You start with a global reset, and then you use blocks to style everything on the page. In other words, adding a class to an element is the only way to style it, which means all styling is opt-in rather than de facto. Blocks encapsulate all of their styling and rely on no external dependencies.<sup>[[3]](#footnote-3)</sup>
*   **Naming collisions:**
    In BEM, every class selector is either the block name itself or uses the block name as a prefix, and the rules for each block live in their own dedicated file. Since file systems do not allow two files to have the same name, the OS is actually helping to prevent accidental duplication. If you follow all of the BEM naming conventions, and you ensure all block code resides in its own file, you will never have naming collisions.
*   **Subtree matches:**
    The subtree matching example in the previous section used the selectors `.article .title` and `.widget .title`. Since the class name “title” was used in both cases, there’s a risk of subtree matching. BEM avoids this risk by requiring that all element classes be prefixed with the block name. The BEM equivalents of these two title selectors would be `.Article-title` and `.Widget-title` (or `.article__title` and `.widget__title`, depending on your preference).<sup>[[4]](#footnote-4)</sup> Since the class names are different, their styles won’t ever conflict, and thus it’s impossible to have unintended subtree matches.

### Enforcing conventions

A strict adherence to BEM conventions will prevent side effects in CSS, but how do you make sure the conventions are always followed? If the reemergence of side effects can be due to something as simple as a new developer not knowing (or fully understanding) the rules, how is that any better than before?

Luckily, unlike most CSS methodologies, proper usage of BEM’s naming convention is very easy to test and enforce, both on the CSS side and on the HTML side. The following are a few rules you can test for in a linter of your choice.

In the CSS:

*   With the exception of a reset stylesheet, all other files must only contain class selectors.
*   All class selectors must begin with the name of the file.
*   Nested selectors may only be two levels deep and must consist of a modifier class followed by an element class.

    In the HTML:

*   Any HTML tag with an element class must be a descendant of a tag with a block class by the same name.
*   Any HTML tag with a modifier class must also have a block class by the same name.

    You may find the following tools useful for enforcing BEM conventions:

*   [HTML Inspector](https://github.com/philipwalton/html-inspector)
*   [CSS Lint](http://csslint.net/)
*   [Suit Conformance](https://github.com/suitcss/rework-suit-conformance)
*   [PostCSS BEM Linter](https://github.com/necolas/postcss-bem-linter)

## Making exceptions

In the real world there are cases where the strict adherence to BEM conventions is either impractical or impossible. This is common when using third-party plugins or tools that generate part of your HTML for you, or when building an application where content is going to be generated by an end user.

There are also cases where, for convenience, developers choose to ignore BEM conventions. A common example of this is in the content area of a site. A developer may choose to favor tag selectors over having to put a class on every single `<p>` or `<a>` tag.

By now I hope it’s obvious that making exceptions or ignoring BEM conventions will incur risk. And after reading this article it should be apparent exactly what those risks are. You can decide for yourself the level of risk you are willing to take, given your situation.

If your exceptions are limited to just one area of your site (say, the content area), and if you don’t have to support older browsers, you could adopt a strategy like this:

```css
.Content h1:not([class]) { }
.Content p:not([class]) { }
.Content a:not([class]) { }
```

While I haven’t tested this approach in a real-world scenario, I mention it because it’s an example of a variation on BEM conventions that doesn’t compromise its guarantee of no side effects. Since all BEM blocks are styled via classes, styling elements that don’t have a class is “safe”, at least from conflict with the rest of your CSS (obviously if you’re using classes for other things, this can still be risky as adding a class to such an element would prevent it from matching the selector).

Another example I encounter frequently is using site-wide state or support classes. [Modernizr](http://modernizr.com/) is a good example. Though this technique _does_ increase the specificity of the selectors it’s used on, the increased specificity should only affect other rules defined within the same block file (assuming you’ve followed all the other BEM conventions).

```css
.GridRow {
  display: flex;
}

/* Fallback for older browsers. */
.no-flexbox .GridRow {
  display: table;
}
```

Of course, if you’re able to write components that can manage their own state via BEM modifiers, that will always be preferable to relying on site-wide state rules.

## Learning from JavaScript

In the bad old days of JavaScript, it was common for library authors to add methods to the native prototypes of global constructors like `Object`, `Array`, `String`, and `Function`. At first this seemed like a convenience, but developers quickly realized it was a nightmare. If two different libraries added the same method to `Array.prototype`, each with a slightly different signature or behavior, it would lead to bugs that were almost impossible to track down.

These days, almost no libraries modify native prototypes. In fact, I’ve seen some libraries publicly shamed for even trying. If we’ve learned our lesson in JavaScript, why haven’t we learned it in CSS?

The class naming systems used by pretty much every popular CSS framework are just as bad if not worse than modifying native prototypes in JavaScript. They litter the global namespace with base styles, they choose class names so common they’re almost guaranteed to conflict with your existing code, and they make almost no effort to encapsulate their components.

Consider Bootstrap. Every single one of its JavaScript plugins uses a namespace and comes with a `.noConflict()` method to avoid naming collisions. Its CSS, on the other hand, makes no such effort despite [numerous](https://github.com/twbs/bootstrap/issues/1235) [requests](https://github.com/twbs/bootstrap/issues/1287) for it, and [easy solutions](http://philipwalton.com/articles/dynamic-selectors/) that people have been suggesting for a long time.

I don’t mean to call out Bootstrap specifically because pretty much every mainstream CSS framework does this. My hope is that the CSS community will start demanding better from their tools the same way the JavaScript community has.

## Wrapping up

If you’re trying to assess a new CSS methodology or framework, or you’re wanting to develop your own, I urge you to make code predictability one of, if not the highest priority.

So many methodologies try to sell you on niceties and false comforts like minimal markup or readable class naming systems. While patterns like `class="full height"` or `class="four wide column"` sound nice when you read them out loud, the architectural concessions required to achieve this “feature” are simply not worth it.

While 100% predictable code may never be possible, it’s important to understand the trade-offs you make with the conventions you choose. If you follow strict BEM conventions, you will be able to update and add to your CSS in the future with the full confidence that your changes will not have side effects. If you choose to follow a watered-down version of BEM, you will be taking a bit more risk. Sometimes these risks are manageable; sometimes they’re not. The amount of risk you can afford to take is inversely proportionate to the size of your team.

In my opinion if your team is larger than just you, the risk is not worth the reward.

<h1><a id="user-content-footnotes" class="anchor" href="#footnotes" aria-hidden="true"><span class="octicon octicon-link"></span></a>Footnotes:</h1>

<ol class="task-list">
<li> <a href="http://w3c.github.io/webcomponents/spec/shadow/">Shadow DOM</a> brings real, two-way subtree scoping to CSS, though it’s not currently supported by all browsers.</li>
<li> With <a href="http://w3c.github.io/webcomponents/spec/custom/">custom elements</a>, you can create additional tags, which partially solves this problem.</li>
<li> The only exception to this is <a href="http://dev.w3.org/csswg/css-cascade/#inheriting">inheritable properties</a> like <code>font-size</code> and <code>line-height</code>. Blocks may depend on these styles being defined outside of the block because it allows them to be more adaptable to their host environment. If blocks choose to not reset inheritable properties, they should be flexible enough to adapt to whatever properties they may receive.</li>
<li> There are several <a href="https://github.com/philipwalton/html-inspector/blob/0.8.2/src/rules/convention/bem-conventions.js#L1-L27">different variations</a> on the traditional BEM naming conventions. I personally prefer the flavor <a href="https://github.com/suitcss/suit/issues/80">advocated for</a> by <a href="https://suitcss.github.io">SUIT CSS</a>.
</li>
</ol>
