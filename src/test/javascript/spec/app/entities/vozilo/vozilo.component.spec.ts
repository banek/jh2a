import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jh2TestModule } from '../../../test.module';
import { VoziloComponent } from 'app/entities/vozilo/vozilo.component';
import { VoziloService } from 'app/entities/vozilo/vozilo.service';
import { Vozilo } from 'app/shared/model/vozilo.model';

describe('Component Tests', () => {
  describe('Vozilo Management Component', () => {
    let comp: VoziloComponent;
    let fixture: ComponentFixture<VoziloComponent>;
    let service: VoziloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jh2TestModule],
        declarations: [VoziloComponent],
      })
        .overrideTemplate(VoziloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoziloComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoziloService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Vozilo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.vozilos && comp.vozilos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
