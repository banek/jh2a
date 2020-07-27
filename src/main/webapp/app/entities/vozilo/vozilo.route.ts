import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVozilo, Vozilo } from 'app/shared/model/vozilo.model';
import { VoziloService } from './vozilo.service';
import { VoziloComponent } from './vozilo.component';
import { VoziloDetailComponent } from './vozilo-detail.component';
import { VoziloUpdateComponent } from './vozilo-update.component';

@Injectable({ providedIn: 'root' })
export class VoziloResolve implements Resolve<IVozilo> {
  constructor(private service: VoziloService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVozilo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((vozilo: HttpResponse<Vozilo>) => {
          if (vozilo.body) {
            return of(vozilo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Vozilo());
  }
}

export const voziloRoute: Routes = [
  {
    path: '',
    component: VoziloComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.vozilo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VoziloDetailComponent,
    resolve: {
      vozilo: VoziloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.vozilo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VoziloUpdateComponent,
    resolve: {
      vozilo: VoziloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.vozilo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VoziloUpdateComponent,
    resolve: {
      vozilo: VoziloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.vozilo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
