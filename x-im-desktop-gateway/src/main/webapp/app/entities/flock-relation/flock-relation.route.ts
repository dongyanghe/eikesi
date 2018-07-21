import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlockRelation } from 'app/shared/model/flock-relation.model';
import { FlockRelationService } from './flock-relation.service';
import { FlockRelationComponent } from './flock-relation.component';
import { FlockRelationDetailComponent } from './flock-relation-detail.component';
import { FlockRelationUpdateComponent } from './flock-relation-update.component';
import { FlockRelationDeletePopupComponent } from './flock-relation-delete-dialog.component';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';

@Injectable({ providedIn: 'root' })
export class FlockRelationResolve implements Resolve<IFlockRelation> {
    constructor(private service: FlockRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((flockRelation: HttpResponse<FlockRelation>) => flockRelation.body));
        }
        return of(new FlockRelation());
    }
}

export const flockRelationRoute: Routes = [
    {
        path: 'flock-relation',
        component: FlockRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flock-relation/:id/view',
        component: FlockRelationDetailComponent,
        resolve: {
            flockRelation: FlockRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flock-relation/new',
        component: FlockRelationUpdateComponent,
        resolve: {
            flockRelation: FlockRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flock-relation/:id/edit',
        component: FlockRelationUpdateComponent,
        resolve: {
            flockRelation: FlockRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flockRelationPopupRoute: Routes = [
    {
        path: 'flock-relation/:id/delete',
        component: FlockRelationDeletePopupComponent,
        resolve: {
            flockRelation: FlockRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
