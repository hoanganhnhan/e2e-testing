import { navBar } from "./navBar";

export const cartPage = {

    //bỏ
    clickViewProductDetail(productName) {
        cy.get('.list-group').first().find('a').contains(productName).click({ force: true });
        return this;
    },

    clickRemoveAllProduct() {
        cy.get('button.btn.btn-light').its('length')
            .then((n) => {
                let count = n
                while (count > 0) {
                    cy.get('button.btn.btn-light').first().click({ force: true });
                    count = count - 1;
                    cy.wait(1000);
                }
            });

        return this;
    },

    //bỏ
    clickDeleteProductByName(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-trash"]')
            .parent().click({ force: true });
        return this;
    },

    clickRemoveProduct(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="btn btn-light"]').click({ force: true });
        return this;
    },

    changeQuantity(product, quantity) {
        cy.get('a').contains(product.name).parent().parent()
            .find('[class="form-control"]').select(quantity - 1)

    },

    //bỏ
    clickAddProduct(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-plus-circle"]')
            .parent().click({ force: true });
        return this;
    },

    clickGoBack() {
        cy.get('a').contains('Go Back').click({ force: true });
        return this;
    },

    //move to product detail
    isProductOutOfStock(productName) {
        cy.get('a').contains(productName).parent().parent().find('[class="fas fa-plus-circle"]')
            .parent().should('be.disabled');
        return this;
    },

    isSubtotalItemsCorrect(numItems, totalPrice) {
        //Verify total product count in cart
        cy.get('div.card h2').should('contain', `Subtotal (${numItems}) items`);
        //Verify total price
        cy.get('div.card h2').contains('Subtotal').parent().should('contain', `$${totalPrice}`);
        return this;
    },

    isCartEmpty() {
        //Verify Cart Status
        cy.get('h1').contains('Shopping Cart').next().should('contain', 'Your cart is empty');
        //Verify subtotal and price
        this.isSubtotalItemsCorrect(0, 0);
        //Verify button process to checkout disable
        cy.xpath('//button[text()="Proceed To Checkout"]').should('be.disabled');
        return this;
    },

    //bỏ
    isProductAddedCorrect(product, quantity) {
        // Verify name
        cy.get('.list-group').first().find('a').contains(product.name).should('have.length', 1);
        // Verify count
        cy.get('.list-group').first().find('a').contains(product.name).parent().next().children('span').should('have.text', quantity);
        // Verify price
        cy.get('.list-group').first().find('a').contains(product.name).parent().next().next().should('have.text', "$" + product.price);

        return this;
    },

    clickPlaceOrder() {
        cy.xpath('//button[text()="Proceed To Checkout"]').click({ force: true });
        return this;
    }

}