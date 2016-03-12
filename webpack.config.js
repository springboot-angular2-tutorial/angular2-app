var webpack = require('webpack');
var helpers = require('./helpers');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  host: 'localhost',
  port: 3001
};

module.exports = helpers.defaults({
  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  },

  output: {
    path: helpers.root('dist'),
    // required for hot module replacement
    publicPath: 'http://' + metadata.host + ':' + metadata.port + '/'
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      {test: /\.css$/, loader: 'raw'},
      {test: /\.scss$/, loaders: ["raw", "sass"]},
      {test: /\.html$/, loader: 'raw'},
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
          /\.spec\.ts$/,
          helpers.root('node_modules')
        ]
      },
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
      name: 'polyfills',
      filename: 'polyfills.js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ],

  devServer: {
    port: metadata.port,
    host: metadata.host
  }
});
