/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DemoGatewayTestModule } from '../../../test.module';
import { HistoryMessageDeleteDialogComponent } from 'app/entities/history-message/history-message-delete-dialog.component';
import { HistoryMessageService } from 'app/entities/history-message/history-message.service';

describe('Component Tests', () => {
    describe('HistoryMessage Management Delete Component', () => {
        let comp: HistoryMessageDeleteDialogComponent;
        let fixture: ComponentFixture<HistoryMessageDeleteDialogComponent>;
        let service: HistoryMessageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [HistoryMessageDeleteDialogComponent]
            })
                .overrideTemplate(HistoryMessageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HistoryMessageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryMessageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

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
