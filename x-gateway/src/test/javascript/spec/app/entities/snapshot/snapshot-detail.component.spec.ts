/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SnapshotDetailComponent } from '../../../../../../main/webapp/app/entities/snapshot/snapshot-detail.component';
import { SnapshotService } from '../../../../../../main/webapp/app/entities/snapshot/snapshot.service';
import { Snapshot } from '../../../../../../main/webapp/app/entities/snapshot/snapshot.model';

describe('Component Tests', () => {

    describe('Snapshot Management Detail Component', () => {
        let comp: SnapshotDetailComponent;
        let fixture: ComponentFixture<SnapshotDetailComponent>;
        let service: SnapshotService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SnapshotDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SnapshotService,
                    JhiEventManager
                ]
            }).overrideTemplate(SnapshotDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SnapshotDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SnapshotService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Snapshot(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.snapshot).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
