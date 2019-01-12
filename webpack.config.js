const path = require('path');

let entry = './PINInput.js';
let output = {
  path: path.join(__dirname, 'dist'),
  publicPath: '/dist/',
};


module.exports = {
  entry,
  output: Object.assign(output, {
    filename: 'PINInput.js',
    library: 'react-sequence',
    libraryTarget: 'umd', // universal module definition
  }),
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
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
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
};