import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerRelation } from './customer-relation.model';
import { CustomerRelationPopupService } from './customer-relation-popup.service';
import { CustomerRelationService } from './customer-relation.service';
import { Customer, CustomerService } from '../customer';

@Component({
    selector: 'jhi-customer-relation-dialog',
    templateUrl: './customer-relation-dialog.component.html'
})
export class CustomerRelationDialogComponent implements OnInit {

    customerRelation: CustomerRelation;
    isSaving: boolean;

    customers: Customer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerRelationService: CustomerRelationService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerRelation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerRelationService.update(this.customerRelation));
        } else {
            this.subscribeToSaveResponse(
                this.customerRelationService.create(this.customerRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerRelation>>) {
        result.subscribe((res: HttpResponse<CustomerRelation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerRelation) {
        this.eventManager.broadcast({ name: 'customerRelationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-relation-popup',
    template: ''
})
export class CustomerRelationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerRelationPopupService: CustomerRelationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerRelationPopupService
                    .open(CustomerRelationDialogComponent as Component, params['id']);
            } else {
                this.customerRelationPopupService
                    .open(CustomerRelationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
