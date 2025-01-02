import { cartPage } from "../pages/cartPage";
import { navBar } from "../pages/navBar";
import { productDetailPage } from "../pages/productDetailPage";
import { productListPage } from "../pages/productListPage"

describe("Add To Cart Successfully", () => {
    beforeEach(() => {
        cy.fixture("product").as("products");
        cy.visit(Cypress.env("home"));

    });

    it("Add to cart from Home", () => {
        cy.get("@products").then((products) => {
            let productList = products.inStockProduct;
            var totalPrice = 0;
            var totalProduct = 0;

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                totalPrice = totalPrice + product.quantity * product.price;

                for (let i = 0; i < product.quantity; i++) {
                    productListPage.clickAddProductToCart(product.name);
                    totalProduct = totalProduct + 1;
                    cy.wait(500);

                    navBar.isProductCountInCartCorrect(totalProduct);
                }
            }

            navBar.clickViewCart();
            cy.wait(1000);

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                cartPage.isProductAddedCorrect(product, product.quantity);
            }

            cartPage.isTotalCountCorrect(totalProduct, totalPrice);
        });
    });

    it("Add to cart from Product Detail", () => {
        cy.get("@products").then((products) => {
            let productList = products.inStockProduct;
            var totalPrice = 0;
            var totalProduct = 0;

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                let countProduct = 0;

                for (let i = 0; i < product.quantity; i++) {
                    productListPage.clickProduct(product.name);
                    cy.wait(500);
                    productDetailPage.clickAddToCart();

                    countProduct = countProduct + 1;
                    totalProduct = totalProduct + 1;
                    totalPrice = totalPrice + product.price;

                    cy.wait(500);

                    cartPage
                        .isProductAddedCorrect(product, countProduct)
                        .isTotalCountCorrect(totalProduct, totalPrice);

                    navBar
                        .isProductCountInCartCorrect(totalProduct)
                        .clickGoToHome();

                    cy.wait(500);
                }
            }
        });
    });

    it("Increase Product's Quantity from Cart page", () => {
        cy.get("@products").then((products) => {
            let productList = products.inStockProduct;
            var totalPrice = 0;
            var totalProduct = 0;

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                productListPage.clickAddProductToCart(product.name);
                totalProduct = totalProduct + 1;
                totalPrice = totalPrice + product.price;
            }

            navBar.clickViewCart();
            cy.wait(1000);

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                let countProduct = 1;

                for (let i = 0; i < product.quantity; i++) {
                    cartPage.clickAddProduct(product.name);

                    countProduct = countProduct + 1;
                    totalProduct = totalProduct + 1;
                    totalPrice = totalPrice + product.price;

                    cy.wait(400);
                    cartPage.isProductAddedCorrect(product, countProduct);
                    navBar.isProductCountInCartCorrect(totalProduct)
                    cartPage.isTotalCountCorrect(totalProduct, totalPrice);
                }
            }
        });
    });
});

describe("Remove From Cart Successfully", () => {
    beforeEach(() => {
        cy.fixture("product").as("products");
        cy.visit(Cypress.env("home"));
    });

    it("Remove Product from Cart page", () => {
        cy.get("@products").then((products) => {
            let productList = products.inStockProduct;
            var totalPrice = 0;
            var totalProduct = 0;

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                totalProduct = totalProduct + product.quantity;
                totalPrice = totalPrice + product.quantity * product.price;
                for (let i = 0; i < product.quantity; i++) {
                    productListPage.clickAddProductToCart(product.name);
                    cy.wait(500);
                }
            }

            navBar.clickViewCart();
            cy.wait(1000);

            for (let index = 0; index < productList.length; index++) {
                const product = productList[index];
                cartPage.clickRemoveProduct(product.name);

                if (product.quantity>1){
                    totalProduct = totalProduct - 1;
                    totalPrice = totalPrice - product.price;
                };
                
                cy.wait(500);
                navBar.isProductCountInCartCorrect(totalProduct);
                cartPage.isTotalCountCorrect(totalProduct, totalPrice);
            }
        });
    });
})

describe("Can not add product to cart", () => {
    beforeEach(() => {
        cy.fixture("product").as("products");
        cy.visit(Cypress.env("home"));
    });

    it("Out of stock", () => {
        cy.get("@products").then((products) => {
            productListPage
                .isOutOfStock('Adidas Fit Shirt')
                .clickProduct('Adidas Fit Shirt');
            cy.wait(500);
            productDetailPage
                .isProductDisplayCorrect('Adidas Fit Shirt', 0, false, 250)
                .isAddToCartBtnNotExist();
        });
    });

    //Can not add more product
    it("Exceed the quantity in stock", () => {
        cy.get("@products").then((products) => {
            let product = products.inStockProduct[2];
            for (let index = 0; index <= product.stock; index++) {
                productListPage.clickAddProductToCart(product.name)
                cy.wait(200);
            }
            cy.acceptAlert("window:confirm", "Sorry. Product is out of stock");
            cy.wait(400);
            productListPage.clickProduct(product.name);
            cy.wait(500);
            productDetailPage.clickAddToCart();
            cy.acceptAlert("window:confirm", "Sorry. Product is out of stock");

            navBar.clickViewCart();
            cy.wait(500);
            cartPage.isProductOutOfStock(product.name);
        });
    });
})


