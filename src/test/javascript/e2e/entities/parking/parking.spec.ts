import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParkingComponentsPage, ParkingDeleteDialog, ParkingUpdatePage } from './parking.page-object';

const expect = chai.expect;

describe('Parking e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parkingComponentsPage: ParkingComponentsPage;
  let parkingUpdatePage: ParkingUpdatePage;
  let parkingDeleteDialog: ParkingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parkings', async () => {
    await navBarPage.goToEntity('parking');
    parkingComponentsPage = new ParkingComponentsPage();
    await browser.wait(ec.visibilityOf(parkingComponentsPage.title), 5000);
    expect(await parkingComponentsPage.getTitle()).to.eq('jh2App.parking.home.title');
    await browser.wait(ec.or(ec.visibilityOf(parkingComponentsPage.entities), ec.visibilityOf(parkingComponentsPage.noResult)), 1000);
  });

  it('should load create Parking page', async () => {
    await parkingComponentsPage.clickOnCreateButton();
    parkingUpdatePage = new ParkingUpdatePage();
    expect(await parkingUpdatePage.getPageTitle()).to.eq('jh2App.parking.home.createOrEditLabel');
    await parkingUpdatePage.cancel();
  });

  it('should create and save Parkings', async () => {
    const nbButtonsBeforeCreate = await parkingComponentsPage.countDeleteButtons();

    await parkingComponentsPage.clickOnCreateButton();

    await promise.all([parkingUpdatePage.setNazivInput('naziv'), parkingUpdatePage.setPovrsinaInput('5')]);

    expect(await parkingUpdatePage.getNazivInput()).to.eq('naziv', 'Expected Naziv value to be equals to naziv');
    expect(await parkingUpdatePage.getPovrsinaInput()).to.eq('5', 'Expected povrsina value to be equals to 5');

    await parkingUpdatePage.save();
    expect(await parkingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parkingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parking', async () => {
    const nbButtonsBeforeDelete = await parkingComponentsPage.countDeleteButtons();
    await parkingComponentsPage.clickOnLastDeleteButton();

    parkingDeleteDialog = new ParkingDeleteDialog();
    expect(await parkingDeleteDialog.getDialogTitle()).to.eq('jh2App.parking.delete.question');
    await parkingDeleteDialog.clickOnConfirmButton();

    expect(await parkingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
