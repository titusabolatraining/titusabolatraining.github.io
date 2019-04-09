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
    filename: 'js/bundle-[contenthash].js',
    hashDigestLength: 6
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules']
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]' // check the path
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
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
      filename: 'css/styles-[contenthash].css',
      chunkFilename: 'css/styles-[chunkhash].css'
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js'
    })
    // new HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          filename: 'js/vendor-[chunkhash].js'
        }
      }
    }
  },
  resolve: {
    modules: [_resolve(__dirname, './src'), 'node_modules']
  }
};

export default config;
