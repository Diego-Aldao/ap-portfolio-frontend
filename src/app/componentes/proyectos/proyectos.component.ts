import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  isLogged= false;

  public proyectos:Proyecto[]=[];
  public editarProyecto: Proyecto | undefined;
  public borrarProyecto: Proyecto | undefined;

  constructor(private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    if(this.isLogueado?.length === undefined){
      this.isLogged = false;
    } else{
      this.isLogged = true
    }
    this.getProyectos();
  }

  isLogueado = sessionStorage.getItem("currentUser");

  public getProyectos():void{
    this.proyectoService.getProyecto().subscribe(
      data =>{
        this.proyectos = data;
      }
    )
  }

  public onOpenModal(target?: string, proyecto?: Proyecto): void {
     if(target === "editar"){
      this.editarProyecto = proyecto;
    }else if(target === "eliminar"){
      this.borrarProyecto = proyecto;
    }
  }

  public onAgregarPro(formAgregar: NgForm):void{
    this.proyectoService.añadirProyecto(formAgregar.value).subscribe(
      {
        next: () =>{
          this.getProyectos();
          formAgregar.reset();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
          formAgregar.reset();
        }
      }
    )    
  }

  public onEditarPro(proyecto: Proyecto):void{
    this.proyectoService.editarProyecto(proyecto).subscribe(
      {
        next: () =>{
          this.getProyectos();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

  public onEliminarPro(proyectoId: number):void{
    this.proyectoService.eliminarProyecto(proyectoId).subscribe(
      {
        next: () =>{
          this.getProyectos();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

}
