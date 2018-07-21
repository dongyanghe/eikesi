import { element, by, promise, ElementFinder } from 'protractor';

export class DialogueComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-dialogue div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DialogueUpdatePage {
    pageTitle = element(by.id('jhi-dialogue-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    createdDateInput = element(by.id('field_createdDate'));
    createdIdInput = element(by.id('field_createdId'));
    targetIdInput = element(by.id('field_targetId'));
    targetTypeInput = element(by.id('field_targetType'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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

    setTargetIdInput(targetId): promise.Promise<void> {
        return this.targetIdInput.sendKeys(targetId);
    }

    getTargetIdInput() {
        return this.targetIdInput.getAttribute('value');
    }

    setTargetTypeInput(targetType): promise.Promise<void> {
        return this.targetTypeInput.sendKeys(targetType);
    }

    getTargetTypeInput() {
        return this.targetTypeInput.getAttribute('value');
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
