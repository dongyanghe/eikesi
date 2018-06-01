import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerFlock } from './customer-flock.model';
import { CustomerFlockService } from './customer-flock.service';

@Component({
    selector: 'jhi-customer-flock-detail',
    templateUrl: './customer-flock-detail.component.html'
})
export class CustomerFlockDetailComponent implements OnInit, OnDestroy {

    customerFlock: CustomerFlock;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerFlockService: CustomerFlockService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerFlocks();
    }

    load(id) {
        this.customerFlockService.find(id)
            .subscribe((customerFlockResponse: HttpResponse<CustomerFlock>) => {
                this.customerFlock = customerFlockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerFlocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerFlockListModification',
            (response) => this.load(this.customerFlock.id)
        );
    }
}
