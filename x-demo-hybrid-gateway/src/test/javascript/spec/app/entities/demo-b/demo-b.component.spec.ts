/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoBComponent } from '../../../../../../main/webapp/app/entities/demo-b/demo-b.component';
import { DemoBService } from '../../../../../../main/webapp/app/entities/demo-b/demo-b.service';
import { DemoB } from '../../../../../../main/webapp/app/entities/demo-b/demo-b.model';

describe('Component Tests', () => {

    describe('DemoB Management Component', () => {
        let comp: DemoBComponent;
        let fixture: ComponentFixture<DemoBComponent>;
        let service: DemoBService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoBComponent],
                providers: [
                    DemoBService
                ]
            })
            .overrideTemplate(DemoBComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoBComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoBService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DemoB(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demoBS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
