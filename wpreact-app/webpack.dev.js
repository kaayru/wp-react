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
    main: [PATHS.src("index.js"), "webpack-hot-middleware/client"]
  },

  output: {
    path: PATHS.compiled(),
    publicPath: `http://${HOST}:${PORT}/wp-content/themes/${THEME_NAME}/`,
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
        test: /\.jsx?$/,
        include: [PATHS.src()],
        loader: ["react-hot-loader"]
      },
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
        loader: [
          "style-loader",
          "css-loader?importLoaders=1",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("dev") }),
    new CopyWebpackPlugin([{ from: PATHS.src("assets"), to: "assets" }]),
    new FlowWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin(), // Hot reloading
    new webpack.NoEmitOnErrorsPlugin(), // Webpack will let you know if there are any errors
    new WriteFilePlugin(),

    // Declare global variables
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      _: "lodash"
    })
  ]
};
