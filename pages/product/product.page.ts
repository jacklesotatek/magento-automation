import { TestHelper } from "@common/helpers/ui/test.helper";
import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

class ProductPage extends BasePage {


    constructor(page: Page) {
        super(page);
    }

    async selectProductCategory(category: string) {
        const categoryLocator = this.page.locator(`//nav//li[a/span[text()='${category}']]`);
        await categoryLocator.waitFor({ state: 'visible' });
        await categoryLocator.hover();
    }

    async selectProductSubCategory(category: string, subCategory: string) {
        const subCategoryLocator = this.page.locator(`//nav//li[a/span[text()='${category}']]//a[span[text()='${subCategory}']]`);
        await subCategoryLocator.waitFor({ state: 'visible' });
        await subCategoryLocator.hover();
    }

    async select2ndProductSubCategory(category: string, subCategory: string, secondSubCategory: string) {
        const secondSubCategoryLocator = this.page.locator(`//nav//li[a/span[text()='${category}']]//a[span[text()='${subCategory}']]/../ul//a[span[text()='${secondSubCategory}']]`);
        await secondSubCategoryLocator.waitFor({ state: 'visible' });
        await secondSubCategoryLocator.click();
    }

    async selectDesireProductCategory(category: string, subCategory: string, secondSubCategory: string) {
        await this.selectProductCategory(category);
        await this.selectProductSubCategory(category, subCategory);
        await this.select2ndProductSubCategory(category, subCategory, secondSubCategory);
    }


    async selectProduct(productName: string) {
        const productLocator = this.page.getByAltText(`${productName}`);
        await productLocator.waitFor({ state: 'visible' });
        await productLocator.click();
    }
}

export { ProductPage };
