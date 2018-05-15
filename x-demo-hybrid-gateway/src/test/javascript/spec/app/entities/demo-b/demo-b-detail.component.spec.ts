/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoBDetailComponent } from '../../../../../../main/webapp/app/entities/demo-b/demo-b-detail.component';
import { DemoBService } from '../../../../../../main/webapp/app/entities/demo-b/demo-b.service';
import { DemoB } from '../../../../../../main/webapp/app/entities/demo-b/demo-b.model';

describe('Component Tests', () => {

    describe('DemoB Management Detail Component', () => {
        let comp: DemoBDetailComponent;
        let fixture: ComponentFixture<DemoBDetailComponent>;
        let service: DemoBService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoBDetailComponent],
                providers: [
                    DemoBService
                ]
            })
            .overrideTemplate(DemoBDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoBDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoBService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DemoB(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.demoB).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
