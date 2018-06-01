import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemoB } from './demo-b.model';
import { DemoBPopupService } from './demo-b-popup.service';
import { DemoBService } from './demo-b.service';

@Component({
    selector: 'jhi-demo-b-delete-dialog',
    templateUrl: './demo-b-delete-dialog.component.html'
})
export class DemoBDeleteDialogComponent {

    demoB: DemoB;

    constructor(
        private demoBService: DemoBService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demoBService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demoBListModification',
                content: 'Deleted an demoB'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demo-b-delete-popup',
    template: ''
})
export class DemoBDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoBPopupService: DemoBPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demoBPopupService
                .open(DemoBDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
