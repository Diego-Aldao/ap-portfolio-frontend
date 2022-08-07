import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private urlApiLocal= environment.URLapi;

  constructor(private http: HttpClient) { }

  public getEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.urlApiLocal}/educacion/ver`)
  }

  public añadirEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.urlApiLocal}/educacion/crear`, educacion)
  }

  public editarEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.urlApiLocal}/educacion/editar`, educacion)
  }

  public eliminarEducacion(educacionId: number):Observable<void>{
    return this.http.delete<void>(`${this.urlApiLocal}/educacion/eliminar/${educacionId}`)
  }

  public buscarEducacion(educacionId: number):Observable<void>{
    return this.http.get<void>(`${this.urlApiLocal}/educacion/id/${educacionId}`)
  }
}
