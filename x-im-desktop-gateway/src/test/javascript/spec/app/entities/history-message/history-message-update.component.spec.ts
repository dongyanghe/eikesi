/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { HistoryMessageUpdateComponent } from 'app/entities/history-message/history-message-update.component';
import { HistoryMessageService } from 'app/entities/history-message/history-message.service';
import { HistoryMessage } from 'app/shared/model/history-message.model';

describe('Component Tests', () => {
    describe('HistoryMessage Management Update Component', () => {
        let comp: HistoryMessageUpdateComponent;
        let fixture: ComponentFixture<HistoryMessageUpdateComponent>;
        let service: HistoryMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [HistoryMessageUpdateComponent]
            })
                .overrideTemplate(HistoryMessageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HistoryMessageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryMessageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HistoryMessage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.historyMessage = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HistoryMessage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.historyMessage = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
