/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoCComponent } from '../../../../../../main/webapp/app/entities/demo-c/demo-c.component';
import { DemoCService } from '../../../../../../main/webapp/app/entities/demo-c/demo-c.service';
import { DemoC } from '../../../../../../main/webapp/app/entities/demo-c/demo-c.model';

describe('Component Tests', () => {

    describe('DemoC Management Component', () => {
        let comp: DemoCComponent;
        let fixture: ComponentFixture<DemoCComponent>;
        let service: DemoCService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoCComponent],
                providers: [
                    DemoCService
                ]
            })
            .overrideTemplate(DemoCComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoCComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoCService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DemoC(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demoCS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
