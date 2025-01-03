import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";
import { profilePage } from "../pages/profilePage";

describe("View profile successfully", () => {
    beforeEach(() => {
        cy.fixture("signInData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        cy.wait(500);
    });

    it("View profile successfully with authenthicated user", function () {
        loginPage.inputSignIn(this.data.valid.email, this.data.valid.password);
        loginPage.clickLogin();
        navBar.clickNavDropDown();
        navBar.clickUserProfile();
        profilePage.isUserNameCorrect(this.data.valid.name);
        profilePage.isUserEmailCorrect(this.data.valid.email);

    });
});

