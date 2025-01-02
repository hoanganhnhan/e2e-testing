export const profilePage = {
    TXT_VALUE: "form label",

    isEmailCorrect(email) {
        cy.get('form label').contains('Email').next('input').should('have.value', email);
        return this;
    }

}