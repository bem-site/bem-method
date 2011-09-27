var exec = require('child_process').exec,
    fs = require('fs');

exec('shmakowiki2html -i ' + process.argv[2], function(e, data){
    html = ['<html>',
        '<head>',
            '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
            '<link rel="stylesheet" href="/bem-method/css/wiki.css"/>',
            '<title></title>',
        '</head>',
        '<body>',
            '<!-- Yandex.Metrika counter --><div style=\"display:none;\"><script type=\"text/javascript\">(function(w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter10053391 = new Ya.Metrika({id:10053391, enableAll: true, trackHash:true}); } catch(e) { } }); })(window, \"yandex_metrika_callbacks\");</script></div><script src=\"//mc.yandex.ru/metrika/watch.js\" type=\"text/javascript\" defer=\"defer\"></script><noscript><div><img src=\"//mc.yandex.ru/watch/10053391\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript><!-- /Yandex.Metrika counter -->',
            data,
        '</body>',
        '</html>'].join('');
    fs.writeFile(process.argv[3], html, 'utf-8');
});
