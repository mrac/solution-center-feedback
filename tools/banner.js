/**
 * Add banner comment to dist files
 */
var fs = require('fs'),
    glob = require('glob'),
    pkg = JSON.parse(fs.readFileSync('./package.json')),
    banner;

banner = '/*!\n' +
  ' * Name: ' + pkg.name + '\n' +
  ' * Version: ' + pkg.version + '\n' +
  ' * Homepage: ' + pkg.homepage + '\n' +
  ' * License: ' + pkg.license + '\n' +
  ' */\n\n'
;

// add comment to each file
glob('dist/**/*.js', null, function (err, files) {
  files.forEach(function (file) {
    var contents = fs.readFileSync(file);
    fs.writeFileSync(file, banner + contents, null, 2);
  });
});
