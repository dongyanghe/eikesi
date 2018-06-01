import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerRelationComponent } from './customer-relation.component';
import { CustomerRelationDetailComponent } from './customer-relation-detail.component';
import { CustomerRelationPopupComponent } from './customer-relation-dialog.component';
import { CustomerRelationDeletePopupComponent } from './customer-relation-delete-dialog.component';

export const customerRelationRoute: Routes = [
    {
        path: 'customer-relation',
        component: CustomerRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-relation/:id',
        component: CustomerRelationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerRelationPopupRoute: Routes = [
    {
        path: 'customer-relation-new',
        component: CustomerRelationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-relation/:id/edit',
        component: CustomerRelationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-relation/:id/delete',
        component: CustomerRelationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
