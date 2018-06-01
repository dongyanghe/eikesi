import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DemoA } from './demo-a.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DemoA>;

@Injectable()
export class DemoAService {

    private resourceUrl =  SERVER_API_URL + 'api/demo-as';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(demoA: DemoA): Observable<EntityResponseType> {
        const copy = this.convert(demoA);
        return this.http.post<DemoA>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(demoA: DemoA): Observable<EntityResponseType> {
        const copy = this.convert(demoA);
        return this.http.put<DemoA>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DemoA>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DemoA[]>> {
        const options = createRequestOption(req);
        return this.http.get<DemoA[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DemoA[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DemoA = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DemoA[]>): HttpResponse<DemoA[]> {
        const jsonResponse: DemoA[] = res.body;
        const body: DemoA[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DemoA.
     */
    private convertItemFromServer(demoA: DemoA): DemoA {
        const copy: DemoA = Object.assign({}, demoA);
        copy.localDateWhen = this.dateUtils
            .convertLocalDateFromServer(demoA.localDateWhen);
        copy.dateTimeWhen = this.dateUtils
            .convertDateTimeFromServer(demoA.dateTimeWhen);
        copy.zonedDateTimeWhen = this.dateUtils
            .convertDateTimeFromServer(demoA.zonedDateTimeWhen);
        copy.instantType = this.dateUtils
            .convertDateTimeFromServer(demoA.instantType);
        return copy;
    }

    /**
     * Convert a DemoA to a JSON which can be sent to the server.
     */
    private convert(demoA: DemoA): DemoA {
        const copy: DemoA = Object.assign({}, demoA);
        copy.localDateWhen = this.dateUtils
            .convertLocalDateToServer(demoA.localDateWhen);

        copy.dateTimeWhen = this.dateUtils.toDate(demoA.dateTimeWhen);

        copy.zonedDateTimeWhen = this.dateUtils.toDate(demoA.zonedDateTimeWhen);

        copy.instantType = this.dateUtils.toDate(demoA.instantType);
        return copy;
    }
}
