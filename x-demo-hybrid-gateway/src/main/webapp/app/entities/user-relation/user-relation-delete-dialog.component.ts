import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserRelation } from './user-relation.model';
import { UserRelationPopupService } from './user-relation-popup.service';
import { UserRelationService } from './user-relation.service';

@Component({
    selector: 'jhi-user-relation-delete-dialog',
    templateUrl: './user-relation-delete-dialog.component.html'
})
export class UserRelationDeleteDialogComponent {

    userRelation: UserRelation;

    constructor(
        private userRelationService: UserRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userRelationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userRelationListModification',
                content: 'Deleted an userRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-relation-delete-popup',
    template: ''
})
export class UserRelationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRelationPopupService: UserRelationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userRelationPopupService
                .open(UserRelationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
