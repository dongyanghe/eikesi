/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImGatewayTestModule } from '../../../test.module';
import { CustomerRelationComponent } from 'app/entities/customer-relation/customer-relation.component';
import { CustomerRelationService } from 'app/entities/customer-relation/customer-relation.service';
import { CustomerRelation } from 'app/shared/model/customer-relation.model';

describe('Component Tests', () => {
    describe('CustomerRelation Management Component', () => {
        let comp: CustomerRelationComponent;
        let fixture: ComponentFixture<CustomerRelationComponent>;
        let service: CustomerRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [CustomerRelationComponent],
                providers: []
            })
                .overrideTemplate(CustomerRelationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerRelationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CustomerRelation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.customerRelations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
