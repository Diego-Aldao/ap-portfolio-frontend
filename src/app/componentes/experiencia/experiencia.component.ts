import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia.model';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experiencias:Experiencia[]=[];
  public editarExperiencia: Experiencia | undefined;
  public borrarExperiencia: Experiencia | undefined;

  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencias();
  }

  public getExperiencias():void{
    this.experienciaService.getExperiencia().subscribe(
      data =>{
        this.experiencias = data;
      }
    )
  }

  /*Funcion para que al clickear algun boton del crud
  Agregue un boton que depende el modo que reciba, abra el modal correspondiente*/ 
  public onOpenModal(modo: string, experiencia?: Experiencia): void {
    const contenedor = document.getElementById("experiencia");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.style.display = "none";
    boton.setAttribute("data-bs-toggle", "modal");
    if(modo === "agregar"){
      boton.setAttribute("data-bs-target", "#modal-agregar-exp")
    }else if(modo === "editar"){
      this.editarExperiencia = experiencia;
      boton.setAttribute("data-bs-target", "#modal-editar-exp")
    }else if(modo === "eliminar"){
      this.borrarExperiencia = experiencia;
      boton.setAttribute("data-bs-target", "#modal-eliminar-exp")
    }
    contenedor?.appendChild(boton);
    boton.click();
  }

  public onAgregarExp(formAgregar: NgForm):void{
    this.experienciaService.añadirExperiencia(formAgregar.value).subscribe(
      (response: Experiencia) =>{
        console.log(response);
        this.getExperiencias();
        formAgregar.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        formAgregar.reset();
      }
    )    
  }

  public onEditarExp(experiencia: Experiencia):void{
    this.experienciaService.editarExperiencia(experiencia).subscribe(
      (response: Experiencia) =>{
        console.log(response);
        this.getExperiencias();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

  public onEliminarExp(experienciaId: number):void{
    this.experienciaService.eliminarExperiencia(experienciaId).subscribe(
      (response: void) =>{
        console.log(response);
        this.getExperiencias();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

}
