/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoDComponent } from '../../../../../../main/webapp/app/entities/demo-d/demo-d.component';
import { DemoDService } from '../../../../../../main/webapp/app/entities/demo-d/demo-d.service';
import { DemoD } from '../../../../../../main/webapp/app/entities/demo-d/demo-d.model';

describe('Component Tests', () => {

    describe('DemoD Management Component', () => {
        let comp: DemoDComponent;
        let fixture: ComponentFixture<DemoDComponent>;
        let service: DemoDService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoDComponent],
                providers: [
                    DemoDService
                ]
            })
            .overrideTemplate(DemoDComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoDComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoDService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DemoD(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demoDS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
