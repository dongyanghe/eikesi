/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ImGatewayTestModule } from '../../../test.module';
import { FlockRelationUpdateComponent } from 'app/entities/flock-relation/flock-relation-update.component';
import { FlockRelationService } from 'app/entities/flock-relation/flock-relation.service';
import { FlockRelation } from 'app/shared/model/flock-relation.model';

describe('Component Tests', () => {
    describe('FlockRelation Management Update Component', () => {
        let comp: FlockRelationUpdateComponent;
        let fixture: ComponentFixture<FlockRelationUpdateComponent>;
        let service: FlockRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ImGatewayTestModule],
                declarations: [FlockRelationUpdateComponent]
            })
                .overrideTemplate(FlockRelationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlockRelationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlockRelationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FlockRelation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.flockRelation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FlockRelation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.flockRelation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
