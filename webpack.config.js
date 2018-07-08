'use strict';

const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const platform = process.env.platform;

module.exports = {
  entry: paths.getAppEntryFiles(platform),
  mode: "development",
  output: {
    filename: platform === "server" ? "app.server.js" : "app.client.js",
    path: platform === "server" ? paths.appDist : paths.appDistStatic,
    publicPath: '/',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  target: platform === "server" ? "node" : "web",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/styles.css',
      chunkFilename: 'static/css/styles.css'
    })
  ],
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      // Load all CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      }
    ]
  }
};