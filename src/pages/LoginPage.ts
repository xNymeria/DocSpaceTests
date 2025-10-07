import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.getByTestId('email-input');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
    }
}
