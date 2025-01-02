export const signupPage = {
    TXT_NAME: "#name",
    TXT_EMAIL: "#email",
    TXT_PASSWORD: "#password",
    TXT_CONFIRM_PASSWORD: "#confirmPassword",

    BTN_TOASTIFY: ".Toastify button",
    TXT_TOASTIFY: ".Toastify .Toastify__toast-body div+div",

    typeUsername(username) {
        cy.get(this.TXT_NAME).type(username);
        return this;
    },

    typeEmail(email) {
        cy.get(this.TXT_EMAIL).type(email);
        return this;
    },

    typePassword(password) {
        cy.get(this.TXT_PASSWORD).type(password);
        return this;
    },

    typeConfirmPassword(password) {
        cy.get(this.TXT_CONFIRM_PASSWORD).type(password);
        return this;
    },

    inputSignUp(username, email, password, confirmPassword) {
        if (username != "") {
            this.typeUsername(username);
        }
        if (email != "") {
            this.typeEmail(email);
        }
        if (password != "") {
            this.typePassword(password);
        }
        if (confirmPassword != "") {
            this.typeConfirmPassword(confirmPassword);
        }
        return this;
    },

    clickSignUp() {
        cy.get('button').contains('Sign Up').click({ force: true });
        return this;
    },

    clickSignIn() {
        cy.get('a').contains('Sign-In').click({ force: true });
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
        let check_field = this.TXT_NAME;
        if (field == "email") {
            check_field = this.TXT_EMAIL;
        }
        else if (field == "password") {
            check_field = this.TXT_PASSWORD;
        }

        cy.get(check_field).then(($input) => {
            expect($input[0].validationMessage).to.contains(error);
        })

        return this;
    }

}