import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerRelation } from './customer-relation.model';
import { CustomerRelationService } from './customer-relation.service';

@Component({
    selector: 'jhi-customer-relation-detail',
    templateUrl: './customer-relation-detail.component.html'
})
export class CustomerRelationDetailComponent implements OnInit, OnDestroy {

    customerRelation: CustomerRelation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerRelationService: CustomerRelationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerRelations();
    }

    load(id) {
        this.customerRelationService.find(id)
            .subscribe((customerRelationResponse: HttpResponse<CustomerRelation>) => {
                this.customerRelation = customerRelationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerRelations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerRelationListModification',
            (response) => this.load(this.customerRelation.id)
        );
    }
}
