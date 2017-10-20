import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SnapshotPendingComponent } from './snapshot-pending.component';
import { SnapshotPendingDetailComponent } from './snapshot-pending-detail.component';
import { SnapshotPendingPopupComponent } from './snapshot-pending-dialog.component';
import { SnapshotPendingDeletePopupComponent } from './snapshot-pending-delete-dialog.component';

export const snapshotPendingRoute: Routes = [
    {
        path: 'snapshot-pending',
        component: SnapshotPendingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshotPending.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'snapshot-pending/:id',
        component: SnapshotPendingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshotPending.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const snapshotPendingPopupRoute: Routes = [
    {
        path: 'snapshot-pending-new',
        component: SnapshotPendingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshotPending.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'snapshot-pending/:id/edit',
        component: SnapshotPendingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshotPending.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'snapshot-pending/:id/delete',
        component: SnapshotPendingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshotPending.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
