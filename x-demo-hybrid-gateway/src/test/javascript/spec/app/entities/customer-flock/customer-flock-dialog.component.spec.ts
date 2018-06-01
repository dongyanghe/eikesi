/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { CustomerFlockDialogComponent } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock-dialog.component';
import { CustomerFlockService } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.service';
import { CustomerFlock } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.model';

describe('Component Tests', () => {

    describe('CustomerFlock Management Dialog Component', () => {
        let comp: CustomerFlockDialogComponent;
        let fixture: ComponentFixture<CustomerFlockDialogComponent>;
        let service: CustomerFlockService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [CustomerFlockDialogComponent],
                providers: [
                    CustomerFlockService
                ]
            })
            .overrideTemplate(CustomerFlockDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerFlockDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerFlockService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerFlock(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customerFlock = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerFlockListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerFlock();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customerFlock = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerFlockListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
