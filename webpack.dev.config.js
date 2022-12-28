const path = require('path')

module.exports = {

  mode: 'development',
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
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    compress: false,
    port: 9000
  }
}
