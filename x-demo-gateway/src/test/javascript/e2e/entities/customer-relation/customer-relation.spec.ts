import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CustomerRelationComponentsPage, CustomerRelationUpdatePage } from './customer-relation.page-object';

describe('CustomerRelation e2e test', () => {
    let navBarPage: NavBarPage;
    let customerRelationUpdatePage: CustomerRelationUpdatePage;
    let customerRelationComponentsPage: CustomerRelationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CustomerRelations', () => {
        navBarPage.goToEntity('customer-relation');
        customerRelationComponentsPage = new CustomerRelationComponentsPage();
        expect(customerRelationComponentsPage.getTitle()).toMatch(/demoGatewayApp.customerRelation.home.title/);
    });

    it('should load create CustomerRelation page', () => {
        customerRelationComponentsPage.clickOnCreateButton();
        customerRelationUpdatePage = new CustomerRelationUpdatePage();
        expect(customerRelationUpdatePage.getPageTitle()).toMatch(/demoGatewayApp.customerRelation.home.createOrEditLabel/);
        customerRelationUpdatePage.cancel();
    });

    it('should create and save CustomerRelations', () => {
        customerRelationComponentsPage.clickOnCreateButton();
        customerRelationUpdatePage.setRemarkNameInput('remarkName');
        expect(customerRelationUpdatePage.getRemarkNameInput()).toMatch('remarkName');
        customerRelationUpdatePage.setPyInput('py');
        expect(customerRelationUpdatePage.getPyInput()).toMatch('py');
        customerRelationUpdatePage.setPinYinInput('pinYin');
        expect(customerRelationUpdatePage.getPinYinInput()).toMatch('pinYin');
        customerRelationUpdatePage.setTypeInput('type');
        expect(customerRelationUpdatePage.getTypeInput()).toMatch('type');
        customerRelationUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(customerRelationUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        customerRelationUpdatePage.customerSelectLastOption();
        customerRelationUpdatePage.save();
        expect(customerRelationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
