# grunt-node-sprite-mixings [![Build Status](https://travis-ci.org/SauloSilva/grunt-node-sprite-mixings.png?branch=master)](https://travis-ci.org/SauloSilva/grunt-node-sprite-mixings)

> Mixing generator for stylus, from a json that contains the coordinates of the images on the sprite.

## Requirements

This plugin requires Grunt `~0.4.2` and [node-sprite](https://github.com/naltatis/node-sprite) `~0.1.2`


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-node-sprite-mixings --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-node-sprite-mixings');
```

## The "node_sprite_mixings" task

### Overview

In your project's Gruntfile, add a section named `node_sprite_mixings` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  node_sprite_mixings: {
    files: {
      // task specifics
    }
  },
});
```

Before run the grunt-node-sprite-mixings task you must make sure that the sprite and json has been generated.

### Options

This task has just one option.

#### jsonRemove

jsonRemove: `Boolean` -
By `default` is  `false`, should you wish to delete the jsons after generation of the mixings.

#### urlNamespace

urlNamespace: `String` -
By `default` is  `disabled`, add a path on the URL of the background image.

### Usage Examples

#### One file per sprites

Coming together of all json sprites into a single mixing.

```js
grunt.initConfig({
  node_sprite_mixings: {
    files: {
        dest: 'public/stylesheets/mixings/example.styl',
        src: ['public/images/*.json']
    },
    options: {
        removeJson: true, // default is false
        urlNamespace: '/images/' // default is disabled
    }
  },
});
```

#### Multiple files per sprites

Mixings separated for every sprite.

```js
grunt.initConfig({
  node_sprite_mixings: {
    basicAndExtras: {
        files: {
            'public/stylesheets/mixings/bar.styl': ['public/images/bar.json'],
            'public/stylesheets/mixings/foo.styl': ['public/images/foo.json']
        },
        options: {
            removeJson: true, // default is false
            urlNamespace: '/images/' // default is disabled
        }
    },
  },
});
```

## Structural mixing expected / STYL

This is the format that is generated by mixing task:

```styl
  foo(x-offset=0, y-offset=0, repeat=no-repeat)
    background url('urlNamespace/example-1.png') repeat (0px + x-offset) (442px + y-offset) transparent
```

## Stylus implementation

To use the mixings generated, just call into your file.styl as follows:

```styl
@import 'mixings/example'

.example_1
  foo()

.example_2
  foo(2px, 2px)

.example_3
  foo(0, 0, repeat-x)
```
Result of css:

```css
.example_1 {
  background:url("urlNamespace/example-1.png") no-repeat 0 211px transparent;
}

.example_2 {
  background:url("urlNamespace/example-1.png") no-repeat 2px 213px transparent;
}

.example_3 {
  background:url("urlNamespace/example-1.png") repeat-x 0 211px transparent;
}
```

## Structural Sprite Information required / JSON

The json that was specified in jsonFile, should be in this structure.

To learn how to produce this automatic json lib check out the [node-sprite](https://github.com/naltatis/node-sprite#usage), and see how to utilize.

```json
{
    "name": "example",
    "shortsum": "1",
    "images": [{
        "name": "foo",
        "positionX": 0,
        "positionY": 0
    }, {
        "name": "bar",
        "positionX": 0,
        "positionY": 442
    }]
}
```

## Contributing
Feel free to post issues or pull request.

You can run the projects tests with the `npm test` command.

## Release History
* 2013-03-05    **v0.1.5**    Fix bug syntax background and insert namespace in the url
* 2013-03-05    **v0.1.4(deprecated)**    Fix bug remove Json
* 2013-03-05    **v0.1.3(deprecated)**    Improvements remove json and code refactors
* 2013-03-05    **v0.1.2(deprecated)**    First released

Task submitted by [Saulo S. Santiago](http://www.linkedin.com/profile/view?id=119242632&trk=nav_responsive_tab_profile)