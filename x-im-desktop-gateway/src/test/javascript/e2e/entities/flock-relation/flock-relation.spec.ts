import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { FlockRelationComponentsPage, FlockRelationUpdatePage } from './flock-relation.page-object';

describe('FlockRelation e2e test', () => {
    let navBarPage: NavBarPage;
    let flockRelationUpdatePage: FlockRelationUpdatePage;
    let flockRelationComponentsPage: FlockRelationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load FlockRelations', () => {
        navBarPage.goToEntity('flock-relation');
        flockRelationComponentsPage = new FlockRelationComponentsPage();
        expect(flockRelationComponentsPage.getTitle()).toMatch(/imGatewayApp.flockRelation.home.title/);
    });

    it('should load create FlockRelation page', () => {
        flockRelationComponentsPage.clickOnCreateButton();
        flockRelationUpdatePage = new FlockRelationUpdatePage();
        expect(flockRelationUpdatePage.getPageTitle()).toMatch(/imGatewayApp.flockRelation.home.createOrEditLabel/);
        flockRelationUpdatePage.cancel();
    });

    it('should create and save FlockRelations', () => {
        flockRelationComponentsPage.clickOnCreateButton();
        flockRelationUpdatePage.setRemarkNameInput('remarkName');
        expect(flockRelationUpdatePage.getRemarkNameInput()).toMatch('remarkName');
        flockRelationUpdatePage.setPyInput('py');
        expect(flockRelationUpdatePage.getPyInput()).toMatch('py');
        flockRelationUpdatePage.setPinYinInput('pinYin');
        expect(flockRelationUpdatePage.getPinYinInput()).toMatch('pinYin');
        flockRelationUpdatePage.setTypeInput('type');
        expect(flockRelationUpdatePage.getTypeInput()).toMatch('type');
        flockRelationUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(flockRelationUpdatePage.getCreatedDateInput()).toContain('2001-01-01T02:30');
        flockRelationUpdatePage.customerSelectLastOption();
        flockRelationUpdatePage.customerFlockSelectLastOption();
        flockRelationUpdatePage.save();
        expect(flockRelationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
