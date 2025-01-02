export const placeOrderPage = {

    // SHIPPING ADDRESS
    TXT_ADDRESS: "#address",
    TXT_CITY: "#city",
    TXT_POSTAL: "#postalCode",
    TXT_COUNTRY: "#country",

    typeAddress(address) {
        cy.get(this.TXT_ADDRESS).clear().type(address);
        return this;
    },
    typeCity(city) {
        cy.get(this.TXT_CITY).clear().type(city);
        return this;
    },
    typePostalCode(postalCode) {
        cy.get(this.TXT_POSTAL).clear().type(postalCode);
        return this;
    },
    typeCountry(country) {
        cy.get(this.TXT_COUNTRY).clear().type(country);
        return this;
    },

    typeShippingInfo(order) {

        if (order.address != "") {
            this.typeAddress(order.address);
        }
        if (order.city != "") {
            this.typeCity(order.city);
        }
        if (order.postalCode != "") {
            this.typePostalCode(order.postalCode);
        }
        if (order.country != "") {
            this.typeCountry(order.country);
        }
        return this;
    },

    checkErrorMessage(error, field) {
        let check_field;

        if (field == "address") {
            check_field = this.TXT_ADDRESS;
        }
        else if (field == "city") {
            check_field = this.TXT_CITY;
        }
        else if (field == "postalCode") {
            check_field = this.TXT_POSTAL;
        }
        else if (field == "country") {
            check_field = this.TXT_COUNTRY;
        }

        cy.get(check_field).then(($input) => {
            expect($input[0].validationMessage).to.contains(error);
        })

        return this;
    },

    // PAYMENT
    BTN_PAYPAL: "#PayPal",
    BTN_STRIPE: "#Stripe",

    clickPayment(payment) {
        if (payment == 'PayPal') {
            cy.get(this.BTN_PAYPAL).click({ force: true });
        }
        else {
            cy.get(this.BTN_STRIPE).click({ force: true });
        }
        return this;
    },

    clickBtnContinue() {
        cy.get('button').contains('Continue').click({ force: true });
        return this;
    },


    // PREVIEW ORDER
    TITLE: 'h2',

    clickEditShipping() {
        cy.get(this.TITLE).contains('Shipping').siblings('a').click({ force: true });
        return this;
    },

    clickEditPayment() {
        cy.get(this.TITLE).contains('Payment').siblings('a').click({ force: true });
        return this;
    },

    clickEditOrderItem() {
        cy.get(this.TITLE).contains('Items').siblings('a').click({ force: true });
        return this;
    },

    isShippingCorrect(address, city, postalCode, country) {
        let str = 'Address:' + address + ', ' + city + ' ' + postalCode + ', ' + country;
        cy.get(this.TITLE).contains('Shipping').siblings('p')
            .should('contain.text', str);

        return this;
    },

    isPaymentCorrect(payment) {
        cy.get(this.TITLE).contains('Payment Method').parent().should('contain.text', payment);
        return this;
    },

    isOrderItemsCorrect(products) {
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            // Verify name
            cy.get(this.TITLE).contains('Items').next().find('a').contains(product.name)
                .should('have.length', 1);
            // Verify count
            cy.get(this.TITLE).contains('Items').next().find('a').contains(product.name)
                .parent().next().should('contain.text', product.quantity);
            // Verify price
            cy.get(this.TITLE).contains('Items').next().find('a').contains(product.name)
                .parent().next().should('contain.text', "$" + product.price);
        }
        return this;
    },


    isOrderSummaryCorrect(order) {

        let itemsPrice = order.itemsPrice;
        let shippingPrice = order.shippingPrice;
        let taxPrice = order.taxPrice;
        let totalPrice = order.totalPrice;

        // Verify items price
        cy.get(this.TITLE).contains('Order Summary').parent().next().find('.col')
            .contains('Items').next().should('contain', `$${itemsPrice}`);
        // Verify shipping 
        cy.get(this.TITLE).contains('Order Summary').closest('div.list-group.list-group-flush')
            .children().find('.col').contains('Shipping').next()
            .should('contain', `$${shippingPrice}`);
        // Verify tax 
        cy.get(this.TITLE).contains('Order Summary').closest('div.list-group.list-group-flush')
            .children().find('.col').contains('Tax').next()
            .should('contain', `$${taxPrice}`);
        // Verify total
        cy.get(this.TITLE).contains('Order Summary').closest('div.list-group.list-group-flush')
            .children().find('.col').contains('Total').next()
            .should('contain', `$${totalPrice}`);

        return this;
    },

    isOrderCorrect(order) {
        this.isShippingCorrect(
            order.shippingAddress.address,
            order.shippingAddress.city,
            order.shippingAddress.postalCode,
            order.shippingAddress.country);
        this.isPaymentCorrect(order.paymentMethod);
        this.isOrderItemsCorrect(order.orderItems);
        this.isOrderSummaryCorrect(order);
        return this;
    },

    inputOrder(order) {
        this.typeShippingInfo(order.shippingAddress)
        this.clickBtnContinue()
        this.clickPayment(order.paymentMethod)
        this.clickBtnContinue()
        // this.isOrderCorrect(order)
        return this;
    },

    clickPlaceOrderBtn() {
        cy.get('button').contains('Place Order').click({ force: true });
        return this;
    },
}