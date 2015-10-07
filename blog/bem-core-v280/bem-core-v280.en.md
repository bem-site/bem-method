# Release: bem-core 2.8.0

Hi!

We are happy to announce our next minor release of bem-core library — v2.8.0 — that contains of important and long-awaited changes.

## Major changes

The biggest and most significant change is the release of [i18n block](https://en.bem.info/libs/bem-core/v2.8.0/desktop/i18n/) for 
internalisation (translation) of your interfaces ([#1074](https://github.com/bem/bem-core/issues/1074)). This block has an universal 
API to work with JS and templates and could be used both in browsers and in node.js environment.

Internationalisation-powered build-related documentation could be found in a build package called [enb-bem-i18n](https://en.bem.info/tools/bem/enb-bem-i18n/readme/) (Russian only, translation is coming).

Besides, jQuery is loaded via https by default ([#1202](https://github.com/bem/bem-core/issues/1202)) and there 
is no bemhtml-compat dependancy ([#1186](https://github.com/bem/bem-core/issues/1186)) any longer — we deleted it. 
If you use `bem-tools`, please, proceed with `npm i bemhtml-compat --save` to install the package on a project level.

## Bug fixes and other changes

Following bug fixes and changes we released as well: 
* Bug in `loader_type_js` that allowed undefined handler calls ([#1159](https://github.com/bem/bem-core/pull/1159)) fixed.
* BH bundles in dist now mimic to BEMHTML ([#1210](https://github.com/bem/bem-core/issues/1210)).
* `bem create` templates for `bemhtml`, `bemtree`, `vanilla.js` and `browser.js` ([#1183](https://github.com/bem/bem-core/issues/1183)) were improved.
* vow updated up to 0.4.10 ([#1056](https://github.com/bem/bem-core/issues/1056)).

The complete history of other changes could be found in bem-core library releases' [changelog](https://en.bem.info/libs/bem-core/v2.8.0/changelog/#280).

Pleasant migrating and **Stay BEMed**!
