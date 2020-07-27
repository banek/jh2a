import { element, by, ElementFinder } from 'protractor';

export class ParkingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parking div table .btn-danger'));
  title = element.all(by.css('jhi-parking div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ParkingUpdatePage {
  pageTitle = element(by.id('jhi-parking-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nazivInput = element(by.id('field_naziv'));
  povrsinaInput = element(by.id('field_povrsina'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNazivInput(naziv: string): Promise<void> {
    await this.nazivInput.sendKeys(naziv);
  }

  async getNazivInput(): Promise<string> {
    return await this.nazivInput.getAttribute('value');
  }

  async setPovrsinaInput(povrsina: string): Promise<void> {
    await this.povrsinaInput.sendKeys(povrsina);
  }

  async getPovrsinaInput(): Promise<string> {
    return await this.povrsinaInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ParkingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-parking-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-parking'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
