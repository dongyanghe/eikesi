/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemoGatewayTestModule } from '../../../test.module';
import { CurrentMessageDetailComponent } from 'app/entities/current-message/current-message-detail.component';
import { CurrentMessage } from 'app/shared/model/current-message.model';

describe('Component Tests', () => {
    describe('CurrentMessage Management Detail Component', () => {
        let comp: CurrentMessageDetailComponent;
        let fixture: ComponentFixture<CurrentMessageDetailComponent>;
        const route = ({ data: of({ currentMessage: new CurrentMessage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [CurrentMessageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CurrentMessageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CurrentMessageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.currentMessage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
