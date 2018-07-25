import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDialogue } from 'app/shared/model/dialogue.model';
import { DialogueService } from './dialogue.service';

@Component({
    selector: 'jhi-dialogue-update',
    templateUrl: './dialogue-update.component.html'
})
export class DialogueUpdateComponent implements OnInit {
    private _dialogue: IDialogue;
    isSaving: boolean;
    createdDate: string;

    constructor(private dialogueService: DialogueService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dialogue }) => {
            this.dialogue = dialogue;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.dialogue.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        if (this.dialogue.id !== undefined) {
            this.subscribeToSaveResponse(this.dialogueService.update(this.dialogue));
        } else {
            this.subscribeToSaveResponse(this.dialogueService.create(this.dialogue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDialogue>>) {
        result.subscribe((res: HttpResponse<IDialogue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get dialogue() {
        return this._dialogue;
    }

    set dialogue(dialogue: IDialogue) {
        this._dialogue = dialogue;
        this.createdDate = moment(dialogue.createdDate).format(DATE_TIME_FORMAT);
    }
}
