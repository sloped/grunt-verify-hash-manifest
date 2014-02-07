/*
 * grunt-verify-hash-manifest
 * https://github.com/jkenlooper/grunt-verify-hash-manifest
 *
 * Copyright (c) 2014 Jake Hickenlooper
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
      tests: ['tmp'],
    },

    // Create some hash manifest files for testing
    "hash-manifest": {
      default_options: {
        options: {
        },
        src: [ "test/fixtures/files-1/**/*" ],
        dest: "test/fixtures/manifest1"
      },
      use_cwd: {
        options: {
          cwd: 'test/fixtures/'
        },
        src: [ "files-1/**/*" ],
        dest: "manifest2"
      }
    },

    // Configuration to be run (and then tested).
    "verify-hash-manifest": {
      default_options: {
        options: {
        },
        src: ['test/fixtures/manifest1']
      },
      use_cwd: {
        options: {
          cwd: 'test/fixtures/'
        },
        src: ['manifest2']
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

  // For creating the hash-manifest files for testing.
  grunt.loadNpmTasks('grunt-hash-manifest');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'verify-hash-manifest', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
