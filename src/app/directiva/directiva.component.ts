import { Component } from '@angular/core';
import { Tabla }from './tabla';
@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

 //listado de tabla
 japaneseWord : Tabla[] =[
  new Tabla ("こんにちは","konnichiwa","",""),
  new Tabla ("ありがとう","arigatou","",""),
  new Tabla ("おはようございます","ohayou gozaimasu","",""),
  new Tabla ("すみません","sumimasen","",""),
 
 ];

  habilitar: boolean = true;
  constructor() {}

  setHabilitar(): void {
    this.habilitar = (this.habilitar==true)? false : true
  }
}
