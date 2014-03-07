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
    var src = [],
        dest = [],
        jsonRemove = false,
        urlNamespace = '',
        codes = '',
        _ = grunt.util._;

    var parserMixings = function() {
        if (!validate()) {
            return
        }

        dest.forEach(function(path, i) {
            src[i].forEach(function(file) {
                codeGenerator(file)
            })
            mixingCreate(path)
            codes = ''
        })

        if (jsonRemove) {
            fileJsonRemove()
        }
    }

    var validate = function() {
        switch (false) {
            case !_.isEmpty(src):
                grunt.log.warn('src not found!')
                return false
                break;
            case !_.isEmpty(dest):
                grunt.log.warn('dest not found!')
                return false
                break;
            default:
                return true
        }
    }

    var mixingCreate = function(path) {
        var created = grunt.file.write(path, codes)

        if (created) {
            grunt.log.writeln(chalk.cyan(path) + ' has been created successfully.')
        }
    }

    var fileJsonRemove = function() {
        var paths = _.flatten(src)
        paths.forEach(function(path) {
            var deleted = grunt.file.delete(path)
            if (deleted) {
                grunt.log.writeln(chalk.cyan(path) + ' has been successfully deleted.')
            }
        })
    }

    var codeGenerator = function(file) {
        var data = grunt.file.readJSON(file),
            images = data.images,
            shortName = data.shortsum,
            name = data.name,
            url = urlNamespace + name + "-" + shortName + '.png';

        images.forEach(function(element, i) {
            codes += element.name.replace('_', '-') + "(x-offset=0, y-offset=0, repeat=no-repeat)\n"
            codes += "  background url('" + url + "') repeat (" + element.positionX + "px + x-offset) (" + -element.positionY + "px + y-offset) transparent\n"
            codes += "  width " + element.width + "px\n"
            codes += "  height " + element.height + "px\n"
        })
    }

    grunt.registerMultiTask('node_sprite_mixings', 'Generator mixings for stylus. Based on lib node-sprites', function() {
        this.files.forEach(function(file) {
            dest.push(file.dest)
            src.push(file.src)
            jsonRemove = this.options().jsonRemove
            if (this.options().urlNamespace) {
                urlNamespace = this.options().urlNamespace
            }
        }.bind(this))
        parserMixings()
    });
};