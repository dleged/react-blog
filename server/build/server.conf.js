const path = require('path')
module.exports = {
    dev:{
        env: 'development',
        port: process.env.PORT || 5050,//启动配置PORT=？，否则采用8080端口
        assetsPublicPath: '/',
        assetsSubDirectory: 'public',
        proxyTable: {},
        cssSourceMap: false,
        cache: false,
    }
}
