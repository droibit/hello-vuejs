module.exports = {
  devServer: {
    before: require("./build/dev-server"),
    proxy: {
      "/api": {
        target: "http://api.yourserivice.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
