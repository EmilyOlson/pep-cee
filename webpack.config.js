const path = require('path');
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/app.ts', './src/style.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, {
        test: /\.s[ac]ss$/i,
        use:  [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }, {
        test: /\.html$/i,
        use: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.htm',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new CompressionPlugin()
  ]
}