/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoCDetailComponent } from '../../../../../../main/webapp/app/entities/demo-c/demo-c-detail.component';
import { DemoCService } from '../../../../../../main/webapp/app/entities/demo-c/demo-c.service';
import { DemoC } from '../../../../../../main/webapp/app/entities/demo-c/demo-c.model';

describe('Component Tests', () => {

    describe('DemoC Management Detail Component', () => {
        let comp: DemoCDetailComponent;
        let fixture: ComponentFixture<DemoCDetailComponent>;
        let service: DemoCService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoCDetailComponent],
                providers: [
                    DemoCService
                ]
            })
            .overrideTemplate(DemoCDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoCDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoCService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DemoC(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.demoC).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
