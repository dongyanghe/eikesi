import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DemoA } from './demo-a.model';
import { DemoAPopupService } from './demo-a-popup.service';
import { DemoAService } from './demo-a.service';
import { DemoB, DemoBService } from '../demo-b';
import { DemoE, DemoEService } from '../demo-e';
import { DemoD, DemoDService } from '../demo-d';

@Component({
    selector: 'jhi-demo-a-dialog',
    templateUrl: './demo-a-dialog.component.html'
})
export class DemoADialogComponent implements OnInit {

    demoA: DemoA;
    isSaving: boolean;

    demobs: DemoB[];

    demoes: DemoE[];

    demods: DemoD[];
    localDateWhenDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private demoAService: DemoAService,
        private demoBService: DemoBService,
        private demoEService: DemoEService,
        private demoDService: DemoDService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.demoBService
            .query({filter: 'demoa(name)-is-null'})
            .subscribe((res: HttpResponse<DemoB[]>) => {
                if (!this.demoA.demoBId) {
                    this.demobs = res.body;
                } else {
                    this.demoBService
                        .find(this.demoA.demoBId)
                        .subscribe((subRes: HttpResponse<DemoB>) => {
                            this.demobs = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.demoEService.query()
            .subscribe((res: HttpResponse<DemoE[]>) => { this.demoes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.demoDService.query()
            .subscribe((res: HttpResponse<DemoD[]>) => { this.demods = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.demoA, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.demoA.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demoAService.update(this.demoA));
        } else {
            this.subscribeToSaveResponse(
                this.demoAService.create(this.demoA));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DemoA>>) {
        result.subscribe((res: HttpResponse<DemoA>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DemoA) {
        this.eventManager.broadcast({ name: 'demoAListModification', content: 'OK'});
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

    trackDemoEById(index: number, item: DemoE) {
        return item.id;
    }

    trackDemoDById(index: number, item: DemoD) {
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
    selector: 'jhi-demo-a-popup',
    template: ''
})
export class DemoAPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoAPopupService: DemoAPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demoAPopupService
                    .open(DemoADialogComponent as Component, params['id']);
            } else {
                this.demoAPopupService
                    .open(DemoADialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
