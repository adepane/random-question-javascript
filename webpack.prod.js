const merge = require("webpack-merge");
const common = require("./webpack.common");
const parts = require("./webpack.parts");

module.exports = merge([
  common,
  {
    mode: "production",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: ["/node_modules/", "/src/conf/data.js"],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
      ],
    },
  },
  parts.extractCSS({
    use: "css-loader",
  }),
]);
