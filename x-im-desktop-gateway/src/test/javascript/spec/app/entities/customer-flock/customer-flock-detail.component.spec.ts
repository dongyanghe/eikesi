/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { CustomerFlockDetailComponent } from 'app/entities/customer-flock/customer-flock-detail.component';
import { CustomerFlock } from 'app/shared/model/customer-flock.model';

describe('Component Tests', () => {
    describe('CustomerFlock Management Detail Component', () => {
        let comp: CustomerFlockDetailComponent;
        let fixture: ComponentFixture<CustomerFlockDetailComponent>;
        const route = ({ data: of({ customerFlock: new CustomerFlock(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [CustomerFlockDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerFlockDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerFlockDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerFlock).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
