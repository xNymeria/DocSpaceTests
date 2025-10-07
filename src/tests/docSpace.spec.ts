import test from '@fixtures/BasePages';
import { PropertyId } from '@pages/RoomPage';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';
import {nanoid} from 'nanoid';

dotenv.config();

test.beforeEach(async ({ loginPage }) => {
    await test.step('Авторизоваться на портале', async () => {
        await loginPage.signInButton.waitFor({ state: 'visible' });
        await loginPage.emailInput.fill(`${process.env.DOCSPACE_EMAIL}`);
        await loginPage.passwordInput.fill(`${process.env.DOCSPACE_PASSWORD}`);
        await loginPage.signInButton.click();
        await loginPage.page.waitForLoadState('load');
    });
});

test(`Sample Test`, async ({ articleContainer, documentsPage, roomPage }) => {
    // Create unique names for file and room
    const fileName = `TestFile_${nanoid(4)}`;
    const roomName = `Room for ${fileName}`;

    await test.step('Перейти в My Documents', async () => {
        await articleContainer.articleContainer.waitFor({ state: 'visible' });
        await articleContainer.documentsButton.click();
        await documentsPage.myDocumentsTab.click();
    });

    await test.step('Создать любой файл через Actions', async () => {
        await documentsPage.addButton.click();
        await documentsPage.actionsMenu.createNewDocumentOption.click();
        await documentsPage.newDocumentModal.modalDialog.waitFor({ state: 'visible' });
        await documentsPage.newDocumentModal.docNameInput.fill(fileName);
        
        // Открывается новая вкладка с файлом
        const [newPage] = await Promise.all([
            documentsPage.page.context().waitForEvent('page'),
            documentsPage.newDocumentModal.createButton.click()
        ]);
        // Ждем загрузки страницы и закрываем ее
        await newPage.waitForLoadState('load');
        await newPage.close();

        // Проверяем, что файл появился в списке
        await expect(documentsPage.getDocumentLinkByName(fileName), `Файл '${fileName}' найден в списке`).toBeVisible();
    });

    await test.step('Вызвать контекстное меню файла с помощью правой кнопки мыши', async () => {
        const fileLink = documentsPage.getDocumentLinkByName(fileName);
        await fileLink.click({ button: 'right' });
        await expect(documentsPage.contextMenu.contextMenuArea, 'Открылось контекстное меню файла').toBeVisible();
    });

    await test.step('Выбрать Create Room', async () => {
        await documentsPage.contextMenu.createRoomOption.click();
        await expect(documentsPage.createRoomModalDialog.modalDialog, 'Открылось модальное окно создания комнаты').toBeVisible();
    });

    await test.step('Создать Custom Room на основе созданного файла', async () => {
        await documentsPage.createRoomModalDialog.getRoomTypeByTitle('Custom room').click();
        await documentsPage.createRoomModalDialog.roomNameInput.fill(roomName);
        await documentsPage.createRoomModalDialog.createRoomButton.click();
        await expect(roomPage.infoPanel.infoPanelArea, 'Открылась страница созданной комнаты').toBeVisible();
    });

    await test.step('Проверить, что открылась страница созданной комнаты', async () => {
        await expect(roomPage.infoPanel.detailsTabContent.roomNameTitle, 'Название комнаты верное').toHaveText(roomName);
        await roomPage.infoPanel.detailsTab.click();
        expect(await roomPage.infoPanel.detailsTabContent.getTextPropertyById(PropertyId.Type), 'Тип комнаты верный').toBe('Custom');
    });

    await test.step('Проверить, что файл, из которого создавалась комната, находится в комнате', async () => {
        const documentLink = roomPage.getDocumentLinkByName(fileName);
        await expect(documentLink, `Файл '${fileName}' присутствует в комнате`).toBeVisible();
    });

});
