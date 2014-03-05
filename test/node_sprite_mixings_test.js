'use strict';

var grunt = require('grunt'),
    _ = require('underscore');


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.node_sprite_mixings = {
    setUp: function(done) {
        done();
    },
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
};