import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jh2TestModule } from '../../../test.module';
import { VoziloDetailComponent } from 'app/entities/vozilo/vozilo-detail.component';
import { Vozilo } from 'app/shared/model/vozilo.model';

describe('Component Tests', () => {
  describe('Vozilo Management Detail Component', () => {
    let comp: VoziloDetailComponent;
    let fixture: ComponentFixture<VoziloDetailComponent>;
    const route = ({ data: of({ vozilo: new Vozilo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jh2TestModule],
        declarations: [VoziloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VoziloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VoziloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vozilo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vozilo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
