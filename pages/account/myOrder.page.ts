import { Assertions } from "@common/helpers/ui/assertions.helper";
import { TestHelper } from "@common/helpers/ui/test.helper";
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

class MyOrderPage extends BasePage {


    constructor(page: Page) {
        super(page);
    }

    async getOrderId(orderId: string) {
        return this.page.locator(`//td[@class='col id' and text()='${orderId}']`).first().innerText();
    }

    async getDate(orderId: string) {
        return this.page.locator(`//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Date']`).first().innerText();
    }

    async getShipTo(orderId: string) {
        return this.page.locator(`//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Ship To']`).first().innerText();
    }

    async getOrderTotal(orderId: string) {
        return this.page.locator(`//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Order Total']`).first().innerText();
    }

    async getStatus(orderId: string) {
        return this.page.locator(`xpath=//td[@class='col id' and text()='${orderId}']/parent::tr/td[@data-th='Status']`).first().innerText();
    }



}

export { MyOrderPage };
