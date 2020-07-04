const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  src: "./src/",
  conf: "./src/conf/",
  dist: "./dist/",
};

module.exports = {
  entry: {
    ConfigList: config.conf + "config.js",
    main: config.src + "app.js",
  },
  output: {
    path: path.resolve(__dirname, config.dist),
    filename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: "-",
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: "file-loader?name=assets/fonts/[name].[ext]",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: config.src + "index.html",
      filename: "index.html",
    }),
  ],
};
