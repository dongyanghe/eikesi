import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DemoDComponent } from './demo-d.component';
import { DemoDDetailComponent } from './demo-d-detail.component';
import { DemoDPopupComponent } from './demo-d-dialog.component';
import { DemoDDeletePopupComponent } from './demo-d-delete-dialog.component';

export const demoDRoute: Routes = [
    {
        path: 'demo-d',
        component: DemoDComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoD.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demo-d/:id',
        component: DemoDDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoD.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demoDPopupRoute: Routes = [
    {
        path: 'demo-d-new',
        component: DemoDPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoD.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-d/:id/edit',
        component: DemoDPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoD.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-d/:id/delete',
        component: DemoDDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoD.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
