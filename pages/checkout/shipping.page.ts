import { Assertions } from "@common/helpers/ui/assertions.helper";
import { TestHelper } from "@common/helpers/ui/test.helper";
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

class ShippingPage extends BasePage {

    readonly orderSummaryExpandButton: Locator;

    readonly streetAddressTextBox: Locator;

    readonly cityTextBox: Locator;

    readonly stateDropDown: Locator;

    readonly postalCodeTextBox: Locator;

    readonly phoneNumberTextBox: Locator;

    readonly nextButton: Locator;

    readonly newAddressButton: Locator;

    constructor(page: Page) {
        super(page);
        this.orderSummaryExpandButton = page.locator("//div[contains(@class, 'items-in-cart')]")
        this.streetAddressTextBox = page.locator("//input[@name='street[0]']")
        this.cityTextBox = page.locator("//input[@name='city']")
        this.stateDropDown = page.locator("//select[@name='region_id']")
        this.postalCodeTextBox = page.locator("//input[@name='postcode']")
        this.phoneNumberTextBox = page.locator("//input[@name='telephone']]")
        this.nextButton = page.getByRole('button', { name: 'Next' })
        this.newAddressButton = page.getByRole('button', { name: 'New Address' })
    }

    async clickOrderSummaryExpandButton() {
        await this.orderSummaryExpandButton.click();
    }

    async getProductName(productName: string) {
        return this.page.locator(`//strong[@class='product-item-name' and text()='${productName}']`).first().innerText();
    }

    async getQuantity(productName: string) {
        return this.page.locator(`//strong[text()='${productName}']/following-sibling::div[@class='details-qty']/span[@class='value']`).first().innerText();
    }

    async getPrice(productName: string) {
        return (await this.page.locator(`//strong[text()='${productName}']/ancestor::div[contains(@class, 'product-item')]/div[@class='subtotal']//span`).first().innerText()).replace(/[^0-9.]/g, "");
    }

    async getSize(productName: string) {
        return this.page.locator(`//strong[text()='${productName}']/ancestor::div[contains(@class, 'product-item')]//dl[@class='item-options']/dd[1]`).first().innerText();
    }

    async getColor(productName: string) {
        return this.page.locator(`//strong[text()='${productName}']/ancestor::div[contains(@class, 'product-item')]//dl[@class='item-options']/dd[2]`).first().innerText();
    }

    async fillStreetAddressTextBox(streetAddress: string) {
        await TestHelper.clickClearEnterTextBox(this.streetAddressTextBox, streetAddress)
    }

    async fillCityTextBox(city: string) {
        await TestHelper.clickClearEnterTextBox(this.cityTextBox, city)
    }

    async selectState(state: string) {
        await this.stateDropDown.selectOption(state);
    }

    async fillPostalCodeTextBox(postalCode: string) {
        await TestHelper.clickClearEnterTextBox(this.postalCodeTextBox, postalCode)
    }

    async fillPhoneNumber(phoneNumber: string) {
        await TestHelper.clickClearEnterTextBox(this.phoneNumberTextBox, phoneNumber)
    }

    async selectShippingMethod(shippingMethod: string) {
        const shippingMethodLocator = this.page.locator(`//td[contains(@class, 'col-carrier') and text()='${shippingMethod}']/parent::tr`);
        await shippingMethodLocator.waitFor({ state: 'visible' });
        await shippingMethodLocator.click();
    }

    async clickNextButton() {
        await this.nextButton.click();
    }

    async enterShippingAddressAndProceedToPayment(streetAddress: string, city: string, state: string, postalCode: string, phoneNumber: string) {
        await this.fillStreetAddressTextBox(streetAddress)
        await this.fillCityTextBox(city)
        await this.selectState(state)
        await this.fillPostalCodeTextBox(postalCode)
        await this.fillPhoneNumber(phoneNumber)
    }

    async isNewAddressVisible() {
        return await this.newAddressButton.isVisible();
    }
}

export { ShippingPage };
