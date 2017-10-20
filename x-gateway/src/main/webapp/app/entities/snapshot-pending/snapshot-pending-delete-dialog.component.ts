import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SnapshotPending } from './snapshot-pending.model';
import { SnapshotPendingPopupService } from './snapshot-pending-popup.service';
import { SnapshotPendingService } from './snapshot-pending.service';

@Component({
    selector: 'jhi-snapshot-pending-delete-dialog',
    templateUrl: './snapshot-pending-delete-dialog.component.html'
})
export class SnapshotPendingDeleteDialogComponent {

    snapshotPending: SnapshotPending;

    constructor(
        private snapshotPendingService: SnapshotPendingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.snapshotPendingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'snapshotPendingListModification',
                content: 'Deleted an snapshotPending'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-snapshot-pending-delete-popup',
    template: ''
})
export class SnapshotPendingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private snapshotPendingPopupService: SnapshotPendingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.snapshotPendingPopupService
                .open(SnapshotPendingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
