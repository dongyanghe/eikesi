import { element, by, promise, ElementFinder } from 'protractor';

export class CustomerFlockComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-customer-flock div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerFlockUpdatePage {
    pageTitle = element(by.id('jhi-customer-flock-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    pyInput = element(by.id('field_py'));
    pinYinInput = element(by.id('field_pinYin'));
    imageUrlInput = element(by.id('field_imageUrl'));
    createdDateInput = element(by.id('field_createdDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setPyInput(py): promise.Promise<void> {
        return this.pyInput.sendKeys(py);
    }

    getPyInput() {
        return this.pyInput.getAttribute('value');
    }

    setPinYinInput(pinYin): promise.Promise<void> {
        return this.pinYinInput.sendKeys(pinYin);
    }

    getPinYinInput() {
        return this.pinYinInput.getAttribute('value');
    }

    setImageUrlInput(imageUrl): promise.Promise<void> {
        return this.imageUrlInput.sendKeys(imageUrl);
    }

    getImageUrlInput() {
        return this.imageUrlInput.getAttribute('value');
    }

    setCreatedDateInput(createdDate): promise.Promise<void> {
        return this.createdDateInput.sendKeys(createdDate);
    }

    getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
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
