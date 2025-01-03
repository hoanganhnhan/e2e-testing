export const loginPage = {
    TXT_USERNAME: "#email",
    TXT_PASSWORD: "#password",
    BTN_TOASTIFY: ".Toastify button",
    TXT_TOASTIFY: ".Toastify .Toastify__toast-body div+div",

    typeUsername(username) {
        cy.get(this.TXT_USERNAME).type(username);
        return this;
    },

    typePassword(password) {
        cy.get(this.TXT_PASSWORD).type(password);
        return this;
    },

    inputSignIn(email, password) {
        if (email != "") {
            this.typeUsername(email);
        }
        if (password != "") {
            this.typePassword(password);
        }
        return this;
    },

    clickLogin() {
        cy.get('button').contains('Sign In').click();
        return this;
    },

    clickSignUp() {
        cy.get('a[href="/register?redirect=/"]').click({ force: true });
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

    checkErrorMessage(error, field) {
        let check_field = this.TXT_USERNAME;
        if (field == "password") {
            check_field = this.TXT_PASSWORD;
        }

        cy.get(check_field).then(($input) => {
            expect($input[0].validationMessage).to.contains(error);
        })

        return this;
    }
}