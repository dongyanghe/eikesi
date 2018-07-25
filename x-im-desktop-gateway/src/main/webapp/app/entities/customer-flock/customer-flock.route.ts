import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerFlock } from 'app/shared/model/customer-flock.model';
import { CustomerFlockService } from './customer-flock.service';
import { CustomerFlockComponent } from './customer-flock.component';
import { CustomerFlockDetailComponent } from './customer-flock-detail.component';
import { CustomerFlockUpdateComponent } from './customer-flock-update.component';
import { CustomerFlockDeletePopupComponent } from './customer-flock-delete-dialog.component';
import { ICustomerFlock } from 'app/shared/model/customer-flock.model';

@Injectable({ providedIn: 'root' })
export class CustomerFlockResolve implements Resolve<ICustomerFlock> {
    constructor(private service: CustomerFlockService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customerFlock: HttpResponse<CustomerFlock>) => customerFlock.body));
        }
        return of(new CustomerFlock());
    }
}

export const customerFlockRoute: Routes = [
    {
        path: 'customer-flock',
        component: CustomerFlockComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'imGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-flock/:id/view',
        component: CustomerFlockDetailComponent,
        resolve: {
            customerFlock: CustomerFlockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-flock/new',
        component: CustomerFlockUpdateComponent,
        resolve: {
            customerFlock: CustomerFlockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-flock/:id/edit',
        component: CustomerFlockUpdateComponent,
        resolve: {
            customerFlock: CustomerFlockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerFlockPopupRoute: Routes = [
    {
        path: 'customer-flock/:id/delete',
        component: CustomerFlockDeletePopupComponent,
        resolve: {
            customerFlock: CustomerFlockResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.customerFlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
