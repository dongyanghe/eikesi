import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoD } from './demo-d.model';
import { DemoDPopupService } from './demo-d-popup.service';
import { DemoDService } from './demo-d.service';
import { DemoA, DemoAService } from '../demo-a';

@Component({
    selector: 'jhi-demo-d-dialog',
    templateUrl: './demo-d-dialog.component.html'
})
export class DemoDDialogComponent implements OnInit {

    demoD: DemoD;
    isSaving: boolean;

    demoas: DemoA[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private demoDService: DemoDService,
        private demoAService: DemoAService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.demoAService.query()
            .subscribe((res: HttpResponse<DemoA[]>) => { this.demoas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.demoD.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demoDService.update(this.demoD));
        } else {
            this.subscribeToSaveResponse(
                this.demoDService.create(this.demoD));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DemoD>>) {
        result.subscribe((res: HttpResponse<DemoD>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DemoD) {
        this.eventManager.broadcast({ name: 'demoDListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDemoAById(index: number, item: DemoA) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-demo-d-popup',
    template: ''
})
export class DemoDPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoDPopupService: DemoDPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demoDPopupService
                    .open(DemoDDialogComponent as Component, params['id']);
            } else {
                this.demoDPopupService
                    .open(DemoDDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
