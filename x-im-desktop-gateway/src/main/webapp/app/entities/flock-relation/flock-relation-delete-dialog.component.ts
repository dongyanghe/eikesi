import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlockRelation } from 'app/shared/model/flock-relation.model';
import { FlockRelationService } from './flock-relation.service';

@Component({
    selector: 'jhi-flock-relation-delete-dialog',
    templateUrl: './flock-relation-delete-dialog.component.html'
})
export class FlockRelationDeleteDialogComponent {
    flockRelation: IFlockRelation;

    constructor(
        private flockRelationService: FlockRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flockRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flockRelationListModification',
                content: 'Deleted an flockRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flock-relation-delete-popup',
    template: ''
})
export class FlockRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flockRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlockRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.flockRelation = flockRelation;
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
