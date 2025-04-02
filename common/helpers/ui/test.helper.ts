import { Locator } from "@playwright/test";

export class TestHelper {
  static async clickClearEnterTextBox(element: Locator, value: string) {
    await element.click();
    await element.clear();
    await element.fill(value);
  }
}