import { registerPage } from "../pages/registerPage";
import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";

describe("Sign up successfully", () => {
    beforeEach(() => {
        cy.fixture("registerData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        loginPage.clickSignUp();
        cy.wait(500);
    });

    it("Sign Up with valid account", () => {
        cy.get("@data").then((data) => {
            registerPage
                .inputSignUp(data.valid.name, data.valid.email, data.valid.password, data.valid.confirmPassword)
                .clickSignUp();

            navBar.isUserNameCorrect(data.valid.name);
        });
    });
});

describe("Can not Sign Up with invalid account", () => {
    beforeEach(() => {
        cy.fixture("registerData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        loginPage.clickSignUp();
        cy.wait(500);
    });

    const user = require('../fixtures/registerData.json');
    const invalidAccount = user.invalid;

    invalidAccount.forEach((data) => {
        it(data.testName, () => {
            registerPage
                .inputSignUp(data.name, data.email, data.password, data.confirmPassword)
                .clickSignUp();

            if (data.error.errorField == "toastify") {
                registerPage
                    .isNotificationCorrect(data.error.errorMessage)
                    .clickCloseToastifyButton();
            }
            else {
                registerPage.checkErrorMessage(data.error.errorMessage, data.error.errorField);
            }

        });
    })
});