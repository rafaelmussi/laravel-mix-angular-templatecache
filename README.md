# Laravel Mix Angular templateCache

[![npm][npm]][npm-url]
![npm](https://img.shields.io/npm/dw/laravel-mix-angular-templatecache.svg)
[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/laravel-mix-angular-templatecache)

> This extension adds support for [angular-templatecache-webpack-plugin](https://github.com/rafaelmussi/angular-templatecache-webpack-plugin) to [Laravel Mix](https://laravel-mix.com).
> The package speeds up your AngularJS app by automatically combining, concatenating, registering and caching your AngularJS HTML templates in the `$templateCache`.

[Install](#install) | [Usage](#usage) | [Plugin Options and Defaults](#plugin-options-and-defaults)

----

## Install

Install with [npm](https://www.npmjs.com/package/laravel-mix-angular-templatecache) or [yarn](https://yarnpkg.com/package/laravel-mix-angular-templatecache)

```bash
  npm i --save laravel-mix-angular-templatecache
```

```bash
  yarn add laravel-mix-angular-templatecache
```

## Usage

Require the extension inside your ``webpack.mix.js`` and call `mix.cacheTemplates('src/templates/**/*.html', pluginOptions)`, like so:

```javascript
// webpack.mix.js

const mix = require('laravel-mix');

require('laravel-mix-angular-templatecache');

// this will generate a file public/templates.js 
mix.cacheTemplates('src/templates/**/*.html'); 

// Or:

// see more options and defaults below
mix.cacheTemplates('src/templates/**/*.html', {
    outputFilename: 'another/folder/myTemplates.js', // will output at public/another/folder/myTemplates.js
});
```
This will generate the file `public/templates.js` containing the following:
```js
// templates.js (sample output prettified)

angular.module("templates").run([$templateCache,
  function($templateCache) {
    $templateCache.put("template-file-01.html",
      // content of template-file-01.html (escaped)
    );
    $templateCache.put("template-file-02.html",
      // content of template-file-02.html (escaped)
    );
    // etc...
  }
]);
```

Include this file in your app and AngularJS will use the $templateCache when available.

> ℹ️ This plugin will __NOT__ create a new AngularJS module by default, but use a module called `templates`. If you want to create a new module, set `options.standalone` to `true`.


> Tip: `mix.cacheTemplates()`, `mix.angularTemplateCache()` and `mix.templateCache()` are aliases. All commands work for all examples in this section.


### Plugin Options and Defaults
Name | Type | Default | Description
---|---|---|---
`outputFilename` | `{String}` | `'public/templates.js'` |  The path/filename.js where the output file should be saved.
`root` | `{String}` | `undefined` |  Prefix for template URLs.
`module` | `{String}` | `'templates'` |  Name of the existing AngularJS module.
`standalone` | `{Boolean}` | `false` |  Create a new AngularJS module, instead of using an existing one.
`escapeOptions ` | `{Object}` | {} |  An object with jsesc-options. See [jsesc](https://www.npmjs.com/package/jsesc#api) for more information.
`templateHeader` | `{String}` | [`*See below`](#default-templates) | Override template header.
`templateBody` | `{String}` | [`*See below`](#default-templates) | Override template body.
`templateFooter` | `{String}` | [`*See below`](#default-templates) | Override template footer.

For more information about `angular-templatecache-webpack-plugin` configurations please refer to their [documentation](https://github.com/rafaelmussi/angular-templatecache-webpack-plugin/blob/master/README.md).

### Default Templates
> `templateHeader:`
> ```js
> 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {'
> ```
> ---
> `templateBody:`
> ```js
> '$templateCache.put("<%= url %>","<%= contents %>");'
> ```
> ---
> `templateFooter:`
> ```js
> '}]);'
> ```

[npm]: https://img.shields.io/npm/v/laravel-mix-angular-templatecache.svg
[npm-url]: https://npmjs.com/package/laravel-mix-angular-templatecache
