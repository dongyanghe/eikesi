/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { CurrentMessageUpdateComponent } from 'app/entities/current-message/current-message-update.component';
import { CurrentMessageService } from 'app/entities/current-message/current-message.service';
import { CurrentMessage } from 'app/shared/model/current-message.model';

describe('Component Tests', () => {
    describe('CurrentMessage Management Update Component', () => {
        let comp: CurrentMessageUpdateComponent;
        let fixture: ComponentFixture<CurrentMessageUpdateComponent>;
        let service: CurrentMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [CurrentMessageUpdateComponent]
            })
                .overrideTemplate(CurrentMessageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CurrentMessageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrentMessageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CurrentMessage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currentMessage = entity;
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
                    const entity = new CurrentMessage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currentMessage = entity;
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
