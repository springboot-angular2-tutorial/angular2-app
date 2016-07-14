const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  port: 3001,
  ENV: ENV,
  HMR: HMR
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,
  debug: true,
  devtool: 'cheap-module-source-map',
  output: {
    path: helpers.root('dist'),
    // required for hot module replacement
    publicPath: 'http://' + METADATA.host + ':' + METADATA.port + '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR
      }
    })
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
