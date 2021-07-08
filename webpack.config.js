const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {}
  if (isProd) {
    config.minimize = true,
    config.minimizer = [
      new TerserWebpackPlugin()
    ]
  }

  return config
}

module.exports = {
  entry: ['./src/index.tsx', `./src/styles/styles.scss`],
  output: {
    filename: './[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: optimization(),
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: false,
    port: 8000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
        ],
        exclude: "/node_modules",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
        exclude: "/node_modules",
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: ['file-loader'],
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `styles.min.css`,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', ".css", ".scss"]
  },
  devtool: 'source-map'
}
