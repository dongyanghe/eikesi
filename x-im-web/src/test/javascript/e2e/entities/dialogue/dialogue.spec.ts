/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import DialogueComponentsPage from './dialogue.page-object';
import DialogueUpdatePage from './dialogue-update.page-object';

const expect = chai.expect;

describe('Dialogue e2e test', () => {
  let navBarPage: NavBarPage;
  let dialogueUpdatePage: DialogueUpdatePage;
  let dialogueComponentsPage: DialogueComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Dialogues', async () => {
    navBarPage.getEntityPage('dialogue');
    dialogueComponentsPage = new DialogueComponentsPage();
    expect(await dialogueComponentsPage.getTitle().getText()).to.match(/Dialogues/);
  });

  it('should load create Dialogue page', async () => {
    dialogueComponentsPage.clickOnCreateButton();
    dialogueUpdatePage = new DialogueUpdatePage();
    expect(await dialogueUpdatePage.getPageTitle().getAttribute('id')).to.match(/imWebGatewayApp.dialogue.home.createOrEditLabel/);
  });

  it('should create and save Dialogues', async () => {
    dialogueUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await dialogueUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    dialogueUpdatePage.setCreatedIdInput('5');
    expect(await dialogueUpdatePage.getCreatedIdInput()).to.eq('5');
    dialogueUpdatePage.setTargetIdInput('5');
    expect(await dialogueUpdatePage.getTargetIdInput()).to.eq('5');
    dialogueUpdatePage.setTargetTypeInput('targetType');
    expect(await dialogueUpdatePage.getTargetTypeInput()).to.match(/targetType/);
    await dialogueUpdatePage.save();
    expect(await dialogueUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
