export const navBar = {

    BTN_NAV_DROPDOWN: "#username",
    BTN_NAV: "#basic-navbar-nav a",
    BTN_NAV_CATEGORY: "nav button",
    BTN_NAV_CATEGORY_ITEM: ".nav-item a",
    BTN_ADMIN: "#adminmenu",
    TXT_CARD_COUNT: "#basic-navbar-nav a span",


    clickViewCart() {
        cy.get(this.BTN_NAV).contains('Cart').click({ force: true });
        return this;
    },

    clickSignIn() {
        cy.get(this.BTN_NAV).contains('Sign In').click({ force: true });
        return this;
    },

    clickNavDropDown() {
        cy.get(this.BTN_NAV_DROPDOWN).click({ force: true });
        return this;
    },

    clickUserProfile() {
        cy.get('a').contains('Profile').click({ force: true });
        return this;
    },

    clickAdminMenu() {
        cy.get(this.BTN_ADMIN).click({ force: true });
        return this;
    },
    clickOrders() {
        cy.get('a').contains('Orders').click({ force: true });
        return this;
    },

    isProductCountInCartCorrect(numItems) {
        if (numItems > 0) {
            cy.get(this.TXT_CARD_COUNT).should('have.text', numItems);
        } else {
            cy.get(this.BTN_NAV).contains('Cart').children().should('have.length', 0);
        }
        return this;
    },

    isUserNameCorrect(name) {
        cy.get('#username').should('have.text', name);
        return this;
    }

}