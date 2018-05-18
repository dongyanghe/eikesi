import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerFlock } from './customer-flock.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerFlock>;

@Injectable()
export class CustomerFlockService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-flocks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerFlock: CustomerFlock): Observable<EntityResponseType> {
        const copy = this.convert(customerFlock);
        return this.http.post<CustomerFlock>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerFlock: CustomerFlock): Observable<EntityResponseType> {
        const copy = this.convert(customerFlock);
        return this.http.put<CustomerFlock>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerFlock>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerFlock[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerFlock[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerFlock[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerFlock = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerFlock[]>): HttpResponse<CustomerFlock[]> {
        const jsonResponse: CustomerFlock[] = res.body;
        const body: CustomerFlock[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerFlock.
     */
    private convertItemFromServer(customerFlock: CustomerFlock): CustomerFlock {
        const copy: CustomerFlock = Object.assign({}, customerFlock);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(customerFlock.createdDate);
        return copy;
    }

    /**
     * Convert a CustomerFlock to a JSON which can be sent to the server.
     */
    private convert(customerFlock: CustomerFlock): CustomerFlock {
        const copy: CustomerFlock = Object.assign({}, customerFlock);

        copy.createdDate = this.dateUtils.toDate(customerFlock.createdDate);
        return copy;
    }
}
