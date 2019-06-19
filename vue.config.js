module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "publish": {
                    "provider": "spaces",
                    "name": "ops-electron-app",
                    "region": "sgp1",
                    "channel": "latest"
                }
            }
        }
    }
}