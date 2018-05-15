import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserRelation } from './user-relation.model';
import { UserRelationService } from './user-relation.service';

@Component({
    selector: 'jhi-user-relation-detail',
    templateUrl: './user-relation-detail.component.html'
})
export class UserRelationDetailComponent implements OnInit, OnDestroy {

    userRelation: UserRelation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userRelationService: UserRelationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserRelations();
    }

    load(id) {
        this.userRelationService.find(id)
            .subscribe((userRelationResponse: HttpResponse<UserRelation>) => {
                this.userRelation = userRelationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserRelations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userRelationListModification',
            (response) => this.load(this.userRelation.id)
        );
    }
}
