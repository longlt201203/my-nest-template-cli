const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const BannerPlugin = require("webpack").BannerPlugin;

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./docker-compose-presets", to: "./docker-compose-presets" },
      ],
    }),
    new BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
    }),
  ],
};
