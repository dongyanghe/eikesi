import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DemoA } from './demo-a.model';
import { DemoAService } from './demo-a.service';

@Component({
    selector: 'jhi-demo-a-detail',
    templateUrl: './demo-a-detail.component.html'
})
export class DemoADetailComponent implements OnInit, OnDestroy {

    demoA: DemoA;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private demoAService: DemoAService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemoAS();
    }

    load(id) {
        this.demoAService.find(id)
            .subscribe((demoAResponse: HttpResponse<DemoA>) => {
                this.demoA = demoAResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemoAS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demoAListModification',
            (response) => this.load(this.demoA.id)
        );
    }
}
