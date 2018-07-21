import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';

type EntityResponseType = HttpResponse<IFlockRelation>;
type EntityArrayResponseType = HttpResponse<IFlockRelation[]>;

@Injectable({ providedIn: 'root' })
export class FlockRelationService {
    private resourceUrl = SERVER_API_URL + 'api/flock-relations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/flock-relations';

    constructor(private http: HttpClient) {}

    create(flockRelation: IFlockRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flockRelation);
        return this.http
            .post<IFlockRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(flockRelation: IFlockRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flockRelation);
        return this.http
            .put<IFlockRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFlockRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFlockRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFlockRelation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(flockRelation: IFlockRelation): IFlockRelation {
        const copy: IFlockRelation = Object.assign({}, flockRelation, {
            createdDate:
                flockRelation.createdDate != null && flockRelation.createdDate.isValid() ? flockRelation.createdDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((flockRelation: IFlockRelation) => {
            flockRelation.createdDate = flockRelation.createdDate != null ? moment(flockRelation.createdDate) : null;
        });
        return res;
    }
}
