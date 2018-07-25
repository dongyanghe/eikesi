import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoryMessage } from 'app/shared/model/history-message.model';
import { HistoryMessageService } from './history-message.service';
import { HistoryMessageComponent } from './history-message.component';
import { HistoryMessageDetailComponent } from './history-message-detail.component';
import { HistoryMessageUpdateComponent } from './history-message-update.component';
import { HistoryMessageDeletePopupComponent } from './history-message-delete-dialog.component';
import { IHistoryMessage } from 'app/shared/model/history-message.model';

@Injectable({ providedIn: 'root' })
export class HistoryMessageResolve implements Resolve<IHistoryMessage> {
    constructor(private service: HistoryMessageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((historyMessage: HttpResponse<HistoryMessage>) => historyMessage.body));
        }
        return of(new HistoryMessage());
    }
}

export const historyMessageRoute: Routes = [
    {
        path: 'history-message',
        component: HistoryMessageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'imGatewayApp.historyMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'history-message/:id/view',
        component: HistoryMessageDetailComponent,
        resolve: {
            historyMessage: HistoryMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.historyMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'history-message/new',
        component: HistoryMessageUpdateComponent,
        resolve: {
            historyMessage: HistoryMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.historyMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'history-message/:id/edit',
        component: HistoryMessageUpdateComponent,
        resolve: {
            historyMessage: HistoryMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.historyMessage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const historyMessagePopupRoute: Routes = [
    {
        path: 'history-message/:id/delete',
        component: HistoryMessageDeletePopupComponent,
        resolve: {
            historyMessage: HistoryMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.historyMessage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
