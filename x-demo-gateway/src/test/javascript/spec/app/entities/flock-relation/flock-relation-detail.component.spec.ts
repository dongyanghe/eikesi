/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemoGatewayTestModule } from '../../../test.module';
import { FlockRelationDetailComponent } from 'app/entities/flock-relation/flock-relation-detail.component';
import { FlockRelation } from 'app/shared/model/flock-relation.model';

describe('Component Tests', () => {
    describe('FlockRelation Management Detail Component', () => {
        let comp: FlockRelationDetailComponent;
        let fixture: ComponentFixture<FlockRelationDetailComponent>;
        const route = ({ data: of({ flockRelation: new FlockRelation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [FlockRelationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlockRelationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlockRelationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flockRelation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
