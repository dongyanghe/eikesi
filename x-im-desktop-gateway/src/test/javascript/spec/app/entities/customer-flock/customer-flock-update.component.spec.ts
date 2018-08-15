/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { CustomerFlockUpdateComponent } from 'app/entities/customer-flock/customer-flock-update.component';
import { CustomerFlockService } from 'app/entities/customer-flock/customer-flock.service';
import { CustomerFlock } from 'app/shared/model/customer-flock.model';

describe('Component Tests', () => {
    describe('CustomerFlock Management Update Component', () => {
        let comp: CustomerFlockUpdateComponent;
        let fixture: ComponentFixture<CustomerFlockUpdateComponent>;
        let service: CustomerFlockService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [CustomerFlockUpdateComponent]
            })
                .overrideTemplate(CustomerFlockUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerFlockUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerFlockService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerFlock(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerFlock = entity;
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
                    const entity = new CustomerFlock();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerFlock = entity;
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
