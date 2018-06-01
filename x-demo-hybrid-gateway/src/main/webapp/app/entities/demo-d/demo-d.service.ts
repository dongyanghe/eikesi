import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DemoD } from './demo-d.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DemoD>;

@Injectable()
export class DemoDService {

    private resourceUrl =  SERVER_API_URL + 'api/demo-ds';

    constructor(private http: HttpClient) { }

    create(demoD: DemoD): Observable<EntityResponseType> {
        const copy = this.convert(demoD);
        return this.http.post<DemoD>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(demoD: DemoD): Observable<EntityResponseType> {
        const copy = this.convert(demoD);
        return this.http.put<DemoD>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DemoD>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DemoD[]>> {
        const options = createRequestOption(req);
        return this.http.get<DemoD[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DemoD[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DemoD = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DemoD[]>): HttpResponse<DemoD[]> {
        const jsonResponse: DemoD[] = res.body;
        const body: DemoD[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DemoD.
     */
    private convertItemFromServer(demoD: DemoD): DemoD {
        const copy: DemoD = Object.assign({}, demoD);
        return copy;
    }

    /**
     * Convert a DemoD to a JSON which can be sent to the server.
     */
    private convert(demoD: DemoD): DemoD {
        const copy: DemoD = Object.assign({}, demoD);
        return copy;
    }
}
