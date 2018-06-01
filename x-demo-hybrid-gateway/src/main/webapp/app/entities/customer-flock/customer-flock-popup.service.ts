import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomerFlock } from './customer-flock.model';
import { CustomerFlockService } from './customer-flock.service';

@Injectable()
export class CustomerFlockPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private customerFlockService: CustomerFlockService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.customerFlockService.find(id)
                    .subscribe((customerFlockResponse: HttpResponse<CustomerFlock>) => {
                        const customerFlock: CustomerFlock = customerFlockResponse.body;
                        customerFlock.createdDate = this.datePipe
                            .transform(customerFlock.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.customerFlockModalRef(component, customerFlock);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.customerFlockModalRef(component, new CustomerFlock());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerFlockModalRef(component: Component, customerFlock: CustomerFlock): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerFlock = customerFlock;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
