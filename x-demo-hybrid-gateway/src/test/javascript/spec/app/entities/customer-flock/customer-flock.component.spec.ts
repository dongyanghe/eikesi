/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { CustomerFlockComponent } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.component';
import { CustomerFlockService } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.service';
import { CustomerFlock } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.model';

describe('Component Tests', () => {

    describe('CustomerFlock Management Component', () => {
        let comp: CustomerFlockComponent;
        let fixture: ComponentFixture<CustomerFlockComponent>;
        let service: CustomerFlockService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [CustomerFlockComponent],
                providers: [
                    CustomerFlockService
                ]
            })
            .overrideTemplate(CustomerFlockComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerFlockComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerFlockService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerFlock(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerFlocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
