import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DemoE } from './demo-e.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DemoE>;

@Injectable()
export class DemoEService {

    private resourceUrl =  SERVER_API_URL + 'api/demo-es';

    constructor(private http: HttpClient) { }

    create(demoE: DemoE): Observable<EntityResponseType> {
        const copy = this.convert(demoE);
        return this.http.post<DemoE>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(demoE: DemoE): Observable<EntityResponseType> {
        const copy = this.convert(demoE);
        return this.http.put<DemoE>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DemoE>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DemoE[]>> {
        const options = createRequestOption(req);
        return this.http.get<DemoE[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DemoE[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DemoE = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DemoE[]>): HttpResponse<DemoE[]> {
        const jsonResponse: DemoE[] = res.body;
        const body: DemoE[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DemoE.
     */
    private convertItemFromServer(demoE: DemoE): DemoE {
        const copy: DemoE = Object.assign({}, demoE);
        return copy;
    }

    /**
     * Convert a DemoE to a JSON which can be sent to the server.
     */
    private convert(demoE: DemoE): DemoE {
        const copy: DemoE = Object.assign({}, demoE);
        return copy;
    }
}
