/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { UserFlockComponent } from '../../../../../../main/webapp/app/entities/user-flock/user-flock.component';
import { UserFlockService } from '../../../../../../main/webapp/app/entities/user-flock/user-flock.service';
import { UserFlock } from '../../../../../../main/webapp/app/entities/user-flock/user-flock.model';

describe('Component Tests', () => {

    describe('UserFlock Management Component', () => {
        let comp: UserFlockComponent;
        let fixture: ComponentFixture<UserFlockComponent>;
        let service: UserFlockService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [UserFlockComponent],
                providers: [
                    UserFlockService
                ]
            })
            .overrideTemplate(UserFlockComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserFlockComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserFlockService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserFlock(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userFlocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
