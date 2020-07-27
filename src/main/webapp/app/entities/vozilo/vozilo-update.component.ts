import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVozilo, Vozilo } from 'app/shared/model/vozilo.model';
import { VoziloService } from './vozilo.service';

@Component({
  selector: 'jhi-vozilo-update',
  templateUrl: './vozilo-update.component.html',
})
export class VoziloUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    naziv: [null, [Validators.required]],
  });

  constructor(protected voziloService: VoziloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vozilo }) => {
      this.updateForm(vozilo);
    });
  }

  updateForm(vozilo: IVozilo): void {
    this.editForm.patchValue({
      id: vozilo.id,
      naziv: vozilo.naziv,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vozilo = this.createFromForm();
    if (vozilo.id !== undefined) {
      this.subscribeToSaveResponse(this.voziloService.update(vozilo));
    } else {
      this.subscribeToSaveResponse(this.voziloService.create(vozilo));
    }
  }

  private createFromForm(): IVozilo {
    return {
      ...new Vozilo(),
      id: this.editForm.get(['id'])!.value,
      naziv: this.editForm.get(['naziv'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVozilo>>): void {
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
