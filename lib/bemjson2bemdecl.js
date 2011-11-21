#!/usr/bin/env node

var fs = require('fs');


// TODO: заменить на require('bem/lib/util').mergeDecls как только доедет https://github.com/bem/bem-tools/commit/99a75c8bb23889f5813ebbacc2514d5e1ae1d971
function mergeDecls(d1, d2) {
    var keys = {};
    d1?
        d1.forEach(function(o) { keys[o.name || o] = o }) :
        d1 = [];

    d2.forEach(function(o2) {
        var name = o2.name || o2;
        if (keys.hasOwnProperty(name)) {
            var o1 = keys[name];
            o2.elems && (o1.elems = mergeDecls(o1.elems, o2.elems));
            o2.mods && (o1.mods = mergeDecls(o1.mods, o2.mods));
            o2.vals && (o1.vals = mergeDecls(o1.vals, o2.vals));
        } else {
            d1.push(o2);
            keys[name] = o2;
        }
    });

    return d1;
}

function isSimple(obj) {
    var t = typeof obj;
    return t === 'string' || t === 'number';
}

function iterateJson(obj, fn) {
    if(obj && !isSimple(obj))
        if(Array.isArray(obj)) {
            var i = 0, l = obj.length;
            while(i < l) iterateJson(obj[i++], fn);
        } else fn(obj);
    return obj;
}

function getBuilder(decl, block) {
    return function(obj) {
        block = obj.block || block;

        obj.block && decl.push({ name: block });

        obj.elem && decl.push({ name: block, elems: [{ name: obj.elem }] });

        var mods;

        if(mods = obj.mods)
            for(var n in mods)
                if(mods.hasOwnProperty(n))
                    decl.push({
                        name: block,
                        mods: [{ name: n, vals: [ mods[n] ] }]
                    });

        if(obj.elem && (mods = obj.elemMods))
            for(var n in mods)
                if(mods.hasOwnProperty(n))
                    decl.push({
                        name: block,
                        elems: [{
                            name: obj.elem,
                            mods: [{ name: n, vals: [ mods[n] ] }]
                        }]
                    });

        iterateJson([obj.mix, obj.content], getBuilder(decl, block));
    }
}

fs.readFile(process.argv[2], 'utf-8', function(err, json) {
    var decl = [];

    try {
        json = require('vm').runInThisContext(json);
    } catch(e) {
        console.log(json);
        throw e;
    }

    iterateJson(json, getBuilder(decl));

    var output = process.argv[3] || process.argv[2].replace(/bemjson.js$/, 'bemdecl.js');
    fs.writeFile(
        output,
        'exports.blocks = ' + JSON.stringify(mergeDecls([], decl), null, 4),
        function (err) {
            if (err) throw err;
            console.log(output);
        });
});
