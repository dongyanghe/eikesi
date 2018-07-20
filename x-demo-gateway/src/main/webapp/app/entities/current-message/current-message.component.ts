import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICurrentMessage } from 'app/shared/model/current-message.model';
import { Principal } from 'app/core';
import { CurrentMessageService } from './current-message.service';

@Component({
    selector: 'jhi-current-message',
    templateUrl: './current-message.component.html'
})
export class CurrentMessageComponent implements OnInit, OnDestroy {
    currentMessages: ICurrentMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private currentMessageService: CurrentMessageService,
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
            this.currentMessageService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICurrentMessage[]>) => (this.currentMessages = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.currentMessageService.query().subscribe(
            (res: HttpResponse<ICurrentMessage[]>) => {
                this.currentMessages = res.body;
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
        this.registerChangeInCurrentMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICurrentMessage) {
        return item.id;
    }

    registerChangeInCurrentMessages() {
        this.eventSubscriber = this.eventManager.subscribe('currentMessageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
