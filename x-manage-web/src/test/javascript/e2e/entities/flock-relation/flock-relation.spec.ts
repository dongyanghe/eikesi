/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import FlockRelationComponentsPage from './flock-relation.page-object';
import FlockRelationUpdatePage from './flock-relation-update.page-object';

const expect = chai.expect;

describe('FlockRelation e2e test', () => {
  let navBarPage: NavBarPage;
  let flockRelationUpdatePage: FlockRelationUpdatePage;
  let flockRelationComponentsPage: FlockRelationComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load FlockRelations', async () => {
    navBarPage.getEntityPage('flock-relation');
    flockRelationComponentsPage = new FlockRelationComponentsPage();
    expect(await flockRelationComponentsPage.getTitle().getText()).to.match(/Flock Relations/);
  });

  it('should load create FlockRelation page', async () => {
    flockRelationComponentsPage.clickOnCreateButton();
    flockRelationUpdatePage = new FlockRelationUpdatePage();
    expect(await flockRelationUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /manageGatewayApp.flockRelation.home.createOrEditLabel/
    );
  });

  it('should create and save FlockRelations', async () => {
    flockRelationUpdatePage.setRemarkNameInput('remarkName');
    expect(await flockRelationUpdatePage.getRemarkNameInput()).to.match(/remarkName/);
    flockRelationUpdatePage.setPyInput('py');
    expect(await flockRelationUpdatePage.getPyInput()).to.match(/py/);
    flockRelationUpdatePage.setPinYinInput('pinYin');
    expect(await flockRelationUpdatePage.getPinYinInput()).to.match(/pinYin/);
    flockRelationUpdatePage.setTypeInput('type');
    expect(await flockRelationUpdatePage.getTypeInput()).to.match(/type/);
    flockRelationUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await flockRelationUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    flockRelationUpdatePage.customerSelectLastOption();
    flockRelationUpdatePage.customerFlockSelectLastOption();
    await flockRelationUpdatePage.save();
    expect(await flockRelationUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
