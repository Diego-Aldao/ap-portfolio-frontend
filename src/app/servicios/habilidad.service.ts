import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../models/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  private urlApiLocal= environment.URLapi;

  constructor(private http: HttpClient) { }

  public getHabilidad():Observable<Habilidad[]>{
    return this.http.get<Habilidad[]>(`${this.urlApiLocal}/habilidad/ver`)
  }

  public añadirHabilidad(habilidad: Habilidad):Observable<Habilidad>{
    return this.http.post<Habilidad>(`${this.urlApiLocal}/habilidad/crear`, habilidad)
  }

  public editarHabilidad(habilidad: Habilidad):Observable<Habilidad>{
    return this.http.put<Habilidad>(`${this.urlApiLocal}/habilidad/editar`, habilidad)
  }

  public eliminarHabilidad(habilidadId: number):Observable<void>{
    return this.http.delete<void>(`${this.urlApiLocal}/habilidad/eliminar/${habilidadId}`)
  }

  public buscarHabilidad(habilidadId: number):Observable<void>{
    return this.http.get<void>(`${this.urlApiLocal}/habilidad/id/${habilidadId}`)
  }
}
