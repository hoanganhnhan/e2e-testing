export const productDetailPage = {
    TXT_PRODUCT_NAME: ".list-group-item h1",
    TXT_PRODUCT_STATUS: ".list-group-item .row .col",

    BTN_ADD_TO_CART: "//button[(text()='Add To Cart')]",

    BTN_TOASTIFY: ".Toastify button",
    TXT_TOASTIFY: ".Toastify .Toastify__toast-body div",

    BTN_SELECT_RATING: "#rating",
    TXT_INPUT_REVIEW: "#floatingTextarea",
    BTN_SUBMIT_REVIEW: "form button",
    TXT_TOTAL_REVIEW: ".row .rating span",

    // VIEW PRODUCT
    isNameCorrect(name) {
        cy.get(this.TXT_PRODUCT_NAME).should('have.text', name);
        return this;
    },

    isPriceCorrect(price) {
        cy.get(this.TXT_PRODUCT_NAME).parent().siblings().eq(1).should('have.text', "Pirce : $" + price);
        return this;
    },

    isTotalReviewCorrect(num) {
        cy.get(this.TXT_TOTAL_REVIEW).last().should('have.text', ' ' + num + ' reviews');
        return this;
    },

    isStatusCorrect(inStock) {
        if (inStock == false) {
            cy.get(this.TXT_PRODUCT_STATUS).contains('Status').next().children()
                .should('have.text', 'Unavailable');
        }
        else {
            cy.get(this.TXT_PRODUCT_STATUS).contains('Status').next().children()
                .should('have.text', "In Stock");
        }
        return this;
    },

    isProductDisplayCorrect(name, num, inStock, price) {
        this.isNameCorrect(name);
        this.isTotalReviewCorrect(num);
        this.isPriceCorrect(price);
        this.isStatusCorrect(inStock);
        return this;
    },

    // ADD TO CART
    isAddToCartBtnNotExist() {
        cy.xpath(this.BTN_ADD_TO_CART).should('have.length', 0);
        return this;
    },

    clickAddToCart() {
        cy.xpath(this.BTN_ADD_TO_CART).click({ force: true });
        return this;
    },

}