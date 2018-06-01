import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserFlock } from './user-flock.model';
import { UserFlockPopupService } from './user-flock-popup.service';
import { UserFlockService } from './user-flock.service';

@Component({
    selector: 'jhi-user-flock-dialog',
    templateUrl: './user-flock-dialog.component.html'
})
export class UserFlockDialogComponent implements OnInit {

    userFlock: UserFlock;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private userFlockService: UserFlockService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userFlock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userFlockService.update(this.userFlock));
        } else {
            this.subscribeToSaveResponse(
                this.userFlockService.create(this.userFlock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserFlock>>) {
        result.subscribe((res: HttpResponse<UserFlock>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserFlock) {
        this.eventManager.broadcast({ name: 'userFlockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-flock-popup',
    template: ''
})
export class UserFlockPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userFlockPopupService: UserFlockPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userFlockPopupService
                    .open(UserFlockDialogComponent as Component, params['id']);
            } else {
                this.userFlockPopupService
                    .open(UserFlockDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
