import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerRelation } from 'app/shared/model/customer-relation.model';
import { CustomerRelationService } from './customer-relation.service';
import { CustomerRelationComponent } from './customer-relation.component';
import { CustomerRelationDetailComponent } from './customer-relation-detail.component';
import { CustomerRelationUpdateComponent } from './customer-relation-update.component';
import { CustomerRelationDeletePopupComponent } from './customer-relation-delete-dialog.component';
import { ICustomerRelation } from 'app/shared/model/customer-relation.model';

@Injectable({ providedIn: 'root' })
export class CustomerRelationResolve implements Resolve<ICustomerRelation> {
    constructor(private service: CustomerRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customerRelation: HttpResponse<CustomerRelation>) => customerRelation.body));
        }
        return of(new CustomerRelation());
    }
}

export const customerRelationRoute: Routes = [
    {
        path: 'customer-relation',
        component: CustomerRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-relation/:id/view',
        component: CustomerRelationDetailComponent,
        resolve: {
            customerRelation: CustomerRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-relation/new',
        component: CustomerRelationUpdateComponent,
        resolve: {
            customerRelation: CustomerRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-relation/:id/edit',
        component: CustomerRelationUpdateComponent,
        resolve: {
            customerRelation: CustomerRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerRelationPopupRoute: Routes = [
    {
        path: 'customer-relation/:id/delete',
        component: CustomerRelationDeletePopupComponent,
        resolve: {
            customerRelation: CustomerRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'demoGatewayApp.customerRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
