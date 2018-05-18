/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { FlockRelationDialogComponent } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation-dialog.component';
import { FlockRelationService } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.service';
import { FlockRelation } from '../../../../../../main/webapp/app/entities/flock-relation/flock-relation.model';
import { CustomerService } from '../../../../../../main/webapp/app/entities/customer';
import { CustomerFlockService } from '../../../../../../main/webapp/app/entities/customer-flock';

describe('Component Tests', () => {

    describe('FlockRelation Management Dialog Component', () => {
        let comp: FlockRelationDialogComponent;
        let fixture: ComponentFixture<FlockRelationDialogComponent>;
        let service: FlockRelationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [FlockRelationDialogComponent],
                providers: [
                    CustomerService,
                    CustomerFlockService,
                    FlockRelationService
                ]
            })
            .overrideTemplate(FlockRelationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FlockRelationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlockRelationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FlockRelation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.flockRelation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'flockRelationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FlockRelation();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.flockRelation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'flockRelationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
