import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemoC } from './demo-c.model';
import { DemoCPopupService } from './demo-c-popup.service';
import { DemoCService } from './demo-c.service';

@Component({
    selector: 'jhi-demo-c-delete-dialog',
    templateUrl: './demo-c-delete-dialog.component.html'
})
export class DemoCDeleteDialogComponent {

    demoC: DemoC;

    constructor(
        private demoCService: DemoCService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demoCService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demoCListModification',
                content: 'Deleted an demoC'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demo-c-delete-popup',
    template: ''
})
export class DemoCDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoCPopupService: DemoCPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demoCPopupService
                .open(DemoCDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
