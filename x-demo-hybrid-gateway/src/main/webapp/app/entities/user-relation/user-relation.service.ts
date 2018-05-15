import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserRelation } from './user-relation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserRelation>;

@Injectable()
export class UserRelationService {

    private resourceUrl =  SERVER_API_URL + 'api/user-relations';

    constructor(private http: HttpClient) { }

    create(userRelation: UserRelation): Observable<EntityResponseType> {
        const copy = this.convert(userRelation);
        return this.http.post<UserRelation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userRelation: UserRelation): Observable<EntityResponseType> {
        const copy = this.convert(userRelation);
        return this.http.put<UserRelation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserRelation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserRelation[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserRelation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserRelation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserRelation[]>): HttpResponse<UserRelation[]> {
        const jsonResponse: UserRelation[] = res.body;
        const body: UserRelation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserRelation.
     */
    private convertItemFromServer(userRelation: UserRelation): UserRelation {
        const copy: UserRelation = Object.assign({}, userRelation);
        return copy;
    }

    /**
     * Convert a UserRelation to a JSON which can be sent to the server.
     */
    private convert(userRelation: UserRelation): UserRelation {
        const copy: UserRelation = Object.assign({}, userRelation);
        return copy;
    }
}
