const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main_pi: './src/index_pi',
  },
  output: {
    path: path.resolve(__dirname, 'dist-pi'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist-pi'),
    hot: true,
    port: 8081,
  },
};
