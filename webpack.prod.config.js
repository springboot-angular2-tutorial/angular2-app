var path = require('path');
var zlib = require('zlib');

var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');

var ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  devtool: 'source-map',
  debug: true,

  entry: {
    'vendor': './src/vendor.ts',
    'app': './src/app/bootstrap'
  },

  output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: __dirname,
    cache: false,
    extensions: ['', '.ts', '.js', '.json'],
    alias: {
      'app': 'src/app'
    }
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          root('node_modules/rxjs'),
          root('node_modules/bootstrap-webpack/bootstrap.config.js')
        ]
      }
    ],
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'raw'},
      {
        test: /\.scss$/,
        loaders: ["raw", "sass"]
      },
      {test: /\.html$/, loader: 'raw'},
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          'ignoreDiagnostics': [
            2300 // 2300 -> Duplicate identifier
          ]
        },
        exclude: [/\.spec\.ts$/]
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
    new OccurenceOrderPlugin(true),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),
    new ProvidePlugin({
      'Reflect': 'es7-reflect-metadata/dist/browser'
    }),
    new DedupePlugin(),
    new UglifyJsPlugin({
      beautify: false,
      mangle: false,
      compress : { screw_ie8 : true},
      comments: false
    }),
    new CompressionPlugin({
      algorithm: gzipMaxLevel,
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ]

};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {level: 9}, callback)
}

