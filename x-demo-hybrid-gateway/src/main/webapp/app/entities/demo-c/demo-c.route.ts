import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DemoCComponent } from './demo-c.component';
import { DemoCDetailComponent } from './demo-c-detail.component';
import { DemoCPopupComponent } from './demo-c-dialog.component';
import { DemoCDeletePopupComponent } from './demo-c-delete-dialog.component';

export const demoCRoute: Routes = [
    {
        path: 'demo-c',
        component: DemoCComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoC.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demo-c/:id',
        component: DemoCDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoC.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demoCPopupRoute: Routes = [
    {
        path: 'demo-c-new',
        component: DemoCPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoC.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-c/:id/edit',
        component: DemoCPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoC.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-c/:id/delete',
        component: DemoCDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoC.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
