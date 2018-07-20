import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';
import { CustomerComponent } from './customer.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerUpdateComponent } from './customer-update.component';
import { CustomerDeletePopupComponent } from './customer-delete-dialog.component';
import { ICustomer } from 'app/shared/model/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerResolve implements Resolve<ICustomer> {
    constructor(private service: CustomerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customer: HttpResponse<Customer>) => customer.body));
        }
        return of(new Customer());
    }
}

export const customerRoute: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'demoGatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer/:id/view',
        component: CustomerDetailComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer/new',
        component: CustomerUpdateComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer/:id/edit',
        component: CustomerUpdateComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer/:id/delete',
        component: CustomerDeletePopupComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
