/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { UserRelationDetailComponent } from '../../../../../../main/webapp/app/entities/user-relation/user-relation-detail.component';
import { UserRelationService } from '../../../../../../main/webapp/app/entities/user-relation/user-relation.service';
import { UserRelation } from '../../../../../../main/webapp/app/entities/user-relation/user-relation.model';

describe('Component Tests', () => {

    describe('UserRelation Management Detail Component', () => {
        let comp: UserRelationDetailComponent;
        let fixture: ComponentFixture<UserRelationDetailComponent>;
        let service: UserRelationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [UserRelationDetailComponent],
                providers: [
                    UserRelationService
                ]
            })
            .overrideTemplate(UserRelationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserRelationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserRelationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserRelation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userRelation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
