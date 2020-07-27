import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParking, Parking } from 'app/shared/model/parking.model';
import { ParkingService } from './parking.service';
import { ParkingComponent } from './parking.component';
import { ParkingDetailComponent } from './parking-detail.component';
import { ParkingUpdateComponent } from './parking-update.component';

@Injectable({ providedIn: 'root' })
export class ParkingResolve implements Resolve<IParking> {
  constructor(private service: ParkingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParking> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((parking: HttpResponse<Parking>) => {
          if (parking.body) {
            return of(parking.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Parking());
  }
}

export const parkingRoute: Routes = [
  {
    path: '',
    component: ParkingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.parking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParkingDetailComponent,
    resolve: {
      parking: ParkingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.parking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParkingUpdateComponent,
    resolve: {
      parking: ParkingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.parking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParkingUpdateComponent,
    resolve: {
      parking: ParkingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jh2App.parking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
