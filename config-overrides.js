const { override, fixBabelImports } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css" // change importing css to less
  })
);

// 解决ant-mobile按需加载
// https://github.com/timarney/react-app-rewired/issues/348
