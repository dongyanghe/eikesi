/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CustomerComponentsPage from './customer.page-object';
import CustomerUpdatePage from './customer-update.page-object';

const expect = chai.expect;

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let customerUpdatePage: CustomerUpdatePage;
  let customerComponentsPage: CustomerComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Customers', async () => {
    navBarPage.getEntityPage('customer');
    customerComponentsPage = new CustomerComponentsPage();
    expect(await customerComponentsPage.getTitle().getText()).to.match(/Customers/);
  });

  it('should load create Customer page', async () => {
    customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    expect(await customerUpdatePage.getPageTitle().getAttribute('id')).to.match(/imWebGatewayApp.customer.home.createOrEditLabel/);
  });

  it('should create and save Customers', async () => {
    customerUpdatePage.setMobileInput('mobile');
    expect(await customerUpdatePage.getMobileInput()).to.match(/mobile/);
    customerUpdatePage.setFirstNameInput('firstName');
    expect(await customerUpdatePage.getFirstNameInput()).to.match(/firstName/);
    customerUpdatePage.setLastNameInput('lastName');
    expect(await customerUpdatePage.getLastNameInput()).to.match(/lastName/);
    customerUpdatePage.setPyInput('py');
    expect(await customerUpdatePage.getPyInput()).to.match(/py/);
    customerUpdatePage.setPinYinInput('pinYin');
    expect(await customerUpdatePage.getPinYinInput()).to.match(/pinYin/);
    customerUpdatePage.setPasswordHashInput('passwordHash');
    expect(await customerUpdatePage.getPasswordHashInput()).to.match(/passwordHash/);
    customerUpdatePage.setEmailInput('email');
    expect(await customerUpdatePage.getEmailInput()).to.match(/email/);
    customerUpdatePage.setImageUrlInput('imageUrl');
    expect(await customerUpdatePage.getImageUrlInput()).to.match(/imageUrl/);
    const selectedActivated = await customerUpdatePage.getActivatedInput().isSelected();
    if (selectedActivated) {
      customerUpdatePage.getActivatedInput().click();
      expect(await customerUpdatePage.getActivatedInput().isSelected()).to.be.false;
    } else {
      customerUpdatePage.getActivatedInput().click();
      expect(await customerUpdatePage.getActivatedInput().isSelected()).to.be.true;
    }
    customerUpdatePage.setLangKeyInput('langKey');
    expect(await customerUpdatePage.getLangKeyInput()).to.match(/langKey/);
    customerUpdatePage.setActivationKeyInput('activationKey');
    expect(await customerUpdatePage.getActivationKeyInput()).to.match(/activationKey/);
    customerUpdatePage.setResetKeyInput('resetKey');
    expect(await customerUpdatePage.getResetKeyInput()).to.match(/resetKey/);
    customerUpdatePage.setResetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await customerUpdatePage.getResetDateInput()).to.contain('2001-01-01T02:30');
    customerUpdatePage.setCreatedByInput('createdBy');
    expect(await customerUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    customerUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await customerUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await customerUpdatePage.save();
    expect(await customerUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
