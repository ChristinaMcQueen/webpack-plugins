const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DonePlugin = require("./plugins/DonePlugin");
const AsyncPlugin = require("./plugins/AsyncPlugin");
const FileListPlugin = require("./plugins/FileListPlugin");
const InlineSourcePlugin = require("./plugins/InlineSourcePlugin");
// const UploadPlugin = require("./plugins/UploadPlugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '', // 静态资源路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new DonePlugin(),
    new AsyncPlugin(),
    new FileListPlugin({
      filename: 'list.md'
    }),
    new InlineSourcePlugin({
      match: /\.(js|css)$/
    }),
    // new UploadPlugin({
    //   bucket: '',
    //   domain: '',
    //   accessKey: '',
    //   secretKey: ''
    // }),
  ]
};
