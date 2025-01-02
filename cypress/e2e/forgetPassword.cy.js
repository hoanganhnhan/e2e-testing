import { forgetPasswordPage, resetPasswordPage } from "../pages/forgetPasswordPage";
import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";

describe("Reset Password successfully", () => {
    beforeEach(() => {
        cy.fixture("forgetPasswordData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        loginPage.clickResetPassword()
        cy.wait(500);
    });

    it("Reset Password successfully", () => {
        cy.get("@data").then((data) => {
            forgetPasswordPage
                .typeEmail(data.valid.email)
                .clickSubmit();
            
            resetPasswordPage
                .inputResetPassword(data.valid.password, data.valid.confirmPassword)
                .clickResetPassword();

            loginPage
                .isNotificationCorrect(data.valid.message)
                .inputSignIn(data.valid.email, data.valid.password)
                .clickLogin()

            navBar.isUserNameCorrect(data.valid.name);
        });
    });
});

describe("Can not Reset Password", () => {
    beforeEach(() => {
        cy.fixture("forgetPasswordData").as("data");
        cy.visit(Cypress.env("home"));
        navBar.clickSignIn();
        loginPage.clickResetPassword()
        cy.wait(500);
    });

    const user = require('../fixtures/forgetPasswordData.json');
    const invalidEmail = user.invalidEmail;
    const invalidPassword = user.invalidPassword;

    invalidEmail.forEach((data) => {
        it(data.testName, () => {
            forgetPasswordPage
                .typeEmail(data.email)
                .clickSubmit();

            if (data.error.errorField == "toastify") {
                forgetPasswordPage
                    .isNotificationCorrect(data.error.errorMessage)
                    .clickCloseToastifyButton();
            }
            else {
                forgetPasswordPage.checkErrorMessage(data.error.errorMessage);
            }

        });
    })

    invalidPassword.forEach((data) => {
        it(data.testName, () => {
            forgetPasswordPage
                .typeEmail(data.email)
                .clickSubmit();

            resetPasswordPage
                .inputResetPassword(data.password, data.confirmPassword)
                .clickResetPassword();

            if (data.error.errorField == "toastify") {
                resetPasswordPage
                    .isNotificationCorrect(data.error.errorMessage)
                    .clickCloseToastifyButton();
            }
            else {
                resetPasswordPage.checkErrorMessage(data.error.errorMessage);
            }

        });
    })
});