import { element, by, ElementFinder } from 'protractor';

export default class HistoryMessageUpdatePage {
  pageTitle: ElementFinder = element(by.id('manageGatewayApp.historyMessage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contentInput: ElementFinder = element(by.css('input#history-message-content'));
  statusInput: ElementFinder = element(by.css('input#history-message-status'));
  createdDateInput: ElementFinder = element(by.css('input#history-message-createdDate'));
  createdIdInput: ElementFinder = element(by.css('input#history-message-createdId'));
  targetDateInput: ElementFinder = element(by.css('input#history-message-targetDate'));
  targetIdInput: ElementFinder = element(by.css('input#history-message-targetId'));

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
