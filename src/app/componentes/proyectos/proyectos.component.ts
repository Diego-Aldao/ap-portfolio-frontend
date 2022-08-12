import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public proyectos:Proyecto[]=[];
  public editarProyecto: Proyecto | undefined;
  public borrarProyecto: Proyecto | undefined;

  constructor(private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  public getProyectos():void{
    this.proyectoService.getProyecto().subscribe(
      data =>{
        this.proyectos = data;
      }
    )
  }

    /*Funcion para que al clickear algun boton del crud
  agregue un boton que, dependeiendo el modo que reciba, abra el modal correspondiente*/ 
  public onOpenModal(modo: string, proyecto?: Proyecto): void {
    const contenedor = document.getElementById("proyecto");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.style.display = "none";
    boton.setAttribute("data-bs-toggle", "modal");
    if(modo === "agregar"){
      boton.setAttribute("data-bs-target", "#modal-agregar-pro")
    }else if(modo === "editar"){
      this.editarProyecto = proyecto;
      boton.setAttribute("data-bs-target", "#modal-editar-pro")
    }else if(modo === "eliminar"){
      this.borrarProyecto = proyecto;
      boton.setAttribute("data-bs-target", "#modal-eliminar-pro")
    }
    contenedor?.appendChild(boton);
    boton.click();
  }

  public onAgregarPro(formAgregar: NgForm):void{
    this.proyectoService.añadirProyecto(formAgregar.value).subscribe(
      (response: Proyecto) =>{
        this.getProyectos();
        formAgregar.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        formAgregar.reset();
      }
    )    
  }

  public onEditarPro(proyecto: Proyecto):void{
    this.proyectoService.editarProyecto(proyecto).subscribe(
      (response: Proyecto) =>{
        this.getProyectos();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

  public onEliminarPro(proyectoId: number):void{
    this.proyectoService.eliminarProyecto(proyectoId).subscribe(
      (response: void) =>{
        this.getProyectos();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    ) 
  }

}
