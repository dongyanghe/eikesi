import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('SnapshotPending e2e test', () => {

    let navBarPage: NavBarPage;
    let snapshotPendingDialogPage: SnapshotPendingDialogPage;
    let snapshotPendingComponentsPage: SnapshotPendingComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SnapshotPendings', () => {
        navBarPage.goToEntity('snapshot-pending');
        snapshotPendingComponentsPage = new SnapshotPendingComponentsPage();
        expect(snapshotPendingComponentsPage.getTitle()).toMatch(/gatewayApp.snapshotPending.home.title/);

    });

    it('should load create SnapshotPending dialog', () => {
        snapshotPendingComponentsPage.clickOnCreateButton();
        snapshotPendingDialogPage = new SnapshotPendingDialogPage();
        expect(snapshotPendingDialogPage.getModalTitle()).toMatch(/gatewayApp.snapshotPending.home.createOrEditLabel/);
        snapshotPendingDialogPage.close();
    });

    it('should create and save SnapshotPendings', () => {
        snapshotPendingComponentsPage.clickOnCreateButton();
        snapshotPendingDialogPage.setDomainNameInput('domainName');
        expect(snapshotPendingDialogPage.getDomainNameInput()).toMatch('domainName');
        snapshotPendingDialogPage.setDomainPathInput('domainPath');
        expect(snapshotPendingDialogPage.getDomainPathInput()).toMatch('domainPath');
        snapshotPendingDialogPage.setCreateSourceInput('createSource');
        expect(snapshotPendingDialogPage.getCreateSourceInput()).toMatch('createSource');
        snapshotPendingDialogPage.setPriorityInput('priority');
        expect(snapshotPendingDialogPage.getPriorityInput()).toMatch('priority');
        snapshotPendingDialogPage.setStateInput('state');
        expect(snapshotPendingDialogPage.getStateInput()).toMatch('state');
        snapshotPendingDialogPage.setCreateByInput('5');
        expect(snapshotPendingDialogPage.getCreateByInput()).toMatch('5');
        snapshotPendingDialogPage.setCreateDateInput(12310020012301);
        expect(snapshotPendingDialogPage.getCreateDateInput()).toMatch('2001-12-31T02:30');
        snapshotPendingDialogPage.setUpdateByInput('5');
        expect(snapshotPendingDialogPage.getUpdateByInput()).toMatch('5');
        snapshotPendingDialogPage.setUpdateDateInput(12310020012301);
        expect(snapshotPendingDialogPage.getUpdateDateInput()).toMatch('2001-12-31T02:30');
        snapshotPendingDialogPage.setRemarksInput('remarks');
        expect(snapshotPendingDialogPage.getRemarksInput()).toMatch('remarks');
        snapshotPendingDialogPage.setDelFlagInput('delFlag');
        expect(snapshotPendingDialogPage.getDelFlagInput()).toMatch('delFlag');
        snapshotPendingDialogPage.save();
        expect(snapshotPendingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SnapshotPendingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-snapshot-pending div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SnapshotPendingDialogPage {
    modalTitle = element(by.css('h4#mySnapshotPendingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    domainNameInput = element(by.css('input#field_domainName'));
    domainPathInput = element(by.css('input#field_domainPath'));
    createSourceInput = element(by.css('input#field_createSource'));
    priorityInput = element(by.css('input#field_priority'));
    stateInput = element(by.css('input#field_state'));
    createByInput = element(by.css('input#field_createBy'));
    createDateInput = element(by.css('input#field_createDate'));
    updateByInput = element(by.css('input#field_updateBy'));
    updateDateInput = element(by.css('input#field_updateDate'));
    remarksInput = element(by.css('input#field_remarks'));
    delFlagInput = element(by.css('input#field_delFlag'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDomainNameInput = function (domainName) {
        this.domainNameInput.sendKeys(domainName);
    }

    getDomainNameInput = function () {
        return this.domainNameInput.getAttribute('value');
    }

    setDomainPathInput = function (domainPath) {
        this.domainPathInput.sendKeys(domainPath);
    }

    getDomainPathInput = function () {
        return this.domainPathInput.getAttribute('value');
    }

    setCreateSourceInput = function (createSource) {
        this.createSourceInput.sendKeys(createSource);
    }

    getCreateSourceInput = function () {
        return this.createSourceInput.getAttribute('value');
    }

    setPriorityInput = function (priority) {
        this.priorityInput.sendKeys(priority);
    }

    getPriorityInput = function () {
        return this.priorityInput.getAttribute('value');
    }

    setStateInput = function (state) {
        this.stateInput.sendKeys(state);
    }

    getStateInput = function () {
        return this.stateInput.getAttribute('value');
    }

    setCreateByInput = function (createBy) {
        this.createByInput.sendKeys(createBy);
    }

    getCreateByInput = function () {
        return this.createByInput.getAttribute('value');
    }

    setCreateDateInput = function (createDate) {
        this.createDateInput.sendKeys(createDate);
    }

    getCreateDateInput = function () {
        return this.createDateInput.getAttribute('value');
    }

    setUpdateByInput = function (updateBy) {
        this.updateByInput.sendKeys(updateBy);
    }

    getUpdateByInput = function () {
        return this.updateByInput.getAttribute('value');
    }

    setUpdateDateInput = function (updateDate) {
        this.updateDateInput.sendKeys(updateDate);
    }

    getUpdateDateInput = function () {
        return this.updateDateInput.getAttribute('value');
    }

    setRemarksInput = function (remarks) {
        this.remarksInput.sendKeys(remarks);
    }

    getRemarksInput = function () {
        return this.remarksInput.getAttribute('value');
    }

    setDelFlagInput = function (delFlag) {
        this.delFlagInput.sendKeys(delFlag);
    }

    getDelFlagInput = function () {
        return this.delFlagInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
