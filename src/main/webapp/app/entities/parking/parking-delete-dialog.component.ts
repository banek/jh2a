import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParking } from 'app/shared/model/parking.model';
import { ParkingService } from './parking.service';

@Component({
  templateUrl: './parking-delete-dialog.component.html',
})
export class ParkingDeleteDialogComponent {
  parking?: IParking;

  constructor(protected parkingService: ParkingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parkingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('parkingListModification');
      this.activeModal.close();
    });
  }
}
