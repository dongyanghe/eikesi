/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoEComponent } from '../../../../../../main/webapp/app/entities/demo-e/demo-e.component';
import { DemoEService } from '../../../../../../main/webapp/app/entities/demo-e/demo-e.service';
import { DemoE } from '../../../../../../main/webapp/app/entities/demo-e/demo-e.model';

describe('Component Tests', () => {

    describe('DemoE Management Component', () => {
        let comp: DemoEComponent;
        let fixture: ComponentFixture<DemoEComponent>;
        let service: DemoEService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoEComponent],
                providers: [
                    DemoEService
                ]
            })
            .overrideTemplate(DemoEComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoEComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoEService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DemoE(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demoES[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
