/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import HistoryMessageComponentsPage from './history-message.page-object';
import HistoryMessageUpdatePage from './history-message-update.page-object';

const expect = chai.expect;

describe('HistoryMessage e2e test', () => {
  let navBarPage: NavBarPage;
  let historyMessageUpdatePage: HistoryMessageUpdatePage;
  let historyMessageComponentsPage: HistoryMessageComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load HistoryMessages', async () => {
    navBarPage.getEntityPage('history-message');
    historyMessageComponentsPage = new HistoryMessageComponentsPage();
    expect(await historyMessageComponentsPage.getTitle().getText()).to.match(/History Messages/);
  });

  it('should load create HistoryMessage page', async () => {
    historyMessageComponentsPage.clickOnCreateButton();
    historyMessageUpdatePage = new HistoryMessageUpdatePage();
    expect(await historyMessageUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /manageGatewayApp.historyMessage.home.createOrEditLabel/
    );
  });

  it('should create and save HistoryMessages', async () => {
    historyMessageUpdatePage.setContentInput('content');
    expect(await historyMessageUpdatePage.getContentInput()).to.match(/content/);
    historyMessageUpdatePage.setStatusInput('status');
    expect(await historyMessageUpdatePage.getStatusInput()).to.match(/status/);
    historyMessageUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await historyMessageUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    historyMessageUpdatePage.setCreatedIdInput('5');
    expect(await historyMessageUpdatePage.getCreatedIdInput()).to.eq('5');
    historyMessageUpdatePage.setTargetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await historyMessageUpdatePage.getTargetDateInput()).to.contain('2001-01-01T02:30');
    historyMessageUpdatePage.setTargetIdInput('5');
    expect(await historyMessageUpdatePage.getTargetIdInput()).to.eq('5');
    await historyMessageUpdatePage.save();
    expect(await historyMessageUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
