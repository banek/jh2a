import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParking } from 'app/shared/model/parking.model';
import { ParkingService } from './parking.service';
import { ParkingDeleteDialogComponent } from './parking-delete-dialog.component';

@Component({
  selector: 'jhi-parking',
  templateUrl: './parking.component.html',
})
export class ParkingComponent implements OnInit, OnDestroy {
  parkings?: IParking[];
  eventSubscriber?: Subscription;

  constructor(protected parkingService: ParkingService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.parkingService.query().subscribe((res: HttpResponse<IParking[]>) => (this.parkings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParkings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParking): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParkings(): void {
    this.eventSubscriber = this.eventManager.subscribe('parkingListModification', () => this.loadAll());
  }

  delete(parking: IParking): void {
    const modalRef = this.modalService.open(ParkingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parking = parking;
  }
}
