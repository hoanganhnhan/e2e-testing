export const orderHistoryPage = {

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

}
