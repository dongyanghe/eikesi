import { element, by, ElementFinder } from 'protractor';

export default class CurrentMessageUpdatePage {
  pageTitle: ElementFinder = element(by.id('manageGatewayApp.currentMessage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contentInput: ElementFinder = element(by.css('input#current-message-content'));
  statusInput: ElementFinder = element(by.css('input#current-message-status'));
  typeInput: ElementFinder = element(by.css('input#current-message-type'));
  createdDateInput: ElementFinder = element(by.css('input#current-message-createdDate'));
  createdIdInput: ElementFinder = element(by.css('input#current-message-createdId'));
  targetDateInput: ElementFinder = element(by.css('input#current-message-targetDate'));
  targetIdInput: ElementFinder = element(by.css('input#current-message-targetId'));
  dialogueSelect: ElementFinder = element(by.css('select#current-message-dialogue'));

  getPageTitle() {
    return this.pageTitle;
  }

  setContentInput(content) {
    this.contentInput.sendKeys(content);
  }

  getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  setStatusInput(status) {
    this.statusInput.sendKeys(status);
  }

  getStatusInput() {
    return this.statusInput.getAttribute('value');
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

  setCreatedIdInput(createdId) {
    this.createdIdInput.sendKeys(createdId);
  }

  getCreatedIdInput() {
    return this.createdIdInput.getAttribute('value');
  }

  setTargetDateInput(targetDate) {
    this.targetDateInput.sendKeys(targetDate);
  }

  getTargetDateInput() {
    return this.targetDateInput.getAttribute('value');
  }

  setTargetIdInput(targetId) {
    this.targetIdInput.sendKeys(targetId);
  }

  getTargetIdInput() {
    return this.targetIdInput.getAttribute('value');
  }

  dialogueSelectLastOption() {
    this.dialogueSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  dialogueSelectOption(option) {
    this.dialogueSelect.sendKeys(option);
  }

  getDialogueSelect() {
    return this.dialogueSelect;
  }

  getDialogueSelectedOption() {
    return this.dialogueSelect.element(by.css('option:checked')).getText();
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
