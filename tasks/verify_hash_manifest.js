/*
 * grunt-verify-hash-manifest
 * https://github.com/jkenlooper/grunt-verify-hash-manifest
 *
 * Copyright (c) 2014 Jake Hickenlooper
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var _ = grunt.util._,
		crypto = require( "crypto" ),
		fs = require( "fs" ),
		path = require( "path" );

  grunt.registerMultiTask('verify-hash-manifest', 'Verifies a hash manifest file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      algo: 'md5',
      cwd: ''
    });
    var files = grunt.file.expand( options, this.data.src);

    if (files.length === 0) {
      grunt.log.error('No match for: ' + this.data.src);
    }
    // Iterate over all specified file groups.
    files.forEach(function(filepath) {
      var hash_manifest;
      var hash_list;
      var abs_filepath = path.resolve( options.cwd, filepath );
      // Error if manifest file not there
      if (!grunt.file.exists(abs_filepath)) {
        grunt.log.error('Manifest file "' + abs_filepath + '" not found.');
      }
      // Read file source.
      hash_manifest = grunt.file.read(abs_filepath);
      hash_list = hash_manifest.trim().split("\n");
      hash_list.forEach(function( line ) {
        grunt.log.debug( line );
        var target_file = line.substr(0, line.indexOf(" "));
        var abs_path_target_file = path.resolve( options.cwd, target_file );
        var target_file_hex = line.substr(line.indexOf(" ")+1);
        var hash = crypto.createHash( options.algo );
        if (!grunt.file.exists(abs_path_target_file)) {
          grunt.log.error('File no longer at: '+ target_file);
          return;
        }
        hash.update( grunt.file.read( abs_path_target_file, { encoding: null }) ); 
        if ( target_file_hex !== hash.digest( "hex" ) ) {
          grunt.log.error('File does not match hex in manifest: '+ target_file);
          return;
        }
        grunt.verbose.ok('File matches hex in manifest: '+ target_file);

      });

      // Print a success message.
      grunt.log.ok('Finished checking manifest file: ' + filepath);
    });

    // Fail task if errors were logged.
    // use grunt.log.error
    if (this.errorCount > 0) { return false; }
    
    // Otherwise, print a success message.
    grunt.log.ok('Verified ' + files.length + ' manifest files.');
  });

};
