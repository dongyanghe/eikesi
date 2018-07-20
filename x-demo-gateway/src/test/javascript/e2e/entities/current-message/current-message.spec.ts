import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CurrentMessageComponentsPage, CurrentMessageUpdatePage } from './current-message.page-object';

describe('CurrentMessage e2e test', () => {
    let navBarPage: NavBarPage;
    let currentMessageUpdatePage: CurrentMessageUpdatePage;
    let currentMessageComponentsPage: CurrentMessageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CurrentMessages', () => {
        navBarPage.goToEntity('current-message');
        currentMessageComponentsPage = new CurrentMessageComponentsPage();
        expect(currentMessageComponentsPage.getTitle()).toMatch(/demoGatewayApp.currentMessage.home.title/);
    });

    it('should load create CurrentMessage page', () => {
        currentMessageComponentsPage.clickOnCreateButton();
        currentMessageUpdatePage = new CurrentMessageUpdatePage();
        expect(currentMessageUpdatePage.getPageTitle()).toMatch(/demoGatewayApp.currentMessage.home.createOrEditLabel/);
        currentMessageUpdatePage.cancel();
    });

    it('should create and save CurrentMessages', () => {
        currentMessageComponentsPage.clickOnCreateButton();
        currentMessageUpdatePage.setContentInput('content');
        expect(currentMessageUpdatePage.getContentInput()).toMatch('content');
        currentMessageUpdatePage.setStatusInput('status');
        expect(currentMessageUpdatePage.getStatusInput()).toMatch('status');
        currentMessageUpdatePage.setTypeInput('type');
        expect(currentMessageUpdatePage.getTypeInput()).toMatch('type');
        currentMessageUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(currentMessageUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        currentMessageUpdatePage.setCreatedIdInput('5');
        expect(currentMessageUpdatePage.getCreatedIdInput()).toMatch('5');
        currentMessageUpdatePage.setTargetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(currentMessageUpdatePage.getTargetDateInput()).toContain('2001-01-01T02:30');
        currentMessageUpdatePage.setTargetIdInput('5');
        expect(currentMessageUpdatePage.getTargetIdInput()).toMatch('5');
        currentMessageUpdatePage.dialogueSelectLastOption();
        currentMessageUpdatePage.save();
        expect(currentMessageUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
