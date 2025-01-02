import { placeOrderPage } from "./placeOrderPage";

export const orderDetailPage = {

    TITLE: 'h2',
    TXT_PAY_ALERT: '.alert',
    BTN_PAYPAL: 'div[data-funding-source="paypal"]',

    isOrderDetail() {
        cy.url().should('contain', 'http://localhost:3000/order/');
        return this;
    },

    isOrderDetailCorrect(order) {
        this.isOrderDetail();
        placeOrderPage.isOrderCorrect(order);
        return this;
    },

    clickPayPal() {
        cy.get('iframe').then($iframe => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find(this.BTN_PAYPAL).click({ force: true });
        });
        return this;
    },
    isOrderIdCorrect(orderId) {
        cy.get('h1').should('have.text', 'Order ' + orderId)
        return this;
    },

    isOrderPaid() {
        cy.get(this.TITLE).contains('Payment Method').parent().find('.alert').should('contain', 'Paid on');
        return this;
    },

    isOrderNotPaid() {
        cy.get(this.TITLE).contains('Payment Method').parent().find('.alert').should('contain', 'Not Paid');
        return this;
    },

    isOrderDelivered() {
        cy.get(this.TITLE).contains('Shipping').parent().find('.alert').should('contain', 'Delivered on');
        return this;
    },

    isOrderNotDelivered() {
        cy.get(this.TITLE).contains('Shipping').parent().find('.alert').should('contain', 'Not Delivered');
        return this;
    },

    clickMarkAsDelivered() {
        cy.get('button').contains('Mark As Delivered').click({ force: true });
        return this;
    },
    isBtnMarkAsDeliverdDisappeared() {
        cy.get('button').contains('Mark As Delivered').should('not.exist');
        return this;
    }
}