import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserRelation } from './user-relation.model';
import { UserRelationPopupService } from './user-relation-popup.service';
import { UserRelationService } from './user-relation.service';

@Component({
    selector: 'jhi-user-relation-dialog',
    templateUrl: './user-relation-dialog.component.html'
})
export class UserRelationDialogComponent implements OnInit {

    userRelation: UserRelation;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private userRelationService: UserRelationService,
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
        if (this.userRelation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userRelationService.update(this.userRelation));
        } else {
            this.subscribeToSaveResponse(
                this.userRelationService.create(this.userRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserRelation>>) {
        result.subscribe((res: HttpResponse<UserRelation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserRelation) {
        this.eventManager.broadcast({ name: 'userRelationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-relation-popup',
    template: ''
})
export class UserRelationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRelationPopupService: UserRelationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userRelationPopupService
                    .open(UserRelationDialogComponent as Component, params['id']);
            } else {
                this.userRelationPopupService
                    .open(UserRelationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
