import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoryMessage } from 'app/shared/model/history-message.model';
import { HistoryMessageService } from './history-message.service';

@Component({
    selector: 'jhi-history-message-delete-dialog',
    templateUrl: './history-message-delete-dialog.component.html'
})
export class HistoryMessageDeleteDialogComponent {
    historyMessage: IHistoryMessage;

    constructor(
        private historyMessageService: HistoryMessageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.historyMessageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'historyMessageListModification',
                content: 'Deleted an historyMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-history-message-delete-popup',
    template: ''
})
export class HistoryMessageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ historyMessage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HistoryMessageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.historyMessage = historyMessage;
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
