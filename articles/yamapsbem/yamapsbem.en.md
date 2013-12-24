# Yandex.Maps API and BEM

One of the most frequent use cases for the Yandex.Maps API is to create a menu to show different types of PoI (Points of Interest - geoobject collections). Such a menu helps an end user to choose which types of POI to see at any given time, rather than cluttering the map with everything. Here is an [example](http://dimik.github.com/ymaps/examples/group-menu/menu03.html). But let’s remake this example using BEM.

## Firsts steps
The BEM developers have already created a project-stub for easy development start.

````bash
git clone https://github.com/bem/project-stub.git shopsList
cd shopsList
npm install
````

Now we can use the project locally. Let’s test that everything works properly. Open the folder and run make, wait some time for project to start and than browse to [localhost:8080/desktop.bundles/index/index.html](http://localhost:8080/desktop.bundles/index/index.html). You’ll see something like this:

<img src="http://zloylos.me/other/imgs/ymapsbem/project_stub.png" alt="Defaut page with dummy values for title, header/main/footer content" border="0"/>

Now we can proceed to the next step.

## General description of the project

We need to create a block «map» for the map itself, block «sidebar» — right or left column for the block «menu» to show the list of organizations by groups. According to BEM methodology the blocks shouldn’t «know» about each other, so we need to create one more intermediate block, to accept menu clicks and interact with a map. For example, «i-geo-controller».

## Page description, bemjson coding

As we thought about the page structure and main blocks from the very beginning, now we just write it in json-style code. Of course, you can see the sourcecode for better understanding. The page structure will be:

````
    b-page
    == container
    ==== map
    ==== sidebar
    ====== menu
    ======== items
````

<img src="http://zloylos.me/other/imgs/ymapsbem/index_bemjson.png" alt="[Visual schematic of the above page structure]">

￼
And in bemjson:
````js
{
    block: 'b-page',
    content: [
        {
            block: 'container',
            content: [
                {
                    block: 'map'
                },
                {
                    block: 'sidebar',
                    content: [
                        {
                            block: 'menu',
                            content [ /* menu items */ ]
                        }
                    ]
                }
            ]
        }
    ]
}
````

Look at the details: [desktop.bundles/index/index.bemjson.js](https://github.com/zloylos/ymaps-and-bem/blob/master/desktop.bundles/index-en/index-en.bemjson.js).

## Map block

Let’s start from the main block — «map». First we have to enable the API with all the necessary parameters. We could create a new block «i-API», but it is better to use one block and modifiers. For the block «map» we’ll create a modifier «api» with value «ymaps». In our example we’ll use the [JavaScript maps API](http://api.yandex.ru/maps/doc/jsapi/), but we could also use the [Static maps API](http://api.yandex.ru/maps/doc/staticapi/) with modifiers.

To make our work with the map easier, we have to think about the interface for adding placemarks. We should add a field «geoObjects», where we’ll put [placemarks or placemark collections](http://api.yandex.com/maps/doc/jsapi/2.x/dg/concepts/geoobjects.xml). The following interface is for the placemark:

````js
{
    coords: [],
    properties: {},
    options: {}
}
````

And for placemark collection:
````js
{
    collection: true,
    properties: {},
    options: {},
    data: []
}
````
This code can be used in probably nearly all use-cases.

## Block «menu»

We should make a two-level menu. Create a block «menu» to catch the clicks on the groups and elements. We need the following elements:
— item — menu item;
— content — container for the items;
— title — group title.

Than we build a hierarchy by using these menu blocks together.

For example, this is the most simple menu in bemjson:
````js
{
    block: 'menu',
    content: [
        {
            elem: 'title',
            content: 'menu title'
        },
        {
            elem: 'content',
            content: [
                {
                    elem: 'item',
                    content: 'menu-item-1'
                },
                {
                    elem: 'item',
                    content: 'menu-item-2'
                }
            ]
        }
    ]
}
````

## Block «i-geo-controller»

This is a block-controller which subscribes to the events of the menu-blocks «menuItemClick» and «menuGroupClick», and reacts to them by taking some actions on the map.

In our example this block has the following tasks:
— If there is a click on the placemark, a controller should center the map on this placemark and open the balloon;
— If there is a click on the group, a controller should show or hide this group.

Besides interacting with the map properly the block-controller has to know if the map is ready for manipulating objects. So our block «map» will fire the event «map-inited» and «i-geo-controller» will listen for this event and remember the link to the map.
￼

<img src="http://zloylos.me/other/imgs/ymapsbem/blocks_scheme-en.png" alt="[Visual scheme of above event flow]">


For example [http://zloylos.github.io/ymapsbem/index-en.html](http://zloylos.github.io/ymapsbem/index-en.html).

<img src="http://zloylos.me/other/imgs/ymapsbem/ready-en.png" alt="Example">

It may seem with BEM methodology this simplistic example is more complicated than it needs to be, but we get structured and easy-to-support code. Moreover we can easily scale this code.

Thanks to [Alexander Tarmolov](http://twitter.com/tarmolov) for advice and support.

<!--(Begin) Article author block
<div class="article-author">
    <div class="article-author__photo">
        <img class="article-author__pictures" src="http://zloylos.me/other/imgs/ymapsbem/denis.png" alt="Photo Denis Khananein">
    </div>
    <div class="article-author__info">
        <div class="article-author__row">
             <span class="article-author__name">Denis Khananein
        </div>
        <div class="article-author__row">
            Yandex Maps API Frontend Developer
        </div>
        <div class="article-author__row">
             <a class="article-author__social-icon b-link" target="_blank" href="http://twitter.com/kandasoft">twitter.com/kandasoft</a>
        </div>
        <div class="article-author__row">
             <a class="article-author__social-icon b-link" target="_blank" href="http://github.com/zloylos">github.com/zloylos</a>
        </div>
    </div>
</div>
(End) Article author block-->
