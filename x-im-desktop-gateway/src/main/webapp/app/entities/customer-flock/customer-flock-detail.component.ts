import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerFlock } from 'app/shared/model/customer-flock.model';

@Component({
    selector: 'jhi-customer-flock-detail',
    templateUrl: './customer-flock-detail.component.html'
})
export class CustomerFlockDetailComponent implements OnInit {
    customerFlock: ICustomerFlock;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerFlock }) => {
            this.customerFlock = customerFlock;
        });
    }

    previousState() {
        window.history.back();
    }
}
