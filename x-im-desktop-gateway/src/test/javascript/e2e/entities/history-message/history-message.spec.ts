import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { HistoryMessageComponentsPage, HistoryMessageUpdatePage } from './history-message.page-object';

describe('HistoryMessage e2e test', () => {
    let navBarPage: NavBarPage;
    let historyMessageUpdatePage: HistoryMessageUpdatePage;
    let historyMessageComponentsPage: HistoryMessageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load HistoryMessages', () => {
        navBarPage.goToEntity('history-message');
        historyMessageComponentsPage = new HistoryMessageComponentsPage();
        expect(historyMessageComponentsPage.getTitle()).toMatch(/imGatewayApp.historyMessage.home.title/);
    });

    it('should load create HistoryMessage page', () => {
        historyMessageComponentsPage.clickOnCreateButton();
        historyMessageUpdatePage = new HistoryMessageUpdatePage();
        expect(historyMessageUpdatePage.getPageTitle()).toMatch(/imGatewayApp.historyMessage.home.createOrEditLabel/);
        historyMessageUpdatePage.cancel();
    });

    it('should create and save HistoryMessages', () => {
        historyMessageComponentsPage.clickOnCreateButton();
        historyMessageUpdatePage.setContentInput('content');
        expect(historyMessageUpdatePage.getContentInput()).toMatch('content');
        historyMessageUpdatePage.setStatusInput('status');
        expect(historyMessageUpdatePage.getStatusInput()).toMatch('status');
        historyMessageUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(historyMessageUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        historyMessageUpdatePage.setCreatedIdInput('5');
        expect(historyMessageUpdatePage.getCreatedIdInput()).toMatch('5');
        historyMessageUpdatePage.setTargetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(historyMessageUpdatePage.getTargetDateInput()).toContain('2001-01-01T02:30');
        historyMessageUpdatePage.setTargetIdInput('5');
        expect(historyMessageUpdatePage.getTargetIdInput()).toMatch('5');
        historyMessageUpdatePage.save();
        expect(historyMessageUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
