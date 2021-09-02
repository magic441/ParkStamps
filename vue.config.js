module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      }
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: true
    },
    disableHostCheck: true
  }
}
