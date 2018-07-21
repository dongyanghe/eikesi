import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlockRelation } from 'app/shared/model/flock-relation.model';
import { Principal } from 'app/core';
import { FlockRelationService } from './flock-relation.service';

@Component({
    selector: 'jhi-flock-relation',
    templateUrl: './flock-relation.component.html'
})
export class FlockRelationComponent implements OnInit, OnDestroy {
    flockRelations: IFlockRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private flockRelationService: FlockRelationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.flockRelationService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IFlockRelation[]>) => (this.flockRelations = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.flockRelationService.query().subscribe(
            (res: HttpResponse<IFlockRelation[]>) => {
                this.flockRelations = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlockRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlockRelation) {
        return item.id;
    }

    registerChangeInFlockRelations() {
        this.eventSubscriber = this.eventManager.subscribe('flockRelationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
