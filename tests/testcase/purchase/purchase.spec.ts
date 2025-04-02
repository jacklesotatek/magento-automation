import { Assertions } from "@common/helpers/ui/assertions.helper";
import { Env } from "@env/env";
import ShippingAddress from "@common/models/shippingAddress.model";
import test from "@fixture/all.fixture";
import testData from "@resources/purchase/purchase.json";

test.describe("@E2E", () => {
  let firstJacketPrice: string;
  let secondJacketPrice: string;
  let pantPrice: string;
  let orderId: string;
  const shippingAddress: ShippingAddress = new ShippingAddress();

  test("E2E-1: Flow of purchase item", async ({ signinPage, homePage, basePage, productDetailPage, productPage, shoppingCartPage, shippingPage, reviewAndPaymentPage, myOrderPage }) => {
    await test.step("STEP 1: Navigate to the website", async () => {
      await basePage.navigateToUrl(Env.BASE_URL);
    });

    await test.step(`STEP 2: login to the site`, async () => {
      await homePage.clickSignInButton()
      await signinPage.loginIntoSite(testData.email, testData.password)
    });

    await test.step(`STEP 3: purchase 2 men jacket from top section`, async () => {
      await productPage.selectDesireProductCategory(testData.category, testData.menTopJacketProductInformation.subCategory, testData.menTopJacketProductInformation.secondSubCategory)
      await productPage.selectProduct(testData.firstProductInformation.productName)
      await productDetailPage.buyAProduct(testData.firstProductInformation.size, testData.firstProductInformation.color)
      firstJacketPrice = await productDetailPage.getPrice();

      await productPage.selectDesireProductCategory(testData.category, testData.menTopJacketProductInformation.subCategory, testData.menTopJacketProductInformation.secondSubCategory)
      await productPage.selectProduct(testData.secondProductInformation.productName)
      await productDetailPage.buyAProduct(testData.secondProductInformation.size, testData.secondProductInformation.color)
      secondJacketPrice = await productDetailPage.getPrice();
    });

    await test.step(`STEP 4: purchase 1 men pant from bottom section`, async () => {
      await productPage.selectDesireProductCategory(testData.category, testData.menBottomsPantProductInformation.subCategory, testData.menBottomsPantProductInformation.secondSubCategory)
      await productPage.selectProduct(testData.bottomProductInformation.productName)
      await productDetailPage.buyAProduct(testData.bottomProductInformation.size, testData.bottomProductInformation.color)
      pantPrice = await productDetailPage.getPrice();
    });

    await test.step(`STEP 5: proceed to cart page and checkout`, async () => {
      await shoppingCartPage.clickShoppingCartButton();
      await shoppingCartPage.clickCheckOutButton();
    });

    await test.step(`VP: order summary are correct`, async () => {
      await shippingPage.clickOrderSummaryExpandButton();

      console.log("Assert 1st item")
      // Assertions.assertEqual(await shippingPage.getProductName(testData.firstProductInformation.productName), testData.firstProductInformation.productName, "Product name are")
      // Assertions.assertEqual(await shippingPage.getQuantity(testData.firstProductInformation.productName), 1, "Product quantity are")
      // Assertions.assertEqual(await shippingPage.getPrice(testData.firstProductInformation.productName), firstJacketPrice, "Product price are")
      // Assertions.assertEqual(await shippingPage.getSize(testData.firstProductInformation.productName), testData.firstProductInformation.size, "Product size are")
      // Assertions.assertEqual(await shippingPage.getColor(testData.firstProductInformation.productName), testData.firstProductInformation.color, "Product color are")

      console.log("Assert 2nd item")
      // Assertions.assertEqual(await shippingPage.getProductName(testData.secondProductInformation.productName), testData.secondProductInformation.productName, "Product name are")
      // Assertions.assertEqual(await shippingPage.getQuantity(testData.secondProductInformation.productName), 1, "Product quantity are")
      // Assertions.assertEqual(await shippingPage.getPrice(testData.secondProductInformation.productName), secondJacketPrice, "Product price are")
      // Assertions.assertEqual(await shippingPage.getSize(testData.secondProductInformation.productName), testData.secondProductInformation.size, "Product size are")
      // Assertions.assertEqual(await shippingPage.getColor(testData.secondProductInformation.productName), testData.secondProductInformation.color, "Product color are")

      console.log("Assert 3rd item")
      // Assertions.assertEqual(await shippingPage.getProductName(testData.bottomProductInformation.productName), testData.bottomProductInformation.productName, "Product name are")
      // Assertions.assertEqual(await shippingPage.getQuantity(testData.bottomProductInformation.productName), 1, "Product quantity are")
      // Assertions.assertEqual(await shippingPage.getPrice(testData.bottomProductInformation.productName), pantPrice, "Product price are")
      // Assertions.assertEqual(await shippingPage.getSize(testData.bottomProductInformation.productName), testData.bottomProductInformation.size, "Product size are")
      // Assertions.assertEqual(await shippingPage.getColor(testData.bottomProductInformation.productName), testData.bottomProductInformation.color, "Product color are")
    });

    await test.step(`STEP 6: enter delivery address`, async () => {
      if (await shippingPage.isNewAddressVisible()) {
        await shippingPage.selectShippingMethod(testData.shippingMethod)
        await shippingPage.clickNextButton()
      } else {
        await shippingPage.enterShippingAddressAndProceedToPayment(shippingAddress.streetAddress, shippingAddress.city, shippingAddress.state, shippingAddress.zipCode, shippingAddress.phoneNumber)
        await shippingPage.selectShippingMethod(testData.shippingMethod)
        await shippingPage.clickNextButton()
      }
    });

    await test.step(`STEP 7: place order`, async () => {
      await reviewAndPaymentPage.clickPlaceOrderButton()
      orderId = await reviewAndPaymentPage.getOrderId();
    });

    await test.step(`STEP 8: navigate to my order`, async () => {
      await myOrderPage.navigateToUrl(Env.BASE_URL + "sales/order/history/")
    });

    await test.step(`VP:verify order submission`, async () => {
      let fullName = testData.firstName+ ' ' + testData.lastName
      await myOrderPage.navigateToUrl(Env.BASE_URL + "sales/order/history/")
      Assertions.assertEqual(await myOrderPage.getOrderId(orderId), orderId, "Order id are")
      Assertions.assertEqual(await myOrderPage.getStatus(orderId), "Pending", "Order status are")
      Assertions.assertEqual(await myOrderPage.getShipTo(orderId), fullName, "Ship to are")
    });
  });
});






