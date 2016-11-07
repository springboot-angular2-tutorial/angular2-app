module.exports = function (config) {
  const testWebpackConfig = require('./webpack.test.js');
  const customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    // sl_firefox: {
    //   base: 'SauceLabs',
    //   browserName: 'firefox',
    //   version: '30'
    // },
    // sl_ios_safari: {
    //   base: 'SauceLabs',
    //   browserName: 'iphone',
    //   platform: 'OS X 10.9',
    //   version: '7.1'
    // },
    // sl_ie_11: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 8.1',
    //   version: '11'
    // }
  };
  const configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      {pattern: './config/spec-bundle.js', watched: false},
    ],
    preprocessors: {
      './config/spec-bundle.js': ['webpack', 'sourcemap'],
    },
    webpack: testWebpackConfig,
    webpackServer: {
      noInfo: true,
    },
    sauceLabs: {
      username: 'akirasosa',
      accessKey: '00268586-4cfd-447d-841f-e2f247a5b7e9',
      testName: 'Web App Unit Tests'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    // reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 120000,
    browserNoActivityTimeout: 600000,
    // browsers: ['Chrome'],
    // customLaunchers: {
    //   ChromeTravisCi: {
    //     base: 'Chrome',
    //     flags: ['--no-sandbox'],
    //   },
    // },
    singleRun: true,
  };

  if (process.env.TRAVIS){
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};
