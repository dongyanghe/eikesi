import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FlockRelation } from './flock-relation.model';
import { FlockRelationService } from './flock-relation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-flock-relation',
    templateUrl: './flock-relation.component.html'
})
export class FlockRelationComponent implements OnInit, OnDestroy {
flockRelations: FlockRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private flockRelationService: FlockRelationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.flockRelationService.query().subscribe(
            (res: HttpResponse<FlockRelation[]>) => {
                this.flockRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFlockRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FlockRelation) {
        return item.id;
    }
    registerChangeInFlockRelations() {
        this.eventSubscriber = this.eventManager.subscribe('flockRelationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
