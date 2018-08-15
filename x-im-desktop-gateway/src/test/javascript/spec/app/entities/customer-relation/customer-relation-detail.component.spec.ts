/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { CustomerRelationDetailComponent } from 'app/entities/customer-relation/customer-relation-detail.component';
import { CustomerRelation } from 'app/shared/model/customer-relation.model';

describe('Component Tests', () => {
    describe('CustomerRelation Management Detail Component', () => {
        let comp: CustomerRelationDetailComponent;
        let fixture: ComponentFixture<CustomerRelationDetailComponent>;
        const route = ({ data: of({ customerRelation: new CustomerRelation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [CustomerRelationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerRelationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerRelationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerRelation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
