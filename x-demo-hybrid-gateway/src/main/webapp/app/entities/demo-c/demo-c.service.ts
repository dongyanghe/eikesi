import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DemoC } from './demo-c.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DemoC>;

@Injectable()
export class DemoCService {

    private resourceUrl =  SERVER_API_URL + 'api/demo-cs';

    constructor(private http: HttpClient) { }

    create(demoC: DemoC): Observable<EntityResponseType> {
        const copy = this.convert(demoC);
        return this.http.post<DemoC>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(demoC: DemoC): Observable<EntityResponseType> {
        const copy = this.convert(demoC);
        return this.http.put<DemoC>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DemoC>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DemoC[]>> {
        const options = createRequestOption(req);
        return this.http.get<DemoC[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DemoC[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DemoC = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DemoC[]>): HttpResponse<DemoC[]> {
        const jsonResponse: DemoC[] = res.body;
        const body: DemoC[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DemoC.
     */
    private convertItemFromServer(demoC: DemoC): DemoC {
        const copy: DemoC = Object.assign({}, demoC);
        return copy;
    }

    /**
     * Convert a DemoC to a JSON which can be sent to the server.
     */
    private convert(demoC: DemoC): DemoC {
        const copy: DemoC = Object.assign({}, demoC);
        return copy;
    }
}
