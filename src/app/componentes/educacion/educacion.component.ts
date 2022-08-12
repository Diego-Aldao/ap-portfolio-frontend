import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educaciones:Educacion[]=[];
  public editarEducacion: Educacion | undefined;
  public borrarEducacion: Educacion | undefined;

  constructor(private educacionService:EducacionService) { }

  ngOnInit(): void {
    this.getEducaciones();
  }

  public getEducaciones():void{
    this.educacionService.getEducacion().subscribe(
      data =>{
        this.educaciones = data;
      }
    )
  }

  /*Funcion para que al clickear algun boton del crud
  agregue un boton que, dependeiendo el modo que reciba, abra el modal correspondiente*/ 
  public onOpenModal(modo: string, educacion?: Educacion): void {
    const contenedor = document.getElementById("educacion");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.style.display = "none";
    boton.setAttribute("data-bs-toggle", "modal");
    if(modo === "agregar"){
      boton.setAttribute("data-bs-target", "#modal-agregar-edu")
    }else if(modo === "editar"){
      this.editarEducacion = educacion;
      boton.setAttribute("data-bs-target", "#modal-editar-edu")
    }else if(modo === "eliminar"){
      this.borrarEducacion = educacion;
      boton.setAttribute("data-bs-target", "#modal-eliminar-edu")
    }
    contenedor?.appendChild(boton);
    boton.click();
  }

  public onAgregarEdu(formAgregar: NgForm):void{
    this.educacionService.añadirEducacion(formAgregar.value).subscribe(
      (response: Educacion) =>{
        this.getEducaciones();
        formAgregar.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        formAgregar.reset();
      }
    )    
  }

  public onEditarEdu(educacion: Educacion):void{
    this.educacionService.editarEducacion(educacion).subscribe(
      (response: Educacion) =>{
        this.getEducaciones();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

  public onEliminarEdu(educacionId: number):void{
    this.educacionService.eliminarEducacion(educacionId).subscribe(
      (response: void) =>{
        this.getEducaciones();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

}
