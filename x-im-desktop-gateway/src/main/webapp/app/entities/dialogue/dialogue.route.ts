import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dialogue } from 'app/shared/model/dialogue.model';
import { DialogueService } from './dialogue.service';
import { DialogueComponent } from './dialogue.component';
import { DialogueDetailComponent } from './dialogue-detail.component';
import { DialogueUpdateComponent } from './dialogue-update.component';
import { DialogueDeletePopupComponent } from './dialogue-delete-dialog.component';
import { IDialogue } from 'app/shared/model/dialogue.model';

@Injectable({ providedIn: 'root' })
export class DialogueResolve implements Resolve<IDialogue> {
    constructor(private service: DialogueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((dialogue: HttpResponse<Dialogue>) => dialogue.body));
        }
        return of(new Dialogue());
    }
}

export const dialogueRoute: Routes = [
    {
        path: 'dialogue',
        component: DialogueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.dialogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dialogue/:id/view',
        component: DialogueDetailComponent,
        resolve: {
            dialogue: DialogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.dialogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dialogue/new',
        component: DialogueUpdateComponent,
        resolve: {
            dialogue: DialogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.dialogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dialogue/:id/edit',
        component: DialogueUpdateComponent,
        resolve: {
            dialogue: DialogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.dialogue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dialoguePopupRoute: Routes = [
    {
        path: 'dialogue/:id/delete',
        component: DialogueDeletePopupComponent,
        resolve: {
            dialogue: DialogueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'imGatewayApp.dialogue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
