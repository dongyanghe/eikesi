import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserFlock } from './user-flock.model';
import { UserFlockPopupService } from './user-flock-popup.service';
import { UserFlockService } from './user-flock.service';

@Component({
    selector: 'jhi-user-flock-delete-dialog',
    templateUrl: './user-flock-delete-dialog.component.html'
})
export class UserFlockDeleteDialogComponent {

    userFlock: UserFlock;

    constructor(
        private userFlockService: UserFlockService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userFlockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userFlockListModification',
                content: 'Deleted an userFlock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-flock-delete-popup',
    template: ''
})
export class UserFlockDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userFlockPopupService: UserFlockPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userFlockPopupService
                .open(UserFlockDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
