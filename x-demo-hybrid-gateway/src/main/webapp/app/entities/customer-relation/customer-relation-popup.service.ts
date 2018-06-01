import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomerRelation } from './customer-relation.model';
import { CustomerRelationService } from './customer-relation.service';

@Injectable()
export class CustomerRelationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private customerRelationService: CustomerRelationService

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
                this.customerRelationService.find(id)
                    .subscribe((customerRelationResponse: HttpResponse<CustomerRelation>) => {
                        const customerRelation: CustomerRelation = customerRelationResponse.body;
                        customerRelation.createdDate = this.datePipe
                            .transform(customerRelation.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.customerRelationModalRef(component, customerRelation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.customerRelationModalRef(component, new CustomerRelation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerRelationModalRef(component: Component, customerRelation: CustomerRelation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerRelation = customerRelation;
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
