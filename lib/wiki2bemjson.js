var exec = require('child_process').exec,
    fs = require('fs'),
    myPath = require('bem/lib/path');

exec(
    'shmakowiki -i ' + process.argv[2] + ' -f bemjson',
    {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 1500 * 1024,
        killSignal: 'SIGTERM',
        cwd: process.cwd(),
        env: process.env
    },
    function(e, data, stderr){
        var wiki = process.argv[2],
            path = /([^/]*([\.ru|en]*)?)(\.wiki)+$/.exec(wiki),
            title = (myPath.existsSync(wiki) && fs.readFileSync(wiki, 'utf-8').match(/==(.*)/))[1] || '',
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
                            "'<!-- Yandex.Metrika counter --><div style=\"display:none;\"><script type=\"text/javascript\">(function(w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter10053391 = new Ya.Metrika({id:10053391, enableAll: true, trackHash:true}); } catch(e) { } }); })(window, \"yandex_metrika_callbacks\");</script></div><script src=\"//mc.yandex.ru/metrika/watch.js\" type=\"text/javascript\" defer=\"defer\"></script><noscript><div><img src=\"//mc.yandex.ru/watch/10053391\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript><!-- /Yandex.Metrika counter -->',",
                            data,
                        "]",
                    "}",
                "])"].join('');
        fs.writeFile(process.argv[3], html, 'utf-8');
    }
);
