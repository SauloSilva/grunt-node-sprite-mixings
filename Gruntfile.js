/*
 * grunt-node-sprite-mixings
 * https://github.com/saulo/grunt-node-sprite-mixings
 *
 * Copyright (c) 2014 saulo da silva santiago
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        clean: {
            tests: ['test/expected/*.styl'],
        },

        node_sprite_mixings: {
            mixing: {
                jsonFile: ['test/fixtures/mixing/*.json'],
                dest: 'test/expected',
                name: 'global',
                autoRemove: false
            },

            mixings: {
                jsonFile: ['test/fixtures/mixings/*.json'],
                dest: 'test/expected',
                autoRemove: false
            }
        },

        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'node_sprite_mixings', 'nodeunit']);
    grunt.registerTask('default', ['jshint', 'test']);
};