import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DemoC } from './demo-c.model';
import { DemoCService } from './demo-c.service';

@Component({
    selector: 'jhi-demo-c-detail',
    templateUrl: './demo-c-detail.component.html'
})
export class DemoCDetailComponent implements OnInit, OnDestroy {

    demoC: DemoC;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private demoCService: DemoCService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemoCS();
    }

    load(id) {
        this.demoCService.find(id)
            .subscribe((demoCResponse: HttpResponse<DemoC>) => {
                this.demoC = demoCResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemoCS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demoCListModification',
            (response) => this.load(this.demoC.id)
        );
    }
}
