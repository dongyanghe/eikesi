/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { FlockRelationDetailComponent } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation-detail.component';
import { FlockRelationService } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.service';
import { FlockRelation } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.model';

describe('Component Tests', () => {

    describe('FlockRelation Management Detail Component', () => {
        let comp: FlockRelationDetailComponent;
        let fixture: ComponentFixture<FlockRelationDetailComponent>;
        let service: FlockRelationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [FlockRelationDetailComponent],
                providers: [
                    FlockRelationService
                ]
            })
            .overrideTemplate(FlockRelationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlockRelationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlockRelationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FlockRelation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.flockRelation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
