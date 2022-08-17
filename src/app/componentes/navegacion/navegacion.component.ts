import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {  
  
  constructor(private ruta:Router, public autenticacionService:AutenticacionService) { 
  }
  
  ngOnInit(): void {
  }
  
  isLogged = this.autenticacionService.UsuarioLogueado;
  
  login(): void{
    this.ruta.navigate(["/login"])
  }

  logout(): void{
    window.location.reload();
    sessionStorage.clear();
    this.isLogged = false;
  }

}
