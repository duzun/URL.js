/**
 *   Compile JS files using Closure-Compiler service
 */

/*jshint node: true*/

var fs   = require('fs');
var path = require('path');
var gccs = require('gccs');


var dir = __dirname;
// var dir = path.join(__dirname, '..'); // uncomment this if you move build.js to /tools folder
var dist = path.join(dir, 'dist');
var packo = require(path.join(dir, 'package.json'));
var version = packo.version;
var hashes = [path.basename(packo.main, '.js')];

if ( !fs.existsSync(dist) ) {
    fs.mkdir(dist);
}

hashes.forEach(function (name) {
    var filename = path.join(dir, name + '.js');

    var dest_filename         = path.join(dist, name + '.js');
    var dest_min_filename     = path.join(dist, name + '.min.js');
    var dest_ver_filename     = path.join(dist, name + '.' + version + '.js');
    var dest_min_ver_filename = path.join(dist, name + '.' + version + '.min.js');

    cp(filename, dest_filename);
    cp(filename, dest_ver_filename, function () {
        log_green(dest_ver_filename);
    });

    gccs.file(filename, dest_min_ver_filename, function (err) {
        if (err) {
            return console.error(err);
        }
        log_green(dest_min_ver_filename);
        cp(dest_min_ver_filename, dest_min_filename);
    });
});

function cp(src, dest, cb) {
    var s = fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    if ( cb ) {
        s.on('finish', cb);
    }
    return s;
}

function log_green(txt) {
    console.log("\x1b[32m%s\x1b[0m", txt);
}
