module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:8000',
    watchOptions: {
        ignored: /node_modules/,
        poll: true
    },
    disableHostCheck: true
  }
}
