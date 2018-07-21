import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentMessage } from 'app/shared/model/current-message.model';
import { CurrentMessageService } from './current-message.service';
import { CurrentMessageComponent } from './current-message.component';
import { CurrentMessageDetailComponent } from './current-message-detail.component';
import { CurrentMessageUpdateComponent } from './current-message-update.component';
import { CurrentMessageDeletePopupComponent } from './current-message-delete-dialog.component';
import { ICurrentMessage } from 'app/shared/model/current-message.model';

@Injectable({ providedIn: 'root' })
export class CurrentMessageResolve implements Resolve<ICurrentMessage> {
    constructor(private service: CurrentMessageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((currentMessage: HttpResponse<CurrentMessage>) => currentMessage.body));
        }
        return of(new CurrentMessage());
    }
}

export const currentMessageRoute: Routes = [
    {
        path: 'current-message',
        component: CurrentMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.currentMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'current-message/:id/view',
        component: CurrentMessageDetailComponent,
        resolve: {
            currentMessage: CurrentMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.currentMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'current-message/new',
        component: CurrentMessageUpdateComponent,
        resolve: {
            currentMessage: CurrentMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.currentMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'current-message/:id/edit',
        component: CurrentMessageUpdateComponent,
        resolve: {
            currentMessage: CurrentMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.currentMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currentMessagePopupRoute: Routes = [
    {
        path: 'current-message/:id/delete',
        component: CurrentMessageDeletePopupComponent,
        resolve: {
            currentMessage: CurrentMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.currentMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
