import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DemoA } from './demo-a.model';
import { DemoAService } from './demo-a.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-demo-a',
    templateUrl: './demo-a.component.html'
})
export class DemoAComponent implements OnInit, OnDestroy {
demoAS: DemoA[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private demoAService: DemoAService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.demoAService.query().subscribe(
            (res: HttpResponse<DemoA[]>) => {
                this.demoAS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDemoAS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DemoA) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInDemoAS() {
        this.eventSubscriber = this.eventManager.subscribe('demoAListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
