import { Assertions } from "@common/helpers/ui/assertions.helper";
import { TestHelper } from "@common/helpers/ui/test.helper";
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

class ShoppingCartPage extends BasePage {

    readonly shoppingCartButton: Locator;

    readonly checkOutButton: Locator;


    constructor(page: Page) {
        super(page);
        this.shoppingCartButton = page.getByText("My Cart").first()
        this.checkOutButton = page.getByRole('button', { name: 'Proceed to Checkout' })
    }

    async clickShoppingCartButton() {
        await this.shoppingCartButton.click();
    }

    async clickCheckOutButton() {
        await this.checkOutButton.click();
    }

}

export { ShoppingCartPage };
