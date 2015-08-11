# Release: bem-tools v0.10.0

Back in December 2014 we [announced a freeze](https://en.bem.info/blog/bem-tools-status-freeze/) of build with a help of 
`bem make` command of `bem-tools`. However, since that time we have released minor updates with some improvements.

As we have written already we decided to do so because we switched to [build with ENB](https://en.bem.info/tools/bem/enb-bem/).

Today we can confirm that ENB supports all options of `bem make` and even more. Besides, it works faster and is being developed 
by leaps and bounds (soon you will be expecting major releases of the most popular packages).

## What's inside bem-tools v0.10.0?

[Inside](https://github.com/bem/bem-tools/releases/tag/v0.10.0) we have done a fallback that in absence of `.bem/make.js` will 
search for `ENB` config and will launch it under the hood. In other words launch of `bem make` out of `bem-tools` runs `enb make`, 
and launch of `bem server` runs `enb server`. 

Such a way allows us to preserve its usual API and an option to use the rest of the commands of `bem-tools` (for instance, 
`bem create`) when users need them. 

Also in the future it will give us an opportunity to add other useful modules to work with files according to BEM methodology in 
the common wrapper.

We continue to suggest you to switch to `ENB` build if you still haven't done it yet.

The simplest way to do so is to check the config sample within the [project-stub](https://github.com/bem/project-stub/blob/bem-core/.enb/make.js) 
and if you have diffuculties, ask on our [forum](https://en.bem.info/forum/).

**Bon appetit and Stay BEMed!**
