/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DemoGatewayTestModule } from '../../../test.module';
import { DialogueDeleteDialogComponent } from 'app/entities/dialogue/dialogue-delete-dialog.component';
import { DialogueService } from 'app/entities/dialogue/dialogue.service';

describe('Component Tests', () => {
    describe('Dialogue Management Delete Component', () => {
        let comp: DialogueDeleteDialogComponent;
        let fixture: ComponentFixture<DialogueDeleteDialogComponent>;
        let service: DialogueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [DialogueDeleteDialogComponent]
            })
                .overrideTemplate(DialogueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DialogueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DialogueService);
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
