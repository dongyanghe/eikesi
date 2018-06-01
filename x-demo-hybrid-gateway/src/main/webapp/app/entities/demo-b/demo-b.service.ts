import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DemoB } from './demo-b.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DemoB>;

@Injectable()
export class DemoBService {

    private resourceUrl =  SERVER_API_URL + 'api/demo-bs';

    constructor(private http: HttpClient) { }

    create(demoB: DemoB): Observable<EntityResponseType> {
        const copy = this.convert(demoB);
        return this.http.post<DemoB>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(demoB: DemoB): Observable<EntityResponseType> {
        const copy = this.convert(demoB);
        return this.http.put<DemoB>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DemoB>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DemoB[]>> {
        const options = createRequestOption(req);
        return this.http.get<DemoB[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DemoB[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DemoB = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DemoB[]>): HttpResponse<DemoB[]> {
        const jsonResponse: DemoB[] = res.body;
        const body: DemoB[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DemoB.
     */
    private convertItemFromServer(demoB: DemoB): DemoB {
        const copy: DemoB = Object.assign({}, demoB);
        return copy;
    }

    /**
     * Convert a DemoB to a JSON which can be sent to the server.
     */
    private convert(demoB: DemoB): DemoB {
        const copy: DemoB = Object.assign({}, demoB);
        return copy;
    }
}
