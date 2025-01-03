import { profilePage } from "../pages/profilePage";

let password = Cypress.env("defaultPassword"); // Track updated password globally

describe("Password Change Tests", () => {
  beforeEach(() => {
    cy.fixture("passwordChangeData").as("passwordChangeData");
    cy.visit(Cypress.env("login"));
    cy.get("@passwordChangeData").then((data) => {
      const email = data.user.email;
      cy.login(email, password); // Use the tracked updated password
    });
  });

  after(() => {
    profilePage.clickCloseToastifyButton();
    cy.wait(3000);
    cy.logout();
    cy.wait(2000);
  });

  it("Verify successful password change", () => {
    cy.wait(1000);
    cy.get("@passwordChangeData").then((data) => {
      profilePage.navigateToProfile();
      profilePage
        .updateNewPassword(data.valid.newPassword)
        .confirmNewPassword(data.valid.newPassword)
        .clickUpdateProfileButton();

      profilePage.isNotificationCorrect(data.valid.successMessage);

      password = data.valid.newPassword; // Update the global password tracker
    });
  });

  it("Verify unsuccessful password change with duplicate passwords", () => {
    cy.wait(1000);
    cy.get("@passwordChangeData").then((data) => {
      profilePage.navigateToProfile();
      profilePage
        .updateNewPassword(data.duplicate.newPassword)
        .confirmNewPassword(data.duplicate.newPassword)
        .clickUpdateProfileButton()
        .checkErrorMessage(data.duplicate.errorMessage)
    });
    cy.wait(3000);
  });

  it("Verify new password validation", () => {
    cy.get("@passwordChangeData").then((data) => {
      profilePage.navigateToProfile();
      profilePage
        .updateNewPassword(data.invalid.newPassword)
        .confirmNewPassword(data.invalid.newPassword)
        .clickUpdateProfileButton()
        .isNotificationCorrect(data.invalid.passwordError)
    });
  });
});