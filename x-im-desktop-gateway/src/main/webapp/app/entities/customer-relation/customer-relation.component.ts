import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomerRelation } from 'app/shared/model/customer-relation.model';
import { Principal } from 'app/core';
import { CustomerRelationService } from './customer-relation.service';

@Component({
    selector: 'jhi-customer-relation',
    templateUrl: './customer-relation.component.html'
})
export class CustomerRelationComponent implements OnInit, OnDestroy {
    customerRelations: ICustomerRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private customerRelationService: CustomerRelationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.customerRelationService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICustomerRelation[]>) => (this.customerRelations = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.customerRelationService.query().subscribe(
            (res: HttpResponse<ICustomerRelation[]>) => {
                this.customerRelations = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICustomerRelation) {
        return item.id;
    }

    registerChangeInCustomerRelations() {
        this.eventSubscriber = this.eventManager.subscribe('customerRelationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
