const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }
    ]
  },
  devServer: {
    port: 4000
  },
  plugins: [
    new HTMLPlugin({
      template: './index.html'
    })
  ]
}
