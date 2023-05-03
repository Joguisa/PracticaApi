import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseApi } from 'src/app/shared/interfaces/response-api';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private urlApi: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  iniciarSesion(usuario: string, clave: string): Observable<ResponseApi> {
    const data = { usuario: usuario, clave: clave };

    return this.http.post<ResponseApi>(`${this.urlApi}/autenticacion`, data, this.httpOptions).pipe(
      tap(respuesta => {
        
        if(respuesta.status === 200 ){
          console.log(respuesta.code)
          console.log(respuesta.message)
          console.log(respuesta.status)
        }
      }),
      catchError(error => {
        if(error.status === 401) {
          console.log(error.error.code);
          console.log(error.error.message);
          console.log(error.status);
        }
        return of(error);
      })
    );
  }
}
