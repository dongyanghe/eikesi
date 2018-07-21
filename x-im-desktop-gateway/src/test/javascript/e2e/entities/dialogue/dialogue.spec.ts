import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DialogueComponentsPage, DialogueUpdatePage } from './dialogue.page-object';

describe('Dialogue e2e test', () => {
    let navBarPage: NavBarPage;
    let dialogueUpdatePage: DialogueUpdatePage;
    let dialogueComponentsPage: DialogueComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Dialogues', () => {
        navBarPage.goToEntity('dialogue');
        dialogueComponentsPage = new DialogueComponentsPage();
        expect(dialogueComponentsPage.getTitle()).toMatch(/imGatewayApp.dialogue.home.title/);
    });

    it('should load create Dialogue page', () => {
        dialogueComponentsPage.clickOnCreateButton();
        dialogueUpdatePage = new DialogueUpdatePage();
        expect(dialogueUpdatePage.getPageTitle()).toMatch(/imGatewayApp.dialogue.home.createOrEditLabel/);
        dialogueUpdatePage.cancel();
    });

    it('should create and save Dialogues', () => {
        dialogueComponentsPage.clickOnCreateButton();
        dialogueUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(dialogueUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        dialogueUpdatePage.setCreatedIdInput('5');
        expect(dialogueUpdatePage.getCreatedIdInput()).toMatch('5');
        dialogueUpdatePage.setTargetIdInput('5');
        expect(dialogueUpdatePage.getTargetIdInput()).toMatch('5');
        dialogueUpdatePage.setTargetTypeInput('targetType');
        expect(dialogueUpdatePage.getTargetTypeInput()).toMatch('targetType');
        dialogueUpdatePage.save();
        expect(dialogueUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
