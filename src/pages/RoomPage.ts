import { Locator, Page } from "@playwright/test";

export class RoomPage {
    readonly page: Page;
    readonly infoPanel: InfoPanel;
    readonly contentArea: Locator;

    constructor(page: Page) {
        this.page = page;
        this.infoPanel = new InfoPanel(this);
        this.contentArea = this.page.locator('[class="section-wrapper-content"]');
    }

    getDocumentLinkByName(name: string): Locator {
        return this.contentArea.getByRole('link', { name });
    }
}

class InfoPanel {
    readonly infoPanelArea: Locator;
    readonly detailsTab: Locator;
    readonly detailsTabContent: DetailsTabContent;
    readonly infoPanelContentArea: Locator;

    constructor(roomPage: RoomPage) {
        this.infoPanelArea = roomPage.page.locator('#InfoPanelWrapper');
        this.detailsTab = this.infoPanelArea.getByText('Details');
        this.infoPanelContentArea = this.infoPanelArea.locator('//div[contains(@class, "info-panel-scroll")]');
        this.detailsTabContent = new DetailsTabContent(this);
    }
}

class DetailsTabContent {
    readonly detailsTabContentArea: Locator;
    readonly roomNameTitle: Locator;

    constructor(infoPanel: InfoPanel) {
        this.detailsTabContentArea = infoPanel.infoPanelContentArea;
        this.roomNameTitle = this.detailsTabContentArea.locator('//p[contains(@class, "info-panel_header-text")]');
    }

    getPropertyById(id: PropertyId): Locator {
        return this.detailsTabContentArea.locator(`[id="${id}"]`);
    }

    async getTextPropertyById(id: PropertyId): Promise<string> {
        return await this.getPropertyById(id).getByTestId('text').last().innerText();
    }
}

export enum PropertyId {
    Owner = 'Owner',
    Type = 'Type',
    Content = 'Content',
    DateModified = 'Date modified',
    LastModifiedBy = 'Last modified by',
    CreationDate = 'Creation date',
}
