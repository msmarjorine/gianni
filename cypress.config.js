const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('config', `${file}.json`);
    if (!fs.existsSync(pathToConfigFile)) {
        console.log("No custom config file found.");
        return {};
    }
    return fs.readJson(pathToConfigFile)
}

module.exports = defineConfig({
    projectId: 'uhawz7',

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            const file = config.env.configFile || ''

            return getConfigurationByFile(file)
        },
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
        //excludeSpecPattern: "cypress/e2e/mix/*.js",
        baseUrl: "http://www.webdriveruniversity.com/",
        chromeWebSecurity: false,
        experimentalModifyObstructiveThirdPartyCode: true,
        experimentalSessionAndOrigin: true,
        experimentalStudio: true,
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 120000,
        viewportHeight: 768,
        viewportWidth: 1366,
        video: false,
        videoUploadOnPasses: false,
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'cypress/reporter-config.json'
        },
        retries: {
            runMode: 0,
            openMode: 1
        },
        env: {
            gramotaReq: "haricots",
            bolatUrl: "https://eurobolat.000webhostapp.com/"
        }
    },

});

