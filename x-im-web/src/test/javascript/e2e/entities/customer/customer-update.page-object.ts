import { element, by, ElementFinder } from 'protractor';

export default class CustomerUpdatePage {
  pageTitle: ElementFinder = element(by.id('imWebGatewayApp.customer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  mobileInput: ElementFinder = element(by.css('input#customer-mobile'));
  firstNameInput: ElementFinder = element(by.css('input#customer-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#customer-lastName'));
  pyInput: ElementFinder = element(by.css('input#customer-py'));
  pinYinInput: ElementFinder = element(by.css('input#customer-pinYin'));
  passwordHashInput: ElementFinder = element(by.css('input#customer-passwordHash'));
  emailInput: ElementFinder = element(by.css('input#customer-email'));
  imageUrlInput: ElementFinder = element(by.css('input#customer-imageUrl'));
  activatedInput: ElementFinder = element(by.css('input#customer-activated'));
  langKeyInput: ElementFinder = element(by.css('input#customer-langKey'));
  activationKeyInput: ElementFinder = element(by.css('input#customer-activationKey'));
  resetKeyInput: ElementFinder = element(by.css('input#customer-resetKey'));
  resetDateInput: ElementFinder = element(by.css('input#customer-resetDate'));
  createdByInput: ElementFinder = element(by.css('input#customer-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#customer-createdDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  setMobileInput(mobile) {
    this.mobileInput.sendKeys(mobile);
  }

  getMobileInput() {
    return this.mobileInput.getAttribute('value');
  }

  setFirstNameInput(firstName) {
    this.firstNameInput.sendKeys(firstName);
  }

  getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  setLastNameInput(lastName) {
    this.lastNameInput.sendKeys(lastName);
  }

  getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  setPyInput(py) {
    this.pyInput.sendKeys(py);
  }

  getPyInput() {
    return this.pyInput.getAttribute('value');
  }

  setPinYinInput(pinYin) {
    this.pinYinInput.sendKeys(pinYin);
  }

  getPinYinInput() {
    return this.pinYinInput.getAttribute('value');
  }

  setPasswordHashInput(passwordHash) {
    this.passwordHashInput.sendKeys(passwordHash);
  }

  getPasswordHashInput() {
    return this.passwordHashInput.getAttribute('value');
  }

  setEmailInput(email) {
    this.emailInput.sendKeys(email);
  }

  getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  setImageUrlInput(imageUrl) {
    this.imageUrlInput.sendKeys(imageUrl);
  }

  getImageUrlInput() {
    return this.imageUrlInput.getAttribute('value');
  }

  getActivatedInput() {
    return this.activatedInput;
  }
  setLangKeyInput(langKey) {
    this.langKeyInput.sendKeys(langKey);
  }

  getLangKeyInput() {
    return this.langKeyInput.getAttribute('value');
  }

  setActivationKeyInput(activationKey) {
    this.activationKeyInput.sendKeys(activationKey);
  }

  getActivationKeyInput() {
    return this.activationKeyInput.getAttribute('value');
  }

  setResetKeyInput(resetKey) {
    this.resetKeyInput.sendKeys(resetKey);
  }

  getResetKeyInput() {
    return this.resetKeyInput.getAttribute('value');
  }

  setResetDateInput(resetDate) {
    this.resetDateInput.sendKeys(resetDate);
  }

  getResetDateInput() {
    return this.resetDateInput.getAttribute('value');
  }

  setCreatedByInput(createdBy) {
    this.createdByInput.sendKeys(createdBy);
  }

  getCreatedByInput() {
    return this.createdByInput.getAttribute('value');
  }

  setCreatedDateInput(createdDate) {
    this.createdDateInput.sendKeys(createdDate);
  }

  getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
