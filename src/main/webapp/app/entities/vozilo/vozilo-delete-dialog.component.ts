import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVozilo } from 'app/shared/model/vozilo.model';
import { VoziloService } from './vozilo.service';

@Component({
  templateUrl: './vozilo-delete-dialog.component.html',
})
export class VoziloDeleteDialogComponent {
  vozilo?: IVozilo;

  constructor(protected voziloService: VoziloService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.voziloService.delete(id).subscribe(() => {
      this.eventManager.broadcast('voziloListModification');
      this.activeModal.close();
    });
  }
}
