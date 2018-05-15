import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoC } from './demo-c.model';
import { DemoCPopupService } from './demo-c-popup.service';
import { DemoCService } from './demo-c.service';
import { DemoB, DemoBService } from '../demo-b';

@Component({
    selector: 'jhi-demo-c-dialog',
    templateUrl: './demo-c-dialog.component.html'
})
export class DemoCDialogComponent implements OnInit {

    demoC: DemoC;
    isSaving: boolean;

    demobs: DemoB[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private demoCService: DemoCService,
        private demoBService: DemoBService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.demoBService.query()
            .subscribe((res: HttpResponse<DemoB[]>) => { this.demobs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.demoC.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demoCService.update(this.demoC));
        } else {
            this.subscribeToSaveResponse(
                this.demoCService.create(this.demoC));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DemoC>>) {
        result.subscribe((res: HttpResponse<DemoC>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DemoC) {
        this.eventManager.broadcast({ name: 'demoCListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDemoBById(index: number, item: DemoB) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-demo-c-popup',
    template: ''
})
export class DemoCPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoCPopupService: DemoCPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demoCPopupService
                    .open(DemoCDialogComponent as Component, params['id']);
            } else {
                this.demoCPopupService
                    .open(DemoCDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
