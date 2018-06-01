/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { FlockRelationComponent } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.component';
import { FlockRelationService } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.service';
import { FlockRelation } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.model';

describe('Component Tests', () => {

    describe('FlockRelation Management Component', () => {
        let comp: FlockRelationComponent;
        let fixture: ComponentFixture<FlockRelationComponent>;
        let service: FlockRelationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [FlockRelationComponent],
                providers: [
                    FlockRelationService
                ]
            })
            .overrideTemplate(FlockRelationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlockRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlockRelationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FlockRelation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.flockRelations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
