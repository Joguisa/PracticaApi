import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../interfaces/menu';
import { ResponseApi } from 'src/app/shared/interfaces/response-api';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private urlApi: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  getMenu(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/menu`);
  }
}
