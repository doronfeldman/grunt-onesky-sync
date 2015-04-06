# grunt-onesky-sync

> Syncronize translations from onesky

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-onesky-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-onesky-sync');
```

## The "grunt_onesky_sync" task

### Overview
In your project's Gruntfile, add a section named `grunt_onesky_sync` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grunt_onesky_sync: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.authFile
Type: `String`
Default value: `onesky.json`

A json file with your onesky private key and public key, don't commit it

{
    "publicKey": "",
    "secretKey": ""
}

#### options.langDestination
Type: `String`
Default value: `/`

A string value that is used to do something else with whatever else.

#### options.projectId
Type: `String`

Your onesky project id

### Usage Examples

```js
grunt_onesky_sync: {
      onesky_task: {
        options: {
            authFile: 'onesky.json',
            langDestination: 'resources/lang/',
            projectId: '12345'
        }
      }
    }
```

#### Custom Options

```js
grunt.initConfig({
  grunt_onesky_sync: {
    options: {
       authFile: 'onesky.json',
       langDestination: 'resources/lang/',
       projectId: '12345'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
