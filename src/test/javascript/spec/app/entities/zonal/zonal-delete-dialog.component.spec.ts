/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectGhTestModule } from '../../../test.module';
import { ZonalDeleteDialogComponent } from 'app/entities/zonal/zonal-delete-dialog.component';
import { ZonalService } from 'app/entities/zonal/zonal.service';

describe('Component Tests', () => {
    describe('Zonal Management Delete Component', () => {
        let comp: ZonalDeleteDialogComponent;
        let fixture: ComponentFixture<ZonalDeleteDialogComponent>;
        let service: ZonalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectGhTestModule],
                declarations: [ZonalDeleteDialogComponent]
            })
                .overrideTemplate(ZonalDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZonalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZonalService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
