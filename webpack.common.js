const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: 'img/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new EnvironmentPlugin({
      BASE_URL: "https://api.themoviedb.org/3",
      BEARER_TOKEN:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTU3YjY0MjFmOTUwYjE4OTM2MzMxNjUwYTZmMTc2ZiIsInN1YiI6IjY1OGMzNDM0YjY4NmI5MWZmZWRlNjYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.354Mh_zeaaPcDxVBF9VGtOprml_ojr0d2cjk7tDmKyk",
    }),
  ],
};
