export const productDetailPage = {
    TXT_PRODUCT_NAME: ".list-group-item h1",
    TXT_PRODUCT_STATUS: ".list-group-item .row .col",
    BTN_ADD_TO_CART: "//button[(text()='Add To Cart')]",

    isAddToCartBtnNotExist() {
        cy.xpath(this.BTN_ADD_TO_CART).should('be.disabled');
        return this;
    },

    clickAddToCart() {
        cy.xpath(this.BTN_ADD_TO_CART).click({ force: true });
        return this;
    },

    isProductOutOfStock(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-plus-circle"]')
            .parent().should('be.disabled');
        return this;
    },

}