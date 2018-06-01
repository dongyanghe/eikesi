import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemoE } from './demo-e.model';
import { DemoEPopupService } from './demo-e-popup.service';
import { DemoEService } from './demo-e.service';

@Component({
    selector: 'jhi-demo-e-delete-dialog',
    templateUrl: './demo-e-delete-dialog.component.html'
})
export class DemoEDeleteDialogComponent {

    demoE: DemoE;

    constructor(
        private demoEService: DemoEService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demoEService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demoEListModification',
                content: 'Deleted an demoE'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demo-e-delete-popup',
    template: ''
})
export class DemoEDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoEPopupService: DemoEPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demoEPopupService
                .open(DemoEDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
