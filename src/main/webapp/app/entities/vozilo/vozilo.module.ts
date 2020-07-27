import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jh2SharedModule } from 'app/shared/shared.module';
import { VoziloComponent } from './vozilo.component';
import { VoziloDetailComponent } from './vozilo-detail.component';
import { VoziloUpdateComponent } from './vozilo-update.component';
import { VoziloDeleteDialogComponent } from './vozilo-delete-dialog.component';
import { voziloRoute } from './vozilo.route';

@NgModule({
  imports: [Jh2SharedModule, RouterModule.forChild(voziloRoute)],
  declarations: [VoziloComponent, VoziloDetailComponent, VoziloUpdateComponent, VoziloDeleteDialogComponent],
  entryComponents: [VoziloDeleteDialogComponent],
})
export class Jh2VoziloModule {}
