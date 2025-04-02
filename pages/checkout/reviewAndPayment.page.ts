import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

class ReviewAndPaymentPage extends BasePage {
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.waitFor({ state: "visible" });
    await this.placeOrderButton.click();
  }

  async getOrderId() {
    return this.page
      .locator(
        `//div[@class='checkout-success']/p[contains(text(), 'Your order number is:')]/a/strong`
      )
      .first()
      .innerText();
  }
}

export { ReviewAndPaymentPage };
