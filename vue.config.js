module.exports = {
    // Uncomment below for testing Local Host on BrowserStack
    // devServer: {
    //     disableHostCheck: true
    // },
    publicPath: process.env.NODE_ENV === 'production' ? '/Travel/Real-time/Map/' : '/',
    configureWebpack: {
        devtool: "source-map"
    }
};