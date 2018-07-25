import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDialogue } from 'app/shared/model/dialogue.model';
import { DialogueService } from './dialogue.service';

@Component({
    selector: 'jhi-dialogue-delete-dialog',
    templateUrl: './dialogue-delete-dialog.component.html'
})
export class DialogueDeleteDialogComponent {
    dialogue: IDialogue;

    constructor(private dialogueService: DialogueService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dialogueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dialogueListModification',
                content: 'Deleted an dialogue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dialogue-delete-popup',
    template: ''
})
export class DialogueDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dialogue }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DialogueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dialogue = dialogue;
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
