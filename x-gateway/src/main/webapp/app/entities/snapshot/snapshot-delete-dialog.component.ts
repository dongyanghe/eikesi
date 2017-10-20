import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Snapshot } from './snapshot.model';
import { SnapshotPopupService } from './snapshot-popup.service';
import { SnapshotService } from './snapshot.service';

@Component({
    selector: 'jhi-snapshot-delete-dialog',
    templateUrl: './snapshot-delete-dialog.component.html'
})
export class SnapshotDeleteDialogComponent {

    snapshot: Snapshot;

    constructor(
        private snapshotService: SnapshotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.snapshotService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'snapshotListModification',
                content: 'Deleted an snapshot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-snapshot-delete-popup',
    template: ''
})
export class SnapshotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private snapshotPopupService: SnapshotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.snapshotPopupService
                .open(SnapshotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
