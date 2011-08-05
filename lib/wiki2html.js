var exec = require('child_process').exec,
    fs = require('fs');

exec('shmakowiki2html -i ' + process.argv[2], function(e, data){
    html = '<html><head><title></title></head><body>' + data + '</body></html>';
    fs.writeFile(process.argv[3], html, 'utf-8');
});
