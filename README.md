# grunt-node-sprite-mixings [![Build Status](https://travis-ci.org/SauloSilva/grunt-node-sprite-mixings.png?branch=master)](https://travis-ci.org/SauloSilva/grunt-node-sprite-mixings)

> Mixing generator for stylus from a json that contains the coordinates of the images on the sprite.

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
    mixing: {
      // Task-specific for one mixings.
    },
    mixings: {
      // Task-specific for many mixings.
    },
  },
});
```

### Options

Before run the grunt-node-sprite-mixings task you must make sure that the sprite and json has been generated.

#### mixing.jsonFile or mixings.jsonFile

jsonFile: `Array`
Specifies the path to the json file

#### mixing.dest or mixings.dest

dest: `String`
Specifies the path where the mixing must be generated

#### mixing.autoRemove or mixings.autoRemove

autoRemove: `Boolean`
Deletes the json file after generate the mixings

#### mixing.name

name: `String`
By `default` is  `false`, specifies the name of the mixing which shall be generated. For a group of mixings this option is not a valid because the name is inherited from the name of the sprite. For this reason he is only necessary to inside the **mixing** property.

### Usage Examples

#### One mixing

Coming together of all sprites into a single mixing

```js
grunt.initConfig({
  node_sprite_mixings: {
    mixing: {
        jsonFile: ['public/images/*.json'],
        dest: 'public/stylesheets/mixings',
        name: 'example',
        autoRemove: true
    }
  },
});
```

#### Many mixing

Mixings separated for every sprite.

```js
grunt.initConfig({
  node_sprite_mixings: {
    mixings: {
        jsonFile: ['public/images/*.json'],
        dest: 'public/stylesheets/mixings',
        autoRemove: true
    }
  },
});
```

## Structural mixing / STYL

This is the format that is generated by mixing task:

```styl
  foo(repeat='no-repeat', x-offset=0, y-offset=0)
    background url('example-1.png') repeat (0 + x-offset) (442 + y-offset) transparent
```

## Stylus implementation

To use the mixings generated, just call into your file.styl as follows:

```styl
@import 'mixings/example'

.example
  foo()
```
Result of css:

```css
.example {
  background:url("example-1.png") 'no-repeat' 0 211 transparent;
}
```

## Structural Sprite Information / JSON

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
* 2013-03-05    **v0.1.2**    First released

Task submitted by [Saulo S. Santiago](http://www.linkedin.com/profile/view?id=119242632&trk=nav_responsive_tab_profile)