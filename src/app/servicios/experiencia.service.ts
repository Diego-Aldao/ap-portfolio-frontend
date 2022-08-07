import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private urlApiLocal= environment.URLapi;

  constructor(private http: HttpClient) { }

  public getExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.urlApiLocal}/experiencia/ver`)
  }

  public añadirExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.urlApiLocal}/experiencia/crear`, experiencia)
  }

  public editarExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.urlApiLocal}/experiencia/editar`, experiencia)
  }

  public eliminarExperiencia(experienciaId: number):Observable<void>{
    return this.http.delete<void>(`${this.urlApiLocal}/experiencia/eliminar/${experienciaId}`)
  }

  public buscarExperiencia(experienciaId: number):Observable<void>{
    return this.http.get<void>(`${this.urlApiLocal}/experiencia/id/${experienciaId}`)
  }
}
