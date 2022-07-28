/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectGhTestModule } from '../../../test.module';
import { ZonalDetailComponent } from 'app/entities/zonal/zonal-detail.component';
import { Zonal } from 'app/shared/model/zonal.model';

describe('Component Tests', () => {
    describe('Zonal Management Detail Component', () => {
        let comp: ZonalDetailComponent;
        let fixture: ComponentFixture<ZonalDetailComponent>;
        const route = ({ data: of({ zonal: new Zonal(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectGhTestModule],
                declarations: [ZonalDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ZonalDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZonalDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.zonal).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
