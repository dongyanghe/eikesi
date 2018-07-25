/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { DialogueUpdateComponent } from 'app/entities/dialogue/dialogue-update.component';
import { DialogueService } from 'app/entities/dialogue/dialogue.service';
import { Dialogue } from 'app/shared/model/dialogue.model';

describe('Component Tests', () => {
    describe('Dialogue Management Update Component', () => {
        let comp: DialogueUpdateComponent;
        let fixture: ComponentFixture<DialogueUpdateComponent>;
        let service: DialogueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [DialogueUpdateComponent]
            })
                .overrideTemplate(DialogueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DialogueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DialogueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Dialogue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dialogue = entity;
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
                    const entity = new Dialogue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dialogue = entity;
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
