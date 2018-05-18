import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerRelation } from './customer-relation.model';
import { CustomerRelationPopupService } from './customer-relation-popup.service';
import { CustomerRelationService } from './customer-relation.service';

@Component({
    selector: 'jhi-customer-relation-delete-dialog',
    templateUrl: './customer-relation-delete-dialog.component.html'
})
export class CustomerRelationDeleteDialogComponent {

    customerRelation: CustomerRelation;

    constructor(
        private customerRelationService: CustomerRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerRelationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerRelationListModification',
                content: 'Deleted an customerRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-relation-delete-popup',
    template: ''
})
export class CustomerRelationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerRelationPopupService: CustomerRelationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerRelationPopupService
                .open(CustomerRelationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
