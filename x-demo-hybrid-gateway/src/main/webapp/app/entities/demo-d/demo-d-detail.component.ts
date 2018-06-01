import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DemoD } from './demo-d.model';
import { DemoDService } from './demo-d.service';

@Component({
    selector: 'jhi-demo-d-detail',
    templateUrl: './demo-d-detail.component.html'
})
export class DemoDDetailComponent implements OnInit, OnDestroy {

    demoD: DemoD;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private demoDService: DemoDService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemoDS();
    }

    load(id) {
        this.demoDService.find(id)
            .subscribe((demoDResponse: HttpResponse<DemoD>) => {
                this.demoD = demoDResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemoDS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demoDListModification',
            (response) => this.load(this.demoD.id)
        );
    }
}
