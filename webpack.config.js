const path = require('path')
const serverlessWebpack = require('serverless-webpack')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: serverlessWebpack.lib.entries,
  externals: [webpackNodeExternals()],
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  optimization: {
    minimize: false,
  },
  stats: serverlessWebpack.lib.webpack.isLocal ? 'errors-only' : 'verbose',
  target: 'node',
}
