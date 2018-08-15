import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CustomerComponentsPage, CustomerUpdatePage } from './customer.page-object';

describe('Customer e2e test', () => {
    let navBarPage: NavBarPage;
    let customerUpdatePage: CustomerUpdatePage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle()).toMatch(/imGatewayApp.customer.home.title/);
    });

    it('should load create Customer page', () => {
        customerComponentsPage.clickOnCreateButton();
        customerUpdatePage = new CustomerUpdatePage();
        expect(customerUpdatePage.getPageTitle()).toMatch(/imGatewayApp.customer.home.createOrEditLabel/);
        customerUpdatePage.cancel();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerUpdatePage.setMobileInput('mobile');
        expect(customerUpdatePage.getMobileInput()).toMatch('mobile');
        customerUpdatePage.setFirstNameInput('firstName');
        expect(customerUpdatePage.getFirstNameInput()).toMatch('firstName');
        customerUpdatePage.setLastNameInput('lastName');
        expect(customerUpdatePage.getLastNameInput()).toMatch('lastName');
        customerUpdatePage.setPyInput('py');
        expect(customerUpdatePage.getPyInput()).toMatch('py');
        customerUpdatePage.setPinYinInput('pinYin');
        expect(customerUpdatePage.getPinYinInput()).toMatch('pinYin');
        customerUpdatePage.setPasswordHashInput('passwordHash');
        expect(customerUpdatePage.getPasswordHashInput()).toMatch('passwordHash');
        customerUpdatePage.setEmailInput('email');
        expect(customerUpdatePage.getEmailInput()).toMatch('email');
        customerUpdatePage.setImageUrlInput('imageUrl');
        expect(customerUpdatePage.getImageUrlInput()).toMatch('imageUrl');
        customerUpdatePage
            .getActivatedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    customerUpdatePage.getActivatedInput().click();
                    expect(customerUpdatePage.getActivatedInput().isSelected()).toBeFalsy();
                } else {
                    customerUpdatePage.getActivatedInput().click();
                    expect(customerUpdatePage.getActivatedInput().isSelected()).toBeTruthy();
                }
            });
        customerUpdatePage.setLangKeyInput('langKey');
        expect(customerUpdatePage.getLangKeyInput()).toMatch('langKey');
        customerUpdatePage.setActivationKeyInput('activationKey');
        expect(customerUpdatePage.getActivationKeyInput()).toMatch('activationKey');
        customerUpdatePage.setResetKeyInput('resetKey');
        expect(customerUpdatePage.getResetKeyInput()).toMatch('resetKey');
        customerUpdatePage.setResetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(customerUpdatePage.getResetDateInput()).toContain('2001-01-01T02:30');
        customerUpdatePage.setCreatedByInput('createdBy');
        expect(customerUpdatePage.getCreatedByInput()).toMatch('createdBy');
        customerUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(customerUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        customerUpdatePage.save();
        expect(customerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
