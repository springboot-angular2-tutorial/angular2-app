const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const PUBLIC_PATH = (process.env.PUBLIC_PATH || '') + '/' ;

module.exports = webpackMerge(commonConfig, {
  entry: {
    'main': './src/main.aot.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'angular2-router-loader?loader=system&aot=true&genDir=aot/src/app',
        ],
      },
    ]
  },
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map',
    chunkFilename: '[id].[chunkhash].chunk.js',
    publicPath: PUBLIC_PATH,
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      beautify: false,
      comments: false,
      sourceMap: true
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
});
