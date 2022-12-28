const path = require('path')

module.exports = {

  mode: 'production',
  entry: {
    index: './scripts/pages/index.js',
    photographer: './scripts/pages/photographer.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
