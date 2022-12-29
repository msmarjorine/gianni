const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
        },
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
        //excludeSpecPattern: "cypress/e2e/mix/*.js",
        baseUrl: "http://www.webdriveruniversity.com/",
        chromeWebSecurity: false,
        experimentalModifyObstructiveThirdPartyCode: true,
        experimentalSessionAndOrigin: true,
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 120000,
        env: {
            gramotaReq: "haricots",
            bolatUrl: "https://eurobolat.000webhostapp.com/"
        }
    },
    
});

