/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemoGatewayTestModule } from '../../../test.module';
import { HistoryMessageDetailComponent } from 'app/entities/history-message/history-message-detail.component';
import { HistoryMessage } from 'app/shared/model/history-message.model';

describe('Component Tests', () => {
    describe('HistoryMessage Management Detail Component', () => {
        let comp: HistoryMessageDetailComponent;
        let fixture: ComponentFixture<HistoryMessageDetailComponent>;
        const route = ({ data: of({ historyMessage: new HistoryMessage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [HistoryMessageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HistoryMessageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HistoryMessageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.historyMessage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
