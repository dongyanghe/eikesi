import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICurrentMessage } from 'app/shared/model/current-message.model';
import { CurrentMessageService } from './current-message.service';
import { IDialogue } from 'app/shared/model/dialogue.model';
import { DialogueService } from 'app/entities/dialogue';

@Component({
    selector: 'jhi-current-message-update',
    templateUrl: './current-message-update.component.html'
})
export class CurrentMessageUpdateComponent implements OnInit {
    private _currentMessage: ICurrentMessage;
    isSaving: boolean;

    dialogues: IDialogue[];
    createdDate: string;
    targetDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private currentMessageService: CurrentMessageService,
        private dialogueService: DialogueService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ currentMessage }) => {
            this.currentMessage = currentMessage;
        });
        this.dialogueService.query().subscribe(
            (res: HttpResponse<IDialogue[]>) => {
                this.dialogues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.currentMessage.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        this.currentMessage.targetDate = moment(this.targetDate, DATE_TIME_FORMAT);
        if (this.currentMessage.id !== undefined) {
            this.subscribeToSaveResponse(this.currentMessageService.update(this.currentMessage));
        } else {
            this.subscribeToSaveResponse(this.currentMessageService.create(this.currentMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICurrentMessage>>) {
        result.subscribe((res: HttpResponse<ICurrentMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDialogueById(index: number, item: IDialogue) {
        return item.id;
    }
    get currentMessage() {
        return this._currentMessage;
    }

    set currentMessage(currentMessage: ICurrentMessage) {
        this._currentMessage = currentMessage;
        this.createdDate = moment(currentMessage.createdDate).format(DATE_TIME_FORMAT);
        this.targetDate = moment(currentMessage.targetDate).format(DATE_TIME_FORMAT);
    }
}
