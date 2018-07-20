import { element, by, promise, ElementFinder } from 'protractor';

export class FlockRelationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-flock-relation div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FlockRelationUpdatePage {
    pageTitle = element(by.id('jhi-flock-relation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    remarkNameInput = element(by.id('field_remarkName'));
    pyInput = element(by.id('field_py'));
    pinYinInput = element(by.id('field_pinYin'));
    typeInput = element(by.id('field_type'));
    createdDateInput = element(by.id('field_createdDate'));
    customerSelect = element(by.id('field_customer'));
    customerFlockSelect = element(by.id('field_customerFlock'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setRemarkNameInput(remarkName): promise.Promise<void> {
        return this.remarkNameInput.sendKeys(remarkName);
    }

    getRemarkNameInput() {
        return this.remarkNameInput.getAttribute('value');
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

    setTypeInput(type): promise.Promise<void> {
        return this.typeInput.sendKeys(type);
    }

    getTypeInput() {
        return this.typeInput.getAttribute('value');
    }

    setCreatedDateInput(createdDate): promise.Promise<void> {
        return this.createdDateInput.sendKeys(createdDate);
    }

    getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
    }

    customerSelectLastOption(): promise.Promise<void> {
        return this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    customerSelectOption(option): promise.Promise<void> {
        return this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
    }

    customerFlockSelectLastOption(): promise.Promise<void> {
        return this.customerFlockSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    customerFlockSelectOption(option): promise.Promise<void> {
        return this.customerFlockSelect.sendKeys(option);
    }

    getCustomerFlockSelect(): ElementFinder {
        return this.customerFlockSelect;
    }

    getCustomerFlockSelectedOption() {
        return this.customerFlockSelect.element(by.css('option:checked')).getText();
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
