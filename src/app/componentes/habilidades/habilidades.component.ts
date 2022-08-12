import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidad } from 'src/app/models/habilidad.model';
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

  constructor(private habilidadService:HabilidadService) { }

  ngOnInit(): void {
    this.getHabilidades();
  }

  public getHabilidades():void{
    this.habilidadService.getHabilidad().subscribe(
      data =>{
        this.habilidades = data;
      }
    )
  }

  /*Funcion para que al clickear algun boton del crud
  agregue un boton que, dependeiendo el modo que reciba, abra el modal correspondiente*/ 
  public onOpenModal(modo: string, habilidad?: Habilidad): void {
    const contenedor = document.getElementById("habilidad");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.style.display = "none";
    boton.setAttribute("data-bs-toggle", "modal");
    if(modo === "agregar"){
      boton.setAttribute("data-bs-target", "#modal-agregar-hab")
    }else if(modo === "editar"){
      this.editarHabilidad = habilidad;
      boton.setAttribute("data-bs-target", "#modal-editar-hab")
    }else if(modo === "eliminar"){
      this.borrarHabilidad = habilidad;
      boton.setAttribute("data-bs-target", "#modal-eliminar-hab")
    }
    contenedor?.appendChild(boton);
    boton.click();
  }

  public onAgregarHab(formAgregar: NgForm):void{
    this.habilidadService.añadirHabilidad(formAgregar.value).subscribe(
      (response: Habilidad) =>{
        this.getHabilidades();
        formAgregar.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        formAgregar.reset();
      }
    )    
  }

  public onEditarHab(habilidad: Habilidad):void{
    this.habilidadService.editarHabilidad(habilidad).subscribe(
      (response: Habilidad) =>{
        this.getHabilidades();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

  public onEliminarHab(habilidadId: number):void{
    this.habilidadService.eliminarHabilidad(habilidadId).subscribe(
      (response: void) =>{
        this.getHabilidades();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

}
