# bem-core@v3 development plans

If you are subscribed to our repositories, you already know that we defined [a preliminary scope](https://github.com/bem/bem-core/issues?milestone=6&state=open) of tasks that would be developed in bem-core v3.

The major focus we will have for i-bem.js API improvement. 

How we plan to do this?

First of all, we plan fairly [divide i-bem and i-bem__dom](https://github.com/bem/bem-core/issues/413) into 2 different block-modules. Thsi will increase the accuracy of the API, in particular its methods-helpers will be divided from JS-classes.

Second of all, we plan to support on core level an ability to work with blocks' elements as with full value i-bem-objects instead of treating them as jQuery-collections. Currently similar functionality is available separately as `i-bem` and `i-bem__dom` modifiers `elem-instances`. This will allow us to escape odds with simultaneous existance  of elements as jQuery-objects and BEM-instances, and create more comfortable to use API (instead of `this.setMod(this.elem('e1'), 'm1', 'v1')` we will have `this.elem('e1').setMod('m1', 'v1')`). This will also allow to escape the difficult polymorphism of a number of methods inside the core.

Third of all, we will improve the realization and commit to the core blocks and elements [collection's support](https://github.com/bem/bem-core/issues/582).

Forth of all, ym module system integration will become more tight — block search methods (for instance, `.findBlockInside('b1')`) instead of strings will receive concrete classes of blocks (not clear «magic» will disappear and there will be less of potential mistakes).

Fifth of all, we will think of how to [unify working with events, especially with live-BEM-events](https://github.com/bem/bem-core/issues/394).

Besides, we will [realize i18n support](https://github.com/bem/bem-core/issues/576) in much simple way than in bem-bl, [will update bem-xjst version](https://github.com/bem/bem-core/issues/491) that allows us not wrapping in additional guards from cycling apply* constructions in BEMHTML and BEMTREE and will make a number of smaller changes.

While we plan development process we would like to very much ask about your feedback on whether will such changes easen the work with library or we need to check something else?

If you have and would like to propose tasks for v3 — please, do [create an issue](https://github.com/bem/bem-core/issues/new), we will be more than happy!
