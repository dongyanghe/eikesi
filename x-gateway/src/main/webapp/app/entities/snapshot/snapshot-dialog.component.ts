import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Snapshot } from './snapshot.model';
import { SnapshotPopupService } from './snapshot-popup.service';
import { SnapshotService } from './snapshot.service';

@Component({
    selector: 'jhi-snapshot-dialog',
    templateUrl: './snapshot-dialog.component.html'
})
export class SnapshotDialogComponent implements OnInit {

    snapshot: Snapshot;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private snapshotService: SnapshotService,
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
        if (this.snapshot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.snapshotService.update(this.snapshot));
        } else {
            this.subscribeToSaveResponse(
                this.snapshotService.create(this.snapshot));
        }
    }

    private subscribeToSaveResponse(result: Observable<Snapshot>) {
        result.subscribe((res: Snapshot) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Snapshot) {
        this.eventManager.broadcast({ name: 'snapshotListModification', content: 'OK'});
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
    selector: 'jhi-snapshot-popup',
    template: ''
})
export class SnapshotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private snapshotPopupService: SnapshotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.snapshotPopupService
                    .open(SnapshotDialogComponent as Component, params['id']);
            } else {
                this.snapshotPopupService
                    .open(SnapshotDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
