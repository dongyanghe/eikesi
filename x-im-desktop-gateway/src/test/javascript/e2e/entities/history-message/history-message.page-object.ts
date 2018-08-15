import { element, by, promise, ElementFinder } from 'protractor';

export class HistoryMessageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-history-message div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class HistoryMessageUpdatePage {
    pageTitle = element(by.id('jhi-history-message-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    contentInput = element(by.id('field_content'));
    statusInput = element(by.id('field_status'));
    createdDateInput = element(by.id('field_createdDate'));
    createdIdInput = element(by.id('field_createdId'));
    targetDateInput = element(by.id('field_targetDate'));
    targetIdInput = element(by.id('field_targetId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setContentInput(content): promise.Promise<void> {
        return this.contentInput.sendKeys(content);
    }

    getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    setStatusInput(status): promise.Promise<void> {
        return this.statusInput.sendKeys(status);
    }

    getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    setCreatedDateInput(createdDate): promise.Promise<void> {
        return this.createdDateInput.sendKeys(createdDate);
    }

    getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
    }

    setCreatedIdInput(createdId): promise.Promise<void> {
        return this.createdIdInput.sendKeys(createdId);
    }

    getCreatedIdInput() {
        return this.createdIdInput.getAttribute('value');
    }

    setTargetDateInput(targetDate): promise.Promise<void> {
        return this.targetDateInput.sendKeys(targetDate);
    }

    getTargetDateInput() {
        return this.targetDateInput.getAttribute('value');
    }

    setTargetIdInput(targetId): promise.Promise<void> {
        return this.targetIdInput.sendKeys(targetId);
    }

    getTargetIdInput() {
        return this.targetIdInput.getAttribute('value');
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
