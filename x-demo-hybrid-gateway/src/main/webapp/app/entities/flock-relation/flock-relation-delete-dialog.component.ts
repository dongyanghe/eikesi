import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FlockRelation } from './flock-relation.model';
import { FlockRelationPopupService } from './flock-relation-popup.service';
import { FlockRelationService } from './flock-relation.service';

@Component({
    selector: 'jhi-flock-relation-delete-dialog',
    templateUrl: './flock-relation-delete-dialog.component.html'
})
export class FlockRelationDeleteDialogComponent {

    flockRelation: FlockRelation;

    constructor(
        private flockRelationService: FlockRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flockRelationService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flockRelationPopupService: FlockRelationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.flockRelationPopupService
                .open(FlockRelationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
