import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  isLogged= false;

  public experiencias:Experiencia[]=[];
  public editarExperiencia: Experiencia | undefined;
  public borrarExperiencia: Experiencia | undefined;

  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    if(this.isLogueado?.length === undefined){
      this.isLogged = false;
    } else{
      this.isLogged = true
    }
    this.getExperiencias();
  }

  isLogueado = sessionStorage.getItem("currentUser");

  public getExperiencias():void{
    this.experienciaService.getExperiencia().subscribe(
      data =>{
        this.experiencias = data;
      }
    )
  }

  public onOpenModal(target?: string, experiencia?: Experiencia): void {
    if(target === "editar"){
     this.editarExperiencia = experiencia;
   }else if(target === "eliminar"){
     this.borrarExperiencia = experiencia;
   }
 }

  public onAgregarExp(formAgregar: NgForm):void{
    this.experienciaService.añadirExperiencia(formAgregar.value).subscribe(
      {
        next: () =>{
          this.getExperiencias();
          formAgregar.reset();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
          formAgregar.reset();
        }
      }
    )    
  }

  public onEditarExp(experiencia: Experiencia):void{
    this.experienciaService.editarExperiencia(experiencia).subscribe(
      {
        next: () =>{
          this.getExperiencias();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

  public onEliminarExp(experienciaId: number):void{
    this.experienciaService.eliminarExperiencia(experienciaId).subscribe(
      {
        next: () =>{
          this.getExperiencias();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

}
