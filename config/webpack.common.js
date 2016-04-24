const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  },
  // devtool: 'source-map',
  // stats: {colors: true, reasons: true},
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules'],
    alias: {
      'app': helpers.root('src/app')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2300, // Duplicate identifier
            2374, // Duplicate string index signature
            2375 // Duplicate number index signature
          ]
        },
        exclude: [
          /\.spec\.ts$/
        ]
      },
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.scss$/, loaders: ["raw-loader", "sass-loader"]},
      {test: /\.html$/, loader: 'raw-loader'},
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills']
    })
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   // name: helpers.reverse(['polyfills', 'vendor'])
    //   name: helpers.reverse(['polyfills'])
    // })
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
