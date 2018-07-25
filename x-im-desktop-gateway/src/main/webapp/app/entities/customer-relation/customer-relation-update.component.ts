import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerRelation } from 'app/shared/model/customer-relation.model';
import { CustomerRelationService } from './customer-relation.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-customer-relation-update',
    templateUrl: './customer-relation-update.component.html'
})
export class CustomerRelationUpdateComponent implements OnInit {
    private _customerRelation: ICustomerRelation;
    isSaving: boolean;

    customers: ICustomer[];
    createdDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerRelationService: CustomerRelationService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerRelation }) => {
            this.customerRelation = customerRelation;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.customerRelation.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        if (this.customerRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.customerRelationService.update(this.customerRelation));
        } else {
            this.subscribeToSaveResponse(this.customerRelationService.create(this.customerRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerRelation>>) {
        result.subscribe((res: HttpResponse<ICustomerRelation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
    get customerRelation() {
        return this._customerRelation;
    }

    set customerRelation(customerRelation: ICustomerRelation) {
        this._customerRelation = customerRelation;
        this.createdDate = moment(customerRelation.createdDate).format(DATE_TIME_FORMAT);
    }
}
