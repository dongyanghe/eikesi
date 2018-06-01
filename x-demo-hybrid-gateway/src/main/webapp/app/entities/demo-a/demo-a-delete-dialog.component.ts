import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemoA } from './demo-a.model';
import { DemoAPopupService } from './demo-a-popup.service';
import { DemoAService } from './demo-a.service';

@Component({
    selector: 'jhi-demo-a-delete-dialog',
    templateUrl: './demo-a-delete-dialog.component.html'
})
export class DemoADeleteDialogComponent {

    demoA: DemoA;

    constructor(
        private demoAService: DemoAService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demoAService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demoAListModification',
                content: 'Deleted an demoA'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demo-a-delete-popup',
    template: ''
})
export class DemoADeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demoAPopupService: DemoAPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demoAPopupService
                .open(DemoADeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
