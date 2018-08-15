import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICurrentMessage } from 'app/shared/model/current-message.model';

@Component({
    selector: 'jhi-current-message-detail',
    templateUrl: './current-message-detail.component.html'
})
export class CurrentMessageDetailComponent implements OnInit {
    currentMessage: ICurrentMessage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ currentMessage }) => {
            this.currentMessage = currentMessage;
        });
    }

    previousState() {
        window.history.back();
    }
}
