import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VoziloComponentsPage, VoziloDeleteDialog, VoziloUpdatePage } from './vozilo.page-object';

const expect = chai.expect;

describe('Vozilo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let voziloComponentsPage: VoziloComponentsPage;
  let voziloUpdatePage: VoziloUpdatePage;
  let voziloDeleteDialog: VoziloDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Vozilos', async () => {
    await navBarPage.goToEntity('vozilo');
    voziloComponentsPage = new VoziloComponentsPage();
    await browser.wait(ec.visibilityOf(voziloComponentsPage.title), 5000);
    expect(await voziloComponentsPage.getTitle()).to.eq('jh2App.vozilo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(voziloComponentsPage.entities), ec.visibilityOf(voziloComponentsPage.noResult)), 1000);
  });

  it('should load create Vozilo page', async () => {
    await voziloComponentsPage.clickOnCreateButton();
    voziloUpdatePage = new VoziloUpdatePage();
    expect(await voziloUpdatePage.getPageTitle()).to.eq('jh2App.vozilo.home.createOrEditLabel');
    await voziloUpdatePage.cancel();
  });

  it('should create and save Vozilos', async () => {
    const nbButtonsBeforeCreate = await voziloComponentsPage.countDeleteButtons();

    await voziloComponentsPage.clickOnCreateButton();

    await promise.all([voziloUpdatePage.setNazivInput('naziv')]);

    expect(await voziloUpdatePage.getNazivInput()).to.eq('naziv', 'Expected Naziv value to be equals to naziv');

    await voziloUpdatePage.save();
    expect(await voziloUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await voziloComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Vozilo', async () => {
    const nbButtonsBeforeDelete = await voziloComponentsPage.countDeleteButtons();
    await voziloComponentsPage.clickOnLastDeleteButton();

    voziloDeleteDialog = new VoziloDeleteDialog();
    expect(await voziloDeleteDialog.getDialogTitle()).to.eq('jh2App.vozilo.delete.question');
    await voziloDeleteDialog.clickOnConfirmButton();

    expect(await voziloComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
