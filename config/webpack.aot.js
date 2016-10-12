const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API_URL = process.env.API_URL || '';

module.exports = webpackMerge(commonConfig, {
  entry: {
    'main': './src/main.aot.ts'
  },
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.prod.html',
      chunksSortMode: 'dependency',
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'API_URL': JSON.stringify(API_URL)
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
