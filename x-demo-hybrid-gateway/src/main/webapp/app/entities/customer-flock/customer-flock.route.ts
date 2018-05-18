import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CustomerFlockComponent } from './customer-flock.component';
import { CustomerFlockDetailComponent } from './customer-flock-detail.component';
import { CustomerFlockPopupComponent } from './customer-flock-dialog.component';
import { CustomerFlockDeletePopupComponent } from './customer-flock-delete-dialog.component';

@Injectable()
export class CustomerFlockResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const customerFlockRoute: Routes = [
    {
        path: 'customer-flock',
        component: CustomerFlockComponent,
        resolve: {
            'pagingParams': CustomerFlockResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-flock/:id',
        component: CustomerFlockDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerFlockPopupRoute: Routes = [
    {
        path: 'customer-flock-new',
        component: CustomerFlockPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-flock/:id/edit',
        component: CustomerFlockPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-flock/:id/delete',
        component: CustomerFlockDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoHybridGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
