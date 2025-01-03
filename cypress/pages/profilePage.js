export const profilePage = {

    NAME_FIELD: "#name",
    EMAIL_ADDRESS_FIELD: "#email",


    isUserNameCorrect(name) {
        cy.get(this.NAME_FIELD).should('have.value', name);
        return this;
    },
    isUserEmailCorrect(email) {
        cy.get(this.EMAIL_ADDRESS_FIELD).should('have.value', email);
        return this;
    }
    ,
    isOrderDisplayedCorrectly(orderID) {
        cy.get('tr').last().then(($lastRow) => {
            const text = $lastRow.children().first().text();
            cy.log(text);
            expect(text).to.include(orderID);
        });
        return this;
    },

    clickViewOrderDetail(orderID) {

        cy.get('tr').each(($el, index, $list) => {
            let text = $el.children().first().text();
            cy.log(text);
            if (text.includes(orderID)) {
                cy.get('td').contains(`${orderID}`).parent().children().last().click();
                cy.wait(1000);
            };
        });

        return this;
    },

    navigateToProfile() {
        // Wait for the Toastify notification to disappear
        cy.get(".Toastify__toast-container", { timeout: 10000 }).should(
            "not.exist"
        );

        // Open the dropdown menu
        cy.get("#username").click({ force: true });

        // Click on the 'Profile' link in the dropdown
        cy.contains("a", "Profile").click({ force: true });

        return this;
    },

    updateFullName(name) {
        cy.get('input[id="name"]').clear().type(name);
        return this;
    },

    updateEmail(email) {
        // Ensure the email input is not disabled before clearing and typing
        cy.get('input[id="email"]')
            .should("exist")
            .then(($input) => {
                if ($input.prop("disabled")) {
                    cy.log("Email input is disabled, enabling it...");
                    cy.get('input[id="email"]').invoke("prop", "disabled", false);
                }
                cy.get('input[id="email"]')
                    .clear({ force: true })
                    .type(email, { force: true });
            });
        return this;
    },
    clearFullName() {
        cy.get('input[id="name"]').clear();
        return this;
    },

    clearEmail() {
        cy.get('input[id="email"]').clear({ force: true });
        return this;
    },

    clickUpdateProfileButton() {
        cy.get("button").contains("Update").click({ force: true });
        return this;
    },


    // Update these methods to reflect the new UI
    updateNewPassword(newPassword) {
        cy.get('input[id="password"]').clear().type(newPassword);
        return this;
    },

    confirmNewPassword(password) {
        cy.get('input[id="confirmPassword"]').clear().type(password);
        return this;
    },

    isNotificationCorrect(message) {
        cy.get(".Toastify").contains(message).should("exist");
        return this;
    },

    clickCloseToastifyButton() {
        cy.get(".Toastify button").click({ force: true });
        return this;
    },

    checkErrorMessage(message) {
        cy.get(".error-message").contains(message).should("exist");
        return this;
    },

    isFullNameCorrect(name) {
        cy.get('input[id="name"]').should("have.value", name);
        return this;
    },

    isEmailCorrect(email) {
        cy.get('input[id="email"]').should("have.value", email);
        return this;
    },

}