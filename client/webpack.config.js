const path = require('path')

let config = {
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    path: path.join(__dirname, '/public/dist'),
    filename: 'build.js',
    chunkFilename: '[name].build.js',
    publicPath: '/public/dist'
  },

  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  }
}

module.exports = (enf, options) => {
  let production = options.mode === 'production'

  config.devtool = production ?
    false :
    'eval-sourcemap'

  return config
}
