const path = require('path');
var webpack = require('webpack');
// var CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');
// const devMode = 'production';
// const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.(css|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|jpg|png|gif|svg|ico)$/,
          use: ['file-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        middleware: path.resolve(__dirname, 'src/middleware'),
        components: path.resolve(__dirname, 'src/components'),
        config: path.resolve(__dirname, 'src/config'),
        assets: path.resolve(__dirname, 'src/assets'),
        fonts: path.resolve(__dirname, 'src/assets/fonts'),
        images: path.resolve(__dirname, 'src/assets/images'),
        modules: path.resolve(__dirname, 'src/modules'),
        store: path.resolve(__dirname, 'src/store'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        dashboard: path.resolve(__dirname, 'src/modules/Dashboard'),
        auth: path.resolve(__dirname, 'src/modules/Auth'),
        commons: path.resolve(__dirname, 'src/modules/Commons'),
      }
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      // new ServiceWorkerWebpackPlugin({
      //   entry: path.join(__dirname, 'src/sw.js')
      // }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist'],
      }),
      // new UglifyJsPlugin(),
      // new WebpackBundleAnalyzer(),
      new HtmlWebpackPlugin({
        template: path.resolve('./public/index.html'),
        favicon: path.resolve('./public/favicon.ico')
      })
      // new WorkboxPlugin.GenerateSW({
      //   // these options encourage the ServiceWorkers to get in there fast
      //   // and not allow any straggling "old" SWs to hang around
      //   clientsClaim: true,
      //   skipWaiting: true,
      // }),
      // new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
      // new webpack.optimize.AggressiveMergingPlugin(),
      // new CompressionPlugin({
      //   // test: /\.js(\?.*)?$/i,
      //   algorithm: "gzip",
      //   test: /\.js$|\.css$|\.html$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [new TerserPlugin()]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      port: 4000
    },
    stats: {
      children: true
    }
  }
};