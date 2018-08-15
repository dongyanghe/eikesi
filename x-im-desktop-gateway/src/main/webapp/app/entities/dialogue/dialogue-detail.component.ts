import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDialogue } from 'app/shared/model/dialogue.model';

@Component({
    selector: 'jhi-dialogue-detail',
    templateUrl: './dialogue-detail.component.html'
})
export class DialogueDetailComponent implements OnInit {
    dialogue: IDialogue;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dialogue }) => {
            this.dialogue = dialogue;
        });
    }

    previousState() {
        window.history.back();
    }
}
