/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CurrentMessageComponentsPage from './current-message.page-object';
import CurrentMessageUpdatePage from './current-message-update.page-object';

const expect = chai.expect;

describe('CurrentMessage e2e test', () => {
  let navBarPage: NavBarPage;
  let currentMessageUpdatePage: CurrentMessageUpdatePage;
  let currentMessageComponentsPage: CurrentMessageComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load CurrentMessages', async () => {
    navBarPage.getEntityPage('current-message');
    currentMessageComponentsPage = new CurrentMessageComponentsPage();
    expect(await currentMessageComponentsPage.getTitle().getText()).to.match(/Current Messages/);
  });

  it('should load create CurrentMessage page', async () => {
    currentMessageComponentsPage.clickOnCreateButton();
    currentMessageUpdatePage = new CurrentMessageUpdatePage();
    expect(await currentMessageUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /imWebGatewayApp.currentMessage.home.createOrEditLabel/
    );
  });

  it('should create and save CurrentMessages', async () => {
    currentMessageUpdatePage.setContentInput('content');
    expect(await currentMessageUpdatePage.getContentInput()).to.match(/content/);
    currentMessageUpdatePage.setStatusInput('status');
    expect(await currentMessageUpdatePage.getStatusInput()).to.match(/status/);
    currentMessageUpdatePage.setTypeInput('type');
    expect(await currentMessageUpdatePage.getTypeInput()).to.match(/type/);
    currentMessageUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await currentMessageUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    currentMessageUpdatePage.setCreatedIdInput('5');
    expect(await currentMessageUpdatePage.getCreatedIdInput()).to.eq('5');
    currentMessageUpdatePage.setTargetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await currentMessageUpdatePage.getTargetDateInput()).to.contain('2001-01-01T02:30');
    currentMessageUpdatePage.setTargetIdInput('5');
    expect(await currentMessageUpdatePage.getTargetIdInput()).to.eq('5');
    currentMessageUpdatePage.dialogueSelectLastOption();
    await currentMessageUpdatePage.save();
    expect(await currentMessageUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
