const path = require("path");
const BASE_URL = process.env.NODE_ENV === "production" ? "./" : "/";
const resolve = dir => {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  productionSourceMap: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/main.less")]
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@c", resolve("src/components"));
  },
  devServer: {
    port: 9996,
    proxy: {
      "/": {
        target: "http://chenjiancong.cn:8000/",
        changeOrigin: true, // needed for virtual hosted sites
        ws: false // proxy websockets
      }
    }
  }
};
