import { cartPage } from "../pages/cartPage";
import { loginPage } from "../pages/loginPage";
import { navBar } from "../pages/navBar";
import { orderHistoryPage } from "../pages/orderHistoryPage";
import { placeOrderPage } from "../pages/placeOrderPage";
import { productDetailPage } from "../pages/productDetailPage";
import { productListPage } from "../pages/productListPage"
import { orderDetailPage } from "../pages/orderDetailPage"

describe("Place Order Successfully", () => {
    beforeEach(() => {
        cy.fixture("order").as("order");
        cy.visit(Cypress.env("home"));
    });

    it("Place order successfully", () => {
        cy.get("@order").then((orders) => {

            let order = orders.valid[0];
            for (let i = 0; i < order.orderItems.length; i++) {
                productListPage.clickProduct(order.orderItems[i]);
                productDetailPage.clickAddToCart();
                if (i != order.orderItems.length - 1) {
                    productListPage.clickBrand();
                }
            }

            cartPage.clickPlaceOrder();
            cy.wait(1000);

            loginPage
                .typeUsername(order.user.email)
                .typePassword(order.user.password)
                .clickLogin();

            cy.wait(1000);
            placeOrderPage
                .inputOrder(order)
                .isOrderCorrect(order)
                .clickPlaceOrderBtn()

            cy.wait(1000);
            cy.log("check order details after placed");

            orderDetailPage
                .isOrderDetailCorrect(order)

            cy.get('h1').then(($e) => {
                let orderId = $e.text();
                orderId = orderId.replace('Order ', '');
                cy.log("get after order", orderId);

                navBar
                    .clickNavDropDown()
                    .clickUserProfile();
                cy.wait(3000);
                orderHistoryPage
                    .isOrderDisplayedCorrectly(orderId)
                    .clickViewOrderDetail(orderId);

                cy.wait(500);

                orderDetailPage.isOrderIdCorrect(orderId);
                // placeOrderPage.isOrderCorrect(order);
            });

        });
    });

    it("Can place order when editing cart", () => {
        cy.get("@order").then((orders) => {

            let order = orders.valid[0];
            //login
            navBar.clickSignIn();
            loginPage
                .typeUsername(order.user.email)
                .typePassword(order.user.password)
                .clickLogin();
            cy.wait(1000);
            //add 2 item
            for (let i = 0; i < order.orderItems.length; i++) {
                productListPage.clickProduct(order.orderItems[i]);
                productDetailPage.clickAddToCart();
                if (i != order.orderItems.length - 1) {
                    productListPage.clickBrand();
                }
            }
            //remove 1 item
            cartPage
                .clickRemoveProduct(order.orderItems[0].name)
            cy.wait(1000);
            //change quantity
            cartPage
                .changeQuantity(order.orderItems[1], 2)
            cy.wait(1000);
            //check out and order
            cartPage.clickPlaceOrder();
            cy.wait(1000);
            placeOrderPage
                .inputOrder(order)
                .clickPlaceOrderBtn()

            cy.wait(1000);
            //check order details after placed
            orderDetailPage
                .isOrderDetailCorrect(orders.valid[2])

        });
    });

});


describe("Can not place order", () => {
    beforeEach(() => {
        cy.fixture("order").as("order");
        cy.visit(Cypress.env("home"));
        cy.get("@order").then((order) => {
            navBar.clickSignIn();
            cy.wait(500);
            loginPage
                .typeUsername(order.invalid.user.email)
                .typePassword(order.invalid.user.password)
                .clickLogin();
            cy.wait(500);

        });
    });

    it("when removing all products from cart", () => {
        cy.get("@order").then((orders) => {
            let order = orders.valid[0];
            for (let i = 0; i < order.orderItems.length; i++) {
                productListPage
                    .clickProduct(order.orderItems[i]);
                productDetailPage
                    .clickAddToCart();
                if (i == 0) {
                    productListPage.clickBrand();
                }
            }

            cartPage
                .clickRemoveAllProduct()
                .isCartEmpty();

        });
    });

    const order = require('../fixtures/order.json');
    const invalidOrder = order.invalid.shippingAddress;

    invalidOrder.forEach((data) => {
        it(data.testName, () => {
            //add 1 item to cart
            productListPage.clickProduct(order.valid[1].orderItems[0]);
            productDetailPage.clickAddToCart();
            cartPage.clickPlaceOrder();
            placeOrderPage
                .typeShippingInfo(data)
                .clickBtnContinue()
                .checkErrorMessage(data.error.errorMessage, data.error.errorField);
        });
    });
});
