import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DemoE } from './demo-e.model';
import { DemoEService } from './demo-e.service';

@Component({
    selector: 'jhi-demo-e-detail',
    templateUrl: './demo-e-detail.component.html'
})
export class DemoEDetailComponent implements OnInit, OnDestroy {

    demoE: DemoE;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private demoEService: DemoEService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemoES();
    }

    load(id) {
        this.demoEService.find(id)
            .subscribe((demoEResponse: HttpResponse<DemoE>) => {
                this.demoE = demoEResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemoES() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demoEListModification',
            (response) => this.load(this.demoE.id)
        );
    }
}
