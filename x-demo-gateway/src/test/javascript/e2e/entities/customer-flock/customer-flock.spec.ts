import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CustomerFlockComponentsPage, CustomerFlockUpdatePage } from './customer-flock.page-object';

describe('CustomerFlock e2e test', () => {
    let navBarPage: NavBarPage;
    let customerFlockUpdatePage: CustomerFlockUpdatePage;
    let customerFlockComponentsPage: CustomerFlockComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CustomerFlocks', () => {
        navBarPage.goToEntity('customer-flock');
        customerFlockComponentsPage = new CustomerFlockComponentsPage();
        expect(customerFlockComponentsPage.getTitle()).toMatch(/demoGatewayApp.customerFlock.home.title/);
    });

    it('should load create CustomerFlock page', () => {
        customerFlockComponentsPage.clickOnCreateButton();
        customerFlockUpdatePage = new CustomerFlockUpdatePage();
        expect(customerFlockUpdatePage.getPageTitle()).toMatch(/demoGatewayApp.customerFlock.home.createOrEditLabel/);
        customerFlockUpdatePage.cancel();
    });

    it('should create and save CustomerFlocks', () => {
        customerFlockComponentsPage.clickOnCreateButton();
        customerFlockUpdatePage.setNameInput('name');
        expect(customerFlockUpdatePage.getNameInput()).toMatch('name');
        customerFlockUpdatePage.setPyInput('py');
        expect(customerFlockUpdatePage.getPyInput()).toMatch('py');
        customerFlockUpdatePage.setPinYinInput('pinYin');
        expect(customerFlockUpdatePage.getPinYinInput()).toMatch('pinYin');
        customerFlockUpdatePage.setImageUrlInput('imageUrl');
        expect(customerFlockUpdatePage.getImageUrlInput()).toMatch('imageUrl');
        customerFlockUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(customerFlockUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        customerFlockUpdatePage.save();
        expect(customerFlockUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
