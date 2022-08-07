import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educaciones:Educacion[]=[];

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

}
