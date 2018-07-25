import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlockRelation } from 'app/shared/model/flock-relation.model';

@Component({
    selector: 'jhi-flock-relation-detail',
    templateUrl: './flock-relation-detail.component.html'
})
export class FlockRelationDetailComponent implements OnInit {
    flockRelation: IFlockRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flockRelation }) => {
            this.flockRelation = flockRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
