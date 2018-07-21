/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ImGatewayTestModule } from '../../../test.module';
import { DialogueComponent } from 'app/entities/dialogue/dialogue.component';
import { DialogueService } from 'app/entities/dialogue/dialogue.service';
import { Dialogue } from 'app/shared/model/dialogue.model';

describe('Component Tests', () => {
    describe('Dialogue Management Component', () => {
        let comp: DialogueComponent;
        let fixture: ComponentFixture<DialogueComponent>;
        let service: DialogueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [DialogueComponent],
                providers: []
            })
                .overrideTemplate(DialogueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DialogueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DialogueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Dialogue(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dialogues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
