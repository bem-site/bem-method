var exec = require('child_process').exec,
    fs = require('fs'),
    myPath = require('bem/lib/path');

exec('shmakowiki2bemjson -i ' + process.argv[2], function(e, data){
    var wiki = process.argv[2],
        path = /([^/]*([\.ru|en]*)?)(\.wiki)+$/.exec(wiki),
        title = (myPath.existsSync(wiki) && fs.readFileSync(wiki, 'utf-8').match(/===(.*)/))[1] || '',
        filename = path[1],
        html =["([",
                "{",
                    "block: 'b-page',",
                    "title: '", title, "',",
                    "head: [",
                        "{ elem: 'css', url: '_", filename, ".css', ie: false},",
                        "{ elem: 'css', url: '_", filename, ".ie.css', ie: 'lt IE 8'},",
                        "{ block: 'i-jquery', elem: 'core' },",
                        "{ elem: 'js', url: '", filename, ".js'}",
                    "],",
                    "content: [",
                        data,
                    "]",
                "}",
            "])"].join('');
    fs.writeFile(process.argv[3], html, 'utf-8');
});
