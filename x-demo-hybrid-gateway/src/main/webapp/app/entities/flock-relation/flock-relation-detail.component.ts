import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FlockRelation } from './flock-relation.model';
import { FlockRelationService } from './flock-relation.service';

@Component({
    selector: 'jhi-flock-relation-detail',
    templateUrl: './flock-relation-detail.component.html'
})
export class FlockRelationDetailComponent implements OnInit, OnDestroy {

    flockRelation: FlockRelation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private flockRelationService: FlockRelationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFlockRelations();
    }

    load(id) {
        this.flockRelationService.find(id)
            .subscribe((flockRelationResponse: HttpResponse<FlockRelation>) => {
                this.flockRelation = flockRelationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFlockRelations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'flockRelationListModification',
            (response) => this.load(this.flockRelation.id)
        );
    }
}
