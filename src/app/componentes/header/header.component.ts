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

  public usuario: Usuario | undefined;
  public editarUsuario: Usuario | undefined;

  constructor(public usuarioService: UsuarioService, private autenticacionService:AutenticacionService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  isLogged = this.autenticacionService.UsuarioLogueado;

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
