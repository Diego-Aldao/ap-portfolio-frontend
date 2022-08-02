import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApiLocal= environment.URLapi;

  constructor(private http: HttpClient) { }

  public getUsuario(): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlApiLocal}/usuario/id/3`)
  }
}
