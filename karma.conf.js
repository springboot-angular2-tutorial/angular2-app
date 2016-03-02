module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.config.js');
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'spec-bundle.js', watched: false}
    ],
    exclude: [],
    preprocessors: {
      'spec-bundle.js': ['webpack', 'sourcemap']
    },
    webpack: testWebpackConfig,
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
