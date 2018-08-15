import { element, by, ElementFinder } from 'protractor';

export default class DialogueUpdatePage {
  pageTitle: ElementFinder = element(by.id('imWebGatewayApp.dialogue.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  createdDateInput: ElementFinder = element(by.css('input#dialogue-createdDate'));
  createdIdInput: ElementFinder = element(by.css('input#dialogue-createdId'));
  targetIdInput: ElementFinder = element(by.css('input#dialogue-targetId'));
  targetTypeInput: ElementFinder = element(by.css('input#dialogue-targetType'));

  getPageTitle() {
    return this.pageTitle;
  }

  setCreatedDateInput(createdDate) {
    this.createdDateInput.sendKeys(createdDate);
  }

  getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
  }

  setCreatedIdInput(createdId) {
    this.createdIdInput.sendKeys(createdId);
  }

  getCreatedIdInput() {
    return this.createdIdInput.getAttribute('value');
  }

  setTargetIdInput(targetId) {
    this.targetIdInput.sendKeys(targetId);
  }

  getTargetIdInput() {
    return this.targetIdInput.getAttribute('value');
  }

  setTargetTypeInput(targetType) {
    this.targetTypeInput.sendKeys(targetType);
  }

  getTargetTypeInput() {
    return this.targetTypeInput.getAttribute('value');
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
