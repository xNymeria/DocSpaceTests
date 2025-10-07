import { Locator, Page } from "@playwright/test";


export class ArticleContainer {
    readonly page: Page;
    readonly articleContainer: Locator;
    readonly documentsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleContainer = this.page.getByTestId('article');
        this.documentsButton = this.page.getByRole('link', { name: 'Documents' });
    }
}
