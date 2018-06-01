import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DemoA } from './demo-a.model';
import { DemoAService } from './demo-a.service';

@Injectable()
export class DemoAPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private demoAService: DemoAService

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
                this.demoAService.find(id)
                    .subscribe((demoAResponse: HttpResponse<DemoA>) => {
                        const demoA: DemoA = demoAResponse.body;
                        if (demoA.localDateWhen) {
                            demoA.localDateWhen = {
                                year: demoA.localDateWhen.getFullYear(),
                                month: demoA.localDateWhen.getMonth() + 1,
                                day: demoA.localDateWhen.getDate()
                            };
                        }
                        demoA.dateTimeWhen = this.datePipe
                            .transform(demoA.dateTimeWhen, 'yyyy-MM-ddTHH:mm:ss');
                        demoA.zonedDateTimeWhen = this.datePipe
                            .transform(demoA.zonedDateTimeWhen, 'yyyy-MM-ddTHH:mm:ss');
                        demoA.instantType = this.datePipe
                            .transform(demoA.instantType, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.demoAModalRef(component, demoA);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.demoAModalRef(component, new DemoA());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    demoAModalRef(component: Component, demoA: DemoA): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.demoA = demoA;
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
