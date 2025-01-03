import { profilePage } from "../pages/profilePage";
import { orderDetailPage } from "../pages/orderDetailPage"
import { navBar } from "../pages/navBar";
import { loginPage } from "../pages/loginPage";


describe("Mark as delivered Successfully", () => {
    beforeEach(() => {
        cy.fixture("signInData").as("accounts");
        cy.fixture("listOrderID").as("listOrderID");
        cy.visit(Cypress.env("home"));
        cy.get("@accounts").then((accounts) => {
            let account = accounts.admin
            navBar.clickSignIn();
            cy.wait(500);
            loginPage
                .inputSignIn(account.email, account.password)
                .clickLogin();
            cy.wait(500);
        });
        navBar
            .clickAdminMenu()
            .clickOrders();
        cy.wait(3000);
    });

    it("Admin can mark as delivered successfully", () => {

        cy.get("@listOrderID").then((ids) => {
            let id = ids.valid[1].orderID; //order is paid, and not deliverd
            profilePage
                .clickViewOrderDetail(id);
            cy.wait(500);
            orderDetailPage
                .isOrderPaid()
                .isOrderNotDelivered()
                .clickMarkAsDelivered()
                .isOrderDelivered()
            cy.wait(500);
        })
    })
});

describe("Can not mark as delivered", () => {
    beforeEach(() => {
        cy.fixture("signInData").as("accounts");
        cy.fixture("listOrderID").as("listOrderID");
        cy.visit(Cypress.env("home"));
    });

    it("For an order is Not Paid", () => {
        cy.get("@accounts").then((accounts) => {
            let account = accounts.admin
            navBar.clickSignIn();
            cy.wait(500);
            loginPage
                .inputSignIn(account.email, account.password)
                .clickLogin();
            cy.wait(500);
        });
        navBar
            .clickAdminMenu()
            .clickOrders();
        cy.wait(3000);
        cy.get("@listOrderID").then((ids) => {
            let id = ids.valid[2].orderID; //order is not paid
            profilePage
                .clickViewOrderDetail(id);
            cy.wait(500);
            orderDetailPage
                .isOrderNotPaid()
                .isOrderNotDelivered()
                .isBtnMarkAsDeliverdDisappeared()
            cy.wait(500);
        });

    });

    it("For an order that has already been delivered", () => {
        cy.get("@accounts").then((accounts) => {
            let account = accounts.admin
            navBar.clickSignIn();
            cy.wait(500);
            loginPage
                .inputSignIn(account.email, account.password)
                .clickLogin();
            cy.wait(500);
        });
        navBar
            .clickAdminMenu()
            .clickOrders();
        cy.wait(3000);
        cy.get("@listOrderID").then((ids) => {
            let id = ids.valid[0].orderID; //order has been delivered
            profilePage
                .clickViewOrderDetail(id);
            cy.wait(500);
            orderDetailPage
                .isOrderDelivered()
                .isBtnMarkAsDeliverdDisappeared()
            cy.wait(500);
        });
    });

    it("Customer can not mark as delivered", () => {
        cy.get("@accounts").then((accounts) => {
            let account = accounts.valid
            navBar.clickSignIn();
            cy.wait(500);
            loginPage
                .inputSignIn(account.email, account.password)
                .clickLogin();
            cy.wait(500);
        });
        //go to user profile -> order detail
        navBar
            .clickNavDropDown()
            .clickUserProfile();
        cy.wait(3000);
        cy.get("@listOrderID").then((ids) => {
            let id = ids.valid[3].orderID; //order is paid, and not deliverd
            profilePage
                .clickViewOrderDetail(id);
            cy.wait(500);
            orderDetailPage
                .isOrderPaid()
                .isOrderNotDelivered()
                .isBtnMarkAsDeliverdDisappeared()
            cy.wait(500);
        });
    });

});