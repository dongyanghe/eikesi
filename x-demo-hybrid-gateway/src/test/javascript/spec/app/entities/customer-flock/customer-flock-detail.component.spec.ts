/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { CustomerFlockDetailComponent } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock-detail.component';
import { CustomerFlockService } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.service';
import { CustomerFlock } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.model';

describe('Component Tests', () => {

    describe('CustomerFlock Management Detail Component', () => {
        let comp: CustomerFlockDetailComponent;
        let fixture: ComponentFixture<CustomerFlockDetailComponent>;
        let service: CustomerFlockService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [CustomerFlockDetailComponent],
                providers: [
                    CustomerFlockService
                ]
            })
            .overrideTemplate(CustomerFlockDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerFlockDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerFlockService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerFlock(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerFlock).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
