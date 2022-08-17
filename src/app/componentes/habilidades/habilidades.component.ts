import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidad } from 'src/app/models/habilidad.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidades:Habilidad[]=[];
  public editarHabilidad: Habilidad | undefined;
  public borrarHabilidad: Habilidad | undefined;

  constructor(private habilidadService:HabilidadService, private autenticacionService:AutenticacionService) { }

  ngOnInit(): void {
    this.getHabilidades();
  }

  isLogged = this.autenticacionService.UsuarioLogueado;

  public getHabilidades():void{
    this.habilidadService.getHabilidad().subscribe(
      data =>{
        this.habilidades = data;
      }
    )
  }

  public onOpenModal(target?: string, habilidad?: Habilidad): void {
    if(target === "editar"){
     this.editarHabilidad = habilidad;
   }else if(target === "eliminar"){
     this.borrarHabilidad = habilidad;
   }
 }

  public onAgregarHab(formAgregar: NgForm):void{
    this.habilidadService.añadirHabilidad(formAgregar.value).subscribe(
      {
        next: () =>{
          this.getHabilidades();
          formAgregar.reset();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
          formAgregar.reset();
        }
      }
    )    
  }

  public onEditarHab(habilidad: Habilidad):void{
    this.habilidadService.editarHabilidad(habilidad).subscribe(
      {
        next: () =>{
          this.getHabilidades();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

  public onEliminarHab(habilidadId: number):void{
    this.habilidadService.eliminarHabilidad(habilidadId).subscribe(
      {
        next: () =>{
          this.getHabilidades();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

}
