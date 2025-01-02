import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";


describe("Sign In successfully", () => {
    beforeEach(() => {
        cy.fixture("signInData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        cy.wait(500);
    });

    it("Sign In with valid account", () => {
        cy.get("@data").then((data) => {
            loginPage
                .inputSignIn(data.valid.email, data.valid.password)
                .clickLogin();

            navBar.isUserNameCorrect(data.valid.name);
        });
    });
});

describe("Can not Sign In with invalid account", () => {
    beforeEach(() => {
        cy.fixture("signInData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        cy.wait(500);
    });

    const user = require('../fixtures/signInData.json');
    const invalidAccount = user.invalid;

    invalidAccount.forEach((data) => {
        it(data.testName, () => {
            loginPage
                .inputSignIn(data.email, data.password)
                .clickLogin();

            if (data.error.errorField == "toastify") {
                loginPage
                    .isNotificationCorrect(data.error.errorMessage)
                    .clickCloseToastifyButton();
            }
            else {
                loginPage.checkErrorMessage(data.error.errorMessage, data.error.errorField);
            }

        });
    })
});