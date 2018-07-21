import { element, by, promise, ElementFinder } from 'protractor';

export class CustomerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-customer div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerUpdatePage {
    pageTitle = element(by.id('jhi-customer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    mobileInput = element(by.id('field_mobile'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    pyInput = element(by.id('field_py'));
    pinYinInput = element(by.id('field_pinYin'));
    passwordHashInput = element(by.id('field_passwordHash'));
    emailInput = element(by.id('field_email'));
    imageUrlInput = element(by.id('field_imageUrl'));
    activatedInput = element(by.id('field_activated'));
    langKeyInput = element(by.id('field_langKey'));
    activationKeyInput = element(by.id('field_activationKey'));
    resetKeyInput = element(by.id('field_resetKey'));
    resetDateInput = element(by.id('field_resetDate'));
    createdByInput = element(by.id('field_createdBy'));
    createdDateInput = element(by.id('field_createdDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setMobileInput(mobile): promise.Promise<void> {
        return this.mobileInput.sendKeys(mobile);
    }

    getMobileInput() {
        return this.mobileInput.getAttribute('value');
    }

    setFirstNameInput(firstName): promise.Promise<void> {
        return this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput(lastName): promise.Promise<void> {
        return this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
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

    setPasswordHashInput(passwordHash): promise.Promise<void> {
        return this.passwordHashInput.sendKeys(passwordHash);
    }

    getPasswordHashInput() {
        return this.passwordHashInput.getAttribute('value');
    }

    setEmailInput(email): promise.Promise<void> {
        return this.emailInput.sendKeys(email);
    }

    getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    setImageUrlInput(imageUrl): promise.Promise<void> {
        return this.imageUrlInput.sendKeys(imageUrl);
    }

    getImageUrlInput() {
        return this.imageUrlInput.getAttribute('value');
    }

    getActivatedInput() {
        return this.activatedInput;
    }
    setLangKeyInput(langKey): promise.Promise<void> {
        return this.langKeyInput.sendKeys(langKey);
    }

    getLangKeyInput() {
        return this.langKeyInput.getAttribute('value');
    }

    setActivationKeyInput(activationKey): promise.Promise<void> {
        return this.activationKeyInput.sendKeys(activationKey);
    }

    getActivationKeyInput() {
        return this.activationKeyInput.getAttribute('value');
    }

    setResetKeyInput(resetKey): promise.Promise<void> {
        return this.resetKeyInput.sendKeys(resetKey);
    }

    getResetKeyInput() {
        return this.resetKeyInput.getAttribute('value');
    }

    setResetDateInput(resetDate): promise.Promise<void> {
        return this.resetDateInput.sendKeys(resetDate);
    }

    getResetDateInput() {
        return this.resetDateInput.getAttribute('value');
    }

    setCreatedByInput(createdBy): promise.Promise<void> {
        return this.createdByInput.sendKeys(createdBy);
    }

    getCreatedByInput() {
        return this.createdByInput.getAttribute('value');
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
