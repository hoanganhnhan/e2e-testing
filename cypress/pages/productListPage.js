export const productListPage = {

    BTN_PRODUCT: ".card-body a div",

    clickProduct(product) {
        cy.get(this.BTN_PRODUCT).contains(product.name).click({ force: true });
        return this;
    },

    isOutOfStock(productName) {
        cy.get(this.BTN_PRODUCT).contains(productName).parent().siblings('button')
            .should('have.text', 'Out of stock')
            .should('be.disabled');
        return this;
    },

    clickBrand() {
        cy.get('.navbar-brand').click();
    }

}