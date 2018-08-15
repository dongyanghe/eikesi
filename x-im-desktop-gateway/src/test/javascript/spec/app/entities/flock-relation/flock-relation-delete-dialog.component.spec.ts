/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ImGatewayTestModule } from '../../../test.module';
import { FlockRelationDeleteDialogComponent } from 'app/entities/flock-relation/flock-relation-delete-dialog.component';
import { FlockRelationService } from 'app/entities/flock-relation/flock-relation.service';

describe('Component Tests', () => {
    describe('FlockRelation Management Delete Component', () => {
        let comp: FlockRelationDeleteDialogComponent;
        let fixture: ComponentFixture<FlockRelationDeleteDialogComponent>;
        let service: FlockRelationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [FlockRelationDeleteDialogComponent]
            })
                .overrideTemplate(FlockRelationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlockRelationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlockRelationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
