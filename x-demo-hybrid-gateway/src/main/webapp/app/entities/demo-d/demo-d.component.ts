import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoD } from './demo-d.model';
import { DemoDService } from './demo-d.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-demo-d',
    templateUrl: './demo-d.component.html'
})
export class DemoDComponent implements OnInit, OnDestroy {
demoDS: DemoD[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private demoDService: DemoDService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.demoDService.query().subscribe(
            (res: HttpResponse<DemoD[]>) => {
                this.demoDS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDemoDS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DemoD) {
        return item.id;
    }
    registerChangeInDemoDS() {
        this.eventSubscriber = this.eventManager.subscribe('demoDListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
