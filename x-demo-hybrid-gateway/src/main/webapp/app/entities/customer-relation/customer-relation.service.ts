import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerRelation } from './customer-relation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerRelation>;

@Injectable()
export class CustomerRelationService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-relations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerRelation: CustomerRelation): Observable<EntityResponseType> {
        const copy = this.convert(customerRelation);
        return this.http.post<CustomerRelation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerRelation: CustomerRelation): Observable<EntityResponseType> {
        const copy = this.convert(customerRelation);
        return this.http.put<CustomerRelation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerRelation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerRelation[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerRelation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerRelation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerRelation[]>): HttpResponse<CustomerRelation[]> {
        const jsonResponse: CustomerRelation[] = res.body;
        const body: CustomerRelation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerRelation.
     */
    private convertItemFromServer(customerRelation: CustomerRelation): CustomerRelation {
        const copy: CustomerRelation = Object.assign({}, customerRelation);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(customerRelation.createdDate);
        return copy;
    }

    /**
     * Convert a CustomerRelation to a JSON which can be sent to the server.
     */
    private convert(customerRelation: CustomerRelation): CustomerRelation {
        const copy: CustomerRelation = Object.assign({}, customerRelation);

        copy.createdDate = this.dateUtils.toDate(customerRelation.createdDate);
        return copy;
    }
}
