const path = require('path');

module.exports = [
  {
    entry:     './PINInput.js',
    devtool:   'source-map',
    mode:      'production',
    output:    {
      path:          path.resolve(__dirname, 'dist'),
      globalObject: 'typeof self !== \'undefined\' ? self : this',
      filename:      'PINInput.js',
      libraryTarget: 'umd',
      library:       'PINInput',
    },
    module:    {
      rules: [
        {
          test:    /\.js$/,
          use:     ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          use:  'json-loader',
        },
        {
          test: /\.css$/,
          use:  ['css', 'sass'],
        },
      ],
    },
    externals: {
      react: 'react',
    },
  }
];
