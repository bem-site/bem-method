# Learning to Love BEM

_Permission to publish granted. Originally posted at Mono company's [website](http://mono.company/journal/frontend/learning-to-love-bem/)._

I have to admit: when I first heard about BEM, I thought it was a bad idea. Why make your CSS naming so complicated? 
Surely you can get by with simple class names like .form-group or .accordion. Why do you have to get all crazy with classes 
like `.accordion__child` and `.accordion__child--highlighted`?

In a project in January, I worked with [Jelle](http://jelledesramaults.be/) who was using BEM-style syntax in his code. At first I was hesitant but since 
he was the lead HTML/CSS guy on the project I let him do his thing.

After learning more about BEM I am convinced: the method really has its merits. It is mostly useful in the context of a large scale web application with a lot of components.

Think about an admin interface with a lot of widgets and screens with different states. Think about software that has to be stable, with many people working on different CSS components. Here, BEM makes a lot of sense.

The logic for BEM (Block – Element – Modifier) is:

*   There is a block e.g. `.my-element`
*   There is a element e.g. `.my-element__sub-element` (the 2 underscores denote sub elements)
*   There might be a modifier e.g. `.my-element__sub-elelement—highlighted` (the 2 hyphens denote a modifier state).

A longer explanation is [here](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

This has some advantages:

*   Because of the above logic, it is immediately apparent “what” a CSS class means
*   Every element is namespaced, making find and replace actions across the whole project more reliable
*   This also makes it easier to know which CSS you can touch
*   It’s harder for classes to conflict with other classes
*   Which HTML tag you use is more or less independent from the CSS you use (provided you use a reset at the beginning of your 
stylesheet)
*   There is a performance improvement. Because CSS selectors are read from right to left, and BEM relies mostly on single 
classes (not SCSS nesting) it is faster
*   There are fewer specificity problems because you typically only write classes without too much nesting
*   Components are highly portable from project to project. In practice this means an improvement in code quality and 
development speed.

Of course, BEM has some disadvantages as well:

*   Class names can become a bit long and ugly (I don’t care because now they contain some “logic” which can be used towards 
our advantage e.g. linting)
*   The HTML can have a lot of classes which sometimes do very little (the HTML can start to look ugly as well)
*   Frameworks like Bootstrap are not BEM based so combining these with BEM can lead to inconsistency in class names, which 
might lead to confusion

For me, for small sites maintained by a few people or a single person, it’s unnecessary to use BEM, and I would rather use 
[normalize.css](http://necolas.github.io/normalize.css/) and a set of easy to type class names.

For large software projects (the type of application CSS we usually write), BEM is the way to go. It costs a bit of effort 
in the beginning but saves a lot of time in the long run. Onwards!
