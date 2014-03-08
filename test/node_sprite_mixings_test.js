'use strict';

var grunt = require('grunt'),
    _ = grunt.util._,
    urlNamespace = '/example/';

exports.node_sprite_mixings = {
    global: function(test) {
        test.expect(35);
        var pathStyl = './test/expected/global.styl',
            pathJson = './test/fixtures/',
            jsons = ['bar.json', 'foo.json', 'example.json'],
            globalStyl = grunt.file.read(pathStyl);

        jsons.forEach(function(json) {
            var jsonParsed = grunt.file.readJSON(pathJson + json)
            test.equal(grunt.file.exists(pathStyl), true, 'Should file exist')
            test.notEqual(globalStyl.indexOf("url('" + urlNamespace + jsonParsed.name + '-' + jsonParsed.shortsum + ".png')"), -1, 'Should contain the url of mixing');

            jsonParsed.images.forEach(function(json) {
                test.notEqual(globalStyl.indexOf(json.name), -1, 'Should contain the name of mixing, the same json of the file');
                test.notEqual(globalStyl.indexOf(json.positionY), -1, 'Should contain the positionY of mixing, the same json of the file');
                test.notEqual(globalStyl.indexOf(json.positionX), -1, 'Should contain the positionX of mixing, the same json of the file');
                test.notEqual(globalStyl.indexOf(json.width), -1, 'Should contain the width of mixing, the same json of the file');
                test.notEqual(globalStyl.indexOf(json.height), -1, 'Should contain the height of mixing, the same json of the file');
            })
        })

        test.notEqual(globalStyl.indexOf('background'), -1, 'Should contain the background of mixing');
        test.notEqual(globalStyl.indexOf('width'), -1, 'Should contain the width of mixing');
        test.notEqual(globalStyl.indexOf('height'), -1, 'Should contain the width of mixing');
        test.notEqual(globalStyl.indexOf('y-offset'), -1, 'Should contain the y-offset of mixing');
        test.notEqual(globalStyl.indexOf('x-offset'), -1, 'Should contain the y-offset of mixing');
        test.notEqual(globalStyl.indexOf('sizes=true'), -1, 'Should contain the sizes=true of mixing');
        test.notEqual(globalStyl.indexOf('if'), -1, 'Should contain the `if` of mixing');
        test.notEqual(globalStyl.indexOf('repeat'), -1, 'Should contain the repeat of mixing');
        test.notEqual(globalStyl.indexOf('transparent'), -1, 'Should contain the transparent of mixing');
        test.done();
    },

    basicAndExtra: function(test) {
        test.expect(32);
        var pathStyl = './test/expected/',
            pathJson = './test/fixtures/',
            files = ['foo', 'bar'];

        files.forEach(function(file) {
            var styl = grunt.file.read(pathStyl + file + '.styl'),
                jsonParsed = grunt.file.readJSON(pathJson + file + '.json');

            test.equal(grunt.file.exists(pathStyl + file + '.styl'), true, 'Should file exist')
            test.notEqual(styl.indexOf("url('" + urlNamespace + jsonParsed.name + '-' + jsonParsed.shortsum + ".png')"), -1, 'Should contain the url of mixing');
            jsonParsed.images.forEach(function(json) {
                test.notEqual(styl.indexOf(json.name), -1, 'Should contain the name of mixing, the same json of the file');
                test.notEqual(styl.indexOf(json.positionX), -1, 'Should contain the positionX of mixing, the same json of the file');
                test.notEqual(styl.indexOf(json.positionY), -1, 'Should contain the positionY of mixing, the same json of the file');
                test.notEqual(styl.indexOf(json.width), -1, 'Should contain the width of mixing, the same json of the file');
                test.notEqual(styl.indexOf(json.height), -1, 'Should contain the height of mixing, the same json of the file');

            })
            test.notEqual(styl.indexOf('background'), -1, 'Should contain the background of mixing');
            test.notEqual(styl.indexOf('width'), -1, 'Should contain the width of mixing');
            test.notEqual(styl.indexOf('height'), -1, 'Should contain the width of mixing');
            test.notEqual(styl.indexOf('repeat'), -1, 'Should contain the repeat of mixing');
            test.notEqual(styl.indexOf('y-offset'), -1, 'Should contain the y-offset of mixing');
            test.notEqual(styl.indexOf('x-offset'), -1, 'Should contain the y-offset of mixing');
            test.notEqual(styl.indexOf('if'), -1, 'Should contain the `if` of mixing');
            test.notEqual(styl.indexOf('sizes=true'), -1, 'Should contain the sizes=true of mixing');
            test.notEqual(styl.indexOf('transparent'), -1, 'Should contain the transparent of mixing');
        })
        test.done();
    },
};