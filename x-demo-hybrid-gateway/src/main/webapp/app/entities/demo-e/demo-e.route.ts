import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DemoEComponent } from './demo-e.component';
import { DemoEDetailComponent } from './demo-e-detail.component';
import { DemoEPopupComponent } from './demo-e-dialog.component';
import { DemoEDeletePopupComponent } from './demo-e-delete-dialog.component';

export const demoERoute: Routes = [
    {
        path: 'demo-e',
        component: DemoEComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoE.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demo-e/:id',
        component: DemoEDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoE.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demoEPopupRoute: Routes = [
    {
        path: 'demo-e-new',
        component: DemoEPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoE.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-e/:id/edit',
        component: DemoEPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoE.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-e/:id/delete',
        component: DemoEDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoE.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
