import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/classes/partida';
import { ToolbarOptions } from 'src/app/classes/toolbar-options';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';
import { TableroComponent } from './tablero/tablero.component';
import { TecladoComponent } from './teclado/teclado.component';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {

  // Propiedades ==================================================

  toolbarOptions: ToolbarOptions;
  partidaEnCurso: Partida;
  partidaEnCurso_json: string;


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = false;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = true;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = true;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;
    this.partidaEnCurso = new Partida();
    this.partidaEnCurso_json = '';
  }


  ngOnInit() {
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
    
    this.partidaEnCurso_json = localStorage.getItem('partidaEnCurso');
    console.log(this.partidaEnCurso_json);
    console.log(this.partidaEnCurso);
    console.log(localStorage.getItem('AlgoQueNoExiste')===null);
  }


}