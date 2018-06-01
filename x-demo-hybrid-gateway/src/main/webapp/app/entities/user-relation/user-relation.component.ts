import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserRelation } from './user-relation.model';
import { UserRelationService } from './user-relation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-relation',
    templateUrl: './user-relation.component.html'
})
export class UserRelationComponent implements OnInit, OnDestroy {
userRelations: UserRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userRelationService: UserRelationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userRelationService.query().subscribe(
            (res: HttpResponse<UserRelation[]>) => {
                this.userRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserRelation) {
        return item.id;
    }
    registerChangeInUserRelations() {
        this.eventSubscriber = this.eventManager.subscribe('userRelationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
