import { element, by, ElementFinder } from 'protractor';

export default class FlockRelationUpdatePage {
  pageTitle: ElementFinder = element(by.id('manageGatewayApp.flockRelation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  remarkNameInput: ElementFinder = element(by.css('input#flock-relation-remarkName'));
  pyInput: ElementFinder = element(by.css('input#flock-relation-py'));
  pinYinInput: ElementFinder = element(by.css('input#flock-relation-pinYin'));
  typeInput: ElementFinder = element(by.css('input#flock-relation-type'));
  createdDateInput: ElementFinder = element(by.css('input#flock-relation-createdDate'));
  customerSelect: ElementFinder = element(by.css('select#flock-relation-customer'));
  customerFlockSelect: ElementFinder = element(by.css('select#flock-relation-customerFlock'));

  getPageTitle() {
    return this.pageTitle;
  }

  setRemarkNameInput(remarkName) {
    this.remarkNameInput.sendKeys(remarkName);
  }

  getRemarkNameInput() {
    return this.remarkNameInput.getAttribute('value');
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

  setTypeInput(type) {
    this.typeInput.sendKeys(type);
  }

  getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  setCreatedDateInput(createdDate) {
    this.createdDateInput.sendKeys(createdDate);
  }

  getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
  }

  customerSelectLastOption() {
    this.customerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  customerSelectOption(option) {
    this.customerSelect.sendKeys(option);
  }

  getCustomerSelect() {
    return this.customerSelect;
  }

  getCustomerSelectedOption() {
    return this.customerSelect.element(by.css('option:checked')).getText();
  }

  customerFlockSelectLastOption() {
    this.customerFlockSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  customerFlockSelectOption(option) {
    this.customerFlockSelect.sendKeys(option);
  }

  getCustomerFlockSelect() {
    return this.customerFlockSelect;
  }

  getCustomerFlockSelectedOption() {
    return this.customerFlockSelect.element(by.css('option:checked')).getText();
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
