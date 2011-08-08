var exec = require('child_process').exec,
    fs = require('fs');

exec('shmakowiki2html -i ' + process.argv[2], function(e, data){
    html = ['<html>',
        '<head>',
            '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
            '<link rel="stylesheet" href="/bem-method/css/wiki.css"/>',
            '<title>Одной страницей</title>',
        '</head>',
        '<body>',
            data,
        '</body>',
        '</html>'].join('');
    fs.writeFile(process.argv[3], html, 'utf-8');
});
