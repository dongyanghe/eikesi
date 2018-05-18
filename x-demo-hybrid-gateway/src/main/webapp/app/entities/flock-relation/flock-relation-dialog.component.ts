import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FlockRelation } from './flock-relation.model';
import { FlockRelationPopupService } from './flock-relation-popup.service';
import { FlockRelationService } from './flock-relation.service';
import { Customer, CustomerService } from '../customer';
import { CustomerFlock, CustomerFlockService } from '../customer-flock';

@Component({
    selector: 'jhi-flock-relation-dialog',
    templateUrl: './flock-relation-dialog.component.html'
})
export class FlockRelationDialogComponent implements OnInit {

    flockRelation: FlockRelation;
    isSaving: boolean;

    customers: Customer[];

    customerflocks: CustomerFlock[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private flockRelationService: FlockRelationService,
        private customerService: CustomerService,
        private customerFlockService: CustomerFlockService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerFlockService.query()
            .subscribe((res: HttpResponse<CustomerFlock[]>) => { this.customerflocks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.flockRelation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.flockRelationService.update(this.flockRelation));
        } else {
            this.subscribeToSaveResponse(
                this.flockRelationService.create(this.flockRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FlockRelation>>) {
        result.subscribe((res: HttpResponse<FlockRelation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FlockRelation) {
        this.eventManager.broadcast({ name: 'flockRelationListModification', content: 'OK'});
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

    trackCustomerFlockById(index: number, item: CustomerFlock) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-flock-relation-popup',
    template: ''
})
export class FlockRelationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flockRelationPopupService: FlockRelationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.flockRelationPopupService
                    .open(FlockRelationDialogComponent as Component, params['id']);
            } else {
                this.flockRelationPopupService
                    .open(FlockRelationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
