var path = require('path');

module.exports = {
  devtool: 'source-map',
  stats: {colors: true, reasons: true},
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js'],
    alias: {
      'app': 'src/app'
    }
  },
  debug: true,
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  }
};
