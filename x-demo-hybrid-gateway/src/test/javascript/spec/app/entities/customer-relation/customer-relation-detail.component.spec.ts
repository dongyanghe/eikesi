/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { CustomerRelationDetailComponent } from '../../../../../../main/webapp/app/entities/customer-relation/customer-relation-detail.component';
import { CustomerRelationService } from '../../../../../../main/webapp/app/entities/customer-relation/customer-relation.service';
import { CustomerRelation } from '../../../../../../main/webapp/app/entities/customer-relation/customer-relation.model';

describe('Component Tests', () => {

    describe('CustomerRelation Management Detail Component', () => {
        let comp: CustomerRelationDetailComponent;
        let fixture: ComponentFixture<CustomerRelationDetailComponent>;
        let service: CustomerRelationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [CustomerRelationDetailComponent],
                providers: [
                    CustomerRelationService
                ]
            })
            .overrideTemplate(CustomerRelationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerRelationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerRelationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerRelation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerRelation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
