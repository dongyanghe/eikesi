import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FlockRelation } from './flock-relation.model';
import { FlockRelationService } from './flock-relation.service';

@Injectable()
export class FlockRelationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private flockRelationService: FlockRelationService

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
                this.flockRelationService.find(id)
                    .subscribe((flockRelationResponse: HttpResponse<FlockRelation>) => {
                        const flockRelation: FlockRelation = flockRelationResponse.body;
                        flockRelation.createdDate = this.datePipe
                            .transform(flockRelation.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.flockRelationModalRef(component, flockRelation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.flockRelationModalRef(component, new FlockRelation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    flockRelationModalRef(component: Component, flockRelation: FlockRelation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.flockRelation = flockRelation;
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
