import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerRelation } from 'app/shared/model/customer-relation.model';

@Component({
    selector: 'jhi-customer-relation-detail',
    templateUrl: './customer-relation-detail.component.html'
})
export class CustomerRelationDetailComponent implements OnInit {
    customerRelation: ICustomerRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerRelation }) => {
            this.customerRelation = customerRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
