import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Snapshot } from './snapshot.model';
import { SnapshotService } from './snapshot.service';

@Component({
    selector: 'jhi-snapshot-detail',
    templateUrl: './snapshot-detail.component.html'
})
export class SnapshotDetailComponent implements OnInit, OnDestroy {

    snapshot: Snapshot;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private snapshotService: SnapshotService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSnapshots();
    }

    load(id) {
        this.snapshotService.find(id).subscribe((snapshot) => {
            this.snapshot = snapshot;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSnapshots() {
        this.eventSubscriber = this.eventManager.subscribe(
            'snapshotListModification',
            (response) => this.load(this.snapshot.id)
        );
    }
}
