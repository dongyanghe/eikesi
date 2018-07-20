/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DemoGatewayTestModule } from '../../../test.module';
import { CustomerRelationUpdateComponent } from 'app/entities/customer-relation/customer-relation-update.component';
import { CustomerRelationService } from 'app/entities/customer-relation/customer-relation.service';
import { CustomerRelation } from 'app/shared/model/customer-relation.model';

describe('Component Tests', () => {
    describe('CustomerRelation Management Update Component', () => {
        let comp: CustomerRelationUpdateComponent;
        let fixture: ComponentFixture<CustomerRelationUpdateComponent>;
        let service: CustomerRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [CustomerRelationUpdateComponent]
            })
                .overrideTemplate(CustomerRelationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerRelationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerRelationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerRelation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerRelation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerRelation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerRelation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
