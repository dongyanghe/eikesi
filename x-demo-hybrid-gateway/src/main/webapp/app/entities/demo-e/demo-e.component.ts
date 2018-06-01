import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoE } from './demo-e.model';
import { DemoEService } from './demo-e.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-demo-e',
    templateUrl: './demo-e.component.html'
})
export class DemoEComponent implements OnInit, OnDestroy {
demoES: DemoE[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private demoEService: DemoEService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.demoEService.query().subscribe(
            (res: HttpResponse<DemoE[]>) => {
                this.demoES = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDemoES();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DemoE) {
        return item.id;
    }
    registerChangeInDemoES() {
        this.eventSubscriber = this.eventManager.subscribe('demoEListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
