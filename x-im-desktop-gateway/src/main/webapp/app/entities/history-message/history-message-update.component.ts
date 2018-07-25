import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHistoryMessage } from 'app/shared/model/history-message.model';
import { HistoryMessageService } from './history-message.service';

@Component({
    selector: 'jhi-history-message-update',
    templateUrl: './history-message-update.component.html'
})
export class HistoryMessageUpdateComponent implements OnInit {
    private _historyMessage: IHistoryMessage;
    isSaving: boolean;
    createdDate: string;
    targetDate: string;

    constructor(private historyMessageService: HistoryMessageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ historyMessage }) => {
            this.historyMessage = historyMessage;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.historyMessage.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        this.historyMessage.targetDate = moment(this.targetDate, DATE_TIME_FORMAT);
        if (this.historyMessage.id !== undefined) {
            this.subscribeToSaveResponse(this.historyMessageService.update(this.historyMessage));
        } else {
            this.subscribeToSaveResponse(this.historyMessageService.create(this.historyMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHistoryMessage>>) {
        result.subscribe((res: HttpResponse<IHistoryMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get historyMessage() {
        return this._historyMessage;
    }

    set historyMessage(historyMessage: IHistoryMessage) {
        this._historyMessage = historyMessage;
        this.createdDate = moment(historyMessage.createdDate).format(DATE_TIME_FORMAT);
        this.targetDate = moment(historyMessage.targetDate).format(DATE_TIME_FORMAT);
    }
}
