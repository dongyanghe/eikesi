import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICurrentMessage } from 'app/shared/model/current-message.model';

type EntityResponseType = HttpResponse<ICurrentMessage>;
type EntityArrayResponseType = HttpResponse<ICurrentMessage[]>;

@Injectable({ providedIn: 'root' })
export class CurrentMessageService {
    private resourceUrl = SERVER_API_URL + 'api/current-messages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/current-messages';

    constructor(private http: HttpClient) {}

    create(currentMessage: ICurrentMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(currentMessage);
        return this.http
            .post<ICurrentMessage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(currentMessage: ICurrentMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(currentMessage);
        return this.http
            .put<ICurrentMessage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICurrentMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICurrentMessage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICurrentMessage[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(currentMessage: ICurrentMessage): ICurrentMessage {
        const copy: ICurrentMessage = Object.assign({}, currentMessage, {
            createdDate:
                currentMessage.createdDate != null && currentMessage.createdDate.isValid() ? currentMessage.createdDate.toJSON() : null,
            targetDate: currentMessage.targetDate != null && currentMessage.targetDate.isValid() ? currentMessage.targetDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.targetDate = res.body.targetDate != null ? moment(res.body.targetDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((currentMessage: ICurrentMessage) => {
            currentMessage.createdDate = currentMessage.createdDate != null ? moment(currentMessage.createdDate) : null;
            currentMessage.targetDate = currentMessage.targetDate != null ? moment(currentMessage.targetDate) : null;
        });
        return res;
    }
}
