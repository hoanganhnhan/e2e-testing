require('cypress-xpath');
Cypress.Commands.add("acceptAlert", (type, msg) => {
  cy.on(type, (txt) => {
    expect(txt).to.contains(msg);
    return true;
  });
});

Cypress.Commands.add("login", (email, password) => {
  cy.log("Navigating to the login page...");
  cy.visit(`${Cypress.env("home")}/login`);
  cy.wait(1000);
  cy.get('input[id="email"]', { timeout: 10000 })
    .should("be.visible")
    .clear()
    .type(email, { force: true });

  cy.get('input[id="password"]')
    .should("be.visible")
    .clear()
    .type(password, { force: true });

  cy.get('button').contains("Sign In").click({ force: true });
});

Cypress.Commands.add("logout", () => {
  cy.log("Logging out...");
  cy.get("#username", { timeout: 10000 }).click({ force: true }); // Open dropdown menu
  cy.get('a').contains("Logout").click({ force: true }); // Click logout button
});