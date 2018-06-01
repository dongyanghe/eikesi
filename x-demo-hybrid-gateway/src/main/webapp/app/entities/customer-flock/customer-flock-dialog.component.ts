import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerFlock } from './customer-flock.model';
import { CustomerFlockPopupService } from './customer-flock-popup.service';
import { CustomerFlockService } from './customer-flock.service';

@Component({
    selector: 'jhi-customer-flock-dialog',
    templateUrl: './customer-flock-dialog.component.html'
})
export class CustomerFlockDialogComponent implements OnInit {

    customerFlock: CustomerFlock;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private customerFlockService: CustomerFlockService,
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
        if (this.customerFlock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerFlockService.update(this.customerFlock));
        } else {
            this.subscribeToSaveResponse(
                this.customerFlockService.create(this.customerFlock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerFlock>>) {
        result.subscribe((res: HttpResponse<CustomerFlock>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerFlock) {
        this.eventManager.broadcast({ name: 'customerFlockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-customer-flock-popup',
    template: ''
})
export class CustomerFlockPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerFlockPopupService: CustomerFlockPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerFlockPopupService
                    .open(CustomerFlockDialogComponent as Component, params['id']);
            } else {
                this.customerFlockPopupService
                    .open(CustomerFlockDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
