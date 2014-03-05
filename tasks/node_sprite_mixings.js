/*
 * grunt-node-sprite-mixings
 * https://github.com/saulo/grunt-node-sprite-mixings
 *
 * Copyright (c) 2014 saulo da silva santiago
 * Licensed under the MIT license.
 */

'use strict';
var chalk = require('chalk');

module.exports = function(grunt) {

    var parserMixing = function(options) {
        var files = grunt.file.expand(options.jsonFile),
            code = '';

        if (!files) {
            grunt.log.warn('Source file ' + chalk.cyan(files) + ' not found.');
            return
        }

        files.forEach(function(file) {
            var data = grunt.file.readJSON(file);
            code += codeGenerator(data)
            if (options.autoRemove) {
                removeJson(file)
            }
        })

        var mixingPath = options.dest + '/' + options.name + '.styl'
        grunt.file.write(mixingPath, code)
    }

    var parserMixings = function(options) {
        var files = grunt.file.expand(options.jsonFile)

        if (!files) {
            grunt.log.warn('Source file ' + chalk.cyan(files) + ' not found.');
            return
        }

        files.forEach(function(file) {
            var code = '',
                data = grunt.file.readJSON(file);

            code = codeGenerator(data)

            var mixingPath = options.dest + '/' + fileNameParse(file) + '.styl'
            grunt.file.write(mixingPath, code)

            if (options.autoRemove) {
                removeJson(file)
            }
        })

    }

    var fileNameParse = function(file) {
        return file.split('/')
            .pop()
            .split('.')
            .shift()
    }

    var removeJson = function(file) {
        grunt.file.delete(file)
    }

    var codeGenerator = function(data) {
        var images = data.images,
            shortName = data.shortsum,
            name = data.name,
            namespace = 'png',
            content = '';

        images.forEach(function(element, i) {
            content += element.name.replace('_', '-') + "(repeat='no-repeat', x-offset=0, y-offset=0)\n  background url('" + name + "-" + shortName + ".png') repeat (" + element.positionX + " + x-offset) (" + element.positionY + " + y-offset) transparent\n"
        })

        return content
    }

    grunt.registerMultiTask('node_sprite_mixings', 'Generator mixings for stylus. Based on lib node-sprites', function() {

        if (this.target == 'mixing') {
            parserMixing(this.data)
        } else {
            parserMixings(this.data)
        }
    });
};