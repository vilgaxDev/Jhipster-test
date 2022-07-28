/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjectGhTestModule } from '../../../test.module';
import { ZonalUpdateComponent } from 'app/entities/zonal/zonal-update.component';
import { ZonalService } from 'app/entities/zonal/zonal.service';
import { Zonal } from 'app/shared/model/zonal.model';

describe('Component Tests', () => {
    describe('Zonal Management Update Component', () => {
        let comp: ZonalUpdateComponent;
        let fixture: ComponentFixture<ZonalUpdateComponent>;
        let service: ZonalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectGhTestModule],
                declarations: [ZonalUpdateComponent]
            })
                .overrideTemplate(ZonalUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZonalUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZonalService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Zonal(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zonal = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Zonal();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zonal = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
