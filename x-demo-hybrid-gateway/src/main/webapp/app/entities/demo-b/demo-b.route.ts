import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DemoBComponent } from './demo-b.component';
import { DemoBDetailComponent } from './demo-b-detail.component';
import { DemoBPopupComponent } from './demo-b-dialog.component';
import { DemoBDeletePopupComponent } from './demo-b-delete-dialog.component';

export const demoBRoute: Routes = [
    {
        path: 'demo-b',
        component: DemoBComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoB.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demo-b/:id',
        component: DemoBDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoB.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demoBPopupRoute: Routes = [
    {
        path: 'demo-b-new',
        component: DemoBPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoB.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-b/:id/edit',
        component: DemoBPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoB.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-b/:id/delete',
        component: DemoBDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoB.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
