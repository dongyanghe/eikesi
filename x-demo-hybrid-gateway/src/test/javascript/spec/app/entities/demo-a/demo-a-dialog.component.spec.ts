/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoADialogComponent } from '../../../../../../main/webapp/app/entities/demo-a/demo-a-dialog.component';
import { DemoAService } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.service';
import { DemoA } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.model';
import { DemoBService } from '../../../../../../main/webapp/app/entities/demo-b';
import { DemoEService } from '../../../../../../main/webapp/app/entities/demo-e';
import { DemoDService } from '../../../../../../main/webapp/app/entities/demo-d';

describe('Component Tests', () => {

    describe('DemoA Management Dialog Component', () => {
        let comp: DemoADialogComponent;
        let fixture: ComponentFixture<DemoADialogComponent>;
        let service: DemoAService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoADialogComponent],
                providers: [
                    DemoBService,
                    DemoEService,
                    DemoDService,
                    DemoAService
                ]
            })
            .overrideTemplate(DemoADialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoADialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoAService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DemoA(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.demoA = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'demoAListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DemoA();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.demoA = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'demoAListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
