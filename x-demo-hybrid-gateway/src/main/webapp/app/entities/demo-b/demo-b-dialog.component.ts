import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoB } from './demo-b.model';
import { DemoBPopupService } from './demo-b-popup.service';
import { DemoBService } from './demo-b.service';
import { DemoA, DemoAService } from '../demo-a';

@Component({
    selector: 'jhi-demo-b-dialog',
    templateUrl: './demo-b-dialog.component.html'
})
export class DemoBDialogComponent implements OnInit {

    demoB: DemoB;
    isSaving: boolean;

    demoas: DemoA[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private demoBService: DemoBService,
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
        if (this.demoB.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demoBService.update(this.demoB));
        } else {
            this.subscribeToSaveResponse(
                this.demoBService.create(this.demoB));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DemoB>>) {
        result.subscribe((res: HttpResponse<DemoB>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DemoB) {
        this.eventManager.broadcast({ name: 'demoBListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-demo-b-popup',
    template: ''
})
export class DemoBPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoBPopupService: DemoBPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demoBPopupService
                    .open(DemoBDialogComponent as Component, params['id']);
            } else {
                this.demoBPopupService
                    .open(DemoBDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
