/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoEDetailComponent } from '../../../../../../main/webapp/app/entities/demo-e/demo-e-detail.component';
import { DemoEService } from '../../../../../../main/webapp/app/entities/demo-e/demo-e.service';
import { DemoE } from '../../../../../../main/webapp/app/entities/demo-e/demo-e.model';

describe('Component Tests', () => {

    describe('DemoE Management Detail Component', () => {
        let comp: DemoEDetailComponent;
        let fixture: ComponentFixture<DemoEDetailComponent>;
        let service: DemoEService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoEDetailComponent],
                providers: [
                    DemoEService
                ]
            })
            .overrideTemplate(DemoEDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoEDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoEService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DemoE(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.demoE).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
