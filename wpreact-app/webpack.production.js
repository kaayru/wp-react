const { PATHS, HOST, PORT, THEME_NAME } = require("./webpack/env.config");
const utils = require("./webpack/utils");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const FlowWebpackPlugin = require("flow-webpack-plugin");

const WATCH = global.watch || false;

module.exports = {
  entry: {
    main: [PATHS.src("index.js")]
  },

  output: {
    path: PATHS.compiled(),
    publicPath: "/",
    filename: "js/[name].js",
    sourceMapFilename: "[name].map"
  },

  devtool: "inline-source-map",

  target: "web",

  watch: WATCH,

  resolve: {
    modules: [
      "node_modules",
      "src",
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules")
    ], // Folders where Webpack is going to look for files to bundle together
    extensions: [".jsx", ".js"] // Extensions that Webpack is going to expect
  },

  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [PATHS.src()],
        test: /\.jsx?$/,
        // Options to configure babel with
        query: {
          plugins: ["transform-runtime"],
          babelrc: false,
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.scss$/,
        include: [PATHS.src()],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: [
            "css-loader?importLoaders=1&minimize=true",
            "postcss-loader",
            "sass-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("dev") }),
    new CopyWebpackPlugin([{ from: PATHS.src("assets"), to: "assets" }]),
    new FlowWebpackPlugin(),

    new ExtractTextPlugin("main.css"),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: { warnings: false }
    }),

    // Declare global variables
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      _: "lodash"
    })
  ]
};
