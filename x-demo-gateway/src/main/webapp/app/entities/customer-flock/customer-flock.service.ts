import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerFlock } from 'app/shared/model/customer-flock.model';

type EntityResponseType = HttpResponse<ICustomerFlock>;
type EntityArrayResponseType = HttpResponse<ICustomerFlock[]>;

@Injectable({ providedIn: 'root' })
export class CustomerFlockService {
    private resourceUrl = SERVER_API_URL + 'api/customer-flocks';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/customer-flocks';

    constructor(private http: HttpClient) {}

    create(customerFlock: ICustomerFlock): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerFlock);
        return this.http
            .post<ICustomerFlock>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customerFlock: ICustomerFlock): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerFlock);
        return this.http
            .put<ICustomerFlock>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICustomerFlock>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerFlock[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerFlock[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(customerFlock: ICustomerFlock): ICustomerFlock {
        const copy: ICustomerFlock = Object.assign({}, customerFlock, {
            createdDate:
                customerFlock.createdDate != null && customerFlock.createdDate.isValid() ? customerFlock.createdDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((customerFlock: ICustomerFlock) => {
            customerFlock.createdDate = customerFlock.createdDate != null ? moment(customerFlock.createdDate) : null;
        });
        return res;
    }
}
