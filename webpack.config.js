var webpack = require('webpack');
var path = require('path');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  devtool: 'source-map',
  debug: true,

  devServer: {
    historyApiFallback: true,
    publicPath: '/__build__'
  },

  entry: {
    'vendor': './src/vendor.ts',
    'app': './src/app/bootstrap'
  },

  output: {
    path: root('__build__'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
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
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/]
  },

  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: 2,
      chunks: ['app', 'vendor']
    })
  ]

};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

