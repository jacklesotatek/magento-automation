import { BasePage } from "@pages/base.page";
import { HomePage } from "@pages/home/home.page";
import { SigninPage } from "@pages/signIn/signIn.page";
import { ProductPage } from "@pages/product/product.page";
import { ProductDetailPage } from "@pages/product/productDetail.page";
import { ShoppingCartPage } from "@pages/shoppingCart/shoppingCart.page";
import { ShippingPage } from "@pages/checkout/shipping.page";
import { ReviewAndPaymentPage } from "@pages/checkout/reviewAndPayment.page";
import { MyOrderPage } from "@pages/account/myOrder.page";
import { test as baseTest } from "@playwright/test";

export type PageFixtureType = {
  homePage: HomePage;
  basePage: BasePage;
  signinPage: SigninPage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
  shoppingCartPage: ShoppingCartPage;
  shippingPage: ShippingPage;
  reviewAndPaymentPage: ReviewAndPaymentPage;
  myOrderPage: MyOrderPage;
};

type ExtendParams = Parameters<typeof baseTest.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  signinPage: async ({ page }, use) => {
    await use(new SigninPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  shippingPage: async ({ page }, use) => {
    await use(new ShippingPage(page));
  },

  reviewAndPaymentPage: async ({ page }, use) => {
    await use(new ReviewAndPaymentPage(page));
  },

  myOrderPage: async ({ page }, use) => {
    await use(new MyOrderPage(page));
  },
};
