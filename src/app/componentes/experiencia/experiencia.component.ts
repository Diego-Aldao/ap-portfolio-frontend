import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia.model';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experiencias:Experiencia[]=[];

  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    this.getExperienciaes();
  }

  public getExperienciaes():void{
    this.experienciaService.getExperiencia().subscribe(
      data =>{
        this.experiencias = data;
      }
    )
  }

}
