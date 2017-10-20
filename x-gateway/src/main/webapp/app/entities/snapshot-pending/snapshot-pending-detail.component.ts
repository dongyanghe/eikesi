import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SnapshotPending } from './snapshot-pending.model';
import { SnapshotPendingService } from './snapshot-pending.service';

@Component({
    selector: 'jhi-snapshot-pending-detail',
    templateUrl: './snapshot-pending-detail.component.html'
})
export class SnapshotPendingDetailComponent implements OnInit, OnDestroy {

    snapshotPending: SnapshotPending;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private snapshotPendingService: SnapshotPendingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSnapshotPendings();
    }

    load(id) {
        this.snapshotPendingService.find(id).subscribe((snapshotPending) => {
            this.snapshotPending = snapshotPending;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSnapshotPendings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'snapshotPendingListModification',
            (response) => this.load(this.snapshotPending.id)
        );
    }
}
