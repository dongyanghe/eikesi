/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CustomerFlockComponentsPage from './customer-flock.page-object';
import CustomerFlockUpdatePage from './customer-flock-update.page-object';

const expect = chai.expect;

describe('CustomerFlock e2e test', () => {
  let navBarPage: NavBarPage;
  let customerFlockUpdatePage: CustomerFlockUpdatePage;
  let customerFlockComponentsPage: CustomerFlockComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load CustomerFlocks', async () => {
    navBarPage.getEntityPage('customer-flock');
    customerFlockComponentsPage = new CustomerFlockComponentsPage();
    expect(await customerFlockComponentsPage.getTitle().getText()).to.match(/Customer Flocks/);
  });

  it('should load create CustomerFlock page', async () => {
    customerFlockComponentsPage.clickOnCreateButton();
    customerFlockUpdatePage = new CustomerFlockUpdatePage();
    expect(await customerFlockUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /imWebGatewayApp.customerFlock.home.createOrEditLabel/
    );
  });

  it('should create and save CustomerFlocks', async () => {
    customerFlockUpdatePage.setNameInput('name');
    expect(await customerFlockUpdatePage.getNameInput()).to.match(/name/);
    customerFlockUpdatePage.setPyInput('py');
    expect(await customerFlockUpdatePage.getPyInput()).to.match(/py/);
    customerFlockUpdatePage.setPinYinInput('pinYin');
    expect(await customerFlockUpdatePage.getPinYinInput()).to.match(/pinYin/);
    customerFlockUpdatePage.setImageUrlInput('imageUrl');
    expect(await customerFlockUpdatePage.getImageUrlInput()).to.match(/imageUrl/);
    customerFlockUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await customerFlockUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await customerFlockUpdatePage.save();
    expect(await customerFlockUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
