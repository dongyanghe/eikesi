import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserFlockComponent } from './user-flock.component';
import { UserFlockDetailComponent } from './user-flock-detail.component';
import { UserFlockPopupComponent } from './user-flock-dialog.component';
import { UserFlockDeletePopupComponent } from './user-flock-delete-dialog.component';

export const userFlockRoute: Routes = [
    {
        path: 'user-flock',
        component: UserFlockComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-flock/:id',
        component: UserFlockDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userFlockPopupRoute: Routes = [
    {
        path: 'user-flock-new',
        component: UserFlockPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-flock/:id/edit',
        component: UserFlockPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-flock/:id/delete',
        component: UserFlockDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.userFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
