import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResponseApi } from 'src/app/shared/interfaces/response-api';
import { environment } from 'src/environments/environment';
import { Perfil } from '../interfaces/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  private urlApi: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  lista(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/perfiles`).pipe(
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
    )
  }

  guardar(request: Perfil):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}/perfiles`,request).pipe(
      tap(respuesta => {
        
        if(respuesta.status === 200 ){
          console.log(respuesta.code)
          console.log(respuesta.message)
          console.log(respuesta.status)
        }
      }),
      catchError(error => {
        if(error.status === 400) {
          console.log(error.error.code);
          console.log(error.error.message);
          console.log(error.status);
        }
        return of(error);
      })
    )
  }

  editar(request: Perfil, id: number):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/perfiles/${id}`,request)
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}/perfiles/${id}`)
  }


}
