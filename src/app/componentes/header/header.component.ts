import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged= false;

  public usuario: Usuario | undefined;
  public editarUsuario: Usuario | undefined;

  constructor(public usuarioService: UsuarioService) { }
 

  ngOnInit(): void {
    if(this.isLogueado?.length === undefined){
      this.isLogged = false;
    } else{
      this.isLogged = true
    }
    this.getUsuario();
  }

  isLogueado = sessionStorage.getItem("currentUser");

  public getUsuario():void{
    this.usuarioService.getUsuario().subscribe(
      data => {
        this.usuario = data;
      }      
    )
  }

  public onOpenModal(usuario?: Usuario): void {
    this.editarUsuario = usuario;
  }

  public onEditarPro(usuario: Usuario):void{
    this.usuarioService.editarUsuario(usuario).subscribe({
      next: () => {
        this.getUsuario();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }}
    )
  }
}
