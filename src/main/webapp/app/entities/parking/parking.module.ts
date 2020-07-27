import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jh2SharedModule } from 'app/shared/shared.module';
import { ParkingComponent } from './parking.component';
import { ParkingDetailComponent } from './parking-detail.component';
import { ParkingUpdateComponent } from './parking-update.component';
import { ParkingDeleteDialogComponent } from './parking-delete-dialog.component';
import { parkingRoute } from './parking.route';

@NgModule({
  imports: [Jh2SharedModule, RouterModule.forChild(parkingRoute)],
  declarations: [ParkingComponent, ParkingDetailComponent, ParkingUpdateComponent, ParkingDeleteDialogComponent],
  entryComponents: [ParkingDeleteDialogComponent],
})
export class Jh2ParkingModule {}
