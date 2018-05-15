/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DemoHybridGatewayTestModule } from '../../../test.module';
import { UserRelationComponent } from '../../../../../../main/webapp/app/entities/user-relation/user-relation.component';
import { UserRelationService } from '../../../../../../main/webapp/app/entities/user-relation/user-relation.service';
import { UserRelation } from '../../../../../../main/webapp/app/entities/user-relation/user-relation.model';

describe('Component Tests', () => {

    describe('UserRelation Management Component', () => {
        let comp: UserRelationComponent;
        let fixture: ComponentFixture<UserRelationComponent>;
        let service: UserRelationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DemoHybridGatewayTestModule],
                declarations: [UserRelationComponent],
                providers: [
                    UserRelationService
                ]
            })
            .overrideTemplate(UserRelationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserRelationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserRelation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userRelations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
