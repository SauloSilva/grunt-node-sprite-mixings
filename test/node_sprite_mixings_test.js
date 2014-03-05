'use strict';

var grunt = require('grunt'),
    _ = require('underscore');

exports.node_sprite_mixings = {
    mixing: function(test) {
        test.expect(9);
        var pathStyl = './test/expected/global.styl',
            pathJson = './test/fixtures/mixing/example.json',
            globalJson = grunt.file.readJSON(pathJson),
            globalStyl = grunt.file.read(pathStyl);

        test.equal(grunt.file.exists(pathStyl), true, 'Should file exist')
        test.notEqual(globalStyl.indexOf(_.first(globalJson.images).name), -1, 'Should contain the name of mixing, the same json of the file');
        test.notEqual(globalStyl.indexOf(_.last(globalJson.images).name), -1, 'Should contain the name of mixing, the same json of the file');
        test.notEqual(globalStyl.indexOf('background'), -1, 'Should contain the background of mixing');
        test.notEqual(globalStyl.indexOf("url('" + globalJson.name + '-' + globalJson.shortsum + ".png')"), -1, 'Should contain the url of mixing');
        test.notEqual(globalStyl.indexOf('repeat'), -1, 'Should contain the repeat of mixing');
        test.notEqual(globalStyl.indexOf('y-offset'), -1, 'Should contain the y-offset of mixing');
        test.notEqual(globalStyl.indexOf('x-offset'), -1, 'Should contain the y-offset of mixing');
        test.notEqual(globalStyl.indexOf('transparent'), -1, 'Should contain the transparent of mixing');
        test.done();
    },

    mixings: function(test) {
        test.expect(16);
        var jsonPaths = ['./test/fixtures/mixings/foo.json', './test/fixtures/mixings/bar.json'],
            stylPaths = ['./test/expected/foo.styl', './test/expected/bar.styl'],
            filesJsons = [grunt.file.readJSON(_.first(jsonPaths)), grunt.file.readJSON(_.last(jsonPaths))],
            filesStyl = [grunt.file.read(_.first(stylPaths)), grunt.file.read(_.last(stylPaths))];

        filesStyl.forEach(function(element, i) {
            test.equal(grunt.file.exists(jsonPaths[i]), true, 'Should file exist')
            test.notEqual(element.indexOf(filesJsons[i].name), -1, 'Should contain the name of mixing, the same json of the file');
            test.notEqual(element.indexOf('background'), -1, 'Should contain the background of mixing');
            test.notEqual(element.indexOf("url('" + filesJsons[i].name + '-' + filesJsons[i].shortsum + ".png')"), -1, 'Should contain the url of mixing');
            test.notEqual(element.indexOf('repeat'), -1, 'Should contain the repeat of mixing');
            test.notEqual(element.indexOf('y-offset'), -1, 'Should contain the y-offset of mixing');
            test.notEqual(element.indexOf('x-offset'), -1, 'Should contain the y-offset of mixing');
            test.notEqual(element.indexOf('transparent'), -1, 'Should contain the transparent of mixing');
        })

        test.done();
    },
};