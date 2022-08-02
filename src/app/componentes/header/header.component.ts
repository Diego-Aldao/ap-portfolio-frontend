import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario | undefined;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  public getUsuario():void{
    this.usuarioService.getUsuario().subscribe(
      data => {
        this.usuario = data;
      }      
    )
  }

}
