import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVozilo } from 'app/shared/model/vozilo.model';

type EntityResponseType = HttpResponse<IVozilo>;
type EntityArrayResponseType = HttpResponse<IVozilo[]>;

@Injectable({ providedIn: 'root' })
export class VoziloService {
  public resourceUrl = SERVER_API_URL + 'api/vozilos';

  constructor(protected http: HttpClient) {}

  create(vozilo: IVozilo): Observable<EntityResponseType> {
    return this.http.post<IVozilo>(this.resourceUrl, vozilo, { observe: 'response' });
  }

  update(vozilo: IVozilo): Observable<EntityResponseType> {
    return this.http.put<IVozilo>(this.resourceUrl, vozilo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVozilo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVozilo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
