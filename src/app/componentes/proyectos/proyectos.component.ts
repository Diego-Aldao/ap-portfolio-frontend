import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public proyectos:Proyecto[]=[];

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

}
