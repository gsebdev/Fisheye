const path = require('path')

module.exports = {

  mode: 'production',
  entry: {
    index: './src/pages/index.js',
    photographer: './src/pages/photographer.js'
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
