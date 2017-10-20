import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { SnapshotPending } from './snapshot-pending.model';
import { SnapshotPendingService } from './snapshot-pending.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-snapshot-pending',
    templateUrl: './snapshot-pending.component.html'
})
export class SnapshotPendingComponent implements OnInit, OnDestroy {
snapshotPendings: SnapshotPending[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private snapshotPendingService: SnapshotPendingService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.snapshotPendingService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.snapshotPendings = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.snapshotPendingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.snapshotPendings = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
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
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSnapshotPendings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SnapshotPending) {
        return item.id;
    }
    registerChangeInSnapshotPendings() {
        this.eventSubscriber = this.eventManager.subscribe('snapshotPendingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
