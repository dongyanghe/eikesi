import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerFlock } from 'app/shared/model/customer-flock.model';
import { CustomerFlockService } from './customer-flock.service';

@Component({
    selector: 'jhi-customer-flock-delete-dialog',
    templateUrl: './customer-flock-delete-dialog.component.html'
})
export class CustomerFlockDeleteDialogComponent {
    customerFlock: ICustomerFlock;

    constructor(
        private customerFlockService: CustomerFlockService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerFlockService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerFlock }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerFlockDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customerFlock = customerFlock;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
