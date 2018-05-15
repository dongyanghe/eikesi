import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserFlock } from './user-flock.model';
import { UserFlockService } from './user-flock.service';

@Component({
    selector: 'jhi-user-flock-detail',
    templateUrl: './user-flock-detail.component.html'
})
export class UserFlockDetailComponent implements OnInit, OnDestroy {

    userFlock: UserFlock;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userFlockService: UserFlockService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserFlocks();
    }

    load(id) {
        this.userFlockService.find(id)
            .subscribe((userFlockResponse: HttpResponse<UserFlock>) => {
                this.userFlock = userFlockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserFlocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userFlockListModification',
            (response) => this.load(this.userFlock.id)
        );
    }
}
