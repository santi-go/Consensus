const webpack = require('webpack')
const PermissionsOutputPlugin = require('webpack-permissions-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './src/js/main.js'
  },
  output: {
    filename: './public/js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.EnvironmentPlugin({'API_HOST': 'http://0.0.0.0:4567'}),
    new PermissionsOutputPlugin({
      buildFolders: [
        {
          path: path.resolve(__dirname, '../public/js/'),
          fileMode: '777',
          dirMode: '666'
        }
      ],
      buildFiles: [
        {
          path: path.resolve(__dirname, '../public/js/bundle.js'),
          fileMode: '777'
        }
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/js/reunion-consensus.js'),
        to: path.resolve(__dirname, '../public/js/reunion-consensus.js'),
        toType: 'file'
      }
    ])
  ]
}
