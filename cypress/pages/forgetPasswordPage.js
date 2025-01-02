export const forgetPasswordPage = {
    TXT_EMAIL: "#email",
    BTN_TOASTIFY: ".Toastify button",
    TXT_TOASTIFY: ".Toastify .Toastify__toast-body div+div",

    typeEmail(email) {
        if (email != "") {
            cy.get(this.TXT_EMAIL).type(email);
        }
        return this;
    },

    clickSubmit() {
        cy.get('button').contains('submit').click({ force: true });
        return this;
    },

    isNotificationCorrect(error) {
        cy.get(this.TXT_TOASTIFY).contains(error).should('have.length', 1);
        return this;
    },

    clickCloseToastifyButton() {
        cy.get(this.BTN_TOASTIFY).click({ force: true });
        return this;
    },

    checkErrorMessage(error) {
        cy.get(this.TXT_EMAIL).then(($input) => {
            expect($input[0].validationMessage).to.contains(error);
        })

        return this;
    }
}

export const resetPasswordPage = {
    TXT_PASSWORD: "#password",
    TXT_CONFIRM_PASSWORD: "#confirmPassword",

    BTN_TOASTIFY: ".Toastify button",
    TXT_TOASTIFY: ".Toastify .Toastify__toast-body div+div",


    typePassword(password) {
        cy.get(this.TXT_PASSWORD).type(password);
        return this;
    },

    typeConfirmPassword(password) {
        cy.get(this.TXT_CONFIRM_PASSWORD).type(password);
        return this;
    },

    inputResetPassword(password, confirmPassword) {
        if (password != "") {
            this.typePassword(password);
        }
        if (confirmPassword != "") {
            this.typeConfirmPassword(confirmPassword);
        }
        return this;
    },

    clickResetPassword() {
        cy.get('button').contains('Reset Password').click({ force: true });
        return this;
    },

    isNotificationCorrect(error) {
        cy.get(this.TXT_TOASTIFY).contains(error).should('have.length', 1);
        return this;
    },

    clickCloseToastifyButton() {
        cy.get(this.BTN_TOASTIFY).click({ force: true });
        return this;
    },

    checkErrorMessage(error) {
        cy.get(this.TXT_PASSWORD).then(($input) => {
            expect($input[0].validationMessage).to.contains(error);
        })
        return this;
    }
}