const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    viewportWidth: 375, // Resolução Mobile (iPhone 12 / X)
    viewportHeight: 812,
    defaultCommandTimeout: 8000,
    requestTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Configurações e plugins adicionais do Node
      return config;
    },
  },
});

