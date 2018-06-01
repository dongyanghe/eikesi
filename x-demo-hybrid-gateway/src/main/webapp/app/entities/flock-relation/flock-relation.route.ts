import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FlockRelationComponent } from './flock-relation.component';
import { FlockRelationDetailComponent } from './flock-relation-detail.component';
import { FlockRelationPopupComponent } from './flock-relation-dialog.component';
import { FlockRelationDeletePopupComponent } from './flock-relation-delete-dialog.component';

export const flockRelationRoute: Routes = [
    {
        path: 'flock-relation',
        component: FlockRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'flock-relation/:id',
        component: FlockRelationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flockRelationPopupRoute: Routes = [
    {
        path: 'flock-relation-new',
        component: FlockRelationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flock-relation/:id/edit',
        component: FlockRelationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flock-relation/:id/delete',
        component: FlockRelationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.flockRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
