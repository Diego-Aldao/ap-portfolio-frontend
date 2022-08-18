import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {  

  isLogged= false;
  
  constructor(private ruta:Router) { 
  }
  
  ngOnInit(): void {
    if(this.isLogueado?.length === undefined){
      this.isLogged = false;
    } else{
      this.isLogged = true
    }
  }  

  isLogueado = sessionStorage.getItem("currentUser");
  
  login(): void{
    this.ruta.navigate(["/login"])
  }

  logout(): void{
    window.location.reload();
    sessionStorage.clear();
    this.isLogged = false;
  }

}
