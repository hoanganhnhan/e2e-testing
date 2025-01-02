import { signupPage } from "../pages/signupPage";
import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";

describe("Sign up successfully", () => {
    beforeEach(() => {
        cy.fixture("signUpData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        loginPage.clickSignUp();
        cy.wait(500);
    });

    it("Sign Up with valid account", () => {
        cy.get("@data").then((data) => {
            signupPage
                .inputSignUp(data.valid.name, data.valid.email, data.valid.password, data.valid.confirmPassword)
                .clickSignUp();

            navBar.isUserNameCorrect(data.valid.name);
        });
    });
});

describe("Can not Sign Up with invalid account", () => {
    beforeEach(() => {
        cy.fixture("signUpData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        loginPage.clickSignUp();
        cy.wait(500);
    });

    const user = require('../fixtures/signUpData.json');
    const invalidAccount = user.invalid;

    invalidAccount.forEach((data) => {
        it(data.testName, () => {
            signupPage
                .inputSignUp(data.name, data.email, data.password, data.confirmPassword)
                .clickSignUp();

            if (data.error.errorField == "toastify") {
                signupPage
                    .isNotificationCorrect(data.error.errorMessage)
                    .clickCloseToastifyButton();
            }
            else {
                signupPage.checkErrorMessage(data.error.errorMessage, data.error.errorField);
            }

        });
    })
});