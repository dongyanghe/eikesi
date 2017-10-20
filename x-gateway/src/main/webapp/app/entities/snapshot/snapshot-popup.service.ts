import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Snapshot } from './snapshot.model';
import { SnapshotService } from './snapshot.service';

@Injectable()
export class SnapshotPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private snapshotService: SnapshotService

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
                this.snapshotService.find(id).subscribe((snapshot) => {
                    snapshot.createDate = this.datePipe
                        .transform(snapshot.createDate, 'yyyy-MM-ddTHH:mm:ss');
                    snapshot.updateDate = this.datePipe
                        .transform(snapshot.updateDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.snapshotModalRef(component, snapshot);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.snapshotModalRef(component, new Snapshot());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    snapshotModalRef(component: Component, snapshot: Snapshot): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.snapshot = snapshot;
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
