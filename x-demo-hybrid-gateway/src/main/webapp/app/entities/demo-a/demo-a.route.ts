import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DemoAComponent } from './demo-a.component';
import { DemoADetailComponent } from './demo-a-detail.component';
import { DemoAPopupComponent } from './demo-a-dialog.component';
import { DemoADeletePopupComponent } from './demo-a-delete-dialog.component';

export const demoARoute: Routes = [
    {
        path: 'demo-a',
        component: DemoAComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoA.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demo-a/:id',
        component: DemoADetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoA.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demoAPopupRoute: Routes = [
    {
        path: 'demo-a-new',
        component: DemoAPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoA.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-a/:id/edit',
        component: DemoAPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoA.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demo-a/:id/delete',
        component: DemoADeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.demoA.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
