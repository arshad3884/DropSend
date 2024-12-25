const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www-dev2.dropsend.com",
    env: {
      accountUrl: "https://myaccount-dev2.dropsend.com", // Post-login URL
      businessURL: "https://business.groupaccounts-dev2.dropsend.com/",
      businessLiteURL: "https://businesslite.groupaccounts-dev2.dropsend.com/"
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 60000,
    experimentalMemoryManagement: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'DropSend Automation Report - [datetime]',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      reportFilename: "Report-[datetime]-report",
      timestamp: "longDate"
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
    users: {
      user1: {
        username: "dropsendtest1@yopmail.com",
        password: "Boring123",
      },
      user2: {
        username: "dropsendtest2@yopmail.com",
        password: "Boring123",
      },
      user3: {
        username: "dropsendtest3@yopmail.com",
        password: "Boring123",
      },
      user4: {
        username: "dropsendtest4@yopmail.com",  //business user
        password: "Boring123",
      }
    },
  },
});
