import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DemoB } from './demo-b.model';
import { DemoBService } from './demo-b.service';

@Component({
    selector: 'jhi-demo-b-detail',
    templateUrl: './demo-b-detail.component.html'
})
export class DemoBDetailComponent implements OnInit, OnDestroy {

    demoB: DemoB;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private demoBService: DemoBService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemoBS();
    }

    load(id) {
        this.demoBService.find(id)
            .subscribe((demoBResponse: HttpResponse<DemoB>) => {
                this.demoB = demoBResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemoBS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demoBListModification',
            (response) => this.load(this.demoB.id)
        );
    }
}
