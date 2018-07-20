/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoGatewayTestModule } from '../../../test.module';
import { FlockRelationComponent } from 'app/entities/flock-relation/flock-relation.component';
import { FlockRelationService } from 'app/entities/flock-relation/flock-relation.service';
import { FlockRelation } from 'app/shared/model/flock-relation.model';

describe('Component Tests', () => {
    describe('FlockRelation Management Component', () => {
        let comp: FlockRelationComponent;
        let fixture: ComponentFixture<FlockRelationComponent>;
        let service: FlockRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [FlockRelationComponent],
                providers: []
            })
                .overrideTemplate(FlockRelationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlockRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlockRelationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlockRelation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flockRelations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
