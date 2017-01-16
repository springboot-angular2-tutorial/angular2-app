const helpers = require('./helpers');

const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      lodash: 'lodash-es',
      aphrodite: 'aphrodite/no-important',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?loader=system',
        ],
        exclude: [/\.spec\.ts$/]
      },
      // global css
      {
        test: /\.css$/,
        exclude: [helpers.root('src')],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader",
        }),
      },
      {test: /\.html$/, loader: 'raw-loader'},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency',
    }),
    new CheckerPlugin(),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
  node: {
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
  }
};
