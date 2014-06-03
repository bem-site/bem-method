# What you can borrow from Yandex frontend dev

This article is a text version of a [presentation](https://vimeo.com/53219242)
given at [Riga WebConf](http://webconf.lv/) in November 2012.

The article sums up [Yandex](http://www.yandex.com/) over 7-year experience
in finding solutions for efficient frontend development.<br/>
Yandex, as a search engine and the larges Internet company in Russia, enjoys
the maijor share of the local market and provides over a hundred of associated
services with the help of 2500 developers and 150 frontend engineers among them.

<img src="http://img-fotki.yandex.ru/get/5645/14441195.26/0_711d5_b2ab18c0_orig"/>

Yandex developers jointly produce solutions for the problems they run into. At
the same time, Yandexoids are truly nerds connected to the world outside Yandex
via conferences, hackatons and meetups. So, the solutions produced by Yandex
developers perfectly work outside and can be easily shared.<br/>
Here is a piece of such sharing.

## Web Interface

<img
src="http://img-fotki.yandex.ru/get/6429/14441195.26/0_711d6_9a3f328a_XL.jpg"
width="800" height="558" title="" alt="" border="0"/>

Look at the draft for an online shop. As you can see, it's nothing special.
Just an ordinary web site providing all the generally accepted possibilities,
such as navigation through the site pages, searching books, some advertising
parts and so on.

As web developers, you know that behind the page there are our dear HTML and CSS.

````js
    <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            ...
        </body>

    body {
        font: 0.8em Arial, sans-serif;
        margin: 0;
        color: black;
    }
    .sidebar ul li {
````

Also, besides the page is really combination of HTML and CSS, it's also a set of
interface pieces.

<img
src="http://img-fotki.yandex.ru/get/6427/14441195.26/0_711d7_e0975803_XL.jpg"
width="800" height="600" title="" alt="" border="0"/>

Each piece is to do something. It provides to a user a functional or design
point.

Each has its purpose, similar to pieces of furniture…<br/>
A chair is to sit on, a cupboard it to keep the kitchen things. A bed is to lay
on, and a coffee machine helps to survive through deadlines.<br/>
You can use furniture to fill our rooms.

Also, you can use interface components to fill pages.

Pages are built with this pieces like houses are build with blocks. So, let's
call them just that, `blocks`.

## Block

A block is an independent interface piece that preserves a design point and some
functionality. Anything that can be taken as a solid piece and can be put into a
page is an interface block.

<table>
  <tr>
      <td colspan="2" align="center">
          <img
          src="http://img-fotki.yandex.ru/get/5645/14441195.26/0_711d9_9d9c6157_XL.jpg"
          width="800" height="52" title="" alt="" border="0"/>
      </td>
  </tr>
  <tr>
      <td rowspan="2">
          <img
          src="http://img-fotki.yandex.ru/get/6439/14441195.26/0_711dc_2f5ffa46_M.jpg"
          width="300" height="259" title="" alt="" border="0"/>
      </td>
      <td align="center">
          <img
          src="http://img-fotki.yandex.ru/get/4122/14441195.26/0_711da_e8f6dee7_M.jpg"
          width="300" height="271" title="" alt="" border="0"/>
      </td>
  </tr>
  <tr>
      <td>
          <img
          src="http://img-fotki.yandex.ru/get/5634/14441195.26/0_711db_81f5c441_L.jpg"
          width="500" height="47" title="" alt="" border="0"/>
      </td>
  </tr>
</table>

To operate the blocks, it's good to name them. Here there are a `Menu`, a
`Calendar` control, a `Footer`, a `Tabbed pane`, a `Dropdown` and a `Search`
blocks.

Futhermore, some blocks are large. They usually preserve other blocks. But they
still are solid independent pieces.

<table>
    <tr>
        <td colspan="2">
            <img
            src="http://img-fotki.yandex.ru/get/4120/14441195.26/0_711dd_3d4b199_XL.jpg"
            width="800" height="77" title="" alt="" border="0"/>
        </td>
    </tr>
    <tr>
        <td>
            <img
            src="http://img-fotki.yandex.ru/get/5647/14441195.26/0_711de_ac603720_M.jpg"
            width="300" height="81" title="" alt="" border="0"/>
        </td>
        <td>
            <img
            src="http://img-fotki.yandex.ru/get/6440/14441195.26/0_711df_12538ac_M.jpg"
            width="300" height="72" title="" alt="" border="0"/>
        </td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <img
            src="http://img-fotki.yandex.ru/get/5634/14441195.26/0_711db_81f5c441_L.jpg"
            width="500" height="47" title="" alt="" border="0"/>
        </td>
    </tr>
    <tr>
        <td colspan="2" align="center">
            <img
            src="http://img-fotki.yandex.ru/get/4128/14441195.26/0_711e0_8beaa73d_M.jpg"
            width="300" height="33" title="" alt="" border="0"/>
        </td>
    </tr>
</table>

Here you can see the `Header` block that contains some others.

### Block HTML representation

*Indeed, behind the scenes there are our dear HTML and CSS.*

<img
src="http://img-fotki.yandex.ru/get/5626/14441195.26/0_711e1_e0ab223a_XL.jpg"
width="645" height="46" title="" alt="" border="0"/>

Each block is represented by a piece of HTML markup. To style the block you can
write the CSS rules, as usual.<br/>
`Menu` block is an `ul` tag and its content.

````js
    <ul class="menu">
        <li><a href="/new">New titiles</a></li>
        <li><a href="/soon">Coming soon</a></li>
        <li><a href="/best">Bestsellers</a></li>
        ...
````

<img
src="http://img-fotki.yandex.ru/get/5634/14441195.26/0_711db_81f5c441_L.jpg"
width="500" height="47" title="" alt="" border="0"/>

The same works for the `Search` block, that is represented by `div` tag with
some content.

````js
    <div class="search">
        <input type="text" name="search" value="..."/>
        <input type="button" name="sbmt" value="Search"/>
    </div>
````

The last example is the `Tabbed Pane` block, which is also a combination of HTML
and CSS.

<img
src="http://img-fotki.yandex.ru/get/6439/14441195.26/0_711dc_2f5ffa46_M.jpg"
width="300" style="float: left" height="259" title="" alt="" border="0"/>

````js
    <div class="tabbed-pane">
        <ul>
            <li>Bestsellers</li><li>...</li>
        </ul>
        <div>
           The Casual Vacancy, J.K. Rowling
        </div>
     </div>
````

<div style="clear:both"></div>

## Independent CSS blocks
But in order to build pages with blocks, we developers should be sure that these
interface pieces can be put into any place on a page. This can be possible only
if blocks are `independent`.

Block independency means the following.
<blockquote>A block must not be affected by its ancestors, and in its turn must
not affect the descendants.<br/>
Regardless of where this block is placed.</blockquote>

When filling a page with blocks, we developers, shouldn't care where exactly
each block is placed. You just define a set of blocks with the appropriate order.
And that's enough for getting a complete functional page.

````js
    <html>
        <head>..</head>
        <body>

            <div class="head">
                <div class="logo">...</div>
                <ul class="menu">...</ul>
                <div class="search">...</div>
            </div>

            <div class="layout">...</div>

            <div class="foot">...</div>

        </body>
    </html>
````

But, of course, this maybe possible only due to some architectural requirements
to each block. Let us now see what these requirements are. For this let's have a
look at what situations can cause block affection and how to prevent them
beforehand.

### Repeating
The first is repeating blocks.

The same block can appear on the page. For example, one more `Menu` block can be
placed into the `Foot` block.

<img
src="http://img-fotki.yandex.ru/get/4135/14441195.26/0_711e2_5b1a2232_XL.jpg"
width="800" height="600" title="" alt="" border="0"/>

Since now the `Menu` block is not a unique within a page. Because of that you
cannot use `id` selectors to match the CSS rules to it, this would be invalid.

So,
<blockquote>To apply CSS to a block, you should use classname selectors.</blockquote>

**wrong**

````js
    <ul id="menu">
        ...

    #menu {
        ...
````

**right**

````js
    <ul class="menu">
        ...

    .menu {
    ...
````

This rule is correct for any block.<br/>
Even if you think *now* that the block is unique within a page, this can be
changed in the future. So, the best practice is to avoid id selectors at all and
use classes.

### Moving within a Page

The next that can happen with a block is its movement within a page.

<iframe width="560" height="315" src="http://www.youtube.com/embed/suLQEIcc68g"
frameborder="0" allowfullscreen></iframe>

As you can see in the video, the `Tabbed Pane` block was moved to he right side
of the page and immediately got broken since it has new ancestors, new parent
DOM nodes now.<br/>
This is that must not happen. You should guarantee that a block will work
correctly in any place on the page.

Actually you can ensure this only by *avoiding cascade in CSS*.

Such a recomendation sounds provocative. But anyway this is reasonable. Now
let's see why.

Cascade is a kind of relations between objects. A cascade rule says that one
object depends on another. It is a connection that can give some benefits.<br/>
But you should have a control over all those connections. If not, this may break
all.

Trying to fix, developers usually add even more connections into the system. That
seems to work at first. But each addition just increase uncontrolable mess.

The more cascade code you bring into the service, we more is risk of future damages.<br/>
So, you should use cascade only when it's really necessary.<br/>

I'll show below the situation when cascade is possible. But in general the
suggestion is to avoid it.

### Moving within a Site

The next block's adventure is to be moved from page to page.

The already familiar `Tabbed pane` block can be widely adopted. We can use it on
many pages. Of course, on a different page it has another parent block. As I've
said above, you should guarantee that it works correctly regardless of its
environment. This is what you achieve due to avoiding cascade.

<img
src="http://img-fotki.yandex.ru/get/6426/14441195.26/0_711e3_3579af38_XL.jpg"
width="800" height="600" title="" alt="" border="0"/>

<img
src="http://img-fotki.yandex.ru/get/5632/14441195.26/0_711e4_bf58fb79_XL.jpg"
width="800" height="600" title="" alt="" border="0"/>

Again, even if a block *now* is a single one within a whole site, that does not
mean it should depend on its surroundings.<br/>
The recommendation about avoiding cascade works for all the blocks.

#### Pages are Sets of Blocks
The other point is that when you are developing and maintaining, the block set of
every page changes.

<img
src="http://img-fotki.yandex.ru/get/4122/14441195.26/0_711e5_77eb4431_XL.jpg"
width="800" height="491" title="" alt="" border="0"/>

We, developers, should think about keeping associated CSS in the actual state.
So that if a block was removed from a page, we should remove its CSS code. Also,
if a block was added to a page, we should ensure its CSS is linked there.<br/>
That is not a problem for sites of 2-3 pages since we can keep all the stuff in
a single one CSS file.<br/>
But usually life is not that easy; there are several pages that are different but
still have some common design solutions. At least the `Header` block is included in
all the pages.<br/>
So, developers usually place the common stuff into the `common.css` file.
Everything else is distributed per pages.

But let us look a bit closer to this practice.

<img
src="http://img-fotki.yandex.ru/get/4137/14441195.26/0_711e6_bc435d6a_XL.jpg"
width="800" height="600" title="" alt="" border="0"/>

As you see in the picture, the `Header` block contains the `Search` block. This
design solution seems to be invariable within the whole site.

But not. The page providing advanced search form doesn't have this `Search` block
in the `Header`.

<img
src="http://img-fotki.yandex.ru/get/4115/14441195.26/0_711e7_a1df577a_XL.jpg"
width="800" height="600" title="" alt="" border="0"/>

So, should we include the `Search` block code into `common.css` file? Seems like
shouldn't. Well, should we copy-paste it for all the other pages? Again, no.

Moreover, this is just a simple example. In the real life the variety of
interface object combinations indeed can be huge. Usually it is very hard to
define the common stuff.<br/>
On the other hand, copy paste is even worse.

So, there should be a way out.

<img
src="http://img-fotki.yandex.ru/get/4122/14441195.26/0_711e5_77eb4431_XL.jpg"
width="800" height="491" title="" alt="" border="0"/>

What about turning these drawn sets of blocks into code?

You can store CSS code for every block separately, each in a file with a
corresponding name.

    blocks/
        header.css
        menu.css
        button.css
        tabbed-pane.css
        logo.css
        footer.css

So that, CSS for the `Menu` block is in the `menu.css` file, CSS for `Tabbed
Pane` block is the `tabbed-pane.css` file and so on.

Then, you can pack the CSS files for the pages with these blocks using an
`import` keyword.

````js
    @import url(blocks/header.css);
    @import url(blocks/menu.css);
    @import url(blocks/tabbed-pane.css);
    @import url(blocks/text.css);
    @import url(blocks/logo.css);
    @importurl(blocks/footer.css);
````

That enables you to take only what's necessary for a page.

As a result there is a block stack of our project, stored in a special folder.
And some pages that use these blocks.

Looks cool, but

<img
src="http://img-fotki.yandex.ru/get/6442/14441195.26/0_711e8_ec41e632_XL.jpg"
width="570" height="311" title="" alt="" border="0"/>

## Inside a Block
So, let's have a look what is inside our blocks.

<img
src="http://img-fotki.yandex.ru/get/5626/14441195.26/0_711e1_e0ab223a_XL.jpg"
width="645" height="46" title="" alt="" border="0"/>

The `Menu` block is going to be the first example.

````js
    <ul class="menu">
        <li><a href="/new">New titles</a></li>
        <li><a href="/soon">Coming soon</a></li>
        <li><a href="/best">Bestsellers</a></li>
        ...
    </ul>
````

It's represented by `ul` tag and has some `li` children for the items. Also, the
`ul` tag is marked with a CSS class, so that you can apply the rules to it.<br/>
But the question is "What to do with the items?"

The wide-spreaded solution is to write the CSS selector similar to the following.

````js
    .menu li
    {
        list-style: none;
        display: inline-block;
        padding: 0 0.5em;
    }
````

As you can see, cascade is used here. It seems to work right at first, because
all the reasons I listed against cascade are not for this situation. `li` tags
are always inside their `ul` parent. So, nothing bad should happen.

But even inside such a small interface piece like a menu item there can be a lot
of HTML markup in the future.

<img
src="http://img-fotki.yandex.ru/get/6426/14441195.26/0_711e9_8881d49a_-1-L.jpg"
width="500" height="101" title="" alt="" border="0"/>

Here you can see that a `Dropdown` block with its own list was placed into the
menu item and immediately got broken because of this CSS instruction affects it.<br/>
We got the long menu sausage instead of a nice dropdown.

<img
src="http://img-fotki.yandex.ru/get/4138/14441195.26/0_711ea_f392c569_L.jpg"
width="500" height="174" title="" alt="" border="0"/>

As you can see, except of avoiding cascade there appears even more specific
rule.
<blockquote>You should not use tag selectors.</blockquote>

The additional explanation why it is a bad practice to use tag selectors can be
easily found in the Internet.

<blockquote cite="http://mzl.la/UuwZql">The style system matches rules by
starting with the key selector, then moving to the left (looking for any
ancestors in the rule’s selector).</blockquote>

Further information can be found in [Davis Hyatt's
article](http://mzl.la/UuwZql), from Mozilla.

However we still need a solution to style menu items inside the `Menu` block.

##Element
First, let's clarify a definition and call the things inside a block — `elements`.

<img
src="http://img-fotki.yandex.ru/get/5641/14441195.27/0_711eb_80c1b241_L.jpg"
width="304" height="500" title="" alt="" border="0"/>

This is a clear picture of what elements are.<br/>
As you can see, elements are non-independent pieces of an interface. They make no
sense on their own, but are to be used within their parent block.

For example, the `Search` block has an `input` element and a `button` element.
<img
src="http://img-fotki.yandex.ru/get/5641/14441195.27/0_711ec_b4fa229f_L.jpg"
width="500" height="80" title="" alt="" border="0"/>

The `Tabbed Pane` block has 2 `tab` elements (and can have more if necessary)
and the `pane` element to keep its content.

<img
src="http://img-fotki.yandex.ru/get/6426/14441195.27/0_711ed_5b70323b_M.jpg"
width="300" height="264" title="" alt="" border="0"/>

Styling elements you should think about them as self-reliant entities.

<img
src="http://img-fotki.yandex.ru/get/5626/14441195.26/0_711e1_e0ab223a_XL.jpg"
width="645" height="46" title="" alt="" border="0"/>

To apply CSS rules to the elements you will need to mark them with classes.<br/>
In turn, to avoid cascade, it's necessary to prefix these classes with the block
name.

````js
    <ul class="menu">
        <li class="menu__item"><a href="/">Index</a></li>
        <li class="menu__item"><a href="/new">New</a></li>
        <li class="menu__item"><a href="/offer">Special offer</a></li>
        <li class="menu__item"><a href="/shipping">Shipping</a></li>
    </ul>
````

````js
    .menu__item
    {
        list-style: none;
        display: inline-block;
        padding: 0 0.5em;
    }
````

You can see here that CSS class for a menu item consists of block name, which is
`menu`, element name, which is `item` and a group of separation symbols.

We, at Yandex, use 2 underscores for separation. But that's optional. You can
choose another symbol or a group of symbols.

````js
    .block__element
    .block-element
    .block--element
````

If you don't like 2 underscores, maybe you'll be pleased with 3 ;-)

###Optional elements
So far so good, a block can be different from page to page.

<img
src="http://img-fotki.yandex.ru/get/5634/14441195.26/0_711db_81f5c441_L.jpg"
width="500" height="47" title="" alt="" border="0"/>

<img
src="http://img-fotki.yandex.ru/get/4127/14441195.27/0_711ef_421e1e8c_L.jpg"
width="500" height="88" title="" alt="" border="0"/>

<img
src="http://img-fotki.yandex.ru/get/5642/14441195.27/0_711ee_5370e90b_L.jpg"
width="500" height="177" title="" alt="" border="0"/>

The difference you can see in the slide is that it comprises different sets of
elements. So that, elements are optional. This means you should be able to take
CSS code for the elements we use.

Similar to blocks, elements can be stored separately.

````js
    blocks/

        search.css
        search__checkbox.css
        search__autocomplete.css

        tabbed-pane.css
        tabbed-pane__tab.css
        tabbed-pane__pane.css

        menu.css
        menu__item.css

        book.css
        book__title.css
        book__image.css
````

That enables you to take element code only if you want. If not, you just won't
write the import instruction linking it to your page.

##Modifier
Now to the last notion, a `modifier`.

<table>
    <tr>
        <td>
            <img
            src="http://img-fotki.yandex.ru/get/6439/14441195.26/0_711dc_2f5ffa46_M.jpg"
            width="300" height="259" title="" alt="" border="0"/>
        </td>
        <td>
            <img
            src="http://img-fotki.yandex.ru/get/5627/14441195.27/0_71207_4cfc639a_M.jpg"
            width="300" height="259" title="" alt="" border="0"/>
        </td>
        <td>
            <img
            src="http://img-fotki.yandex.ru/get/5632/14441195.27/0_71206_5fb7bc50_M.jpg"
            width="300" height="259" title="" alt="" border="0"/>
        </td>
    </tr>
</table>

Again, the same block sometimes can look slightly different. Here it is not
because of optional elements but because of its own design distinctions.

Of course, it is always possible to implement all these tabbed panes as diverse
blocks. But that would be copy paste which we we can't abide.

The way out is to equip a block with an additional CSS class to provide changes.
Such an addition is called a modifier.

````js
    <div class="tabbed-pane tabbed-pane_theme_blue">
        <ul>
            <li class="tabbed-pane__tab">Tab 1</li>
            <li class="tabbed-pane__tab">Tab 2</li>
        </ul>
        <div class="tabbed-pane__pane">
            ...
        </div>
    </div>
````

Remember, we were wise enough to use classes. So, we can add to a block DOM node
as many modifiers as we need.

````js
    <div class="tabbed-pane
                tabbed-pane_theme_blue
                tabbed-pane_direction_bottom">
        ...
    </div>

    <input class="button
                  button_theme_black
                  button_size_l" ... />
````

You can use different modifiers to change different properties. For example, the
`theme` modifier can change block's background color and the `size` modifier
fixes all the dimensions of the block.

**block-name_mod-name_mod-val**

A modifier is a key-value combination, it consists of modifier name, modifier
value and is prefixed with block name.

````js
    tabbed-pane_theme_blue
    tabbed-pane_theme_white

    tabbed-pane_size_s
    tabbed-pane_size_l

    button_size_s
    button_size_l
````

Indeed, modifiers are optional. You almost never will need to link to a page all
the block modifiers since blocks are rarely used in all their modifications
within one page.<br/>
So, similar to optional elements, you can detach their CSS code into their own
files.

````js
    blocks/
        tabbed-pane.css
        tabbed-pane__tab.css
        tabbed-pane__pane.css
        tabbed-pane_theme_blue.css
        tabbed-pane_theme_black.css
        tabbed-pane_direction_bottom.css
````

When building a page CSS file of blocks, you can take only those modifiers which
it needs.

### Modifying elements
Elements can be modified in the same way.

<img src="http://img-fotki.yandex.ru/get/4120/14441195.27/0_71214_cff3fb1_M.jpg"
width="300" height="259" title="" alt="" border="0"/>

The famous examples of modified elements are active tabs and menu items. They
look a bit different from their friends.

To deliver design changes to an active tab, you need to add a modifier to an
element. Similar to what we was doing for blocks.

````js
    <div class="tabbed-pane">
        <span class="
            tabbed-pane__tab
            tabbed-pane__tab_state_current">...</span>
    </div>
````

### Block Modifier DOES Affect Element
Now I'm going to show you where cascade is posible.

<img
src="http://img-fotki.yandex.ru/get/5627/14441195.27/0_71207_4cfc639a_M.jpg"
width="300" height="259" title="" alt="" border="0"/>

You can see a modified block here. It has a blue theme. Of course, when having a
blue theme the block should guarantee that its elements will work correctly. In
this situation you allow the block affect its elements.

````js
    .tabbed-pane_theme_blue
    .tabbed-pane__tab
    {
       background-color: #9CF;
    }
````

Here cascade is possible because the tabs' appearance DOES depend on block's
modifier.

*************
And just to wrap up, to make your blocks independent, be sure that

 * a block has its "name"
   - no "id" but "classname" selectors
 * avoid cascade
 * no "tag" selectors

##Block File Structure
All the previously shown examples used flat variant when CSS files for blocks,
elements and modifiers are placed into one folder `blocks`.

````js
    blocks/

        tabbed-pane.css
        tabbed-pane__tab.css
        tabbed-pane__pane.css
        tabbed-pane_theme_blue.css
        tabbed-pane_theme_black.css
        tabbed-pane_size_l.css
        tabbed-pane_size_s.css

        menu.css
        menu__item.css
        menu_size_l.css
        menu_size_s.css

        logo.css

        search.css
        search__checkbox.css
        search__autocomplete.css
````

That works for not very large projects and not very complicated blocks.

If you expect many blocks with elements and modifiers, it's good to contain all
the files related to a block in a block folder.

````js
    blocks/

        tabbed-pane/
            tabbed-pane.css
            tabbed-pane__tab.css
            tabbed-pane__pane.css
            tabbed-pane_theme_blue.css
            tabbed-pane_theme_black.css
            tabbed-pane_size_l.css
            tabbed-pane_size_s.css

        logo/
            logo.css

        menu/
            menu.css
            menu__item.css
            menu_size_l.css
            menu_size_s.css

        search/
            search.css
            search__checkbox.css
            search__autocomplete.css
````

Less mess, and also it's much easier to copy block files from project to project.

We, at Yandex, use the most detailed structure with internal folders for
elements and modifiers.

````js
    blocks/

        tabbed-pane/
            __tab/
                _state/
                    tabbed-pane__tab_state_current.css
                tabbed-pane__tab.css
            __pane/
                tabbed-pane__pane.css
            _theme/
                tabbed-pane_theme_blue.css
                tabbed-pane_theme_black.css
            tabbed-pane.css
````

It is not obligatory, but just works for our case.

Now, before proceeding to the next section, let us sum up.

 * First, any interface is a set of blocks, which can be combined in different
ways, can be placed one into another, can change their parent block. And nothing
bad should happen since the blocks are independent.
 * Also, all the nested tags in a block are elements.
 * And finally, both blocks and elements can be modified.

## BEM

<img src="http://img-fotki.yandex.ru/get/9558/221798411.0/0_b9ee0_87aa2593_M.png"/>

Now, that the three terms are introduced, I am happy to present you BEM methodology.
You've just learnt its parts related to independent CSS blocks.

Furthermore, BEM brings some other interesting solutions.

 * First, BEM is a methodology. It's a way of thinking when developing. It provides
us with data domain applicable for all the technologies.
 * Besides, BEM is a toolkit automating your work.
 * Finally, BEM is a range of reusable code libraries, making you to develop
 * faster and better.

Now let's have a look at all these opportunities in a little more detail.

### CSS for IE
First, I'd like to show how we deal with our bosom friend, the IE browser.

It is possible to link an additional CSS file to a page, especially for IE.
Using conditional comments you make other browsers ignore this file. So that,
there we can write fixes for IE only.

````js
    <html>
        <head>
            <!--[if gt IE 7]><!-->
                <link rel="stylesheet" href="index.css">
            <!--<![endif]-->
            <!--[if lt IE 8]>
                <link rel=stylesheet href="index.ie.css">
            <![endif]-->
        </head>
        ...
````

Inside the `ie.css` file you import the general CSS file for the page.

````js
    @import url(index.css);
    @import url(blocks/menu/menu.ie.css);
    @import url(blocks/button/button.ie.css);
    @import url(blocks/footer/footer.ie.css);
````

Then, you can redefine CSS that doesn't work correctly for every piece of
interface. It's logical to do it separately for each block.

Blocks that need special IE hacks are equipped with additional `ie.css` files.
If all the block files are under the block folder, we can just place one more
file in it.

````js
    blocks/

        tabbed-pane/
            tabbed-pane.css
            tabbed-pane.ie.css
            ...

        menu/
            menu.css
            menu.ie.css
````

The same works for elements and modifiers.

````js
    blocks/

        tabbed-pane/
            tabbed-pane.css
            tabbed-pane.ie.css
            tabbed-pane__item.css
            tabbed-pane__item.ie.css
            tabbed-pane_theme_blue.css
            tabbed-pane_theme_blue.ie.css with
````

So, a block folder encapsulates all the CSS needed. Using the project block
stack we can assemble CSS files for pages, both the general one and for IE.

## JavaScript
HTML/CSS dummy is not a functional web application yet. But implementing some
JavaScript logic we can paint it with colours.

We should code that the `Tabbed Pane` block reacts on leftclick.

<img src="http://img-fotki.yandex.ru/get/4120/14441195.27/0_71214_cff3fb1_M.jpg"
width="300" height="259" title="" alt="" border="0"/>

The `Dropdown` block functionality is that it is hidden when a page is just
loaded. But if a user makes clicks with the left mouse button on its switcher,
the block shows.

The `Dropdown` also can be smart enough to calculate its direction according to its
place on a page. In the picture the second `Dropdown` block opens up since it's
too close to the bottom.

<div style="width: 800px; height: 500px; border: #000 1px solid; position: relative;">
<img
src="http://img-fotki.yandex.ru/get/4116/14441195.27/0_71220_33b9df76_M.jpg"
width="300" height="271" title="" alt="" border="0" style="position: absolute;
top: 20px; left: 20px"/>
<img
src="http://img-fotki.yandex.ru/get/5641/14441195.27/0_71225_daf55cf9_M.jpg"
width="300" height="271" title="" alt="" border="0" style="position: absolute;
bottom: 20px; right: 20px"/>
</div>

This needs JavaScript logic which you have to provide for a page. Pages are
usually supplied with JavaScript logic by linking a `.js` file to it.

### Sets of Block in JavaScript
Again, for small projects all the magic can fit comfortably into a single one
JavaScript file.

````js
    <!DOCTYPE html>
    <html>
        <head>
            <link rel=stylesheet href="index.css"/>
            <script type="text/javascript" src="all.js"></script>
        </head>
        ...
````

But usually we have different functionality for different pages. So that similar
to CSS we a have separate JS file for every page.

````js
    <!DOCTYPE html>
    <html>
        <head>
            <link rel=stylesheet href="index.css"/>
            <script type="text/javascript" src="index.js"></script>
        </head>
        ...
````

Again, block set of a page can be changed and you need to ensure that you link
corresponding JavaScript.

Similar to CSS for blocks, you can detach a separate js file for every block and
store it under the block folder.

````js
    blocks/
        menu/
            menu.css
            menu.js
        dropdown/
            dropdown.css
            dropdown.js
        tabbed-pane/
            tabbed-pane.css
            tabbed-pane.js
````

Inside the `menu.js` file there is a piece of logic related to the `Menu`. The
same for the `Tabbed Pane`.

Using these pieces of logic you can build JavaScript file for a page similar to
what you've done with CSS before.

````js
    borschik:include:blocks/menu/menu.js
    borschik:include:blocks/tabbed-pane/tabbed-pane.js
    ...
````

Each line in the file refers to a particular block.

##CSS and JavaScript flattening with borschik

Don't be confused with an unfamiliar `include` instruction. Of course, we are
not going to supply a browser with such a strange file but flatten each include.

````js
    /* Menu block begins */
    (function($){
        $('.menu__item').on('click', function(e) {
            $(this).toggleClass('menu__item_state_current');
        });
    })(jQuery)
````

Here you can see here that including line for the menu turned into the content
of the file.

You can do such inlining magic automatically with the tool called
[borschik](https://github.com/veged/borschik).

Besides flattening JavaScript, it does the same with CSS files of imports.

You can work with imports when developing, but for production it's better to
decrease the amount of CSS files. Each CSS `@import` causes an HTTP request making
a browser to load many files.

````js
    @import url(blocks/header.css);
    @import url(blocks/menu.css);
    ...
````

Using `borschik` to prepare a project for production deployment you can turn all
the imports into relevant CSS content.

````js
    .header {
        ...
    }
    .menu {
        ...
    }
````

This is very important that `borschik` works correctly with relative paths in CSS.
So, it's not just stupid inlining.

**blocks/menu/menu.css**

````js
    .menu {

        background: url(menu__bg.png);

    }
````

**pages/index.css**

````js
    @import url(blocks/menu/menu.css);
````

**pages/_index.css**

````js
    .menu {

        background: url(../blocks/menu/menu__bg.png);

    }
````

## Building Page Files

The page which a browser gets is not one piece of code. As you've already seen,
it is a bunch of at least 4 files, which are HTML, 2 CSS files and JavaScript.

When the page is under development or is maintained, set of its blocks can
change. If a block was included into the set or removed from it, we are to
change all the files.<br/>
Actually it is a monkey job that definitely can be automated.

The images shows us what are the blocks on the page and which ones contain others.

<img
src="http://img-fotki.yandex.ru/get/6429/14441195.26/0_711d6_9a3f328a_XL.jpg"
width="800" height="558" title="" alt="" border="0"/>

We got this information with a visual language the picture provides. But the
same can be described in text. Any nesting format works for it.

````js
    <b:page>
        <b:head>
            <b:logo/>
            <b:search>
                <e:input/>
                <e:button/>
            </b-search>
            <b:menu>
                <e:item>Home</e:item>
                <e:item>Contacts</e:item>
                ...
````

In Yandex it used to use XML, but now it's JSON.

````js
    {
        block: 'page',
        content: [
            {
                block: head,
                content: [
                    { block: 'logo' },
                    {
                        block: 'search',
                        ...
````

This page declaration is called `BEM tree` by analogy to DOM tree.

The format describes what are the blocks on a page, preserves their nesting
structure, elements and modifiers which blocks are using.<br/>
Such a format can be parsed with a special tools and turned into the CSS and
JavaScript files automatically.

The `BEM tree` can be turned into all the necessary static files. And if you need
changes, you can fix `BEM tree`, run transformation process again and get updated
files.

These transformations are possible with a toolkit called [BEM
tools](http://bem.info/tools/bem/). It's open sourced and hosted on GitHub,
where you can find its installing instructions and a full description.

It already supports many fashionable technologies you might want to use, such as
SASS, LESS, CoffeeScript. You are free to write code for your blocks with them
and then build it into pages.

````js
    blocks/

        menu/
            menu.sass
            menu.less
            menu.coffee

        tabbed-pane/
            tabbed-pane.sass
            tabbed-pane.coffee

    pages/

        index.html
        index.sass -> index.css
        index.coffee -> index.js
````

Also it allows extensions. So, if your project needs a specific technology, you
can a bit tune building instructions to teach the tools how to work with it.

Moreover, there is no strict requirement to a naming convention and a file
structure of your block stack. You are free to intent your own and configure
tools to take block code from the right folders or files.

## BEM is Multi-lingual

I'd like to highlight that BEM methodology is multi technological. You can
divide any technology into blocks and then build pages.

For example, equip blocks with their Markdown description and build
documentation site for your project block stack automatically.

````js
    blocks/

        menu/
            tabbed-pane.css
            tabbed-pane.js
            tabbed-pane.md
````

This is what we've done at Yandex for our internal block library.

Also, you can produce HTML output for blocks with templates. And templates are a
block technology as well.

````js
    blocks/

        menu/
            tabbed-pane.css
            tabbed-pane.js
            tabbed-pane.md
            tabbed-pane.xsl
````

For our internal library we also used to use XSL asa templating solution. But
not long ago we struggled with XSL for speed and came up with our own
JavaScript-based template engine, called `BEMHTML`.

````js
    blocks/

        menu/
            tabbed-pane.css
            tabbed-pane.js
            tabbed-pane.md
            tabbed-pane.bemhtml
````

When that happend, we were just to add one more technology into already existing
blocks. That was very easy.

## BEMHTML

BTW, `BEMHML` is a pseudo language which can be compiled into ugly but efficient
JavaScript.

We, at Yandex, are fans of declarative programming, and borrowed from XSL all
it's declarative feature and implemented it with JavaScript speed.<br/>
The result can be run on both client or server size. Sometimes we produce HTML
output on server under Node.js and sometimes directly in a browser.

If you are insriped, you can check out [BEMHTML
reference](https://raw.github.com/bem/bem-bl/0.3/blocks-common/i-bem/__html/i-bem__html.wiki).<br/>
However, the document is in Russian only, so you might need to use
http://translate.yandex.com/. Official document's translation is still in
progress.

## Libraries
BEM methodology enables you to create reusable code libraries. That, in turn,
allows to develop faster and better.

<img
src="http://img-fotki.yandex.ru/get/5642/14441195.27/0_71226_17dfd887_XL.jpg"
width="800" height="481" title="" alt="" border="0"/>

We, here at Yandex, have a bunch of our in-house BEM-based libraries helping us
to build a new Yandex-style web service much faster than from the scratch and
making maintaining process easier.

When we started to open source our magic stuff, a small part of the internal
library was turned into [bem-bl](http://bem.github.com/bem-bl/index.en.html).<br/>
`bem-bl` stands for `BEM block library` and provides some common blocks for
building web interfaces.

All the available blocks are represented at the [bem-bl documentation web
site](http://bem.github.com/bem-bl/index.en.html).

Each block is represented by a documentation page where you can find its
description and some examples. Significant that all these examples are alive.
They are not just screenshots of interface pieces, but iframes showing real
pages with blocks.<br/>
Using the block page you can try how the block works in your browser and then
proceed to the code in order to see how to use it.

Also, you can explore block code since they all are in the [GitHub
repository](https://github.com/bem/bem-bl).

Such exploration helps when you need to create your own block library.

### Examples of BEM Libraries

Here there are some libraries implemented with BEM:

* [Bootsrap BL](https://github.com/tadatuta/bootstrap-bl)<br/>
The famous bootstrap component stack structured like a BEM library so that BEM
tools can work with it.
* [jQueryUI BL](https://github.com/narqo/jqueryui-bl)<br/>
A set of jQuery-UI components turned into a block library. If you are used to
jQuery-UI, you can still use it but with the nice BEM stack.
* [Modernizir BL](https://github.com/narqo/modernizr-bl)<br/>
a small repository that represents the Modernizr library, which many of you I'm
sure are familiar with, with BEM terms.

## How to Try?
There is a project skeleton hosted on GitHub,
[bem-project-stub](https://github.com/bem/project-stub).<br/>
This is a repository that can be a base for your own project using `bem-bl`,
other necessary libraries and, of course, your own blocks. It's README gives all
the explanations.<br/>
So, this is a cool opportunity to touch BEM stack.

### BEM Satellite Development Tools

Besides, BEM team also produces many very nice development tools.

[borschik](https://github.com/veged/borschik) has already been introduced.

Also, you might be interested in [CSSO](http://bem.info/tools/csso/), which is
CSS optimizer unlike others. It does usual minification, but what is more,
preforms structural optimizations, which no one of existing optimizers can do.

**before**

````js
    .test1 {
        border: none;
        background-color: red;
    }

    .test2 {
        border: none
    }

    .test3 {
        background-color: #FF000;
    }
````

**after**

````js
    .test1, .test2 {
        border: none
    }

    .test1, .test3 {
        background-color: #F00;
    }
````

These two small pieces of code give a taste how smart CSSO is. Indeed the full
list of the transformations it makes on CSS cannot be listed because of it's
really huge. But you can find them all with the link http://bem.info/tools/csso/.

One more optimizer, called [SVGO](https://github.com/svg/svgo), cleans SVG files
from many useless information which different graphic editors leave inside.

### Upshort

So, BEM is

 - A methodology about how to code web projects;
 - A toolkit to automate development and optimize production code, and
 - Libraries helping to develop faster and better.

Please address your questions to the comminuty asking in [BEM Facebook
group](http://www.facebook.com/groups/209713935765634/) or in Twitter
[@bem_tw](https://twitter.com/bem_tw).

<!--(Begin) Article author block
<div class="article-author">
    <div class="article-author__photo">
        <img class="article-author__pictures" src="http://img-fotki.yandex.ru/get/5625/51437929.0/0_bf4ad_363d4605_S.png" alt="Photo Varvara Stepanova">
    </div>
    <div class="article-author__info">
        <div class="article-author__row">
             <span class="article-author__name">Varvara Stepanova,
        </div>
        <div class="article-author__row">
            Front-end engineer working for Yandex in Moscow since 2008& Lead Developer of the UI Framework Team which provides HTML, CSS and Javascript components used to build over 100 different Yandex services. Participates in the BEM project which is open-sourcing technologies behind Yandex UI framework. When she is not coding, she is interested in travel and new cities. Dreams of visiting every country in the world.        </div>
        <div class="article-author__row">
             <a class="article-author__social-icon b-link" target="_blank" href="http://twitter.com/toivonens">twitter.com/toivonens</a>
        </div>
        <div class="article-author__row">
             <a class="article-author__social-icon b-link" target="_blank" href="http://github.com/toivonen">github.com/toivonen</a>
        </div>
    </div>
</div>
(End) Article author block-->

This information is also available as a talk "[BEM. What you can borrow from Yandex frontend dev](https://vimeo.com/53219242)" given at [WebConf Riga](http://webconf.lv/) at 10th November 2012.
