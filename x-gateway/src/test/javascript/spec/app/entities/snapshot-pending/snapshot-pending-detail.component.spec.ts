/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SnapshotPendingDetailComponent } from '../../../../../../main/webapp/app/entities/snapshot-pending/snapshot-pending-detail.component';
import { SnapshotPendingService } from '../../../../../../main/webapp/app/entities/snapshot-pending/snapshot-pending.service';
import { SnapshotPending } from '../../../../../../main/webapp/app/entities/snapshot-pending/snapshot-pending.model';

describe('Component Tests', () => {

    describe('SnapshotPending Management Detail Component', () => {
        let comp: SnapshotPendingDetailComponent;
        let fixture: ComponentFixture<SnapshotPendingDetailComponent>;
        let service: SnapshotPendingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SnapshotPendingDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SnapshotPendingService,
                    JhiEventManager
                ]
            }).overrideTemplate(SnapshotPendingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SnapshotPendingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SnapshotPendingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SnapshotPending(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.snapshotPending).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
