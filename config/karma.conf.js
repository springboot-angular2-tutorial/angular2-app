module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js');
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      {pattern: './config/spec-bundle.ts', watched: false}
    ],
    preprocessors: {
      './config/spec-bundle.ts': ['webpack', 'sourcemap']
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
    browsers: ['Chrome'],
    singleRun: true
  });
};
