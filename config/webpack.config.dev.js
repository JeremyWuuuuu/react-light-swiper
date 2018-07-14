const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');
const {
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    hotModule: require.resolve('react-dev-utils/webpackHotDevClient'),
    index: path.resolve(paths.entry)
  },
  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: 'dist/[name].js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'lib': path.resolve('src/libs'),
    },
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: ['node_modules']
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          require.resolve('postcss-loader')
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: ['node_modules/']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: paths.indexHTML,
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  }
}
module.exports = config;