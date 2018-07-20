import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoryMessage } from 'app/shared/model/history-message.model';

@Component({
    selector: 'jhi-history-message-detail',
    templateUrl: './history-message-detail.component.html'
})
export class HistoryMessageDetailComponent implements OnInit {
    historyMessage: IHistoryMessage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ historyMessage }) => {
            this.historyMessage = historyMessage;
        });
    }

    previousState() {
        window.history.back();
    }
}
