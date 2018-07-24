/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CustomerRelationComponentsPage from './customer-relation.page-object';
import CustomerRelationUpdatePage from './customer-relation-update.page-object';

const expect = chai.expect;

describe('CustomerRelation e2e test', () => {
  let navBarPage: NavBarPage;
  let customerRelationUpdatePage: CustomerRelationUpdatePage;
  let customerRelationComponentsPage: CustomerRelationComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load CustomerRelations', async () => {
    navBarPage.getEntityPage('customer-relation');
    customerRelationComponentsPage = new CustomerRelationComponentsPage();
    expect(await customerRelationComponentsPage.getTitle().getText()).to.match(/Customer Relations/);
  });

  it('should load create CustomerRelation page', async () => {
    customerRelationComponentsPage.clickOnCreateButton();
    customerRelationUpdatePage = new CustomerRelationUpdatePage();
    expect(await customerRelationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /imWebGatewayApp.customerRelation.home.createOrEditLabel/
    );
  });

  it('should create and save CustomerRelations', async () => {
    customerRelationUpdatePage.setRemarkNameInput('remarkName');
    expect(await customerRelationUpdatePage.getRemarkNameInput()).to.match(/remarkName/);
    customerRelationUpdatePage.setPyInput('py');
    expect(await customerRelationUpdatePage.getPyInput()).to.match(/py/);
    customerRelationUpdatePage.setPinYinInput('pinYin');
    expect(await customerRelationUpdatePage.getPinYinInput()).to.match(/pinYin/);
    customerRelationUpdatePage.setTypeInput('type');
    expect(await customerRelationUpdatePage.getTypeInput()).to.match(/type/);
    customerRelationUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await customerRelationUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    customerRelationUpdatePage.customerSelectLastOption();
    await customerRelationUpdatePage.save();
    expect(await customerRelationUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
