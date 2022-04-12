module.exports = {
    devServer: {
        proxy: {
            // 'api': "http://api.zhuishushenqi.com",
            // 'aps': "http://chapterup.zhuishushenqi.com"
            'api': {
                target: "http://localhost:3001",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
                logLevel: 'debug',
            },

        }
    }
}