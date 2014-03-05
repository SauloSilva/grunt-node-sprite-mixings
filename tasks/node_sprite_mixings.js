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
        if (!optionsValidate(options, 'mixing')) {
            return
        }

        var files = grunt.file.expand(options.jsonFile),
            code = '';

        files.forEach(function(file) {
            var data = grunt.file.readJSON(file);
            code += codeGenerator(data)
        })

        var mixingPath = options.dest + '/' + options.name + '.styl'
        stylMixingGenerator(mixingPath, code)
        removeJsons(files, options.autoRemove)
    }

    var parserMixings = function(options) {
        if (!optionsValidate(options, 'mixings')) {
            return
        }

        var files = grunt.file.expand(options.jsonFile)
        files.forEach(function(file) {
            var code = '',
                data = grunt.file.readJSON(file);

            code = codeGenerator(data)
            var mixingPath = options.dest + '/' + fileNameParse(file) + '.styl'
            stylMixingGenerator(mixingPath, code)
        })

        removeJsons(files, options.autoRemove)
    }

    var fileNameParse = function(file) {
        return file.split('/')
            .pop()
            .split('.')
            .shift()
    }

    var optionsValidate = function(options, type) {
        switch (false) {
            case typeof(options.jsonFile) === 'object':
                grunt.log.warn('jsonFile not found.');
                return false
                break;
            case options.dest !== '':
                grunt.log.warn('dest not found.');
                return false
                break;
            case !(options.name === '' && type === 'mixing'):
                grunt.log.warn('name not found.');
                return false
                break;
            default:
                return true
        }
    }

    var removeJsons = function(files, hasRemove) {
        if (!hasRemove) {
            return
        }

        files.forEach(function(file) {
            grunt.file.delete(file)
            grunt.log.ok(file + ' has been successfully deleted.')
        })
    }

    var stylMixingGenerator = function(path, code) {
        grunt.file.write(path, code)
        grunt.log.ok(path + ' has been created successfully.')
    }

    var codeGenerator = function(data) {
        var images = data.images,
            shortName = data.shortsum,
            name = data.name,
            content = '';

        images.forEach(function(element, i) {
            content += element.name.replace('_', '-') + "(repeat='no-repeat', x-offset=0, y-offset=0)\n  background url('" + name + "-" + shortName + ".png') repeat (" + element.positionX + " + x-offset) (" + element.positionY + " + y-offset) transparent\n"
        })

        return content
    }

    grunt.registerMultiTask('node_sprite_mixings', 'Generator mixings for stylus. Based on lib node-sprites', function() {
        switch (false) {
            case this.target !== 'mixing':
                parserMixing(this.data)
                break;
            case this.target !== 'mixings':
                parserMixings(this.data)
                break;
            default:
                grunt.log.warn('Target mixing or mixings not found.');
        }
    });
};