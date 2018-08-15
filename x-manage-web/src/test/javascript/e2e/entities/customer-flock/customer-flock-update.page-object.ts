import { element, by, ElementFinder } from 'protractor';

export default class CustomerFlockUpdatePage {
  pageTitle: ElementFinder = element(by.id('manageGatewayApp.customerFlock.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#customer-flock-name'));
  pyInput: ElementFinder = element(by.css('input#customer-flock-py'));
  pinYinInput: ElementFinder = element(by.css('input#customer-flock-pinYin'));
  imageUrlInput: ElementFinder = element(by.css('input#customer-flock-imageUrl'));
  createdDateInput: ElementFinder = element(by.css('input#customer-flock-createdDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
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

  setImageUrlInput(imageUrl) {
    this.imageUrlInput.sendKeys(imageUrl);
  }

  getImageUrlInput() {
    return this.imageUrlInput.getAttribute('value');
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
