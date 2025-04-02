import { TestHelper } from "@common/helpers/ui/test.helper";
import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

class ProductDetailPage extends BasePage {

    readonly addToCartButton: Locator;

    readonly successMessageText: Locator;

    readonly productPriceText: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: `Add to Cart` })
        this.successMessageText = page.getByRole('alert')
        this.productPriceText = page.locator('//span[@data-price-type="finalPrice"]/span[@class="price"]').first();
    }


    async selectProductSize(size: string) {
        const sizeLocator = this.page.getByRole('option', { name: `${size}`, exact: true })
        await sizeLocator.waitFor({ state: 'visible' });
        await sizeLocator.click();
    }

    async selectProductColor(color: string) {
        const sizeLocator = this.page.getByRole('option', { name: `${color}`, exact: true })
        await sizeLocator.waitFor({ state: 'visible' });
        await sizeLocator.click();
    }

    async buyAProduct(size: string, color: string) {
        await this.selectProductSize(size);
        await this.selectProductColor(color);
        await this.addToCartButton.click();
        await this.successMessageText.waitFor({ state: 'visible' });
    }

    async getPrice() {
        const priceText = await this.productPriceText.innerText();
        return priceText.replace(/[^0-9.]/g, "");
    }

}

export { ProductDetailPage };
