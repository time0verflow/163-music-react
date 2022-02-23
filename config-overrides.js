const { 
  override, 
  fixBabelImports,
  addWebpackAlias,
} = require("customize-cra");

const path = require("path");
const resolve = dir => path.resolve(__dirname, dir)

module.exports = override(

  //antd的按需引入
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),

  //修改路径别名
  addWebpackAlias({
    '@': resolve('src'),
    'components': resolve('src/components'),
  }),
);