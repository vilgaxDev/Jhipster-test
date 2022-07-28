import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ZonalComponentsPage, ZonalUpdatePage } from './zonal.page-object';

describe('Zonal e2e test', () => {
    let navBarPage: NavBarPage;
    let zonalUpdatePage: ZonalUpdatePage;
    let zonalComponentsPage: ZonalComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Zonals', () => {
        navBarPage.goToEntity('zonal');
        zonalComponentsPage = new ZonalComponentsPage();
        expect(zonalComponentsPage.getTitle()).toMatch(/projectGhApp.zonal.home.title/);
    });

    it('should load create Zonal page', () => {
        zonalComponentsPage.clickOnCreateButton();
        zonalUpdatePage = new ZonalUpdatePage();
        expect(zonalUpdatePage.getPageTitle()).toMatch(/projectGhApp.zonal.home.createOrEditLabel/);
        zonalUpdatePage.cancel();
    });

    it('should create and save Zonals', () => {
        zonalComponentsPage.clickOnCreateButton();
        zonalUpdatePage.setZoneNameInput('zoneName');
        expect(zonalUpdatePage.getZoneNameInput()).toMatch('zoneName');
        zonalUpdatePage.setZoneAddressInput('zoneAddress');
        expect(zonalUpdatePage.getZoneAddressInput()).toMatch('zoneAddress');
        zonalUpdatePage.setZoneInchargeInput('zoneIncharge');
        expect(zonalUpdatePage.getZoneInchargeInput()).toMatch('zoneIncharge');
        zonalUpdatePage.setStatusInput('5');
        expect(zonalUpdatePage.getStatusInput()).toMatch('5');
        zonalUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(zonalUpdatePage.getCreatedAtInput()).toContain('2001-01-01T02:30');
        zonalUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(zonalUpdatePage.getUpdatedAtInput()).toContain('2001-01-01T02:30');
        zonalUpdatePage.save();
        expect(zonalUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
