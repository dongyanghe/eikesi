import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserFlock } from './user-flock.model';
import { UserFlockService } from './user-flock.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-flock',
    templateUrl: './user-flock.component.html'
})
export class UserFlockComponent implements OnInit, OnDestroy {
userFlocks: UserFlock[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userFlockService: UserFlockService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userFlockService.query().subscribe(
            (res: HttpResponse<UserFlock[]>) => {
                this.userFlocks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserFlocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserFlock) {
        return item.id;
    }
    registerChangeInUserFlocks() {
        this.eventSubscriber = this.eventManager.subscribe('userFlockListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
