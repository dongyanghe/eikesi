/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { DialogueDetailComponent } from 'app/entities/dialogue/dialogue-detail.component';
import { Dialogue } from 'app/shared/model/dialogue.model';

describe('Component Tests', () => {
    describe('Dialogue Management Detail Component', () => {
        let comp: DialogueDetailComponent;
        let fixture: ComponentFixture<DialogueDetailComponent>;
        const route = ({ data: of({ dialogue: new Dialogue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [DialogueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DialogueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DialogueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dialogue).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
