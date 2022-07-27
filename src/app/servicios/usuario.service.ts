import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL = "http://localhost:8080/usuarios/";

  constructor(private http: HttpClient) { }

  public getUsuario(): Observable<Usuario>{
    return this.http.get<Usuario>(this.URL +"id/4")
  }
}
