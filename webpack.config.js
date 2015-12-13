// Helper
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var NODE_ENV = process.env.NODE_ENV || 'development';

// Node
var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');

// Webpack Plugins
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin = webpack.optimize.DedupePlugin;
var DefinePlugin = webpack.DefinePlugin;

var plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'VERSION': JSON.stringify(pkg.version)
  }),
  new OccurenceOrderPlugin(),
  new DedupePlugin(),
  new CommonsChunkPlugin({
    name: 'angular2',
    minChunks: Infinity,
    filename: 'angular2.js'
  }),
  new CommonsChunkPlugin({
    name: 'common',
    filename: 'common.js'
  })
];

if (NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: false
      },
      output: {
        comments: false
      },
      beautify: false
    })
  )
}

module.exports = {
  devtool: 'source-map',
  debug: true,
  cache: true,
  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  // our Development Server configs
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    publicPath: '/__build__'
  },

  //
  entry: {
    'angular2': [
      'rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/router',
      'angular2/http',
      'angular2/core'
    ],
    'app': [
      './src/app/bootstrap'
    ]
  },

  // Config for our build files
  output: {
    path: root('__build__'),
    filename: '[name].js',
    // filename: '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.ts', '.json'],
    alias: {
      'app': 'src/app'
    }
  },

  module: {
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
        exclude: [
          /\.min\.js$/,
          /\.spec\.ts$/,
          /node_modules/
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
    ],
    noParse: [
      /reflect-metadata/
    ]
  },

  plugins: plugins
};

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
