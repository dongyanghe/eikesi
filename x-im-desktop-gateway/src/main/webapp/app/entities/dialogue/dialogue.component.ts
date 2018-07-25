import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDialogue } from 'app/shared/model/dialogue.model';
import { Principal } from 'app/core';
import { DialogueService } from './dialogue.service';

@Component({
    selector: 'jhi-dialogue',
    templateUrl: './dialogue.component.html'
})
export class DialogueComponent implements OnInit, OnDestroy {
    dialogues: IDialogue[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private dialogueService: DialogueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.dialogueService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDialogue[]>) => (this.dialogues = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.dialogueService.query().subscribe(
            (res: HttpResponse<IDialogue[]>) => {
                this.dialogues = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDialogues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDialogue) {
        return item.id;
    }

    registerChangeInDialogues() {
        this.eventSubscriber = this.eventManager.subscribe('dialogueListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
