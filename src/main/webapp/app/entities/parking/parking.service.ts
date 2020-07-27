import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParking } from 'app/shared/model/parking.model';

type EntityResponseType = HttpResponse<IParking>;
type EntityArrayResponseType = HttpResponse<IParking[]>;

@Injectable({ providedIn: 'root' })
export class ParkingService {
  public resourceUrl = SERVER_API_URL + 'api/parkings';

  constructor(protected http: HttpClient) {}

  create(parking: IParking): Observable<EntityResponseType> {
    return this.http.post<IParking>(this.resourceUrl, parking, { observe: 'response' });
  }

  update(parking: IParking): Observable<EntityResponseType> {
    return this.http.put<IParking>(this.resourceUrl, parking, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParking>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParking[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
