import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IFlockRelation } from 'app/shared/model/flock-relation.model';
import { FlockRelationService } from './flock-relation.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';
import { ICustomerFlock } from 'app/shared/model/customer-flock.model';
import { CustomerFlockService } from 'app/entities/customer-flock';

@Component({
    selector: 'jhi-flock-relation-update',
    templateUrl: './flock-relation-update.component.html'
})
export class FlockRelationUpdateComponent implements OnInit {
    private _flockRelation: IFlockRelation;
    isSaving: boolean;

    customers: ICustomer[];

    customerflocks: ICustomerFlock[];
    createdDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private flockRelationService: FlockRelationService,
        private customerService: CustomerService,
        private customerFlockService: CustomerFlockService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flockRelation }) => {
            this.flockRelation = flockRelation;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerFlockService.query().subscribe(
            (res: HttpResponse<ICustomerFlock[]>) => {
                this.customerflocks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.flockRelation.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        if (this.flockRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.flockRelationService.update(this.flockRelation));
        } else {
            this.subscribeToSaveResponse(this.flockRelationService.create(this.flockRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFlockRelation>>) {
        result.subscribe((res: HttpResponse<IFlockRelation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerFlockById(index: number, item: ICustomerFlock) {
        return item.id;
    }
    get flockRelation() {
        return this._flockRelation;
    }

    set flockRelation(flockRelation: IFlockRelation) {
        this._flockRelation = flockRelation;
        this.createdDate = moment(flockRelation.createdDate).format(DATE_TIME_FORMAT);
    }
}
