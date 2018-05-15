import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemoC } from './demo-c.model';
import { DemoCService } from './demo-c.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-demo-c',
    templateUrl: './demo-c.component.html'
})
export class DemoCComponent implements OnInit, OnDestroy {
demoCS: DemoC[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private demoCService: DemoCService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.demoCService.query().subscribe(
            (res: HttpResponse<DemoC[]>) => {
                this.demoCS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDemoCS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DemoC) {
        return item.id;
    }
    registerChangeInDemoCS() {
        this.eventSubscriber = this.eventManager.subscribe('demoCListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
