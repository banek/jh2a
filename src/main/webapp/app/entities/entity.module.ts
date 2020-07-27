import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.Jh2BookModule),
      },
      {
        path: 'vozilo',
        loadChildren: () => import('./vozilo/vozilo.module').then(m => m.Jh2VoziloModule),
      },
      {
        path: 'parking',
        loadChildren: () => import('./parking/parking.module').then(m => m.Jh2ParkingModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class Jh2EntityModule {}
