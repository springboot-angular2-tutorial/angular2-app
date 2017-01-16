const path = require('path');
const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      "lodash": "lodash-es",
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [helpers.root('node_modules')],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
        ]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true,
          module: 'commonjs', // required for coverage https://github.com/AngularClass/angular2-webpack-starter/issues/1021
        },
      },
      {
        test: /\.ts$/,
        loader: 'angular2-template-loader',
      },
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: [
          helpers.root('src'),
        ],
        exclude: [
          /\.spec\.ts$/,
          /node_modules/,
        ]
      },
    ]
  },
  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
    }),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src',
        },
      },
    }),
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
