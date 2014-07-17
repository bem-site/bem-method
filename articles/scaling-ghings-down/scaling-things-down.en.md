Originally published by <a href="https://h.yandex-team.ru/?http%3A%2F%2Fwww.smashingmagazine.com%2F2014%2F07%2F17%2Fbem-methodology-for-small-projects%2F">Smashing Magazine</a>. 

Front-end development is no longer about individual frameworks. Tools are available — we merely have to choose. To make the right choices for your project, you need to start with a general approach, or <strong>methodology</strong>. But most methodologies have been created by big companies? Are they still useful for small companies, or do we need to reinvent them at a small scale?

You probably already know of <a href="http://bem.info">BEM</a>, one of those methodologies developed by a big company — namely, <a href="http://yandex.com">Yandex</a>. BEM posits that three basic entities (<strong>b</strong>locks, <strong>e</strong>lements and <strong>m</strong>odifiers) are enough to define how to author HTML and CSS, structure code and components, describe interfaces and scale a project up to an industry-leading service.

I’ve spent some time with Yandex and BEM, and I know that this methodology works for large projects. Yandex uses BEM to develop CSS and JavaScript components; Yandex also optimizes templates and tracks dependencies in BEM, develops BEM utilities, supports code experiments and researches the field. On a large scale, this investment pays off and allows Yandex to develop hundreds of its services faster.

Would smaller teams benefit from BEM? I wasn’t sure. BEM is a layer of abstraction, offered with other tools and technologies. A small agile team switching to a full BEM stack would be questionable. Could the idea — the approach itself — be useful?

I had to revisit this question when my career recently took me from Yandex to Deltamethod, a mid-sized startup in Berlin. Facing ambitious development plans, we decided to try BEM on a smaller scale. We wanted the same benefits that Yandex gets from BEM: code sharing, a live style guide, scalability, faster development. We also wanted to keep our toolchain and upgrade the existing code base gradually, rather than start from scratch.

For some time, we’ve been focusing on architecture and the basics, trying aspects of BEM one by one, assessing the results, then moving forward. We keep writing down ideas, guidelines, useful tips and short tutorials. I am now convinced that BEM applies to small projects as well. I’ve written down my findings, in case you find them useful.
<h3>BEM 101</h3>
Let’s start by reviewing the basics.

While semantics is considered the foundation of web development, various front-end technologies do not share the same semantic model. The HTML of a modern app is mostly a div soup. CSS by itself does not offer any structured model at all. High-level JavaScript components use abstractions that are not consistently tied to styles or markup. At the UX level, interfaces are described in terms that have nothing in common with technical implementations. Enter BEM, a unified semantic model for markup, styles, code and UX. Let’s take a closer look.
<h4>Blocks</h4>
A block is an independent entity <strong>with its own meaning</strong> that represents a piece of interface on a page.

Examples of blocks include:
<ul>
	<li>a heading,</li>
	<li>a button,</li>
	<li>a navigation menu.</li>
</ul>
To define a block, you’d give it a unique name and specify its semantics. Several instances of the same block definition (such as various buttons or multiple menus) might exist in the interface.

Any web interface can be represented as a hierarchical collection of blocks. The simplest representation is the HTML structure itself (tags as blocks), but that is semantically useless because HTML was designed for structured text, not web apps.
<h4>Elements</h4>
An element is a <strong>part of a block</strong>, tied to it semantically and functionally. It has no meaning outside of the block it belongs to. Not all blocks have elements.

Examples of elements include:
<ul>
	<li>a navigation menu (block) that contains menu items;</li>
	<li>a table (block) that contains rows, cells and headings.</li>
</ul>
Elements have names, too, and similar elements within a block (such as cells in a grid or items in a list) go by the same name. Elements are <strong>semantic entities</strong> and not exactly the same as HTML layout; a complex HTML structure could constitute just a single element.
<h4>Modifiers</h4>
Modifiers are flags set on blocks or elements; they define properties or states. They may be boolean (for example, <code>visible: true</code> or <code>false</code>) or key-value pairs (<code>size: large</code>, <code>medium</code>, <code>small</code>) — somewhat similar to HTML attributes, but not exactly the same. Multiple modifiers are allowed on a single item if they represent different properties.
<h4>Blocks and the DOM</h4>
How do you work with BEM while still using HTML? You do it by mapping DOM nodes to BEM entities using a naming convention.

BEM uses CSS class names to denote blocks, elements and modifiers. Blocks, elements or modifiers cannot claim any “exclusive ownership” of DOM nodes. One DOM node may host several blocks. A node may be an element within one block and (at the same time) a container for another block.

A DOM node being reused to host more than one BEM entity is called a “BEM mixin.” Please note that this is just a feature of convenience: Only combine things that can be combined — don’t turn a mix into a mess.
<h4>The BEM tree</h4>
By consistently marking up a document with BEM entities, from the root block (i.e. <code>&lt;body&gt;</code> or even <code>&lt;html&gt;</code>) down to the innermost blocks, you form a <strong>semantic overlay</strong> to the DOM’s existing structure.

This overlay is called a BEM tree.

The BEM tree gives you the power to manipulate the whole document in BEM terms consistently, focusing on semantics and not on a DOM-specific implementation.
<h3>Making your first move</h3>
You might be thinking, “I’ll give BEM a try. How do I start migrating my project to BEM? Can I do it incrementally?”

Sure. Let’s start by defining some blocks. We will only cover semantics; we’ll proceed with specific technologies (like CSS and JavaScript) later on.

As you’ll recall, any standalone thing may be a block.

As an example, document headings are blocks. They go without inner elements, but their levels (from top-most down to the innermost) may be defined as key-value modifiers.

If you need more levels later, define more modifiers. I would say that HTML4 got it wrong with <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>. It made different blocks (tags) of what should have been just a modifier property. HTML5 tries to remedy this with sectioning elements, but browser support is lagging.

For example, we get this:
<pre><code class="language-markup">
BLOCK heading
MOD level: alpha, beta, gamma
</code></pre>
As a second example, web form input controls can be seen as blocks (including buttons). HTML didn’t get it exactly right here either. This time, different things (text inputs, radio buttons, check boxes) were combined under the same <code>&lt;input&gt;</code> tag, while others (seemingly of the same origin) were defined with separate tags (<code>&lt;select&gt;</code> and <code>&lt;textarea&gt;</code>). Other things, such as <code>&lt;label&gt;</code> and the auto-suggestion <code>datalist</code>, should be (optional) elements of these blocks because they bear little to no meaning on their own.

Let’s see if we can fix this:
<pre><code class="language-markup">
BLOCK text-input
MOD multiline
MOD disabled
  ELEMENT text-field
  ELEMENT label
</code></pre>
The essential feature of a text input is its ability to accept plain text. When we need it to be multiline, nothing changes semantically — that’s why <code>multiline</code> is just a modifier. At the HTML level, this is represented by different markup for technical reasons, which is also fine because we’re only defining semantics, not the implementation. The <code>textfield</code> tag itself is an element, and <code>label</code> is another element; later, we might need other elements, like a status icon, error message placeholder or auto-suggestion.
<pre><code class="language-markup">
BLOCK checkbox
  ELEMENT tick-box
  ELEMENT label
</code></pre>
<pre><code class="language-markup">
BLOCK radio
  ELEMENT radio-button
  ELEMENT label
</code></pre>
These two blocks are pretty straightforward. Still, <code>&lt;label&gt;</code> is an element, and “native” <code>&lt;input&gt;</code> tags are elements, too.
<pre><code class="language-markup">
BLOCK select
MOD disabled
MOD multiple
  ELEMENT optgroup
  ELEMENT option
    MOD disabled
	MOD selected
</code></pre>
Select boxes don’t really need labels, and anything else here is more or less similar to a normal select box control. Technically, we can reuse the existing <code>&lt;select&gt;</code> tag with all of its structure. Note that both the <code>select</code> block and its <code>option</code> element have a <code>disabled</code> modifier. These are <strong>different</strong> modifiers: The first one disables the whole control, while the second one (being a perfect example of an element modifier) disables just an individual <code>option</code>.

Try to find more examples of blocks in your web projects.

Classifying things according to BEM takes some practice. Feel free to share your findings, or <a href="mailto:info@bem.info">ask the BEM team your questions</a>!
<h3>Let your CSS speak out loud</h3>
Perhaps you’ve heard a lot about BEM as a way to optimize CSS and are wondering how it works?

As mentioned, BEM uses CSS class names to store information about blocks, elements and modifiers. With a simple naming convention, BEM teaches your CSS to speak, and it adds meaning that makes it simpler, faster, more scalable and easier to maintain.
<h4>BEM naming conventions for CSS</h4>
Here are the prerequisites:
<ul>
	<li>Keep the names of blocks, elements and modifiers short and semantic.</li>
	<li>Use only Latin letters, dashes and digits.</li>
	<li>Do not use underscores (<code>_</code>), which are reserved as “separator” characters.</li>
</ul>
Block containers get a CSS class of a prefix and a block name:
<pre><code class="language-markup">
.b-heading
.b-text-input
</code></pre>
That <code>b-</code> prefix stands for “block” and is the default in many BEM implementations. You can use your own — just keep it short. Prefixes are optional, but they emulate much-anticipated (and missing!) CSS namespaces.

Element containers within a block get CSS classes consisting of their block class, two underscores and the element’s name:
<pre><code class="language-markup">
.b-text-input__label
.b-text-input__text-field
</code></pre>
Element names do not reflect the block’s structure. Regardless of nested levels within, it’s always just the block name and the element name (so, never <code>.b-block__elem1__elem2</code>).

Modifiers belong to a block or an element. Their CSS class is the class name of their “owner,” one underscore and a modifier name:
<pre><code class="language-markup">
.b-text-input_disabled
.b-select__option_selected
</code></pre>
For a “boolean” modifier, this is enough. Some modifiers, however, are key-value pairs with more than one possible value. Use another underscore to separate the values:
<pre><code class="language-markup">
.b-heading_level_alpha
</code></pre>
Modifier classes are used together with the block and element class, like so:
<pre><code class="language-html">
&lt;div class="b-heading b-heading_level_alpha"&gt;BEM&lt;/div&gt;
</code></pre>
<h3>Why Choose BEM CSS over other approaches</h3>
<h4>One class to rule them all</h4>
CSS sometimes depends a lot on the document’s structure — if you change the structure, you break the CSS. With BEM, you can drop tag names and IDs from your CSS completely, using only class names. This mostly frees you from structural dependencies.
<h4>Specificity problems solved</h4>
Big chunks of CSS are hard to maintain because they keep redefining themselves unpredictably.

This issue is called CSS specificity. The original problem is that both tag names and element IDs change selector specificity in such a way that if you rely on inheritance (the most common thing to expect from CSS), then you can only override it with selectors of the same or higher specificity. BEM projects are least affected by this problem. Let’s see why.

Let’s say you have a table with these style rules:
<pre><code class="language-css">
td.data { background-color: white }
td.summary  { background-color: yellow }
</code></pre>
However, in another component, you need to redefine the background of a particular cell:
<pre><code class="language-css">
.final-summary { background-color: green }
</code></pre>
This wouldn’t work because <code>tag.class</code> always has a higher specificity than just <code>.class</code>.

You would add a tag name to the rule to make it work:
<pre><code class="language-css">
td.final-summary { background-color: green }
</code></pre>
Because BEM provides unique class names for most styles, you would depend only on the order of rules.
<h4>Bye-Bye cascade?!</h4>
Nested CSS selectors aren’t fast enough in old browsers and can create unintended overrides that break the styles of other elements. Eliminating a lot of the cascade from CSS is possible with BEM.

How is this possible, and why is it important? Isn’t the cascade <em>supposed</em> to be there? Isn’t it the “C” in CSS)?

As you know, every BEM CSS class is unique and self-sufficient. It does not depend on tags or IDs, and different blocks never share class names. That’s why you need only a single class name selector to do the following:
<ul>
	<li>style a block container,</li>
	<li>style any block element,</li>
	<li>add style extras and overrides with a modifier.</li>
</ul>
This covers most of your styling needs, all with just one class selector. So, it’s mostly about single-class selectors now, and they are extremely fast. To apply a selector, the browser starts with an initial (broader) set of elements (usually determined by the rightmost part of a selector), and then gradually reduces the set by applying other parts until only matching elements remain. The more steps needed, the more time it takes, which is why you can hardly beat single-class selectors for speed.

CSS is rarely a performance bottleneck on small pages, but CSS rules must be reapplied with every document reflow. So, when your project grows, things will get slower at some point. According to usability science, 250 milliseconds is the perception limit for “instant.” The faster your selectors are, the more room you have to manoeuvre to keep that “blazing fast” feeling for your users.

So, no cascade?! Well, almost. In some cases, you might need two class names in a selector — for example, when a block modifier affects individual elements:
<pre><code class="language-css">
.b-text-input_disabled .b-text-input__label
{
   display: none;
}
</code></pre>
The nice thing is that any rule that redefines this one will likely depend on another modifier (because of the unified semantics!), which means that specificity is still the same and only the rule order matters. Surely, we can invent more cases that require even more cascading (internal element dependencies, nested modifiers, etc.). While the BEM methodology allows for that, you’ll hardly ever need it in real code.
<h4>Absolutely independent blocks</h4>
If blocks depend on each other’s styles, how do we express that in CSS? The answer is, they shouldn’t. Each block must contain all styles necessary for its presentation. The overhead is minimal, but this ensures that you can move blocks freely within a page or even between projects without extra dependencies. Avoid project-wide CSS resets for the same reason.

This is not the case for elements because they are guaranteed to stay within their parent block and, thus, inherit block styles accordingly.
<h3>Alternative BEM naming conventions</h3>
A number of alternative BEM naming conventions exist. Which should we use?

BEM’s “official” naming convention for CSS is not the only one possible. <a href="http://nicolasgallagher.com/about-html-semantics-front-end-architecture/">Nicolas Gallagher once proposed</a> some improvements, and other adopters have, too. One idea is to use attributes to represent modifiers, and CSS prefixes aren’t “standardized” at all.

The biggest advantage of the syntax proposed by the team behind BEM is that it’s the one supported in open-source tools distributed by Yandex, which you might find handy at some point. In the end, the methodology is what matters, not the naming convention; if you decide to use a different convention, just make sure you do it for a reason.
<h3>Semantic JavaScript: BEM-oriented code</h3>
How do you apply the BEM model to JavaScript code?

Many publishers and authors view BEM as a naming convention only for CSS, but that brings only half of the benefits to a project. The BEM methodology was designed to fix (i.e. polyfill) non-semantic DOM structures at all levels (HTML, CSS, JavaScript, templates and UX design), similar to how jQuery “fixes” broken DOM APIs. HTML was designed as a text markup language, but we use it to build the most interactive interfaces around. Experimental efforts such as Web Components strive to bring semantics back into our markup and code, but BEM can be used in a full range of browsers now, while retaining compatibility with future approaches, because it does not depend on any particular API or library.

We’ll go through a development paradigm using as little code as possible. It will be really high-level and abstract, but the abstractness will help us to understand the idea more clearly. You’ll notice another term in the heading above: “BEM-oriented code.” Before explaining what’s behind that, let’s go over some ideas that are useful to know when applying BEM to JavaScript.
<h4>Learning to declare</h4>
The first step is to embrace a <strong>declarative paradigm</strong>. Declarative programming is an approach that concentrates on the “what,” not the “how.” Regular expressions, SQL and XSLT are all declarative, and they specify not the control flow, but rather the logic behind it. When doing declarative programming, you’d start by describing a set of <strong>conditions</strong>, each of them mapped to specific <strong>actions</strong>.

In BEM, conditions are represented by <strong>modifiers</strong>, and <strong>any action can only happen on a block or element</strong>. The code examples in this article will use the <code>i-bem.js</code> framework, written and open-sourced by Yandex, but your favorite framework might be able to do similar or better things because declarative programming is not tied to a specific implementation.
```js
BEM.DOM.decl('b-dropdown', {
   onSetMod: {
      disabled: function(modName, modVal) {
         this.getLabel().setMod('hidden', 'yes');
         if (modVal === 'yes') {
            this.getPopup().hide();
         }
      },

      open: {
         yes: function() {
            this.populateList();
         }
      }
   },
   /* … */
```
The code snippet above defines actions for two modifiers on a <code>b-dropdown</code> block.

These are similar to event handlers, but all states get immediately reflected in the CSS. Modifiers are still stored as class names on the corresponding block and element entities.

Enabling and disabling different key bindings on a <code>b-editor</code> block is another example of how to use modifiers:
```js
BEM.DOM.decl('b-editor', {
   onSetMod: {
      hotkeys: {
         windows: function() {
            this.delMod('theme');
            this.loadKeyMap('windows');
         },
         emacs: function() {
            this.setMod('theme', 'unix');
            this.loadKeyMap('emacs');
            enableEasterEgg();
         }
      }
   },
   onDelMod: {
      hotkeys: function() {
         this.clearKeyMaps();
         this.delMod('theme');
      }
   }
   /* … */
```
In this example, we see how modifiers bring logic to our transitions in state.
<h4>Methods</h4>
With a declarative approach, methods are not always “tied” to a component automatically. Instead, they, too, can be <strong>declared</strong> to belong to some instances under certain circumstances:
```js
BEM.DOM.decl({ name : 'b-popup', modName : 'type', modVal : 'inplace' }, {
   appear: function() {
      // makeYouHappy();
   }
});
```
This method is defined only for blocks that have the specific <code>type</code> modifier: <code>inplace</code>.

As in classic object-oriented programming, you can extend semantically defined methods by providing even more specific <strong>declarations</strong> and reuse the original code if necessary. So, both overrides and extensions are possible. For example:
```js
BEM.DOM.decl({'name': 'b-link', 'modName': 'pseudo', 'modVal': 'yes'}, {
   _onClick : function() {
      // runs the basic _onClick defined
      // for all b-link instances
      this.__base.apply(this, arguments);

      // redefine the appearance from within CSS,
      // this code only gives you a semantic basis! 
      this.setMod('status', 'clicked');
   }
});
```
As specified by this definition, the extended <code>_onClick</code> method runs only on <code>b-link</code> instances with a <code>_pseudo_yes</code> modifier. In all other cases, the “original” method is implemented.

Semantics will slowly migrate from your markup (where it’s not needed anymore) to your code (where it supports modularity and readability, making it easier to work with).
<h4>“… Sitting in a (BEM) tree”</h4>
What is the practical use of a declarative approach if it is way too abstract? The idea is to work with a BEM tree, which is semantic and controlled by you, instead of a DOM tree, which is tied to the markup and specifics of implementation:
```js
BEM.DOM.decl('b-checkbox-example', {
   onSetMod: {
      js: {
         inited: function() {
            var checkbox = this.findBlockInside({
               blockName: 'b-form-checkbox',
               modName: 'type',
               modVal: 'my-checkbox'
            });
            this.domElem.append('Checkbox value: ' + checkbox.val());
         }
      }
   }
}
);
```
Other APIs exist, like <code>this.elem('name')</code> and <code>this.findBlockOutside('b-block')</code>. Instead of providing a complete reference, I’d just highlight BEM trees as the API’s foundation.
<h4>Modify modifiers to control controls</h4>
The previous section leaves the important subject of <strong>application state changes</strong> unaddressed. When app states are declared, you need a way to perform transitions. This should be done by operating on a BEM tree, with the help of modifiers. BEM modifiers can be set directly on DOM nodes (as class names), but we cannot effectively monitor that (for technical reasons). Instead, <code>i-bem.js</code> provides a simple API that you can use as inspiration:
```js
// setter
this.setMod(modName, modVal);
// getter
this.getMod(modName);
// check for presence
this.hasMod(modName, modVal);
// toggle
this.toggleMod(modName, modVal);
// remove modifier
this.delMod(modName);
```
Thus, we can internally hook into the modifier change call and run all of the actions specified for this particular case.
<h4>BEM-oriented code explained</h4>
Many JavaScript libraries provide enough power to support the BEM methodology without introducing a completely new tool chain. Here’s a check list to see whether the one you’re looking at does so:
<ul>
	<li><strong>Embraces a declarative approach</strong></li>
	<li><strong>Defines your website or app in BEM’s terms</strong>
Can many of the project’s existing entities be “mapped” to blocks, elements and modifier properties?</li>
	<li><strong>Allows you to drop the DOM tree for the BEM tree</strong>
Regardless of any particular framework API, wipe out as much of the raw DOM interaction as you can, replacing it with BEM’s tree interaction. During this process, some of the nodes you work with will be redefined as blocks or elements; name them, and see how the true semantic structure of your application reveals itself.</li>
	<li><strong>Uses modifiers to work with state transitions</strong>
Obviously, you shouldn’t define all states with modifiers. Start with the ones that can be expressed in CSS (to hide and reveal elements, to change style based on states, etc.), and clean your code of any direct manipulation of style.</li>
</ul>
If your framework of choice can do this, then you are all set for BEM-oriented code.

jQuery users could try these lightweight plugins to extend their code with BEM methods:
<ul>
	<li><a href="http://xslc.org/jquery-bem/">jQuery BEM</a> plugin</li>
	<li><a href="http://github.com/ingdir/jquery-bemhelpers/">jQuery BEM Helpers</a> (<code>setMod</code> and <code>getMod</code>)</li>
</ul>
<h3>From a naming convention to a style guide</h3>
If you work a lot with designers, your team would also benefit from a BEM approach.

Imagine that you had a style guide created by a Real Designer™. You would usually get it as a PDF file and be able to learn everything about the project’s typefaces, color schemes, interface interaction principles and so on. It serves perfectly as a graphic book that is interesting to look at in your spare time. However, it would be of little to no use to most front-end developers — at the level of code, front-end developers operate with totally different entities.

But what if you and the designer could speak with each other using the same language? Of course, this would require some training, but the benefits are worth it. Your style guide would be an interactive <strong>block library</strong>, expressed in BEM terms. Such a library would consist of blocks that are ready to be used to build your product.

Once the designer is familiar with BEM’s terms, they can iterate towards designing <strong>blocks</strong> and <strong>elements</strong>, instead of “screens.” This will also help them to identify similar UI parts and unify them. Modifiers help to define visual variations (i.e. which apply to all blocks) and states (i.e. for interactive blocks only). The blocks would be granular enough to enable you to make an early estimation of the amount of work that needs to be done. The result is a specification that fully covers all important states that can be reused with other screens or pages. This eventually allows you to mock up interfaces as wireframes or sketches, because all of the building blocks have already been defined. More importantly, this model maps directly to the code base, because the blocks, elements and modifiers defined by the designer are essentially the <strong>same</strong> blocks, elements and modifiers that the developer will implement. If you have been using BEM in your project for some time, then certain blocks are probably already available.

The biggest change, however, is closing the gap between screen and code by operating on the same entities in the UI design and development. Like the famous Babel fish, BEM enables you to understand people who have no idea how your code works.

On a bigger team, working on individual blocks is easier because it can be done in parallel, and big features do not end up being owned by any one developer. Instead, you share the code and help each other. The more you align the JavaScript HTML and CSS with BEM, the less time you need to become familiar with new code.
<h3>BEM as high-level documentation</h3>
Despite all advice, developers still don’t write enough documentation. Moving projects between developers and teams is non-trivial. Code maintenance is all about minimizing the time a developer needs to grasp a component’s structure.

Documentation helps a lot, but let’s be honest, it usually doesn’t exist. When it does exist, it usually covers methods, properties and APIs, but hardly anything about the flow of components, states or transitions. With minimally structured BEM-oriented code, you will immediately see the following:
<ul>
	<li>the elements you’re dealing with,</li>
	<li>other blocks you depend on,</li>
	<li>states (modifiers) that you need to be aware of or support,</li>
	<li>element modifiers for fine-grained control.</li>
</ul>
Explaining with examples is easier. What would you say about the following block?
```
b-popup
  _hidden
  _size _big
        _medium
	_large
  _dir _left
       _right
	_top
	_bottom
  _color-scheme _dark
                _light

	__anchor-node
	__popup-box
	__close-btn
	__controls
	__ok
	__cancel
```
By now, <em>you</em> can tell <em>me</em> what this block is about!

Remember, you’ve seen zero documentation. This block could be a structure that you’ve defined in a CSS preprocessor or a YAML meta description.
<h3>BEM and file structure</h3>
In a growing project, an inconsistent file structure could slow you down. The structure will only become more complex and less flexible with time. Unfortunately, tools and frameworks do not solve the problem because they either deal with their own internal data or offer no specific structure at all. You and only you must define a structure for the project. Here, BEM can help as well.
<h4>Block library</h4>
A block’s folder is the basis of all BEM-based file structures. Block names are unique within the project, as are folder names. Because blocks do not define any hierarchies, keep block folders as a flat structure:
```
/blocks
  /b-button
  /b-heading
  /b-flyout
  /b-menu
  /b-text-field
```
Libraries and other dependencies may be defined as blocks, too. For example:
```
/blocks
  …
  /b-jquery
  /b-model
```
Inside each folder, the easiest arrangement would be to give each “technology” a distinct file:
```
/b-menu
  b-menu.js
  b-menu.css
  b-menu.tpl
```
A more advanced approach would be to store some definitions of elements and modifiers in separate subfolders and then implement in a modular way:
```
/b-menu
  /__item
	b-menu__item.css
	b-menu__item.tpl
  /_horizontal
    b-menu_horizontal.css
  /_theme
    /_dark
	  b-menu_theme_dark.css
	/_light
	  b-menu_theme_light.css

  b-menu.css
  b-menu.js
  b-menu.tpl
```
This gives you control, but it also requires more time and effort to support the structure. The choice is yours.
<h4>Redefinition levels</h4>
What if you need to extend the styles and functionality of components or share code between projects without changing (or copying and pasting) the original source?

Big web apps, sections and pages could be significantly different, as could be the blocks they use. At the same time, a shared block library often has to be extended, individual items redefined and new items added. BEM addresses this with the concept of redefinition levels. As long as you’ve chosen a file structure, it should be the <strong>same for any block</strong>. That’s why several block libraries can be on different levels of an application.

For example, you could have a common block library as well as several specific libraries for individual pages:
```
/common
  /blocks
    /b-heading
	/b-menu
	…

/pages
  /intro
    /blocks
	  /b-heading
	    b-heading_decorated.css
	  /b-demo
	  /b-wizard
	  …
```
Now, <code>/common/blocks</code> will aggregate blocks used across the whole app.

For each page (as for <code>/pages/intro</code> in our example), we define a new <strong>redefinition level</strong>: A specific library, <code>/pages/intro/blocks</code>, adds new blocks and extends some common ones (see the extra <code>_decorated</code> modifier for the common <code>b-heading</code> block).

Your build tool can use these levels to provide page-specific builds.

Separation of libraries can be based on the form factors of devices:
```
/common.blocks
/desktop.blocks
/mobile.blocks
```
The <code>common</code> library stays “on top,” while the <code>mobile</code> or <code>desktop</code> block bundle extends it, being the next redefinition level. The same mechanism applies when several different projects need to share blocks or when a cross-project common block library exists to unify the design and behavior across several services.
<h4>The build process</h4>
We’ve ended up with many small files, which is good for development but a disaster for production! In the end, we want all of the stuff to be loaded in several big chunks. So, we need a build process.

Yandex has an open-source build tool, <a href="http://bem.info/articles/borschik">Borschik</a>, which is capable of building JavaScript and CSS files and then compressing and optimizing them with external tools, such as <a href="https://github.com/mishoo/UglifyJS">UglifyJS</a> and <a href="https://github.com/css/csso">CSS Optimizer</a>. Tools like <a href="http://requirejs.org">RequireJS</a> can also facilitate the building process, taking care of dependency tracking.

For a more comprehensive approach, have a look at <a href="http://bem.info/tools/bem/">bem-tools</a>.

The clearest lesson I’ve learned from BEM is not to be afraid of granularity, as long as you know how to build the whole picture.
<h3>Beyond frameworks</h3>
For a while, I was pretty skeptical that BEM is suitable for small projects. My recent experience in a startup environment proved me wrong. BEM is not just for big companies. It works for everyone by bringing unified semantics across all of the front-end technologies that you use.

But that is not the biggest impact of the BEM methodology on my projects. BEM enables you to see beyond frameworks. I remember times when people seriously discussed the best ways to bind event handlers to elements, and when DOM libraries competed for world dominance, and when frameworks were the next big buzz. Today, we can no longer depend on a single framework, and BEM takes the next step by providing a design foundation, giving us a lot of freedom to implement.

Visit the <a href="http://bem.info">BEM</a> website for extra resources, GitHub links, downloads and articles.

Long story short, BEM it!

