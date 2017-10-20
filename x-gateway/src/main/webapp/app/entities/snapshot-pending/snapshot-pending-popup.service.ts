import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SnapshotPending } from './snapshot-pending.model';
import { SnapshotPendingService } from './snapshot-pending.service';

@Injectable()
export class SnapshotPendingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private snapshotPendingService: SnapshotPendingService

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
                this.snapshotPendingService.find(id).subscribe((snapshotPending) => {
                    snapshotPending.createDate = this.datePipe
                        .transform(snapshotPending.createDate, 'yyyy-MM-ddTHH:mm:ss');
                    snapshotPending.updateDate = this.datePipe
                        .transform(snapshotPending.updateDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.snapshotPendingModalRef(component, snapshotPending);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.snapshotPendingModalRef(component, new SnapshotPending());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    snapshotPendingModalRef(component: Component, snapshotPending: SnapshotPending): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.snapshotPending = snapshotPending;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
