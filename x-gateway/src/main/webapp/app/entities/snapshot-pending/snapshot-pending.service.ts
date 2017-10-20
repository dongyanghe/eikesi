import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SnapshotPending } from './snapshot-pending.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SnapshotPendingService {

    private resourceUrl = SERVER_API_URL + 'api/snapshot-pendings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/snapshot-pendings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(snapshotPending: SnapshotPending): Observable<SnapshotPending> {
        const copy = this.convert(snapshotPending);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(snapshotPending: SnapshotPending): Observable<SnapshotPending> {
        const copy = this.convert(snapshotPending);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<SnapshotPending> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.createDate = this.dateUtils
            .convertDateTimeFromServer(entity.createDate);
        entity.updateDate = this.dateUtils
            .convertDateTimeFromServer(entity.updateDate);
    }

    private convert(snapshotPending: SnapshotPending): SnapshotPending {
        const copy: SnapshotPending = Object.assign({}, snapshotPending);

        copy.createDate = this.dateUtils.toDate(snapshotPending.createDate);

        copy.updateDate = this.dateUtils.toDate(snapshotPending.updateDate);
        return copy;
    }
}
