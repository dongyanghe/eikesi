/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoBDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/demo-b/demo-b-delete-dialog.component';
import { DemoBService } from '../../../../../../main/webapp/app/entities/demo-b/demo-b.service';

describe('Component Tests', () => {

    describe('DemoB Management Delete Component', () => {
        let comp: DemoBDeleteDialogComponent;
        let fixture: ComponentFixture<DemoBDeleteDialogComponent>;
        let service: DemoBService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoBDeleteDialogComponent],
                providers: [
                    DemoBService
                ]
            })
            .overrideTemplate(DemoBDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoBDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoBService);
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
