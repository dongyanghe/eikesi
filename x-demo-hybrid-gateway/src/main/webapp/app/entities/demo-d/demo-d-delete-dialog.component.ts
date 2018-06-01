import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemoD } from './demo-d.model';
import { DemoDPopupService } from './demo-d-popup.service';
import { DemoDService } from './demo-d.service';

@Component({
    selector: 'jhi-demo-d-delete-dialog',
    templateUrl: './demo-d-delete-dialog.component.html'
})
export class DemoDDeleteDialogComponent {

    demoD: DemoD;

    constructor(
        private demoDService: DemoDService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demoDService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demoDListModification',
                content: 'Deleted an demoD'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demo-d-delete-popup',
    template: ''
})
export class DemoDDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoDPopupService: DemoDPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demoDPopupService
                .open(DemoDDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
