module.exports = function (config) {
  var _config = {

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: './src/lib/es6-shim.js', watched: false},
      {pattern: 'spec.bundle.js', watched: false}
    ],
    exclude: [],
    preprocessors: {
      'spec.bundle.js': ['webpack', 'sourcemap']
    },
    webpack: {
      resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json'],
        alias: {
          'app': 'src/app',
          'common': 'src/common'
        }
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: 'ts',
            query: {
              ignoreDiagnostics: [
                2300,
                2383,
                2375,
                2374
              ]
            },
            exclude: [
              /\.min\.js$/
            ]
          },
          {test: /reflect-metadata/, loader: "imports?require=>false"},
          {test: /\.json$/, loader: 'json'},
          {test: /\.html$/, loader: 'raw'},
          {test: /\.css$/, loader: 'raw'},
          {
            test: /\.scss$/,
            loaders: ["raw", "sass"]
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
      stats: {colors: true, reasons: true},
      debug: true
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS2'],
    singleRun: true
  };

  config.set(_config);
};
