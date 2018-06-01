/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoCDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/demo-c/demo-c-delete-dialog.component';
import { DemoCService } from '../../../../../../main/webapp/app/entities/demo-c/demo-c.service';

describe('Component Tests', () => {

    describe('DemoC Management Delete Component', () => {
        let comp: DemoCDeleteDialogComponent;
        let fixture: ComponentFixture<DemoCDeleteDialogComponent>;
        let service: DemoCService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoCDeleteDialogComponent],
                providers: [
                    DemoCService
                ]
            })
            .overrideTemplate(DemoCDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoCDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoCService);
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
