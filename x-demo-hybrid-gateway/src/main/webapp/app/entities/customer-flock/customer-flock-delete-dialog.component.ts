import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerFlock } from './customer-flock.model';
import { CustomerFlockPopupService } from './customer-flock-popup.service';
import { CustomerFlockService } from './customer-flock.service';

@Component({
    selector: 'jhi-customer-flock-delete-dialog',
    templateUrl: './customer-flock-delete-dialog.component.html'
})
export class CustomerFlockDeleteDialogComponent {

    customerFlock: CustomerFlock;

    constructor(
        private customerFlockService: CustomerFlockService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerFlockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerFlockListModification',
                content: 'Deleted an customerFlock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-flock-delete-popup',
    template: ''
})
export class CustomerFlockDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerFlockPopupService: CustomerFlockPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerFlockPopupService
                .open(CustomerFlockDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
