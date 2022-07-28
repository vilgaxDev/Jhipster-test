import { element, by, promise, ElementFinder } from 'protractor';

export class ZonalComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-zonal div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ZonalUpdatePage {
    pageTitle = element(by.id('jhi-zonal-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    zoneNameInput = element(by.id('field_zoneName'));
    zoneAddressInput = element(by.id('field_zoneAddress'));
    zoneInchargeInput = element(by.id('field_zoneIncharge'));
    statusInput = element(by.id('field_status'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setZoneNameInput(zoneName): promise.Promise<void> {
        return this.zoneNameInput.sendKeys(zoneName);
    }

    getZoneNameInput() {
        return this.zoneNameInput.getAttribute('value');
    }

    setZoneAddressInput(zoneAddress): promise.Promise<void> {
        return this.zoneAddressInput.sendKeys(zoneAddress);
    }

    getZoneAddressInput() {
        return this.zoneAddressInput.getAttribute('value');
    }

    setZoneInchargeInput(zoneIncharge): promise.Promise<void> {
        return this.zoneInchargeInput.sendKeys(zoneIncharge);
    }

    getZoneInchargeInput() {
        return this.zoneInchargeInput.getAttribute('value');
    }

    setStatusInput(status): promise.Promise<void> {
        return this.statusInput.sendKeys(status);
    }

    getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    setCreatedAtInput(createdAt): promise.Promise<void> {
        return this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    setUpdatedAtInput(updatedAt): promise.Promise<void> {
        return this.updatedAtInput.sendKeys(updatedAt);
    }

    getUpdatedAtInput() {
        return this.updatedAtInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
