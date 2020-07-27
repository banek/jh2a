import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVozilo } from 'app/shared/model/vozilo.model';

@Component({
  selector: 'jhi-vozilo-detail',
  templateUrl: './vozilo-detail.component.html',
})
export class VoziloDetailComponent implements OnInit {
  vozilo: IVozilo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vozilo }) => (this.vozilo = vozilo));
  }

  previousState(): void {
    window.history.back();
  }
}
