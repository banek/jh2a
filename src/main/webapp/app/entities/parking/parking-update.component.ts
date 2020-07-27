import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParking, Parking } from 'app/shared/model/parking.model';
import { ParkingService } from './parking.service';

@Component({
  selector: 'jhi-parking-update',
  templateUrl: './parking-update.component.html',
})
export class ParkingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    naziv: [null, [Validators.required]],
    povrsina: [null, [Validators.required]],
  });

  constructor(protected parkingService: ParkingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parking }) => {
      this.updateForm(parking);
    });
  }

  updateForm(parking: IParking): void {
    this.editForm.patchValue({
      id: parking.id,
      naziv: parking.naziv,
      povrsina: parking.povrsina,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parking = this.createFromForm();
    if (parking.id !== undefined) {
      this.subscribeToSaveResponse(this.parkingService.update(parking));
    } else {
      this.subscribeToSaveResponse(this.parkingService.create(parking));
    }
  }

  private createFromForm(): IParking {
    return {
      ...new Parking(),
      id: this.editForm.get(['id'])!.value,
      naziv: this.editForm.get(['naziv'])!.value,
      povrsina: this.editForm.get(['povrsina'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParking>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
