const mix = require('laravel-mix');
const assert = require('assert');

const AngularTemplateCacheWebpackPlugin = require('angular-templatecache-webpack-plugin');

class AngularTemplateCache {

    register(source, options = {}) {

        assert(typeof source === 'string', `mix.angularTemplateCache() is missing required parameter 1: source`);

        const TEMPLATE_HEADER = 'angular.module(\'<%= module %>\'<%= standalone %>).run([\'$templateCache\', function($templateCache) {';
        const TEMPLATE_BODY = '$templateCache.put(\'<%= url %>\',\'<%= contents %>\');';
        const TEMPLATE_FOOTER = '}]);';
        const DEFAULT_FILENAME = 'templates.js';
        const DEFAULT_MODULE = 'templates';

        this.source = source;

        this.root = 'root' in options ? options.root : '';
        this.outputFilename = 'outputFilename' in options ? options.outputFilename : DEFAULT_FILENAME;

        this.templateHeader = 'templateHeader' in options ? options.templateHeader : TEMPLATE_HEADER;
        this.templateBody = 'templateBody' in options ? options.templateBody : TEMPLATE_BODY;
        this.templateFooter = 'templateFooter' in options ? options.templateFooter : TEMPLATE_FOOTER;

        this.escapeOptions = 'escapeOptions' in options ? options.escapeOptions :  {};

        this.module = 'module' in options ? options.module : DEFAULT_MODULE;
        this.standalone = 'standalone' in options ? options.standalone : false;
    }

    dependencies() {
        return [
            'assert',
            'angular-templatecache-webpack-plugin'
        ];
    }

    webpackPlugins() {
        return [
            new AngularTemplateCacheWebpackPlugin({
                source: this.source,
                outputFilename: this.outputFilename,
                root: this.root,
                module: this.module,
                templateHeader: this.templateHeader,
                templateBody: this.templateBody,
                templateFooter: this.templateFooter,
                escapeOptions: this.escapeOptions,
                standalone: !! this.standalone
            })
        ]
    }

    webpackConfig(config) {
        // Fixes https://github.com/JeffreyWay/laravel-mix/issues/1717
        config.output.publicPath = '';
    }
}

mix.extend('angularTemplateCache', new AngularTemplateCache());
mix.extend('cacheTemplates', new AngularTemplateCache());
mix.extend('templateCache', new AngularTemplateCache());
