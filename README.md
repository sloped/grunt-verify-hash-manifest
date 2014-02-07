# grunt-verify-hash-manifest

> Verifies a hash manifest file.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-verify-hash-manifest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-verify-hash-manifest');
```

## The "verify_hash_manifest" task

### Overview
In your project's Gruntfile, add a section named `verify-hash-manifest` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  "verify-hash-manifest": {
    manifest_1: {
      options: {
        // Task-specific options go here.
      },
      // Path to a hash-manifest file (created by `grunt-hash-manifest`)
      src: ['manifest1']
    },
  },
});
```

### Options

Uses the same options as [grunt-hash-manifest](https://npmjs.org/package/grunt-hash-manifest).

#### options.algo
Type: `String`
Default value: `'md5'`

Specifies which hashing algorithm to use. The default is `md5`. The choices are
limited to what node's `crypto` module supports.

#### options.cwd
Type: `String`
Default value: `''`

Is the directory in which to expand the globbing patterns as well as the root
for `src`.  All the files specified in the manifest will have this as part of
their path.

### Usage Examples

The main usage case for this task is to verify that the files set in the manifest are the same locally.

#### Check all minified css files
After creating some minfied css files, check to make sure they are the same as
specified in the manifest file.  Run the hash-manifest task to update the
manifest and check it in your version control.  Then leave out the minified css
from version control and have the default grunt task minifiy it and run the
verify-hash-manifest task.  It'll fail if the md5 checksums are different then
what's set in `MANIFEST` file.

```js
grunt.initConfig({
  "hash-manifest": {
    dist: {
      options: {
        algo: "md5",
        cwd: "css"
      },
      src: [ "css/**/*.min.css" ],
      dest: "MANIFEST"
    }
  },
  "verify-hash-manifest": {
    dist: {
      options: {
        algo: "md5",
        cwd: "css"
      },
      src: ['MANIFEST']
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
