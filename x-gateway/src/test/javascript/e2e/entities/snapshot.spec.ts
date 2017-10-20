import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Snapshot e2e test', () => {

    let navBarPage: NavBarPage;
    let snapshotDialogPage: SnapshotDialogPage;
    let snapshotComponentsPage: SnapshotComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Snapshots', () => {
        navBarPage.goToEntity('snapshot');
        snapshotComponentsPage = new SnapshotComponentsPage();
        expect(snapshotComponentsPage.getTitle()).toMatch(/gatewayApp.snapshot.home.title/);

    });

    it('should load create Snapshot dialog', () => {
        snapshotComponentsPage.clickOnCreateButton();
        snapshotDialogPage = new SnapshotDialogPage();
        expect(snapshotDialogPage.getModalTitle()).toMatch(/gatewayApp.snapshot.home.createOrEditLabel/);
        snapshotDialogPage.close();
    });

    it('should create and save Snapshots', () => {
        snapshotComponentsPage.clickOnCreateButton();
        snapshotDialogPage.setDomainNameInput('domainName');
        expect(snapshotDialogPage.getDomainNameInput()).toMatch('domainName');
        snapshotDialogPage.setDomainPathInput('domainPath');
        expect(snapshotDialogPage.getDomainPathInput()).toMatch('domainPath');
        snapshotDialogPage.setCreateSourceInput('createSource');
        expect(snapshotDialogPage.getCreateSourceInput()).toMatch('createSource');
        snapshotDialogPage.setDayTimeInput('5');
        expect(snapshotDialogPage.getDayTimeInput()).toMatch('5');
        snapshotDialogPage.setWeekTimeInput('5');
        expect(snapshotDialogPage.getWeekTimeInput()).toMatch('5');
        snapshotDialogPage.setMonthTimeInput('5');
        expect(snapshotDialogPage.getMonthTimeInput()).toMatch('5');
        snapshotDialogPage.setYearTimeInput('5');
        expect(snapshotDialogPage.getYearTimeInput()).toMatch('5');
        snapshotDialogPage.setHistoryTimeInput('5');
        expect(snapshotDialogPage.getHistoryTimeInput()).toMatch('5');
        snapshotDialogPage.setFilePathInput('filePath');
        expect(snapshotDialogPage.getFilePathInput()).toMatch('filePath');
        snapshotDialogPage.setStateInput('state');
        expect(snapshotDialogPage.getStateInput()).toMatch('state');
        snapshotDialogPage.setCreateByInput('5');
        expect(snapshotDialogPage.getCreateByInput()).toMatch('5');
        snapshotDialogPage.setCreateDateInput(12310020012301);
        expect(snapshotDialogPage.getCreateDateInput()).toMatch('2001-12-31T02:30');
        snapshotDialogPage.setUpdateByInput('5');
        expect(snapshotDialogPage.getUpdateByInput()).toMatch('5');
        snapshotDialogPage.setUpdateDateInput(12310020012301);
        expect(snapshotDialogPage.getUpdateDateInput()).toMatch('2001-12-31T02:30');
        snapshotDialogPage.setRemarksInput('remarks');
        expect(snapshotDialogPage.getRemarksInput()).toMatch('remarks');
        snapshotDialogPage.setDelFlagInput('delFlag');
        expect(snapshotDialogPage.getDelFlagInput()).toMatch('delFlag');
        snapshotDialogPage.save();
        expect(snapshotDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SnapshotComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-snapshot div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SnapshotDialogPage {
    modalTitle = element(by.css('h4#mySnapshotLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    domainNameInput = element(by.css('input#field_domainName'));
    domainPathInput = element(by.css('input#field_domainPath'));
    createSourceInput = element(by.css('input#field_createSource'));
    dayTimeInput = element(by.css('input#field_dayTime'));
    weekTimeInput = element(by.css('input#field_weekTime'));
    monthTimeInput = element(by.css('input#field_monthTime'));
    yearTimeInput = element(by.css('input#field_yearTime'));
    historyTimeInput = element(by.css('input#field_historyTime'));
    filePathInput = element(by.css('input#field_filePath'));
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

    setDayTimeInput = function (dayTime) {
        this.dayTimeInput.sendKeys(dayTime);
    }

    getDayTimeInput = function () {
        return this.dayTimeInput.getAttribute('value');
    }

    setWeekTimeInput = function (weekTime) {
        this.weekTimeInput.sendKeys(weekTime);
    }

    getWeekTimeInput = function () {
        return this.weekTimeInput.getAttribute('value');
    }

    setMonthTimeInput = function (monthTime) {
        this.monthTimeInput.sendKeys(monthTime);
    }

    getMonthTimeInput = function () {
        return this.monthTimeInput.getAttribute('value');
    }

    setYearTimeInput = function (yearTime) {
        this.yearTimeInput.sendKeys(yearTime);
    }

    getYearTimeInput = function () {
        return this.yearTimeInput.getAttribute('value');
    }

    setHistoryTimeInput = function (historyTime) {
        this.historyTimeInput.sendKeys(historyTime);
    }

    getHistoryTimeInput = function () {
        return this.historyTimeInput.getAttribute('value');
    }

    setFilePathInput = function (filePath) {
        this.filePathInput.sendKeys(filePath);
    }

    getFilePathInput = function () {
        return this.filePathInput.getAttribute('value');
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
