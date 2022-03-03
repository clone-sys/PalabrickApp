import { Component, OnInit } from '@angular/core';
import { Casilla } from 'src/app/classes/casilla';
import { IntentoPartida } from 'src/app/classes/intento-partida';


@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  partida_actual:string;
  json_partida: Array<IntentoPartida>;
  casilla_actual: Casilla;
  bgColorClass: string;
  
  pos_letra: number;
  fila_actual: number;
  tablero: any[];
  private static readonly MAX_INTENTOS: number = 6;
  private static readonly LONG_PALABRA: number = 5;

  constructor() {
    this.partida_actual= localStorage.getItem('partidaEnCurso');
    this.json_partida = JSON.parse(this.partida_actual);
    this.casilla_actual = new Casilla();
    this.fila_actual = this.json_partida['intentos'].length;
    this.pos_letra = this.json_partida['intentos'][this.fila_actual-1]['palabra'].length;
    this.bgColorClass = '';
    this.crearTablero();
  }

  ngOnInit(): void {
    //this.jsonDePrueba();
    this.actualizaTablero();
    //this.actualizarEstadoCasilla();

    //miro los estados para ver tema de color de casillas
    for(let i = 0; i<TableroComponent.MAX_INTENTOS; i++){
      for(let j = 0; j < TableroComponent.LONG_PALABRA; j++){
        console.log('estado ' + i + j + ' ' + this.tablero[i][j].estado);
      }
    }
  }

  //Creamos tablero
  crearTablero() {
    this.tablero = [];
    for (let i = 0; i < TableroComponent.MAX_INTENTOS; i++) {
      let fila = [];

      for (let j = 0; j < TableroComponent.LONG_PALABRA; j++) {
        fila.push(new Casilla());
      }
      this.tablero.push(fila);
    }
  }

  //Actualizamos tablero
  //obtenemos del json las letras

  actualizaTablero(){
    this.tablero[this.fila_actual-1][this.pos_letra-1].letra = this.json_partida['intentos'][this.fila_actual-1]['palabra'][this.pos_letra-1];
    this.tablero[this.fila_actual-1][this.pos_letra-1].estado = "estado" + this.json_partida['intentos'][this.fila_actual-1]['letra' + (this.pos_letra)];
    
    for( let i = this.pos_letra; i < TableroComponent.LONG_PALABRA; i++ ) {
      this.tablero[this.fila_actual-1][i].letra = '';
      this.tablero[this.fila_actual-1][i].estado = "estado2";
    }
  }

//Funcion para hacer pruebas de tablero de forma independiente
  /*
  jsonDePrueba(){
    let partidaEnCurso_json = '{"resultado": 3,"fecha_inicio": 11434394903000,"fecha_fin": 11434395323000,"intentos": [{"palabra": "HELIO","letra1": 1,"letra2": -1,"letra3": 0,"letra4": 0,"letra5": 1},{"palabra": "FIDEO","letra1": 0,"letra2": 0,"letra3": 0,"letra4": -1,"letra5": -1},{"palabra": "HUEVA","letra1": 1,"letra2": 1,"letra3": 1,"letra4": 1,"letra5": -1}]}';
    let partidaEnCurso_array = JSON.parse(partidaEnCurso_json);
    console.log('intentos' + partidaEnCurso_json);
    console.log(partidaEnCurso_array);
    localStorage.setItem('partidaEnCurso', partidaEnCurso_json);
  }*/

}