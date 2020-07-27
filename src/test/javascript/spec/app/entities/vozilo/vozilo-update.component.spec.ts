import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jh2TestModule } from '../../../test.module';
import { VoziloUpdateComponent } from 'app/entities/vozilo/vozilo-update.component';
import { VoziloService } from 'app/entities/vozilo/vozilo.service';
import { Vozilo } from 'app/shared/model/vozilo.model';

describe('Component Tests', () => {
  describe('Vozilo Management Update Component', () => {
    let comp: VoziloUpdateComponent;
    let fixture: ComponentFixture<VoziloUpdateComponent>;
    let service: VoziloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jh2TestModule],
        declarations: [VoziloUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(VoziloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoziloUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoziloService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vozilo(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vozilo();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
