'use strict';

var grunt = require('grunt'),
    _ = grunt.util._;

exports.node_sprite_mixings = {
    global: function(test) {
        test.expect(19);
        var pathStyl = './test/expected/global.styl',
            pathJson = './test/fixtures/',
            jsons = ['bar.json', 'foo.json', 'example.json'],
            globalStyl = grunt.file.read(pathStyl);

        jsons.forEach(function(json) {
            var jsonParsed = grunt.file.readJSON(pathJson + json)

            test.equal(grunt.file.exists(pathStyl), true, 'Should file exist')
            test.notEqual(globalStyl.indexOf(_.first(jsonParsed.images).name), -1, 'Should contain the name of mixing, the same json of the file');
            test.notEqual(globalStyl.indexOf(_.last(jsonParsed.images).name), -1, 'Should contain the name of mixing, the same json of the file');
            test.notEqual(globalStyl.indexOf('background'), -1, 'Should contain the background of mixing');
            test.notEqual(globalStyl.indexOf("url('" + jsonParsed.name + '-' + jsonParsed.shortsum + ".png')"), -1, 'Should contain the url of mixing');
        })

        test.notEqual(globalStyl.indexOf('repeat'), -1, 'Should contain the repeat of mixing');
        test.notEqual(globalStyl.indexOf('y-offset'), -1, 'Should contain the y-offset of mixing');
        test.notEqual(globalStyl.indexOf('x-offset'), -1, 'Should contain the y-offset of mixing');
        test.notEqual(globalStyl.indexOf('transparent'), -1, 'Should contain the transparent of mixing');
        test.done();
    },

    basicAndExtra: function(test) {
        test.expect(18);
        var pathStyl = './test/expected/',
            pathJson = './test/fixtures/',
            files = ['foo', 'bar'];

        files.forEach(function(file) {
            var styl = grunt.file.read(pathStyl + file + '.styl'),
                jsonParsed = grunt.file.readJSON(pathJson + file + '.json');

            test.notEqual(styl.indexOf(_.first(jsonParsed.images).name), -1, 'Should contain the name of mixing, the same json of the file');
            test.notEqual(styl.indexOf(_.last(jsonParsed.images).name), -1, 'Should contain the name of mixing, the same json of the file');
            test.notEqual(styl.indexOf('background'), -1, 'Should contain the background of mixing');
            test.notEqual(styl.indexOf("url('" + jsonParsed.name + '-' + jsonParsed.shortsum + ".png')"), -1, 'Should contain the url of mixing');

            test.equal(grunt.file.exists(pathStyl + file + '.styl'), true, 'Should file exist')
            test.notEqual(styl.indexOf('repeat'), -1, 'Should contain the repeat of mixing');
            test.notEqual(styl.indexOf('y-offset'), -1, 'Should contain the y-offset of mixing');
            test.notEqual(styl.indexOf('x-offset'), -1, 'Should contain the y-offset of mixing');
            test.notEqual(styl.indexOf('transparent'), -1, 'Should contain the transparent of mixing');
        })
        test.done();
    },
};