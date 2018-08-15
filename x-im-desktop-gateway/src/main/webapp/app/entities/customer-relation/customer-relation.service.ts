import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerRelation } from 'app/shared/model/customer-relation.model';

type EntityResponseType = HttpResponse<ICustomerRelation>;
type EntityArrayResponseType = HttpResponse<ICustomerRelation[]>;

@Injectable({ providedIn: 'root' })
export class CustomerRelationService {
    private resourceUrl = SERVER_API_URL + 'api/customer-relations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/customer-relations';

    constructor(private http: HttpClient) {}

    create(customerRelation: ICustomerRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerRelation);
        return this.http
            .post<ICustomerRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customerRelation: ICustomerRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerRelation);
        return this.http
            .put<ICustomerRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICustomerRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerRelation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(customerRelation: ICustomerRelation): ICustomerRelation {
        const copy: ICustomerRelation = Object.assign({}, customerRelation, {
            createdDate:
                customerRelation.createdDate != null && customerRelation.createdDate.isValid()
                    ? customerRelation.createdDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((customerRelation: ICustomerRelation) => {
            customerRelation.createdDate = customerRelation.createdDate != null ? moment(customerRelation.createdDate) : null;
        });
        return res;
    }
}
