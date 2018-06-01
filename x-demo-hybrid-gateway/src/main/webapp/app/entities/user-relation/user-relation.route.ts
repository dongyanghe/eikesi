import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserRelationComponent } from './user-relation.component';
import { UserRelationDetailComponent } from './user-relation-detail.component';
import { UserRelationPopupComponent } from './user-relation-dialog.component';
import { UserRelationDeletePopupComponent } from './user-relation-delete-dialog.component';

export const userRelationRoute: Routes = [
    {
        path: 'user-relation',
        component: UserRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-relation/:id',
        component: UserRelationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userRelationPopupRoute: Routes = [
    {
        path: 'user-relation-new',
        component: UserRelationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-relation/:id/edit',
        component: UserRelationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-relation/:id/delete',
        component: UserRelationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
