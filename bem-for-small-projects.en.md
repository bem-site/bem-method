# Scaling the opposite: the BEM methodology Yandex on smaller projects

the _Original translation published in [blog Yandex on Habrahabr](http://habrahabr.ru/company/yandex/blog/234905/)._

In the development of individual frameworks is not so important: when the tools are available, our task is reduced to selecting the desired. To make the right choice, you should start with a General approach, with the **methodology**. Most methodologies, however, are developed by large companies. Whether they were small projects or to successfully use them you need to re-invent again?

Most likely, you already know about one of such methodologies developed by [Yandex](https://www.yandex.ru/) is [BEM](https://ru.bem.info/). BEM argues that three entities (****locks, **e**elements and ****odification) enough to write HTML and CSS, job code structures and component structures and subsequent scaling of the project to the highest level.

<img src="https://img-fotki.yandex.ru/get/16146/158800653.1/0_11383e_78659b03_orig" width="800" height="320"/>

I worked in Yandex long enough and have seen how this methodology works on large projects. In Yandex, BEM is used to develop CSS and JavaScript component, using this methodology also write templates and define dependencies between components. There is BEM-tools, encouraged various experiments with code, research. In large scale these companies work pay off and give Yandex the ability to quickly and accurately design hundreds of services simultaneously.

Can small teams to BEM from the same? I wasn't sure. Still BEM abstraction that comes with tools and technologies. For a small company benefit from switching to "full stack" of these technologies is questionable, many of the tools originally used for large and complex tasks. Maybe then I will benefit from the idea of methodology itself?

Initially my article was published in is known to many [magazine Smashing Magazine](http://www.smashingmagazine.com/2014/07/17/bem-methodology-for-small-projects/). But I decided that habré, it may be interesting, because a lot of my own small projects.

To the question of whether BEM used in such, I returned a little over a year ago, when he moved to Berlin to work in a small start-up companies Deltamethod. Plans for the development of the company was brave, and my team decided to try a BEM approach. I wanted to get the same bonuses that were at Yandex: the use of the code, a "live" Style Guide, scalability and rapid development. In addition, we wanted to generally keep the used technology stack and improve the code gradually, rather than rewrite the whole service from scratch.

We spent some time on architectural, basic things, introducing BEM step by step, checking the result again and moving forward. We continue to post ideas, tips, create small tutorials. Now I am sure that BEM can be applied on small projects. Below I will tell about our experience, maybe it will be useful for you.

## Fundamentals of BEM

Let's remember the basics. It is argued that semantics is the Foundation of web development, but with different frontend technologies use different semantic models. Modern web-app on the HTML level is most often just a jumble of tags `div` and `span`. CSS technology does not offer any structure. High-level JavaScript components use certain abstractions, but they are poorly connected to the CSS or HTML markup. From the point of view of designers and UX-experts, the interfaces are described in General terms, far from technical realization. Nevertheless, all these subject areas we use together. It's time to think about BEM: it's a common semantic model for markup, styles, code and UX. Take a closer look.

### Blocks

A block is an independent entity **with its own**, it is on the page of the individual brick interface.

For example, the blocks can be:

* title
* button
* navigation menu

To set the block, you need to think of a name and define its purpose. The interface can contain multiple instances of the same block (for example, different buttons or more menus). Any web interface can be described as a hierarchical structure of blocks. The simplest example is itself an HTML description of the page, if we imagine that each tag is a block. However, from the point of view of semantics it is meaningless, because HTML was designed for presentation and word processing, not interactive web applications.

### Elements

The element is a ****, the associated and meaning, and functional. The item does not exist and is not used without the unit to which it relates. But not all blocks need to be elements.

Examples of items:

* the navigation menu (block) containing the menus (items);
* table (unit), within which rows, cells and headers (items).

The elements also have names. If inside the unit some of the same elements, then they go under one name (e.g., table cells or list items). Elements are specified **on** and not based on the HTML of the layout block; thus, a separate element can be represented by a complex HTML structure.

### Modifiers

The modifiers flags of the blocks or elements, they define the properties or state. Modifiers are Boolean (for example: `visible: true` or `false`), or are a pair "key — value" (`size: large, medium, small`). It's kind of like attributes in HTML, but still not the same. The entity can have multiple modifiers, if these modifiers describe different things.

### The blocks in the DOM

How to use BEM, if we still have to write HTML? Need a naming Convention that will bind DOM nodes to BEM entities. To set this context, BEM uses CSS classes. In this block, elements and modifiers are not placed on the DOM-nodes exclusive; one tag can be specified multiple blocks or block element can be combined with the container of another block. The use of the same DOM node to embed multiple entities called "mix". Remember that the mixes are made for convenience, you can combine only compatible: do not turn everything to mush, mixing blocks and items.

### The tree of BEM (BEM tree)

Forming a document of BEM entities, from the root block (`&lt;body&gt;` or `&lt;html&gt;`) and ending with deeply nested blocks, you create a semantic layer over the existing DOM structure. This layer is called a BEM tree (BEM tree). BEM tree gives you the opportunity to interact with a document in terms of BEM, from the point of view of semantics, abstracting from the features of the DOM implementation.

### First steps

If you are already thinking, not to try BEM on a project, the question arises: "How to translate into BEM an existing project, is it possible to do it gradually?"

Of course, you can. Let's start with the fact that we select a few blocks. We start with the semantics, and specific technologies such as CSS and JavaScript, will be discussed later. As you may recall, a block can only be an independent entity. For example, headings are blocks. They have no inner items, but the heading levels (from the largest to the smallest) can be defined as modifiers of the form "key — value".

If later you need more levels, we define additional modifiers. Then I would say that the developers HTML4, most likely, was wrong, inventing the `&lt;h1&gt;` to`&lt;h6&gt;`. They created different tags, while the required modifiers of the same block entity. HTML5 is trying to fix with the sectional elements, but support in browsers yet the situation is not very good.

Let's say we got this:

```
BLOCK heading
MOD level: alpha, beta, gamma
```

As a second example, take the form and its controls (or _controls_ as they are called) is also a block: input fields and buttons, and other blocks. In HTML, it's implemented quite randomly. Different in the sense of items (input fields, radio buttons and checkboxes-the checkboxes are merged into a single tag , a other (very similar ones) determined by separate tags `&lt;select&gt;` and `&lt;textarea&gt;`. Some entities, such as tags `&lt;label&gt;` or auto-suggestion `datalist`, make no sense without reference to specific controls and are suitable for the role of the elements inside the blocks that make up the form.

See if you can fix it:

```
BLOCK text-input
MOD multiline
MOD disabled
ELEMENT text-field
ELEMENT label
```

The input field need to be able to write the text. If the text is multiline, semantically, nothing changes, so `multiline` is the only modifier. In HTML these two cases, the markup will be different, but that's okay — now we focus on the definition of the semantics, not the specific implementation. The block has a `textfield` and `label`. Later, you may need to add other elements such as the status icon, a place for error messages or autopackage.

```
BLOCK checkbox
ELEMENT tick-box
ELEMENT label
```

```
BLOCK radio
ELEMENT radio-button
ELEMENT label
```

These two unit are pretty obvious. Still have the `&lt;label&gt;` and the element represented by the tag `&lt;input&gt;`.

```
BLOCK select
MOD disabled
MOD multiple
ELEMENT optgroup
ELEMENT option
MOD disabled
MOD selected
```

In the case of `select` tags `label` we don't need, and everything else is more or less similar to the usual control `select`. It is technically possible to reuse an existing tag `&lt;select&gt;` and its structure. Please note that `select`, and `option` can be modifier `disabled`. It is important that these are different modifiers: the first turns off all control entirely, and the second only a specific `option` (by the way, a great example of a modifier on the item!). Try in your project to find examples of blocks.

For the first time this may be difficult. If you need help, it has &lt;a href=&quot;mailto:info@bem.info&quot;&gt;you can ask the BEM team&lt;/a&gt;!

## Let your CSS speaks for itself

Surely you've heard that BEM is a great help in organizing and writing CSS. But exactly how and why?

As I mentioned, BEM uses CSS classes to store information about blocks, elements and modifiers. With the help of simple naming conventions BEM turns CSS from plain language descriptions of the styles in the tool describing the semantics of your project.

### The naming system for CSS BEM

Agree on the following:

* the names of blocks, elements and modifiers should be short and semantically meaningful;
* use only letters, dashes and numbers;
* do not use the underscore character (`_`), we need it as a special delimiter.

Containers blocks get a CSS class consisting of the prefix and name of the block:

```
.b-heading
.b-text-input
```

Prefix `b-` means "the unit" and is the default in many BEM implementations. You can choose your own prefix, but it needs to be as short as possible. You can do even without prefixes, for the BEM, they are not necessary, but help to realize the missing in the CSS standard (and very necessary at times!) namespace.

Containers are elements within a block get CSS class of the block name, two underscores and the element name:

```
.b-text-input__label
.b-text-input__text-field
```

Elements elements are not used (for example, the class name of the `.b-block__elem1__elem2` does not match the BEM approach).

Modifiers or refer to the unit, or to the item specific unit. Their CSS class is formed from the class of their owner, followed by an underscore and a modifier name:

```
.b-text-input_disabled
.b-select__option_selected
```

For Boolean modifiers this is enough. If modifier — a pair "key-value", add another underscore to separate the values of the modifier:

```
.b-heading_level_alpha
```

Classes the modifier is used in conjunction with the class of a block or element:

```
&lt;div class=&quot;b-heading b-heading_level_alpha&quot;&gt;BEM&lt;/div&gt;
```

## What are the advantages of CSS in BEM methodology

### Just one class

Often CSS is heavily dependent on document structure. Changes in the structure. CSS. With BEM, we no longer use the tag names and ID, and rely only on class names. This allows us to minimally depend on the document structure.

### The specificity of the CSS rules: the problem and the solution

Large amounts of CSS it's hard to maintain including due to the fact that they can mutually influence each other, sometimes unpredictable diapedese or overriding existing rules.

This "problem" has a name: the specificity of CSS rules. Source availability of tag names and identifiers changes the specificity of the rules in such a way that inheritance properties (which is used very often in CSS) override is only possible with selectors of the same or higher specificity. The projects are made on the BEM, does not suffer from this problem.

Let's consider an example. Let you have a table with these styles:

```css
td.data { background-color: white }
td.summary  { background-color: yellow }
```

However, in another component you need to override the background color of individual cells:

```css
.final-summary { background-color: green }
```

It doesn't work, because the `tag.class` will always have a higher specificity compared to the `.class`, regardless of their relative position in CSS.

To work, you will have to add the tag name:

```css
td.final-summary { background-color: green }
```

Because in BEM all the basic styles are set only through classes with unique names, a key role is played not selectors, and the order of the rules in the stylesheet that is easy to control.

### Goodbye stage?!

The large nesting selectors is not the best way to speed up your website, especially if you support older browsers. In addition, these selectors rely more on the structure of the document and often create conflict styles affecting elements that initially affect was not planned. However, the cascade in CSS is not as valuable and necessary as we used to think.

How is this possible and why is it important? Is it not true that the cascade should be used in CSS, otherwise why they are called Cascading Style Sheets?

Back to the naming rules and remember that each of the BEM class has a unique name and is self-contained. With rare exceptions it does not depend on the names of the tags or IDs, and different blocks never overlap in class names. This means that you, probably, it is enough to specify one (and only one!) the class below:

* describe the styles of the block;
* describe the styles of any element within the block;
* add additional styles or override with a modifier.

It covers more of the CSS problems that arise in the layout of average complexity. In this case, we simplify the browser working on analysis of a selector to find elements that correspond to it. Most browsers are beginning to use the selector with the "right side" (often covering a larger set of nodes), and then specify the resulting sample, filtering it by application of the remaining rules. The more steps of filtration required, the more time it takes. Modern browsers are very well optimized for these tasks, but not all have the latest version, and mobile devices can always behave differently — and the selectors, made up of one class, at least among the most rapid of all possible selectors.

For small and medium pages CSS is rarely the main problem of slow performance, but the set of CSS rules should be applied anew with each change of the document. When your project grows, the speed of CSS will sooner or later become an important factor. Usability professionals like to say that 250 milliseconds is the threshold in excess of which the action is not perceived as instantaneous. The faster your CSS is initially, the more space you will have to maintain a sense of "all flies".

It turns out, BAM reverses the cascade in CSS?! If you seriously, then of course not. There are instances when the cascade needed — if you want to specify two or more classes in a single selector. For example, if the block modifier affects the styles of individual elements:

```css
.b-text-input_disabled .b-text-input__label
{
   display: none;
}
```

But since we are not just a set of classes and a semantic model, a different rule may have to override the styles set here, too, with a high probability will depend on the modifier (but the other), but the specificity will remain the same! This means that we can again rely only on the order of the rules.

There are other examples when the cascade is required (non-trivial internal dependencies of the elements, combinations of modifiers, CSS hacks). Live projects are always richer and more complex than any methodology (even BAM!), but such styles are unlikely to need often.

### Completely Independent Blocks (the concept of NSA)

If styles blocks is independent from each other, how to Express this in CSS? The answer is simple: it is better to make dependencies, was not. The blocks and the "independent entity" to contain everything you need for your display styles. This usually means a certain amount of "extra" rules, but as a bonus you get the ability to freely move the blocks on the page (or even between different pages or sites) without external dependencies. For this reason, in the BEM methodology, it is recommended to avoid global CSS Reshetov or minimize their number. Block elements do not follow this principle; they may depend on the styles of the block. If the item is asking for independence, try to make it a separate unit.

## Alternative naming conventions classes based on BEM

Described in the article the naming of classes for the BEM are not the only one. You may have heard about other options. It is better to choose?

For example, Nicholas Gallagher (Nicolas Gallagher) [suggested some improvements](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/), and this is not the only example. Many have proposed to refer to modifiers to use attributes instead of classes, the syntax delimiters may be different, the namespace prefixes can not be used at all or introduce a lot of different prefixes for different purposes.

The naming scheme which has been proposed by the development team BEM from Yandex, there is one definite plus: all the proposed BEM-tools, including open source, look at it approvingly. If you are considering the use of these tools, the compatibility of syntax will help you.

Of course, the BEM-methodology order of magnitude more important than how many lines we write in the class name. If you like another way of naming — use it, just make sure you have the technological reason.

## Semantic JavaScript and BEM-oriented code

How to apply the BEM model to the JavaScript code?
Many authors and developers see in BEM only the naming Convention of classes in CSS, but this is obviously a simplified approach.

The BEM methodology was designed to at all levels (HTML, CSS, JavaScript, templates, interface design), it was possible to introduce a single semantics is a kind of polyfill hosted on the same principle as jQuery, and providing a single, flexible API on top of a diverse set of methods to work with DOM.

HTML was originally designed as a markup language, but now we use it to build interactive interfaces. Experimental standards such as Web Components, trying to regain control over the semantics, but BEM can be used now in all browsers, with potential for integration with new modern technologies, as the idea does not depend on a specific API or from specific technologies.

I will present a paradigm of development with minimal code examples. Perhaps the explanation will turn out very "high level", but the idea might become clearer. Also I introduce the term "BEM-oriented code" — more on this below.

### Learn to declare

The first step is to take the **declarative paradigm**. Declarative programming is an approach that focuses on "what" not "how." Regular expressions, SQL and XSLT are good examples of declarative technologies, as they are not determined by the sequence of low-level operations, and the logic behind them. Declarative programming is a description of the set **conditions**, each of which correspond to specific **actions**.

In BEM, the conditions can be expressed using the **modifiers**, and actions can be performed only on the **blocks and items**. The code examples in this article is inspired by the framework `i-bem.js`, which was created and published under a free license is the Yandex, but I'm sure any advanced framework allows you to implement similar ideas, including the fact that the declarative approach is generally very close to web technologies.

```js
BEMDOM.decl(&#39;b-dropdown&#39;, {
onSetMod: {
disabled: function(modName, modVal) {
this.getLabel().setMod(&#39;hidden&#39;, &#39;yes&#39;);
if (modVal === &#39;yes&#39;) {
this.getPopup().hide();
}
},

open: {
yes: function() {
this.populateList();
}
}
},
/* ... */
```

This sample code defines actions upon installation of the two modifiers on the `b-dropdown`.

Very similar to event handlers, but all States are immediately reflected also on the CSS level, since the modifiers are expressed by the CSS classes that are added to the corresponding block instances or elements.

Another example with modifiers on the `b-editor`:

```js
BEMDOM.decl(&#39;b-editor&#39;, {
onSetMod: {
hotkeys: {
windows: function() {
this.delMod(&#39;theme&#39;);
this.loadKeyMap(&#39;windows&#39;);
},
emacs: function() {
this.setMod(&#39;theme&#39;, &#39;unix&#39;);
this.loadKeyMap(&#39;emacs&#39;);
enableEasterEgg();
},
&#39;&#39;: function() {
this.clearKeyMaps();
this.delMod(&#39;theme&#39;);
}
}
}
/* ... */
```

This example helps to understand how modifiers can describe the logic of the transition between States.

### Methods

With a declarative approach, methods are not always automatically associated with the component, their presence also can **declare** specific instances that meet a set of criteria (in our case — the set of modifiers):

```js
BEMDOM.decl({ block : 'b-popup', modName : 'type', modVal : 'inplace' }, {
   appear: function() {
      //makeYouHappy();
   }
});
```

This method is defined only on blocks that have a modifier `type: inplace`.

As in "classical" OOP approach, you can extend semantically certain methods, indicating more specific **Declaration** specifying previously set. Possible as overrides, and hipping. Example:

```js
BEMDOM.decl({ block: 'b-link', 'modName': 'pseudo', 'modVal': 'yes' }, {
   _onClick : function() {
      //performs basic _onClick defined
      //for all instances of the block b-link
      this.__base.apply(this, arguments);

      //to change the appearance with CSS,
      //semantically describing the status change and
      //leaving the implementation of specific author style sheets
      this.setMod('status', 'clicked');
   }
});
```

In this assignment method `_onClick` is expanded only for instances of `b-link` with modifier `_pseudo_yes`. Otherwise, you can use the default implementation.

The semantics is gradually moving from the HTML markup in the JavaScript code, we use all the same BEM-entity.

### Spreading BEM tree

What is the meaning of a declarative approach, if we go from theory to practice? The main idea is to work with a BEM tree, which is built and managed by you and not the DOM tree, which reflects only the markup (the thing, in fact, deeply technical):

```js
BEMDOM.decl('b-checkbox-example', {
   onSetMod: {
      js: {
         inited: function() {
            var checkbox = this.findBlockInside({
               block: 'b-form-checkbox',
               modName: 'type',
               modVal: 'my-checkbox'
            });
            BEMDOM.append(this.domElem, 'Checkbox value: ' + checkbox.val());
         }
      }
   }
}
);
```

Of course, there is a rich set of other API methods, for example `this.elem(&#39;name&#39;)` and `this.findBlockOutside(&#39;b-block&#39;)`. I don't want to copy the documentation (available online), and just around the BEM-tree is built methods of working with the web application.

### Modification of modifiers and monitoring controls

The previous text is not enough highlighted the theme of **state management application**. After the condition described, you need to learn how to perform transitions between them. As we work with a BEM tree, we can use modifiers as the main carriers of information about the States.

Setting modifiers are setting CSS classes, but we can't effectively monitor these activities (for technological reasons). Therefore, instead of directly setting classes in CSS, the `i-bem.js` provides a simple API (easy to reproduce in other frameworks):

```js
//setter
this.setMod(modName, modVal);
//getter
this.getMod(modName);
//check
this.hasMod(modName, modVal);
//switching
this.toggleMod(modName, modVal);
//removal
this.delMod(modName);
```

Now we can from the inside to respond to any change in the modifier and perform all the actions declared for each specific case.

### BEM-oriented code

Many JavaScript libraries already have sufficient capacity to support the BEM methodology without the involvement of external complex tools.

Here is a short "checklist" that should be able to framework:

* the **Support in one form or another declarative approach**
* the **Allow to work with a BEM tree, abstracting from the DOM tree**&lt;br&gt;
Regardless of the built-in API, an important opportunity at the right time to move away from direct interaction with the DOM, possibly focusing on BEM-entity.
 * the **Allow the use of modifiers to describe the state**&lt;br&gt;
 Of course, you may have to develop additional methods or plugins. It is also clear that it is not necessary to describe the modifiers in all States until recently. Start with those that are easy to Express in CSS (associated with showing or hiding elements, changing appearance depending on the state, etc.). Do not work with inline CSS from the code directly.

If your favorite framework can support you in this, then BEM-oriented code, you can try to write right now.

If you are using jQuery, you can try one of these simple projects
BEM-oriented development:

* the [jQuery BEM](http://xslc.org/jquery-bem/) plugin
* the [jQuery BEM Helpers](https://github.com/ingdir/jquery-bemhelpers/) (implementation setMod and getMod)

## From the rules of naming classes to the Style Guide

If you work a lot with designers, the BEM methodology will also be useful.

Imagine that you have a style guide project, made by a Real Professional Designer™. Most likely, you will give it in the form of hefty PDF file from which you will learn about used in project, fonts, color schemes, principles of interaction of the interface elements, and other clever terms. This Stalag might be interesting to read, especially in their free time, but for the average frontend developers use such guidance is not enough: on the code level, they operate on entirely different concepts and terms, and no particular connection between them and biting stalgia" do not feel.

Maybe it would be better if you as a developer could talk with the designer "the same language"? Not all programmers it is interesting to listen to "about photoshop", not all designers want to program. What if styleid could be **library interface blocks**, described in terms of BEM? Such a library would include all the basic "building blocks" from which is constructed the site interface or application.

If the designer begins to use the terminology of BEM, it can very quickly go from design "screens" to work with a specific **blocks** and ****. It will also help to identify and better describe similar components from different parts of the interface. Visual variations of the same component, you can immediately begin to call the mods (modifiers), and then use them to describe the basic state of each block (if the block online or changes its behavior depending on conditions).

In addition, the interface is almost "by itself" will be divided into small "bricks" that will facilitate estimation of time and effort required for their implementation (see, it's easier to work with than with the "indivisible" screen-layout). You will quickly come to prototyping with the help of diagrams or sketches: if blocks are named, described the appearance and behavior, to draw them in the style of "pixel perfect" in many cases, not necessarily. More importantly, this model directly (sometimes one-to-one) to the organization of your code! In your code — all of the same blocks and elements with the same names and the same behavior. If you and BEM is not the first day, it may be that many blocks have already been implemented and simply reuse or extend.

The main achievement, of course, the disappearance of the gap between code and design, using the same entities when designing interfaces and writing code — despite the fact that designers do not need to learn programming, and for developers to master the UX-tools. The designer may not understand how your code works, but you have to say will be "the same language".

In a large team, divided into blocks (modular approach) makes it easier to parallelize development, and protects against a situation of "sole control" of the developer over an important part of the project because he is a BEM approach encourages modularity. In addition, in any complex code very basic techniques for working with data (BEM tree, modifiers, interaction of blocks) will be the same; to understand this code is easier to maintain it easier. Here, by the way, go to the next section:

## BEM as a high-level project documentation

Let's be honest: the developers rarely write documentation in sufficient volume. The transfer of projects between the teams, the change of developers — the process is non-trivial. In supporting the code, it is important to minimize the time the developer spends on it to understand how it works, where everything is and how it works — sometimes that is what takes the lion's share of time, and not on the functionality or bug fix.

Of course, very cool to have documentation for everything, but in the real world it often does not happen. But even when the documentation is, it describes the methods, properties, or API modules, but rarely for the "cycle" component, its possible States and transitions between them. The reason is simple: this high-level semantics, and if you do not apply any methodology, the code itself does not provide tools for its description, so the documentation to the code often does not help: all the methods are described thoroughly, and how that works is unclear.

However, if the project uses the principles of BEM-oriented code, as described above, you will immediately be able to understand the following:

* what elements of a component (unit) you are working;
* what kind of outdoor units component interacts;
* what condition (modifiers) you need to consider, if you add new or corrected errors.

Examples are usually easier. What can you say about how works internally the following block?

```
// block
b-popup
// modifiers and their values
_hidden
_size _big
_medium
_large
_direction _left
_right
_top
_bottom
_color-scheme _dark
_light
// elements
__anchor-node
__popup-box
__close-btn
__controls
__ok
__cancel
```

You read only the description of a BEM structure (in seconds), and even the code itself is not seen, but surely can tell me the author of the example that makes this unit and how approximately it can work!

Note that documentation in this example, is also not seen. BEM description can be generated automatically forces a CSS preprocessor, described in YAML or similar languages.

## BEM and file structure

When the project is growing rapidly, consistently file structure you can be greatly delayed. The more complex the project, the more complex and less flexible is its structure. Tools and frameworks are not always well arrange files in the project, because some of them impose their own, strictly specific for this tool, the structure of files and folders (and if you then go on to something new?!), and some frameworks generally do on this subject do not offer — do what you say.

Except you, choose the project structure, no one can. The idea of BEM and there may be useful because the BEM is not a framework, but the principle.

### A library of blocks

Folder blocks, the "basic concept" of any file structure focused on BEM approach. Block names are short, descriptive and unique within the project and are ideal for naming subfolders. By themselves, the blocks within the project equal, so they are easier to store in a flat structure as a set of folders on the same level:

```
/blocks
/b-button
/b-heading
/b-flyout
/b-menu
/b-text-field
```

External tools (frameworks, etc.) can also be defined as blocks.
Example:

```
/blocks
...
/b-jquery
/b-model
```

Inside each folder block is the easiest way to highlight each "technology" for the individual file:

```
/b-menu
b-menu.js
b-menu.css
b-menu.tpl
```

More "advanced" approach — to take data for some elements and modifiers in separate subfolders, implementing a modular approach:

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

This gives you more control over the code, but this requires time to create and support. Take your pick.

### Levels

If you want to expand the functionality of the component or use the code in several projects at the same time? Common (shared) lib blocks should support overriding and extending functionality. In the case of JS-code will help us OOP principles, but how to be with styles and templates? BEM solves this problem, the input for all used technologies (JS, HTML, CSS) concept of **levels**.

When you decide on your file structure, it will **are the same for each block**. Therefore, several different block libraries can easily be on different layers of the application.

For example, you can have a library of common blocks and some more specific libraries for individual pages or sections of the website:

```
/common
/blocks
/b-heading
/b-menu
...

/pages
/intro
/blocks
/b-heading
b-heading_decorated.css
/b-demo
/b-wizard
...
```

In this approach, the `/common/blocks` we will stack the blocks used throughout the application.

For each page (in our example `/pages/intro`), we introduce a new **level**: a private library, the `/pages/intro/blocks`, which adds new units and expands (if needed) some "General" (in our example, pay attention to extra modifier `_decorated` for block `b-heading`).

Build tools project can use the levels to create content specific to one page or section (for example, a set of styles used only on this page).

Separate libraries can be based on the form factor of the device:

```
/common.blocks
/desktop.blocks
/mobile.blocks
```

The common library is located on the upper level and `mobile` or `desktop` expand it, as the following levels. This same mechanism allows multiple projects to use the common blocks, including a common set of front-end component that implements a unified style across multiple sites or services.

### Assembly

The BEM approach is quite granular (many small files). This is fine for development, but in production is a problem. Almost certainly we want to load the front end resources the minimum number of network requests, compress and cache. For this you need to define and implement the concept of "build process".

Yandex has released a tool-collector, open-source by the name of the [borschik](https://ru.bem.info/tools/optimizers/borschik/), which will help to bring together JavaScript and CSS files and makes it easy to connect external tools for further optimization for example [UglifyJS](https://github.com/mishoo/UglifyJS) or [CSS Optimizer](https://ru.bem.info/tools/optimizers/csso/). There are solutions like [RequireJS](http://requirejs.org/), which also help to implement the Assembly, description, and dependency tracking.

Want more opportunities and more focus on the BEM-methodology? Try [bem-tools](https://ru.bem.info/tools/bem/bem-tools/).

A very important lesson that I've learned, working with BEM: do not be afraid of granularity, if there is a clear understanding of how to put it all together.

## Utilities, libraries, frameworks... what's next?

Quite a long time I was skeptical about the idea of using BEM on smaller projects. But a recent experience in a start-up project demonstrated that we can shift the focus towards ideas, not being tied to a specific implementation or framework to the main bonus, for which the BEM was invented: a uniform semantics in all frontend technologies.

BEM taught me to think outside of specific frameworks and utilities.

I well remember the time when the developers seriously discuss the best ways to assign an event handler in the browser. Remember how library to work with DOM fought for world domination. I remember it became fashionable to use frameworks, proposed high-level approaches. BEM, I take it as next level as "framework of ideas" in web development, not tying anyone to a particular tools.

Want to know more? Go to [BEM](https://ru.bem.info/), read the articles, get acquainted with the code, download the modules, ask questions and help to develop the project.
