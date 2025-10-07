import baseTest from '@playwright/test';

import { LoginPage } from "@pages/LoginPage"
import { ArticleContainer } from '@pages/ArticleContainer';
import { DocumentsPage } from '@pages/DocumentsPage';
import { RoomPage } from '@pages/RoomPage';
import { testUrls } from './Urls';

type pages = {
    loginPage: LoginPage;
    articleContainer: ArticleContainer;
    documentsPage: DocumentsPage;
    roomPage: RoomPage;
}

const test = baseTest.extend<pages, {checkTokenIsAliveAndRefresh: string}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(testUrls.loginPage);
        await loginPage.signInButton.waitFor({ state: 'visible' });
        await use(new LoginPage(page));
    },
    articleContainer: async ({ page }, use) => {
        await use(new ArticleContainer(page));
    },
    documentsPage: async ({ page }, use) => {
        await use(new DocumentsPage(page));
    },
    roomPage: async ({ page }, use) => {
        await use(new RoomPage(page));
    },
});

export default test;