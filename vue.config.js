module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    },

    pwa: {
        name: 'ぺこらボタン',
        msTileColor: '#728bf3',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js'
        },
        themeColor: '#728bf3'
    },
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://peko.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
}