import { Assertions } from "@common/helpers/ui/assertions.helper";
import { TestHelper } from "@common/helpers/ui/test.helper";
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

class SigninPage extends BasePage {

    readonly emailTextBox: Locator;

    readonly passwordTextBox: Locator;

    readonly signInButton: Locator;

    readonly loggedInStatus: Locator;

    constructor(page: Page) {
        super(page);
        this.emailTextBox = page.getByTitle("Email")
        this.passwordTextBox = page.getByTitle("Password")
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.loggedInStatus = page.locator(`(//span[@class='logged-in'])[1]`);
    }

    async fillEmailTextBox(email: string) {
        await TestHelper.clickClearEnterTextBox(this.emailTextBox, email)
    }

    async fillPasswordTextBox(password: string) {
        await TestHelper.clickClearEnterTextBox(this.passwordTextBox, password)
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async loginIntoSite(email: string, password: string) {
        await this.fillEmailTextBox(email);
        await this.fillPasswordTextBox(password);
        await this.clickSignInButton();
    }

}

export { SigninPage };
