import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHistoryMessage } from 'app/shared/model/history-message.model';

type EntityResponseType = HttpResponse<IHistoryMessage>;
type EntityArrayResponseType = HttpResponse<IHistoryMessage[]>;

@Injectable({ providedIn: 'root' })
export class HistoryMessageService {
    private resourceUrl = SERVER_API_URL + 'api/history-messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/history-messages';

    constructor(private http: HttpClient) {}

    create(historyMessage: IHistoryMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(historyMessage);
        return this.http
            .post<IHistoryMessage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(historyMessage: IHistoryMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(historyMessage);
        return this.http
            .put<IHistoryMessage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHistoryMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHistoryMessage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHistoryMessage[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(historyMessage: IHistoryMessage): IHistoryMessage {
        const copy: IHistoryMessage = Object.assign({}, historyMessage, {
            createdDate:
                historyMessage.createdDate != null && historyMessage.createdDate.isValid() ? historyMessage.createdDate.toJSON() : null,
            targetDate: historyMessage.targetDate != null && historyMessage.targetDate.isValid() ? historyMessage.targetDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.targetDate = res.body.targetDate != null ? moment(res.body.targetDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((historyMessage: IHistoryMessage) => {
            historyMessage.createdDate = historyMessage.createdDate != null ? moment(historyMessage.createdDate) : null;
            historyMessage.targetDate = historyMessage.targetDate != null ? moment(historyMessage.targetDate) : null;
        });
        return res;
    }
}
