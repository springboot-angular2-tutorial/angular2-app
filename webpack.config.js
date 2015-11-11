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
var BannerPlugin = webpack.BannerPlugin;


/*
 * Config
 */
var config = {
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
      // Angular 2 Deps
      '@reactivex/rxjs',
      'zone.js',
      'reflect-metadata',
      // to ensure these modules are grouped together in one file
      'angular2/angular2',
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
    extensions: ['', '.ts', '.js', '.json'],
    alias: {
      'app': 'src/app'
    }
  },

  /*
   * When using `templateUrl` and `styleUrls` please use `__filename`
   * rather than `module.id` for `moduleId` in `@View`
   */
  node: {
    crypto: false,
    __filename: true
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
        query: {
          'ignoreDiagnostics': [
            2300, // 2300 -> Duplicate identifier
            2309, // 2309 -> An export assignment cannot be used in a module with other exported elements.
            2383,
            2375,
            2374
          ]
        },
        exclude: [
          /\.min\.js$/,
          /\.spec\.ts$/
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
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  }
};

var commons_chunks_plugins = [
  {
    name: 'angular2',
    minChunks: Infinity,
    filename: 'angular2.js'
  },
  {
    name: 'common',
    filename: 'common.js'
  }
];

var environment_plugins = {
  all: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'VERSION': pkg.version
    }),
    new OccurenceOrderPlugin(),
    new DedupePlugin()
  ],
  production: [
    new UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: false
      },
      output: {
        comments: false
      },
      beautify: false
    }),
    new BannerPlugin(getBanner(), {entryOnly: true})
  ],
  development: []
};

if (NODE_ENV === 'production') {
  // replace filename `.js` with `.min.js`
  config.output.filename = config.output.filename.replace('.js', '.min.js');
  config.output.sourceMapFilename = config.output.sourceMapFilename.replace('.js', '.min.js');
  commons_chunks_plugins = commons_chunks_plugins.map(function (chunk) {
    return chunk.filename.replace('.js', '.min.js');
  });
}

// create CommonsChunkPlugin instance for each config
var combine_common_chunks = commons_chunks_plugins.map(function (config) {
  return new CommonsChunkPlugin(config);
});

// combine everything
config.plugins = [].concat(combine_common_chunks, environment_plugins.all, environment_plugins[NODE_ENV]);

module.exports = config;

// Helper functions
function getBanner() {
  return 'Angular2 tutorial v' + pkg.version + ' by Akira Sosa';
}

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
