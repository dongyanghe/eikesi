import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDialogue } from 'app/shared/model/dialogue.model';

type EntityResponseType = HttpResponse<IDialogue>;
type EntityArrayResponseType = HttpResponse<IDialogue[]>;

@Injectable({ providedIn: 'root' })
export class DialogueService {
    private resourceUrl = SERVER_API_URL + 'api/dialogues';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/dialogues';

    constructor(private http: HttpClient) {}

    create(dialogue: IDialogue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dialogue);
        return this.http
            .post<IDialogue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(dialogue: IDialogue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dialogue);
        return this.http
            .put<IDialogue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDialogue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDialogue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDialogue[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(dialogue: IDialogue): IDialogue {
        const copy: IDialogue = Object.assign({}, dialogue, {
            createdDate: dialogue.createdDate != null && dialogue.createdDate.isValid() ? dialogue.createdDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((dialogue: IDialogue) => {
            dialogue.createdDate = dialogue.createdDate != null ? moment(dialogue.createdDate) : null;
        });
        return res;
    }
}
