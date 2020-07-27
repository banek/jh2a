import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVozilo } from 'app/shared/model/vozilo.model';
import { VoziloService } from './vozilo.service';
import { VoziloDeleteDialogComponent } from './vozilo-delete-dialog.component';

@Component({
  selector: 'jhi-vozilo',
  templateUrl: './vozilo.component.html',
})
export class VoziloComponent implements OnInit, OnDestroy {
  vozilos?: IVozilo[];
  eventSubscriber?: Subscription;

  constructor(protected voziloService: VoziloService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.voziloService.query().subscribe((res: HttpResponse<IVozilo[]>) => (this.vozilos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVozilos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVozilo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVozilos(): void {
    this.eventSubscriber = this.eventManager.subscribe('voziloListModification', () => this.loadAll());
  }

  delete(vozilo: IVozilo): void {
    const modalRef = this.modalService.open(VoziloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vozilo = vozilo;
  }
}
