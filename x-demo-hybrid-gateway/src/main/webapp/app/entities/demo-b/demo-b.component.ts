import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoB } from './demo-b.model';
import { DemoBService } from './demo-b.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-demo-b',
    templateUrl: './demo-b.component.html'
})
export class DemoBComponent implements OnInit, OnDestroy {
demoBS: DemoB[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private demoBService: DemoBService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.demoBService.query().subscribe(
            (res: HttpResponse<DemoB[]>) => {
                this.demoBS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDemoBS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DemoB) {
        return item.id;
    }
    registerChangeInDemoBS() {
        this.eventSubscriber = this.eventManager.subscribe('demoBListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
