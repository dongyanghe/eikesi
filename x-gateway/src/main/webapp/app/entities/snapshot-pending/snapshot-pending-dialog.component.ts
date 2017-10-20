import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SnapshotPending } from './snapshot-pending.model';
import { SnapshotPendingPopupService } from './snapshot-pending-popup.service';
import { SnapshotPendingService } from './snapshot-pending.service';

@Component({
    selector: 'jhi-snapshot-pending-dialog',
    templateUrl: './snapshot-pending-dialog.component.html'
})
export class SnapshotPendingDialogComponent implements OnInit {

    snapshotPending: SnapshotPending;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private snapshotPendingService: SnapshotPendingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.snapshotPending.id !== undefined) {
            this.subscribeToSaveResponse(
                this.snapshotPendingService.update(this.snapshotPending));
        } else {
            this.subscribeToSaveResponse(
                this.snapshotPendingService.create(this.snapshotPending));
        }
    }

    private subscribeToSaveResponse(result: Observable<SnapshotPending>) {
        result.subscribe((res: SnapshotPending) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SnapshotPending) {
        this.eventManager.broadcast({ name: 'snapshotPendingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-snapshot-pending-popup',
    template: ''
})
export class SnapshotPendingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private snapshotPendingPopupService: SnapshotPendingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.snapshotPendingPopupService
                    .open(SnapshotPendingDialogComponent as Component, params['id']);
            } else {
                this.snapshotPendingPopupService
                    .open(SnapshotPendingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
