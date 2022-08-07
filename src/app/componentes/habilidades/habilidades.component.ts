import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/models/habilidad.model';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidades:Habilidad[]=[];

  constructor(private habilidadService:HabilidadService) { }

  ngOnInit(): void {
    this.getEducaciones();
  }

  public getEducaciones():void{
    this.habilidadService.getHabilidad().subscribe(
      data =>{
        this.habilidades = data;
      }
    )
  }

}
