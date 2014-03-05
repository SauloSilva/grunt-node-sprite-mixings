/*
 * grunt-node-sprite-mixings
 * https://github.com/saulo/grunt-node-sprite-mixings
 *
 * Copyright (c) 2014 saulo da silva santiago
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
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

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/expected/*.styl'],
        },

        // Configuration to be run (and then tested).
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

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'node_sprite_mixings', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};