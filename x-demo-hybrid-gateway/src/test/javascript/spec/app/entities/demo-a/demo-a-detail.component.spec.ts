/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoADetailComponent } from '../../../../../../main/webapp/app/entities/demo-a/demo-a-detail.component';
import { DemoAService } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.service';
import { DemoA } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.model';

describe('Component Tests', () => {

    describe('DemoA Management Detail Component', () => {
        let comp: DemoADetailComponent;
        let fixture: ComponentFixture<DemoADetailComponent>;
        let service: DemoAService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoADetailComponent],
                providers: [
                    DemoAService
                ]
            })
            .overrideTemplate(DemoADetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoADetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoAService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DemoA(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.demoA).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
