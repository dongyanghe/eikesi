import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoE } from './demo-e.model';
import { DemoEPopupService } from './demo-e-popup.service';
import { DemoEService } from './demo-e.service';
import { DemoD, DemoDService } from '../demo-d';

@Component({
    selector: 'jhi-demo-e-dialog',
    templateUrl: './demo-e-dialog.component.html'
})
export class DemoEDialogComponent implements OnInit {

    demoE: DemoE;
    isSaving: boolean;

    demods: DemoD[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private demoEService: DemoEService,
        private demoDService: DemoDService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.demoDService.query()
            .subscribe((res: HttpResponse<DemoD[]>) => { this.demods = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.demoE.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demoEService.update(this.demoE));
        } else {
            this.subscribeToSaveResponse(
                this.demoEService.create(this.demoE));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DemoE>>) {
        result.subscribe((res: HttpResponse<DemoE>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DemoE) {
        this.eventManager.broadcast({ name: 'demoEListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDemoDById(index: number, item: DemoD) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-demo-e-popup',
    template: ''
})
export class DemoEPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoEPopupService: DemoEPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demoEPopupService
                    .open(DemoEDialogComponent as Component, params['id']);
            } else {
                this.demoEPopupService
                    .open(DemoEDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
