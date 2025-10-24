// karma.conf.js
const path = require('path');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', {}]
                ]
              }
            }
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
      },
      resolve: { extensions: ['.js'] }
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
