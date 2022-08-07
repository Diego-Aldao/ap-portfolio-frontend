import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  
  private urlApiLocal= environment.URLapi;

  constructor(private http: HttpClient) { }

  public getProyecto():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.urlApiLocal}/proyecto/ver`)
  }

  public añadirProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(`${this.urlApiLocal}/proyecto/crear`, proyecto)
  }

  public editarProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.urlApiLocal}/proyecto/editar`, proyecto)
  }

  public eliminarProyecto(proyectoId: number):Observable<void>{
    return this.http.delete<void>(`${this.urlApiLocal}/proyecto/eliminar/${proyectoId}`)
  }

  public buscarProyecto(proyectoId: number):Observable<void>{
    return this.http.get<void>(`${this.urlApiLocal}/proyecto/id/${proyectoId}`)
  }
}
