module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ParkStamps/'   //任意
    : '/',
  outputDir: 'docs',
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
