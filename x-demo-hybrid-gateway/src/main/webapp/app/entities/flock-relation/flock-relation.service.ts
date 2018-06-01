import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FlockRelation } from './flock-relation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FlockRelation>;

@Injectable()
export class FlockRelationService {

    private resourceUrl =  SERVER_API_URL + 'api/flock-relations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(flockRelation: FlockRelation): Observable<EntityResponseType> {
        const copy = this.convert(flockRelation);
        return this.http.post<FlockRelation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(flockRelation: FlockRelation): Observable<EntityResponseType> {
        const copy = this.convert(flockRelation);
        return this.http.put<FlockRelation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FlockRelation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FlockRelation[]>> {
        const options = createRequestOption(req);
        return this.http.get<FlockRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FlockRelation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FlockRelation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FlockRelation[]>): HttpResponse<FlockRelation[]> {
        const jsonResponse: FlockRelation[] = res.body;
        const body: FlockRelation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FlockRelation.
     */
    private convertItemFromServer(flockRelation: FlockRelation): FlockRelation {
        const copy: FlockRelation = Object.assign({}, flockRelation);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(flockRelation.createdDate);
        return copy;
    }

    /**
     * Convert a FlockRelation to a JSON which can be sent to the server.
     */
    private convert(flockRelation: FlockRelation): FlockRelation {
        const copy: FlockRelation = Object.assign({}, flockRelation);

        copy.createdDate = this.dateUtils.toDate(flockRelation.createdDate);
        return copy;
    }
}
