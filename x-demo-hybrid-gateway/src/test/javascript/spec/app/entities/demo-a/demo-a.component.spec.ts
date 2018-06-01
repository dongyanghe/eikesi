/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { DemoAComponent } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.component';
import { DemoAService } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.service';
import { DemoA } from '../../../../../../main/webapp/app/entities/demo-a/demo-a.model';

describe('Component Tests', () => {

    describe('DemoA Management Component', () => {
        let comp: DemoAComponent;
        let fixture: ComponentFixture<DemoAComponent>;
        let service: DemoAService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [DemoAComponent],
                providers: [
                    DemoAService
                ]
            })
            .overrideTemplate(DemoAComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemoAComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemoAService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DemoA(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demoAS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
