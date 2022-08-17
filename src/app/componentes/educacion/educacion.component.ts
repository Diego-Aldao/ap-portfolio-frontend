import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
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

  constructor(private educacionService:EducacionService, private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    this.getEducaciones();
  }

  isLogged = this.autenticacionService.UsuarioLogueado;

  public getEducaciones():void{
    this.educacionService.getEducacion().subscribe(
      data =>{
        this.educaciones = data;
      }
    )
  }

  public onOpenModal(target?: string, educacion?: Educacion): void {
    if(target === "editar"){
     this.editarEducacion = educacion;
   }else if(target === "eliminar"){
     this.borrarEducacion = educacion;
   }
 }

  public onAgregarEdu(formAgregar: NgForm):void{
    this.educacionService.añadirEducacion(formAgregar.value).subscribe(
      {
        next: () =>{
          this.getEducaciones();
          formAgregar.reset();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
          formAgregar.reset();
        }
      }
    )    
  }

  public onEditarEdu(educacion: Educacion):void{
    this.educacionService.editarEducacion(educacion).subscribe(
      {
        next: () =>{
          this.getEducaciones();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

  public onEliminarEdu(educacionId: number):void{
    this.educacionService.eliminarEducacion(educacionId).subscribe(
      {
        next: () =>{
          this.getEducaciones();
        },
        error: (error: HttpErrorResponse) =>{
          console.log(error.message)
        }
      }
    ) 
  }

}
