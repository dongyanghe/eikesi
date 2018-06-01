/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { CustomerFlockDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock-delete-dialog.component';
import { CustomerFlockService } from '../../../../../../main/webapp/app/entities/customer-flock/customer-flock.service';

describe('Component Tests', () => {

    describe('CustomerFlock Management Delete Component', () => {
        let comp: CustomerFlockDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerFlockDeleteDialogComponent>;
        let service: CustomerFlockService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [CustomerFlockDeleteDialogComponent],
                providers: [
                    CustomerFlockService
                ]
            })
            .overrideTemplate(CustomerFlockDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerFlockDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerFlockService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
