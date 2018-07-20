/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoGatewayTestModule } from '../../../test.module';
import { CurrentMessageComponent } from 'app/entities/current-message/current-message.component';
import { CurrentMessageService } from 'app/entities/current-message/current-message.service';
import { CurrentMessage } from 'app/shared/model/current-message.model';

describe('Component Tests', () => {
    describe('CurrentMessage Management Component', () => {
        let comp: CurrentMessageComponent;
        let fixture: ComponentFixture<CurrentMessageComponent>;
        let service: CurrentMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DemoGatewayTestModule],
                declarations: [CurrentMessageComponent],
                providers: []
            })
                .overrideTemplate(CurrentMessageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CurrentMessageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrentMessageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CurrentMessage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.currentMessages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
