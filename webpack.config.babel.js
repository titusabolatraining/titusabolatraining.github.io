import { ProvidePlugin, HotModuleReplacementPlugin } from 'webpack';
import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const config = {
  mode: 'development',
  devtool: 'source-map',
  context: _resolve(__dirname, 'src'),
  entry: {
    app: './js/main.js'
  },
  output: {
    path: _resolve(__dirname, 'assets'),
    publicPath: '/assets/',
    filename: 'js/bundle-[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: '../_layouts/default.html',
      template: '_layouts/default.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles-[hash:6].css',
      chunkFilename: 'css/styles-[hash:6].css'
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js'
    }),
    new HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          filename: 'js/vendor-[hash:6].js'
        }
      }
    }
  },
  resolve: {
    modules: [_resolve(__dirname, './src'), 'node_modules']
  }
};

export default config;
