import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url= environment.URLapi;
  currentUserSubject: BehaviorSubject<any>;
  logueado = false;
  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("currentUser") || "{}"))
  }

  iniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.url + "/login", credenciales).pipe(map(data=>{
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      this.logueado = true;
      return data
    }))
  }

  get UsuarioAutenticado()
  {
    return this.currentUserSubject.value;
  }

  get UsuarioLogueado(){
    return this.logueado;
  }


}
