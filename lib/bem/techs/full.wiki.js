var fs = require('fs'),
    path = require('path'),
    Template = require('bem/lib/template');

exports.techModule = module;

exports.newFileContent = function(vars) {

    var _this = this,
        readFileIfExists = function(fileName) {

        return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

        },
        entityWiki = function(prefix, head, json) {

        head = head || 1;

        var fileWiki = prefix + '.wiki',
            fileTitle = prefix + '.title.txt',
            _res = '',
            title = readFileIfExists(fileTitle).trim();

        _res += title? (new Array(head + 2)).join('=') + title + '\n' : ''; // TODO: как-то сократить через &&

        _res += json? [
                '##',
                JSON.stringify(json),
                '##',
                '\n\n'
            ].join('') : '';

        _res += readFileIfExists(fileWiki);

        return _res;

        },
        level = this.getContext().getLevel(),
        block = level.getBlockByIntrospection(vars.BlockName),
        introspection = function() {
            var _res = '';
            block.mods  &&
                (_res += [
                        '===',
                        {ru:'Модификаторы блока',en:'Block Modificators'}[vars.Locale],
                        '\n'
                        ].join('')) &&
                block.mods.forEach(function(mod){
                    _res += ' * ' + mod.name + '\n';
                    mod.vals && mod.vals.forEach(function(modVal){
                        _res += '   * ' + modVal.name + '\n';
                    });
                }) &&
                (_res += '\n');

                block.elems &&
                (_res += [
                        '===',
                        {ru:'Элементы блока',en:'Block Elements'}[vars.Locale],
                        '\n'
                        ].join('')) &&
                block.elems.forEach(function(elem){
                    _res += ' * ' + elem.name + '\n';
                    elem.mods &&
                    (_res += [
                            '   * ',
                            {ru:'Модификаторы элемента',en:'Element Modificators'}[vars.Locale],
                            '\n\n'
                            ].join('')) &&
                    elem.mods && elem.mods.forEach(function(mod){
                        _res += '     * ' + elem.name + '\n';
                    }) &&
                    (_res += '\n');
                }) &&
                (_res += '\n');

            return _res;
        },

        levelPath = this.context.levels[0].path.replace('.bem', ''),
        wiki;

    wiki = entityWiki(vars.Prefix, 1, { block: vars.BlockName});

    wiki += introspection();

    block.mods &&
        block.mods.forEach(function(mod){

            wiki += entityWiki(levelPath + level['get-block-mod'](vars.BlockName, mod.name) + '.' + vars.Locale, 2);

            mod.vals && mod.vals.forEach(function(modVal){

                var json = { mods : {} };
                json.mods[mod.name] = modVal.name; // TODO: как сделать это в одну строку?

                wiki += entityWiki(levelPath + level['get-block-mod-val'](vars.BlockName, mod.name, modVal.name) + '.' + vars.Locale, 3, json);

            })

        });

        block.elems &&
        block.elems.forEach(function(elem){

            wiki += entityWiki(levelPath + level['get-elem'](vars.BlockName, elem.name) + '.' + vars.Locale, 2, { elem: elem.name });

            elem.mods &&
                elem.mods && elem.mods.forEach(function(mod){

                    wiki += entityWiki(levelPath + level['get-elem-mod'](vars.BlockName, elem.name, mod.name) + '.' + vars.Locale, 3);

                    mod.vals && mod.vals.forEach(function(modVal){

                        var json = { elem: elem.name, elemMods : {} };
                        json.elemMods[mod.name] = modVal.name; // TODO: как сделать это в одну строку?

                        wiki += entityWiki(levelPath + level['get-elem-mod-val'](vars.BlockName, elem.name, mod.name, modVal.name) + '.' + vars.Locale, 4, json);

                    })

                })

        });

        return wiki;
    }

exports.outFile = function (relFile, file) {
    return [
        fs.readFileSync(file),
        '\n\n'].join('');
};
