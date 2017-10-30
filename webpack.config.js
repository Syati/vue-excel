const path = require('path');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// project consts
const appRoot = path.resolve(__dirname, 'app');
const buildRoot = path.resolve(__dirname, 'build');

module.exports = {
  context: appRoot,
  entry: [
    path.join(appRoot, 'main.js'),
  ],
  output: {
    path: buildRoot,
    filename: 'bundle.js',
  },
  node: {
    fs: false,
    process: true,
    Buffer: false,
  },
  devServer: {
    contentBase: 'build',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      template: path.join(appRoot, 'index.ejs'),
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
