import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jh2TestModule } from '../../../test.module';
import { ParkingDetailComponent } from 'app/entities/parking/parking-detail.component';
import { Parking } from 'app/shared/model/parking.model';

describe('Component Tests', () => {
  describe('Parking Management Detail Component', () => {
    let comp: ParkingDetailComponent;
    let fixture: ComponentFixture<ParkingDetailComponent>;
    const route = ({ data: of({ parking: new Parking(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jh2TestModule],
        declarations: [ParkingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ParkingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParkingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load parking on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.parking).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
