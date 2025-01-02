import { orderHistoryPage } from "../pages/orderHistoryPage";
import { orderDetailPage } from "../pages/orderDetailPage"
import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";
import { payOrder } from "../pages/payOrder";

describe("Pay an order Successfully", () => {
    beforeEach(() => {
        cy.fixture("signInData").as("accounts");
        cy.visit(Cypress.env("home"));
        cy.get("@accounts").then((accounts) => {
            let account = accounts.valid
            navBar.clickSignIn();
            cy.wait(500);
            loginPage
                .inputSignIn(account.email, account.password)
                .clickLogin();
            cy.wait(500);
        });
    });

    it('with Valid PayPal account', () => {
        cy.fixture("payment").as("payPalAccount");
        cy.fixture("listOrderID").as("orderIDs");
        cy.get("@orderIDs").then((orderIDs) => {
            let orderID = orderIDs.valid[1].orderID;
            navBar
                .clickNavDropDown()
                .clickUserProfile();
            cy.wait(2000);
            cy.log
            orderHistoryPage
                .clickViewOrderDetail(orderID)
        });
        cy.get("@payPalAccount").then((payPalAccount) => {
            let ppAccount = payPalAccount.valid;
            payOrder
                .payOrder(ppAccount)
            orderDetailPage
                .isOrderPaid()
        });
    })
});