import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICurrentMessage } from 'app/shared/model/current-message.model';
import { CurrentMessageService } from './current-message.service';

@Component({
    selector: 'jhi-current-message-delete-dialog',
    templateUrl: './current-message-delete-dialog.component.html'
})
export class CurrentMessageDeleteDialogComponent {
    currentMessage: ICurrentMessage;

    constructor(
        private currentMessageService: CurrentMessageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currentMessageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'currentMessageListModification',
                content: 'Deleted an currentMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-current-message-delete-popup',
    template: ''
})
export class CurrentMessageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ currentMessage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CurrentMessageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.currentMessage = currentMessage;
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
