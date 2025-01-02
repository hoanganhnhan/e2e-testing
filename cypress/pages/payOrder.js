import { orderDetailPage } from "./orderDetailPage";
export const payOrder = {

    TXT_EMAIL: '#email',
    TXT_NEXT: '#btnNext',
    TXT_PASSWORD: '#password',
    BTN_LOGIN: '#btnLogin',
    BTN_PURCHASE: '#payment-submit-btn',


    inputPayPalAccount(email, password) {

        cy.window().then(win => {
            cy.wrap(win.document.body).wait(2000).url().should('contain', 'https://www.sandbox.paypal.com/');
            cy.wrap(win.document.body).wait(2000).find(this.TXT_EMAIL).should('exist').clear().type(email);
            cy.wrap(win.document.body).find(this.TXT_NEXT).click({ force: true });
            cy.wait(500);
            cy.wrap(win.document.body).find(this.TXT_PASSWORD).clear().type(password);
            cy.wrap(win.document.body).find(this.BTN_LOGIN).click({ force: true });
            cy.wait(1000);
        });
        return this;
    },

    payOrder(account) {
        orderDetailPage.isOrderNotPaid();
        orderDetailPage.clickPayPal();
        this.inputPayPalAccount(account.email, account.password);
        cy.get(this.BTN_PURCHASE).click({ force: true });
        return this
    },

}