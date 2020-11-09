var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ASSET_PATH = process.env.ASSET_PATH || '';
// const webpack = require('webpack');

module.exports = {
  entry:  {
    'main': './src/index.js',
    'assets/js/banner': './src/assets/js/banner.js',
  },

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: '' ,
    filename: '[name].js',
  }, 

  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    port: 1111,
    writeToDisk: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            options: {
              publicPath: '../../'
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "assets/images",
            }
          }
        ]
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "assets/fonts",
            }
          }
        ]
      },
      
    ]
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

    new HtmlWebpackPlugin({ 
        filename: "index.html",
        template: "./src/index.html",
        chunks: ['main', 'assets/js/banner'],
    }),

    new HtmlWebpackPlugin({ 
        filename: "components/banner.html",
        template: "./src/components/banner.html",
        chunks: ['main', 'assets/js/banner']
    }),

    new HtmlWebpackPlugin({ 
      filename: "components/button.html",
      template: "./src/components/button.html",
      chunks: ['main']
    }),

    new MiniCssExtractPlugin({filename: "assets/css/styles.css"}),
    new OptimizeCSSAssetsPlugin({}),
    // new webpack.DefinePlugin({
    //   'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    // }),

  ],
  
}