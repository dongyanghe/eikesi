import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerFlock } from 'app/shared/model/customer-flock.model';
import { CustomerFlockService } from './customer-flock.service';

@Component({
    selector: 'jhi-customer-flock-update',
    templateUrl: './customer-flock-update.component.html'
})
export class CustomerFlockUpdateComponent implements OnInit {
    private _customerFlock: ICustomerFlock;
    isSaving: boolean;
    createdDate: string;

    constructor(private customerFlockService: CustomerFlockService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerFlock }) => {
            this.customerFlock = customerFlock;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.customerFlock.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        if (this.customerFlock.id !== undefined) {
            this.subscribeToSaveResponse(this.customerFlockService.update(this.customerFlock));
        } else {
            this.subscribeToSaveResponse(this.customerFlockService.create(this.customerFlock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerFlock>>) {
        result.subscribe((res: HttpResponse<ICustomerFlock>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get customerFlock() {
        return this._customerFlock;
    }

    set customerFlock(customerFlock: ICustomerFlock) {
        this._customerFlock = customerFlock;
        this.createdDate = moment(customerFlock.createdDate).format(DATE_TIME_FORMAT);
    }
}
