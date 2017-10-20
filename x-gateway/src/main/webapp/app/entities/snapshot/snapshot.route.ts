import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SnapshotComponent } from './snapshot.component';
import { SnapshotDetailComponent } from './snapshot-detail.component';
import { SnapshotPopupComponent } from './snapshot-dialog.component';
import { SnapshotDeletePopupComponent } from './snapshot-delete-dialog.component';

export const snapshotRoute: Routes = [
    {
        path: 'snapshot',
        component: SnapshotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'snapshot/:id',
        component: SnapshotDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const snapshotPopupRoute: Routes = [
    {
        path: 'snapshot-new',
        component: SnapshotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'snapshot/:id/edit',
        component: SnapshotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'snapshot/:id/delete',
        component: SnapshotDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.snapshot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
