import { Locator, Page } from "@playwright/test";

export class DocumentsPage {
    readonly page: Page;
    readonly myDocumentsTab: Locator;
    readonly contentArea: Locator;
    readonly addButton: Locator;
    readonly actionsMenu: ActionsMenu;
    readonly newDocumentModal: DocumentModalDialog;
    readonly contextMenu: ContextMenu;
    readonly createRoomModalDialog: CreateRoomModalDialog;

    constructor(page: Page) {
        this.page = page;
        this.myDocumentsTab = this.page.getByText('My documents');
        this.contentArea = this.page.locator('[class="section-wrapper-content"]');
        this.addButton = this.page.locator('[class="add-button"]');
        this.actionsMenu = new ActionsMenu(this);
        this.newDocumentModal = new DocumentModalDialog(this);
        this.contextMenu = new ContextMenu(this);
        this.createRoomModalDialog = new CreateRoomModalDialog(this);
    }

    getDocumentLinkByName(name: string): Locator {
        return this.contentArea.getByRole('link', { name });
    }

}

class ActionsMenu {
    readonly createNewDocumentOption: Locator;

    constructor(documentsPage: DocumentsPage) {
        this.createNewDocumentOption = documentsPage.page.getByRole('menuitem', { name: 'New document' });
    }
}

class DocumentModalDialog {
    readonly modalDialog: Locator;
    readonly docNameInput: Locator;
    readonly createButton: Locator;

    constructor(documentsPage: DocumentsPage) {
        this.modalDialog = documentsPage.page.locator('#modal-dialog');
        this.docNameInput = documentsPage.page.getByTestId('field-container').getByTestId('text-input');
        this.createButton = documentsPage.page.getByRole('button', { name: 'Create' });
    }
}

class ContextMenu {
    readonly contextMenuArea: Locator;
    readonly createRoomOption: Locator;

    constructor(documentsPage: DocumentsPage) {
        this.contextMenuArea = documentsPage.page.locator('//div[@data-testid="context-menu"]//div[@data-testid="scrollbar"]');
        this.createRoomOption = documentsPage.page.getByRole('menuitem', { name: 'Create room' });
    }
}

class CreateRoomModalDialog {
    readonly modalDialog: Locator;
    readonly roomNameInput: Locator;
    readonly createRoomButton: Locator;

    constructor(documentsPage: DocumentsPage) {
        this.modalDialog = documentsPage.page.locator('#modal-dialog');
        this.roomNameInput = documentsPage.page.getByRole('textbox', { name: 'Name:' });
        this.createRoomButton = documentsPage.page.getByRole('button', { name: 'Create' });
    }

    getRoomTypeByTitle(title: string): Locator {
        return this.modalDialog.getByTitle(title);
    }
}
