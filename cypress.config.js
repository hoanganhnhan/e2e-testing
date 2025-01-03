const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uv9xrg',
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'cypress/results',
  //   overwrite: false,
  //   html: false,
  //   json: true,
  // },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    env: {
      home: '/',
      login: '/login',
      profile: '/profile',
      defaultPassword: "123456",
    },
  },
});
