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
            basicAndExtras: {
                files: {
                    'test/expected/bar.styl': ['test/fixtures/bar.json'],
                    'test/expected/foo.styl': ['test/fixtures/foo.json']
                },
                options: {
                    urlNamespace: '/example/'
                }
            },

            files: {
                dest: 'test/expected/global.styl',
                src: ['test/fixtures/*.json']
            },
            options: {
                urlNamespace: '/example/'
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