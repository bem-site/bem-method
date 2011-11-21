// BEMTECH_locales_techs="`pwd`/lib/bem/techs/full.wiki.js" BEMTECH_locales_locales="ru en" bem create block -T lib/bem/techs/locales.js -l blocks-desktop/ b-link

var myPath = require('bem/lib/path'),
    fs = require('fs'),
    env = process.env,
    bemUtil = require('bem/lib/util'),
    envLocales = env.BEMTECH_locales_locales,
    locales = envLocales ? envLocales.split(' ') : ['ru'];

exports.techModule = module;

exports.bemCreate = function(prefix, vars) {
    var name = vars.BlockName,
        context = this.context,
        prefix = context.levels[0].get('block', [name]),
        techs = env.BEMTECH_locales_techs.split(':');

    bemUtil.mkdir(myPath.dirname(prefix));

    locales.forEach(function(locale) {
        var localePrefix = prefix + '.' + locale;
        techs.forEach(function(t) {
            context.getTech('', t).create(
                localePrefix,
                { BlockName: name, Prefix: localePrefix, Locale: locale });
        });
    });

    return this;
};

exports.bemBuild= function(prefixes, outputDir, outputName) {
    var _this = this,
        context = this.context,
        filterExists = function(prefixes) {
            return prefixes
        };

    locales.forEach(function(locale){

        var localePrefixes = [],
            localeOutputName = outputName + '.' + locale;

        prefixes.forEach(function(prefix, i){
            localePrefixes[i] = prefix + '.' + locale;
        });

        var tech = context.getTech('', env.BEMTECH_locales_tech);

        tech.build(
            localePrefixes,
            outputDir, localeOutputName);
    });

    return this;
};

