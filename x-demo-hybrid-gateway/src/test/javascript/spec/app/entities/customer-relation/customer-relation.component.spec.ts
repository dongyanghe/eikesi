/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { CustomerRelationComponent } from '../../../../../../main/webapp/app/entities/customer-relation/customer-relation.component';
import { CustomerRelationService } from '../../../../../../main/webapp/app/entities/customer-relation/customer-relation.service';
import { CustomerRelation } from '../../../../../../main/webapp/app/entities/customer-relation/customer-relation.model';

describe('Component Tests', () => {

    describe('CustomerRelation Management Component', () => {
        let comp: CustomerRelationComponent;
        let fixture: ComponentFixture<CustomerRelationComponent>;
        let service: CustomerRelationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [CustomerRelationComponent],
                providers: [
                    CustomerRelationService
                ]
            })
            .overrideTemplate(CustomerRelationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerRelationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerRelation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerRelations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
