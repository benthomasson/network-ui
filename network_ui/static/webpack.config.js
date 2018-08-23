const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const SRC_PATH = path.resolve(__dirname, 'src');
const NETWORK_UI_PATH = SRC_PATH;
module.exports = {
    devtool: 'source-map',
    entry: {
        app: "./src/main.js",
        vendor: ["angular",
                 "angular-ui-router",
                 "hamsterjs",
                 "angular-mousewheel",
                 "reconnectingwebsocket",
                 "angular-xeditable"]
    },
    output: {
        path: __dirname + "/js",
        filename:  "bundle.js",
    },
    module: {
        rules: [
             {
                  test: /\.dfdfdfjs$/,
                  use: {
                      loader: 'istanbul-instrumenter-loader',
                      options: { esModules: true }
                  },
                  enforce: 'pre',
                  include: [
                      /src\//
                  ]
              },
              {
                  test: /\.js$/,
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                  options: {
                      presets: [
                          ['env', {
                              targets: {
                                  browsers: ['last 2 versions']
                              }
                          }]
                      ]
                  }
              },
              {
                  test: /\.html$/,
                  use: ['ngtemplate-loader', 'html-loader'],
                  include: [
                      /src\//
                  ]
              },
              {
                  test: /\.svg$/,
                  use: ['ngtemplate-loader', 'html-loader'],
                  include: [
                      /src\//
                  ]
              }
        ]
    },
    plugins: [
         new HardSourceWebpackPlugin(),
         new webpack.ProvidePlugin({Hamster: 'hamsterjs'}),
         new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
    resolve: {
        alias: {
            '~network-ui': NETWORK_UI_PATH,
        }
    }
};
