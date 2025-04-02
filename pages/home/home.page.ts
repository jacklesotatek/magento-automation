import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

class HomePage extends BasePage {
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.getByRole("link", { name: "Sign In" });
  }

  async clickSignInButton() {
    await this.signInButton.waitFor({ state: "visible" });
    await this.signInButton.click();
  }
}

export { HomePage };
