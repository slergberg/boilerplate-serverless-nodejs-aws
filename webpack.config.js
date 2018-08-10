const nodeExternals = require('webpack-node-externals')
const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  optimization: {
    minimize: false,
  },
  stats: slsw.lib.webpack.isLocal ? 'errors-only' : 'verbose',
  target: 'node',
}
