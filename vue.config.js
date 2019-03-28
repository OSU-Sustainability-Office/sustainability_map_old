/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-01-09T13:26:49-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T19:26:20-07:00
 */

const path = require('path')

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/style-variables.scss";'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/style-variable.scss')
      ]
    }
  },
  configureWebpack: {
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            'cache-loader',
            'thread-loader',
            'babel-loader'
          ]
        }
      ]
    }
  }
}
