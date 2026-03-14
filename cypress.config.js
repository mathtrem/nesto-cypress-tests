const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.qa.nesto.ca',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    env: {
      lang: 'en',
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
