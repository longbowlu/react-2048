const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { author, description } = require('../package.json');

const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../public/images/favicon.svg'),
      favicons: {
        appName: 'React 2048',
        appShortName: '2048',
        developerName: author,
        appDescription: description,
        background: 'white',
        theme_color: 'white',
        display: 'fullscreen',
        orientation: 'portrait',
        icons: {
          android: true,
          appleIcon: true,
          favicons: true,
          windows: true,
          appleStartup: false,
          coast: false,
          firefox: false,
          yandex: false,
        },
      },
    }),
  ],
  experiments: {topLevelAwait: true}
};
